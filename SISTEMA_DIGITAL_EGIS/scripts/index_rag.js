// ============================================================
// SISTEMA DIGITAL EGIS — Indexador RAG
// Indexa los 23 documentos de Bases_legales_datos en ChromaDB
// Uso: node scripts/index_rag.js
// ============================================================

import { ChromaClient } from "chromadb";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { createHash } from "crypto";

const CHROMA_URL = process.env.CHROMA_URL || "http://localhost:8001";
const CHROMA_TOKEN = process.env.CHROMA_TOKEN || "";
const DOCS_PATH = process.env.DOCS_PATH || "../SISTEMA_DIGITAL_EGIS/Bases_legales_datos";

const COLLECTION_NAME = "egis_knowledge_base";

// ----------------------------------------------------------
// Cliente ChromaDB
// ----------------------------------------------------------
const client = new ChromaClient({
  path: CHROMA_URL,
  auth: {
    provider: "token",
    credentials: CHROMA_TOKEN,
  },
});

// ----------------------------------------------------------
// Chunking — divide documentos largos en fragmentos manejables
// ----------------------------------------------------------
function chunkText(text, chunkSize = 800, overlap = 100) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end).trim());
    start += chunkSize - overlap;
  }
  return chunks.filter((c) => c.length > 50);
}

// ----------------------------------------------------------
// Leer todos los .md de forma recursiva
// ----------------------------------------------------------
function readMarkdownFiles(dir) {
  const files = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...readMarkdownFiles(fullPath));
    } else if (entry.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

// ----------------------------------------------------------
// Metadata por categoría de documento
// ----------------------------------------------------------
function getMetadata(filePath) {
  const rel = relative(DOCS_PATH, filePath);
  const folder = rel.split("/")[0];

  const categoryMap = {
    "01_Marco_Legal": "marco_legal",
    "02_Seguridad_Informacion": "seguridad",
    "03_Arquitectura_Sistema": "arquitectura",
    "04_Chat_IA": "ia",
    "05_Beneficios_Sociales": "beneficios",
    "06_Cumplimiento_y_Documentos": "cumplimiento",
  };

  return {
    category: categoryMap[folder] || "general",
    folder,
    filename: rel,
    // "beneficios" es la categoría que usa ARIA en sus respuestas
    available_to_aria: ["beneficios", "marco_legal"].includes(
      categoryMap[folder] || ""
    ),
  };
}

// ----------------------------------------------------------
// Main
// ----------------------------------------------------------
async function main() {
  console.log("🔍 Conectando a ChromaDB en", CHROMA_URL);

  // Eliminar colección anterior si existe (re-indexación limpia)
  try {
    await client.deleteCollection({ name: COLLECTION_NAME });
    console.log("  ↺  Colección anterior eliminada");
  } catch {
    // No existía, ok
  }

  const collection = await client.createCollection({
    name: COLLECTION_NAME,
    metadata: {
      description: "Base de conocimiento EGIS — 23 documentos verificados",
      created: new Date().toISOString(),
    },
  });

  console.log("  ✓ Colección creada:", COLLECTION_NAME);

  const files = readMarkdownFiles(DOCS_PATH);
  console.log(`  📄 ${files.length} archivos encontrados\n`);

  let totalChunks = 0;

  for (const filePath of files) {
    const content = readFileSync(filePath, "utf-8");
    const chunks = chunkText(content);
    const metadata = getMetadata(filePath);

    const ids = chunks.map((_, i) => {
      const hash = createHash("md5")
        .update(filePath + i)
        .digest("hex")
        .slice(0, 8);
      return `doc_${hash}_${i}`;
    });

    const metadatas = chunks.map((_, i) => ({
      ...metadata,
      chunk_index: i,
      total_chunks: chunks.length,
    }));

    // ChromaDB acepta hasta 500 documentos por batch
    const batchSize = 100;
    for (let b = 0; b < chunks.length; b += batchSize) {
      await collection.add({
        ids: ids.slice(b, b + batchSize),
        documents: chunks.slice(b, b + batchSize),
        metadatas: metadatas.slice(b, b + batchSize),
      });
    }

    console.log(`  ✓ ${metadata.filename} → ${chunks.length} chunks`);
    totalChunks += chunks.length;
  }

  console.log(`\n  📦 Total: ${totalChunks} chunks indexados`);
  console.log("  ✅ Base de conocimiento RAG lista\n");

  // Prueba de verificación (Paso 6 del egis-rag-updater skill)
  console.log("🧪 Prueba de verificación...");
  const results = await collection.query({
    queryTexts: ["¿Cuáles son los requisitos del DS49?"],
    nResults: 2,
    where: { available_to_aria: true },
  });
  console.log(
    "  Resultado de prueba:",
    results.documents[0][0]?.slice(0, 120) + "..."
  );
  console.log("  ✅ RAG respondiendo correctamente\n");
}

main().catch((err) => {
  console.error("❌ Error indexando RAG:", err.message);
  process.exit(1);
});
