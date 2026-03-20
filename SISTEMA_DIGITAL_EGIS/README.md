# Sistema Digital EGIS — Setup Local

> Stack completo local · GPU NVIDIA · Costo API $0
> Qwen3:4b (ARIA público) + Qwen3:14b (intranet interna)

## Prerequisitos

| Herramienta | Versión | Instalación |
|---|---|---|
| Docker Desktop | Últma | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) |
| NVIDIA Container Toolkit | Última | [docs.nvidia.com/datacenter/cloud-native/container-toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) |
| Node.js | 22 LTS | [nodejs.org](https://nodejs.org) |
| Git | Cualquiera | Ya instalado |

## Instalación en 3 pasos

```bash
# 1. Clonar el repo
git clone https://github.com/MiguelFuentesu/RunTime.git
cd RunTime/SISTEMA_DIGITAL_EGIS

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus contraseñas

# 3. Setup automático
bash scripts/setup.sh
```

El script hace todo:
- Levanta PostgreSQL, Redis, Keycloak, ChromaDB
- Descarga Qwen3:4b y Qwen3:14b vía Ollama
- Indexa los 23 documentos en ChromaDB (RAG)

## URLs una vez levantado

| Servicio | URL | Para quién |
|---|---|---|
| **ARIA** (chat público) | http://localhost:3002 | Beneficiarios |
| **Intranet** | http://localhost:3000 | Equipo EGIS |
| **Backend API** | http://localhost:3001 | Desarrollo |
| **Keycloak** | http://localhost:8080 | Admin roles |
| **Ollama** | http://localhost:11434 | Debug modelos |

## Comandos útiles

```bash
# Levantar todo
docker compose up -d

# Ver logs en tiempo real
docker compose logs -f backend

# Ver logs de ARIA
docker compose logs -f aria

# Reiniciar solo Ollama
docker compose restart ollama

# Re-indexar RAG (después de actualizar documentos)
node scripts/index_rag.js

# Probar ARIA desde terminal
curl -X POST http://localhost:3001/api/aria/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Qué es el DS49?", "sessionId": "test-1"}'

# Ver modelos cargados en Ollama
curl http://localhost:11434/api/tags

# Detener todo
docker compose down

# Detener y borrar volúmenes (reset total)
docker compose down -v
```

## Estructura del proyecto

```
SISTEMA_DIGITAL_EGIS/
├── docker-compose.yml          ← Stack completo
├── .env.example                ← Variables de entorno (copiar a .env)
├── scripts/
│   ├── setup.sh                ← Instalación inicial
│   └── index_rag.js            ← Indexador de documentos
├── backend/
│   └── aria-chat.js            ← API ARIA (Qwen3:4b + RAG)
├── apps/
│   ├── intranet/               ← Next.js intranet equipo
│   └── aria/                   ← Next.js chat público
├── Bases_legales_datos/        ← 23 documentos del RAG
└── Skills_EGIS/                ← 5 skills para Claude Code
```

## Modelos y hardware

| Modelo | Uso | VRAM requerida | Velocidad |
|---|---|---|---|
| `qwen3:4b` | ARIA (chat público) | ~3 GB | ~30 tokens/s GPU |
| `qwen3:14b` | Intranet (equipo interno) | ~9 GB | ~15 tokens/s GPU |

Con 16GB RAM + GPU NVIDIA ambos modelos corren simultáneamente sin problema.

## Fases de desarrollo

- [x] **Fase 0** — Entorno local (este archivo)
- [ ] **Fase 1** — Base de datos y autenticación (Keycloak + 9 roles)
- [ ] **Fase 2** — Intranet: módulo de expedientes
- [ ] **Fase 3** — Intranet: visitas, comunicaciones, oportunidades
- [ ] **Fase 4** — RAG base de conocimiento
- [ ] **Fase 5** — ARIA chat público
- [ ] **Fase 6** — Seguridad y auditoría
- [ ] **Fase 7** — Checklist legal prelanzamiento

## Advertencias legales

⚠️ Los documentos de cumplimiento (EIPD, T&C, Política de Privacidad) son borradores.
Deben ser revisados por un abogado antes del lanzamiento.

⚠️ La IA nunca certifica elegibilidad. Solo el SERVIU puede hacerlo.

⚠️ Antes de procesar datos reales de beneficiarios con modelos en la nube,
firmar DPA con el proveedor correspondiente.
