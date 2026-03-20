---
name: egis-expediente-checker
description: >
  Verificador automático de completitud y validez de expedientes habitacionales EGIS.
  Usar SIEMPRE que el usuario mencione expediente, beneficiario, documentos de postulación,
  checklist SERVIU, DS49, DS27, DS52 o cualquier programa habitacional MINVU.
  También activar cuando el usuario diga "revisar documentos", "qué falta", "está completo",
  "observaciones SERVIU", "listo para ingresar", "subsanar" o "verificar".
  Genera checklists dinámicos, detecta documentos vencidos, alerta sobre plazos críticos
  y prepara informes de completitud listos para el equipo de la EGIS.
---

# EGIS Expediente Checker

Skill para verificar la completitud, vigencia y coherencia de expedientes habitacionales
de la EGIS, según los requisitos del MINVU (D.S. N°49, N°27, N°52 y otros).

## Lo que hace esta skill

1. Recibe la lista de documentos disponibles en el expediente
2. Cruza contra el checklist oficial del programa correspondiente
3. Detecta documentos faltantes, vencidos o con observaciones
4. Calcula el porcentaje de completitud
5. Genera un informe de estado con prioridad de acciones
6. Alerta sobre plazos críticos próximos

## Proceso de trabajo

### PASO 1 — Identificar el programa y modalidad

Antes de cualquier verificación, preguntar:
- **¿Qué programa habitacional?** DS49 / DS27 / DS52 / DS10 / DS1
- **¿Qué modalidad?** (para DS49: construcción en terreno nuevo / sitio propio / densificación / pequeño condominio)
- **¿Cuántos beneficiarios/familias?**

Luego cargar el checklist correspondiente desde `references/checklists_programas.md`.

### PASO 2 — Recibir el inventario de documentos

El usuario puede entregar el inventario de una de estas formas:
- Lista de texto de documentos disponibles
- Tabla con nombre, fecha de emisión y fecha de vencimiento
- Descripción verbal ("tenemos la cédula pero no el RSH")

Si la información está incompleta, hacer preguntas específicas por bloque:
expediente social → expediente legal → expediente técnico.

### PASO 3 — Análisis de completitud

Para cada documento del checklist oficial:

```
ESTADO:
✅ PRESENTE Y VIGENTE     → sin acción requerida
⏳ PRÓXIMO A VENCER       → alerta (< 60 días)
🔴 VENCIDO                → acción urgente
❌ FALTANTE               → solicitar al beneficiario
⚠️  CON OBSERVACIÓN       → requiere revisión o reemplazo
```

Reglas de vigencia a aplicar:
- Cédula de identidad: verificar fecha de vencimiento
- Certificado RSH: máximo 90 días de antigüedad al momento de ingreso al SERVIU
- Cartola de ahorro: máximo 30 días (SERVIU puede observar si tiene más)
- Certificados de factibilidad de servicios básicos: máximo 6 meses
- Certificados de dominio (CBR): máximo 60 días

### PASO 4 — Calcular completitud

```
Completitud (%) = (documentos presentes y vigentes / total requeridos) × 100

Niveles:
0-49%   → 🔴 CRÍTICO — no apto para ingreso
50-74%  → 🟡 EN PROCESO — continuar gestión
75-89%  → 🟠 CASI LISTO — falta poco
90-99%  → 🟢 PRÓXIMO A INGRESAR — resolver pendientes
100%    → ✅ LISTO PARA INGRESO AL SERVIU
```

### PASO 5 — Generar el informe

Usar esta estructura de salida siempre:

```
════════════════════════════════════════════════════
INFORME DE EXPEDIENTE — [NOMBRE/ID BENEFICIARIO]
Programa: [DS49/DS27/etc.] | Modalidad: [modalidad]
Fecha de revisión: [fecha actual]
════════════════════════════════════════════════════

COMPLETITUD GENERAL: XX% [barra visual ████░░░]

EXPEDIENTE SOCIAL
  ✅ [documento] — vigente hasta [fecha]
  ❌ [documento] — FALTANTE
  🔴 [documento] — VENCIDO el [fecha]

EXPEDIENTE LEGAL
  [estado de cada documento]

EXPEDIENTE TÉCNICO
  [estado de cada documento]

────────────────────────────────────────────────────
ACCIONES PRIORITARIAS (ordenadas por urgencia):
  1. [Acción más urgente] — Plazo: [días]
  2. [Segunda acción]
  3. [Tercera acción]

PRÓXIMOS VENCIMIENTOS:
  ⚠️ RSH vence en 23 días (15-04-2026)
  ⚠️ Cartola de ahorro tiene 28 días — pronto fuera de plazo SERVIU

OBSERVACIÓN FINAL:
  [Evaluación general + recomendación de próximo paso]
════════════════════════════════════════════════════
```

### PASO 6 — Alertas especiales

Generar alerta adicional si:
- Hay documentos de adultos mayores (indicar si requieren adaptaciones especiales en el DS49)
- El plazo del llamado activo está próximo (< 30 días) y el expediente no está completo
- Hay más de 3 documentos vencidos simultáneamente (riesgo de retraso grave)
- El certificado RSH tiene tramo que podría no calificar para el programa (advertir sin certificar)

## Reglas críticas de esta skill

**NUNCA:**
- Certificar que un beneficiario "califica" para el subsidio — solo el SERVIU puede hacerlo
- Inventar requisitos que no estén en el checklist verificado
- Dar fechas exactas de llamados sin verificar en la base de conocimiento actualizada

**SIEMPRE:**
- Basar el checklist en el documento oficial del programa cargado en `references/`
- Indicar la fuente cuando se cita un requisito ("según D.S. N°49, Art. X")
- Recomendar verificar en el SERVIU regional ante cualquier duda

## Referencias

Ver `references/checklists_programas.md` para los checklists completos por programa.
Ver `references/plazos_vigencia.md` para las reglas de vencimiento de cada documento.
