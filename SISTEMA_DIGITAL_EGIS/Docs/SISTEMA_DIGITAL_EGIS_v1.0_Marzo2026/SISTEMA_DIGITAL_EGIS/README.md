# 🏗️ Sistema Digital EGIS — Proyecto Completo
## Bases Legales, Seguridad, Arquitectura, IA y Herramientas

> **Proyecto:** Plataforma digital integral para Entidad Patrocinante (EP) acreditada MINVU
> **País:** Chile | **Marco legal:** Ley 21.719, Ley 21.663, D.S. N°49/27 MINVU
> **Versión:** 1.0 — Marzo 2026
> **Repositorio GitHub:** github.com/MiguelFuentesu/Bases_legales_datos

---

## 📦 Contenido de este archivo

```
SISTEMA_DIGITAL_EGIS/
│
├── README.md                          ← Este archivo — leer primero
├── PROMPT_MAESTRO_EGIS.md             ← Cargar en Claude Code al iniciar sesión
│
├── Bases_legales_datos/               ← 23 documentos del repositorio
│   ├── 01_Marco_Legal/                (6 archivos)
│   ├── 02_Seguridad_Informacion/      (3 archivos)
│   ├── 03_Arquitectura_Sistema/       (3 archivos)
│   ├── 04_Chat_IA/                    (3 archivos)
│   ├── 05_Beneficios_Sociales/        (2 archivos)
│   └── 06_Cumplimiento_y_Documentos/  (5 archivos)
│
└── Skills_EGIS/                       ← 5 skills para Claude Code
    ├── egis-expediente-checker.skill
    ├── egis-rag-updater.skill
    ├── egis-oportunidades.skill
    ├── egis-visita-terreno.skill
    └── egis-comunicaciones.skill
```

---

## 🚀 Cómo usar este paquete

### 1. Subir el repositorio a GitHub
```bash
cd Bases_legales_datos/
git init
git remote add origin https://github.com/MiguelFuentesu/Bases_legales_datos.git
git add .
git commit -m "Proyecto completo Sistema Digital EGIS v1.0"
git push -u origin main
```

### 2. Instalar las skills en Claude Code
```bash
cd Skills_EGIS/
claude skill install egis-expediente-checker.skill
claude skill install egis-rag-updater.skill
claude skill install egis-oportunidades.skill
claude skill install egis-visita-terreno.skill
claude skill install egis-comunicaciones.skill
claude skill list  # verificar instalación
```

### 3. Iniciar sesión de trabajo en Claude Code
```
/load PROMPT_MAESTRO_EGIS.md
```
O copiar y pegar el contenido del PROMPT_MAESTRO_EGIS.md al primer mensaje.

---

## 📋 Resumen del Proyecto

### Qué es el Sistema Digital EGIS

Una plataforma de dos componentes que transforma digitalmente la operación
de una Entidad Patrocinante (EP) acreditada ante el MINVU:

**Chat IA Público (ARIA):**
Asistente virtual para beneficiarios (adultos mayores). Orientación habitacional
y social con cero improvisación — funciona solo con información verificada via RAG.
Modelo: Claude Haiku 4.5 (Anthropic) con DPA firmado.

**Intranet de Gestión Interna:**
Sistema completo para el equipo EGIS: expedientes, visitas en terreno,
seguimiento de proyectos, comunicaciones y módulo de inteligencia de
oportunidades para arquitectos.
Seguridad: Zero Trust Architecture + ISO 27001:2022.
Modelo interno: Qwen3-14B auto-hospedado (datos nunca salen de Chile).

---

## 📁 Detalle de cada módulo

### 01_Marco_Legal — 6 documentos

| Archivo | Contenido |
|---------|-----------|
| `00_mapa_legal_completo.md` | **LEER PRIMERO.** Las 6 capas legales, tabla de 11 leyes, líneas rojas absolutas |
| `marco_especifico_egis.md` | Marco MINVU + doble obligación legal + responsabilidad ante SERVIU |
| `ley_21719_proteccion_datos.md` | Principios, consentimiento, ARCO+, DPA Anthropic, sanciones |
| `ley_21663_ciberseguridad.md` | ANCI, SGSI obligatorio, reporte brechas 72h |
| `ley_19828_senama_adultos_mayores.md` | Derechos adultos mayores, principios de diseño obligatorios |
| `ley_19496_consumidor.md` | Ley consumidor + firma electrónica + delitos informáticos |

