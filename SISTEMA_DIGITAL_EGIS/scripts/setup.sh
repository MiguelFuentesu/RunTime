#!/bin/bash
# ============================================================
# SISTEMA DIGITAL EGIS — Script de instalación inicial
# Ejecutar UNA sola vez después de clonar el repositorio
# Uso: bash scripts/setup.sh
# ============================================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}"
echo "╔══════════════════════════════════════════╗"
echo "║   Sistema Digital EGIS — Setup inicial   ║"
echo "╚══════════════════════════════════════════╝"
echo -e "${NC}"

# ----------------------------------------------------------
# 1. Verificar prerequisitos
# ----------------------------------------------------------
echo -e "${YELLOW}[1/6] Verificando prerequisitos...${NC}"

command -v docker >/dev/null 2>&1 || { echo -e "${RED}ERROR: Docker no está instalado.${NC}"; exit 1; }
command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1 || { echo -e "${RED}ERROR: Docker Compose no está disponible.${NC}"; exit 1; }
command -v node >/dev/null 2>&1 || { echo -e "${RED}ERROR: Node.js no está instalado. Instalar v22 LTS desde nodejs.org${NC}"; exit 1; }

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
  echo -e "${RED}ERROR: Se requiere Node.js v22+. Versión actual: $(node -v)${NC}"
  exit 1
fi

echo "  ✓ Docker: $(docker --version)"
echo "  ✓ Node.js: $(node -v)"

# ----------------------------------------------------------
# 2. Configurar variables de entorno
# ----------------------------------------------------------
echo -e "${YELLOW}[2/6] Configurando variables de entorno...${NC}"

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo -e "${RED}  ⚠  Archivo .env creado. DEBES editar .env con tus contraseñas antes de continuar.${NC}"
  echo "  Abre .env en tu editor y reemplaza todos los valores [CAMBIAR_...]"
  echo ""
  read -p "  ¿Ya editaste el .env? (s/N): " confirm
  if [[ "$confirm" != "s" && "$confirm" != "S" ]]; then
    echo "  Edita el .env y vuelve a ejecutar este script."
    exit 0
  fi
else
  echo "  ✓ .env ya existe"
fi

# ----------------------------------------------------------
# 3. Levantar servicios base
# ----------------------------------------------------------
echo -e "${YELLOW}[3/6] Levantando servicios base (postgres, redis, keycloak, chromadb)...${NC}"
docker compose up -d postgres redis chromadb

echo "  Esperando que postgres esté listo..."
sleep 10
docker compose exec postgres pg_isready -U egis_user -d egis_db && echo "  ✓ PostgreSQL listo"

# ----------------------------------------------------------
# 4. Descargar modelos Ollama
# ----------------------------------------------------------
echo -e "${YELLOW}[4/6] Iniciando Ollama y descargando modelos (puede tomar varios minutos)...${NC}"
docker compose up -d ollama
sleep 5

echo "  Descargando Qwen3:4b (ARIA — chat público)..."
docker compose exec ollama ollama pull qwen3:4b
echo "  ✓ qwen3:4b descargado"

echo "  Descargando Qwen3:14b (Intranet — uso interno)..."
docker compose exec ollama ollama pull qwen3:14b
echo "  ✓ qwen3:14b descargado"

# ----------------------------------------------------------
# 5. Instalar dependencias Node.js
# ----------------------------------------------------------
echo -e "${YELLOW}[5/6] Instalando dependencias del backend...${NC}"

if [ -d "backend" ]; then
  cd backend && npm install && cd ..
  echo "  ✓ Backend dependencies instaladas"
fi

# ----------------------------------------------------------
# 6. Indexar base de conocimiento RAG
# ----------------------------------------------------------
echo -e "${YELLOW}[6/6] Indexando documentos en ChromaDB (RAG)...${NC}"

if [ -f "scripts/index_rag.js" ]; then
  node scripts/index_rag.js
  echo "  ✓ 23 documentos indexados en ChromaDB"
else
  echo "  ⚠  index_rag.js no encontrado — ejecutar manualmente después"
fi

# ----------------------------------------------------------
# Resumen
# ----------------------------------------------------------
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════╗"
echo "║           ✓ Setup completado                      ║"
echo "╠══════════════════════════════════════════════════╣"
echo "║  Intranet:   http://localhost:3000                ║"
echo "║  ARIA:       http://localhost:3002                ║"
echo "║  Backend:    http://localhost:3001                ║"
echo "║  Keycloak:   http://localhost:8080                ║"
echo "║  ChromaDB:   http://localhost:8001                ║"
echo "║  Ollama:     http://localhost:11434               ║"
echo "╠══════════════════════════════════════════════════╣"
echo "║  Próximo paso: bash scripts/start.sh              ║"
echo -e "╚══════════════════════════════════════════════════╝${NC}"
