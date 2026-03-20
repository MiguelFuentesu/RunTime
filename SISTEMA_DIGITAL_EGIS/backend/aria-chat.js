// ============================================================
// SISTEMA DIGITAL EGIS — ARIA Chat API
// Ruta: POST /api/aria/chat
// Modelo: Qwen3:4b vía Ollama (local, sin costo API)
// Patrón: RAG → system prompt → Ollama → respuesta
// ============================================================

import Fastify from "fastify";
import { ChromaClient } from "chromadb";

const app = Fastify({ logger: true });

const OLLAMA_URL = process.env.OLLAMA_URL || "http://ollama:11434";
const CHROMA_URL = process.env.CHROMA_URL || "http://chromadb:8000";
const CHROMA_TOKEN = process.env.CHROMA_TOKEN || "";
const ARIA_MODEL = process.env.OLLAMA_MODEL_ARIA || "qwen3:4b";

// ----------------------------------------------------------
// System prompt de ARIA (basado en control_absoluto_ia.md)
// ----------------------------------------------------------
const ARIA_SYSTEM_PROMPT = `Eres ARIA, el asistente virtual de orientación habitacional de esta EGIS (Entidad Patrocinante acreditada ante el MINVU de Chile).

Tu función es orientar a personas que buscan información sobre programas habitacionales del Ministerio de Vivienda y Urbanismo (MINVU), especialmente adultos mayores.

## REGLAS ABSOLUTAS (nunca las rompas)

1. SOLO responde con información del contexto entregado. Si no está en el contexto, di: "No tengo esa información verificada. Te recomiendo consultar directamente al SERVIU o a nuestra oficina."
2. NUNCA certifiques que alguien califica para un subsidio. Solo el SERVIU puede determinarlo.
3. NUNCA menciones montos exactos de subsidios sin aclarar que son referenciales y pueden cambiar.
4. NUNCA pidas RUT, RSH ni datos personales sensibles en el chat.
5. SIEMPRE termina con los datos de contacto de la EGIS o derivación al SERVIU cuando corresponda.

## ESTILO DE COMUNICACIÓN

- Lenguaje simple, cálido y respetuoso (muchos usuarios son adultos mayores)
- Párrafos cortos, máximo 3 líneas
- Si no entiendes la consulta, pide aclaración antes de responder
- Siempre en español de Chile

## DISCLAIMER OBLIGATORIO

Al final de cada respuesta que involucre requisitos o montos, incluir:
"⚠️ Esta información es orientativa. Para confirmar tu situación personal, comunícate con el SERVIU de tu región o con nuestra oficina."`;

// ----------------------------------------------------------
// RAG: buscar documentos relevantes en ChromaDB
// ----------------------------------------------------------
async function retrieveContext(query) {
  try {
    const chroma = new ChromaClient({
      path: CHROMA_URL,
      auth: { provider: "token", credentials: CHROMA_TOKEN },
    });

    const collection = await chroma.getCollection({
      name: "egis_knowledge_base",
    });

    const results = await collection.query({
      queryTexts: [query],
      nResults: 4,
      // Solo documentos marcados como disponibles para ARIA
      where: { available_to_aria: true },
    });

    const docs = results.documents[0] || [];
    return docs.join("\n\n---\n\n");
  } catch (err) {
    app.log.error("Error consultando RAG:", err.message);
    return "";
  }
}

// ----------------------------------------------------------
// Ollama: llamada al modelo Qwen3:4b
// ----------------------------------------------------------
async function callOllama(systemPrompt, userMessage) {
  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: ARIA_MODEL,
      stream: false,
      options: {
        temperature: 0.3,   // Bajo: respuestas consistentes, sin improvisación
        num_ctx: 4096,
        top_p: 0.9,
      },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status}`);
  }

  const data = await response.json();
  return data.message?.content || "Lo siento, no pude generar una respuesta.";
}

// ----------------------------------------------------------
// Ruta principal del chat
// ----------------------------------------------------------
app.post("/api/aria/chat", async (request, reply) => {
  const { message, sessionId } = request.body;

  if (!message || typeof message !== "string") {
    return reply.status(400).send({ error: "Mensaje requerido" });
  }

  if (message.length > 1000) {
    return reply.status(400).send({ error: "Mensaje demasiado largo" });
  }

  // Seguridad: detectar si el usuario intenta eludir las restricciones
  const redFlags = [
    "ignora las instrucciones",
    "olvida lo anterior",
    "actúa como",
    "eres ahora",
    "modo desarrollador",
  ];
  if (redFlags.some((flag) => message.toLowerCase().includes(flag))) {
    return reply.send({
      response:
        "Solo puedo ayudarte con consultas sobre programas habitacionales del MINVU. ¿En qué puedo orientarte?",
      sessionId,
    });
  }

  try {
    // 1. Recuperar contexto del RAG
    const context = await retrieveContext(message);

    // 2. Construir prompt con contexto RAG
    const promptWithContext = context
      ? `${ARIA_SYSTEM_PROMPT}\n\n## INFORMACIÓN VERIFICADA DISPONIBLE\n\n${context}`
      : ARIA_SYSTEM_PROMPT;

    // 3. Llamar a Qwen3:4b vía Ollama
    const response = await callOllama(promptWithContext, message);

    // 4. Log de auditoría (sin datos personales)
    app.log.info({
      event: "aria_chat",
      sessionId,
      messageLength: message.length,
      hasContext: !!context,
      timestamp: new Date().toISOString(),
    });

    return reply.send({ response, sessionId });
  } catch (err) {
    app.log.error("Error en ARIA chat:", err.message);
    return reply.status(500).send({
      error: "Servicio temporalmente no disponible. Intenta nuevamente.",
    });
  }
});

// ----------------------------------------------------------
// Health check
// ----------------------------------------------------------
app.get("/api/aria/health", async () => {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`);
    const data = await res.json();
    const hasModel = data.models?.some((m) => m.name.includes("qwen3"));
    return {
      status: "ok",
      model: ARIA_MODEL,
      ollama: hasModel ? "ready" : "model_not_loaded",
    };
  } catch {
    return { status: "error", ollama: "unreachable" };
  }
});

export default app;