### 02_Seguridad_Informacion — 3 documentos

| Archivo | Contenido |
|---------|-----------|
| `sgsi_iso27001.md` | SGSI completo: inventario de 12 activos, matriz de riesgos, ciclo PDCA, KPIs |
| `estandares_tecnicos_seguridad.md` | Cifrado AES-256/TLS 1.3/Argon2id, OWASP Top 10:2025, infraestructura en capas |
| `plan_auditoria.md` | Auditoría continua + mensual + semestral + pentest anual, escala de madurez |

### 03_Arquitectura_Sistema — 3 documentos

| Archivo | Contenido |
|---------|-----------|
| `arquitectura_datos_separacion_legal.md` | Frontera crítica expediente/IA, RBAC 9 roles, retención de datos |
| `intranet_seguridad_auditoria.md` | Zero Trust 5 capas, 25 eventos auditados, onboarding/offboarding |
| `flujos_trabajo_egis.md` | 6 macroprocesos completos con soporte IA en cada etapa |

### 04_Chat_IA — 3 documentos

| Archivo | Contenido |
|---------|-----------|
| `control_absoluto_ia.md` | 5 capas de control, system prompt completo, RAG, 10 tests certificación |
| `limites_legales_ia.md` | 6 categorías de prohibiciones con base legal, disclaimers obligatorios |
| `seleccion_modelo_ia.md` | Por qué Claude Haiku + Qwen3, por qué NO DeepSeek, ruta de implementación |

### 05_Beneficios_Sociales — 2 documentos

| Archivo | Contenido |
|---------|-----------|
| `catalogo_beneficios_verificados_2026.md` | 7 bloques: DS49/DS1/DS27/DS52/DS10, PGU, SENAMA, RSH — verificado marzo 2026 |
| `motor_actualizacion_e_inteligencia.md` | Monitor automático 6 fuentes, protocolo de actualización, panel de oportunidades |

### 06_Cumplimiento_y_Documentos — 5 documentos

| Archivo | Contenido |
|---------|-----------|
| `eipd_evaluacion_impacto.md` | EIPD completa: 9 partes, matriz 10 riesgos, medidas, firmas obligatorias |
| `terminos_y_condiciones.md` | 12 cláusulas incluyendo gratuidad del servicio y limitación de responsabilidad |
| `plantilla_politica_privacidad.md` | Política completa con todos los campos Ley 21.719 |
| `registro_actividades_tratamiento.md` | 5 tratamientos documentados + registro de encargados (Anthropic, hosting) |
| `checklist_legal_prelanzamiento.md` | 40+ ítems en 6 bloques con campo de evidencia y firma de conformidad |

---

## 🛠️ Skills para Claude Code — 5 herramientas

| Skill | Activa con... | Qué genera |
|-------|--------------|------------|
| `egis-expediente-checker` | "expediente", "documentos", "SERVIU" | Checklist de completitud con % y alertas de vencimiento |
| `egis-rag-updater` | "actualizar", "nuevo decreto", "cambió" | Ficha de actualización verificada + protocolo de cambio |
| `egis-oportunidades` | "llamado", "proyecto", "viabilidad" | Análisis GO/NO GO + reporte semanal de oportunidades |
| `egis-visita-terreno` | "visita", "obra", "inspección" | Informe técnico estructurado + acta de entrega |
| `egis-comunicaciones` | "carta", "notifica", "oficio" | Comunicaciones profesionales adaptadas al destinatario |

---

## ⚠️ Advertencias Importantes

1. **Revisión legal obligatoria:** Los documentos de cumplimiento (EIPD, T&C, Política de
   Privacidad) son borradores base. Deben ser revisados y firmados por un abogado
   especializado en protección de datos antes de su uso oficial.

2. **Actualización periódica:** El catálogo de beneficios requiere revisión mensual.
   Los programas habitacionales del MINVU cambian con frecuencia.

3. **DPA con Anthropic:** Debe firmarse antes de procesar cualquier dato de beneficiarios
   a través de la API de Claude. Disponible en: anthropic.com/legal/data-processing-addendum

4. **La IA nunca certifica elegibilidad:** Solo el SERVIU puede determinar si un
   beneficiario califica para un subsidio.

---

*Sistema Digital EGIS — Proyecto completo v1.0 — Marzo 2026*
*Desarrollado con Claude (Anthropic) — github.com/MiguelFuentesu/Bases_legales_datos*
