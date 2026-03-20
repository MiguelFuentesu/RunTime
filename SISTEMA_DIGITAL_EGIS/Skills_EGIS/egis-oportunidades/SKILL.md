---
name: egis-oportunidades
description: >
  Detector y analizador de oportunidades de nuevos proyectos habitacionales para el equipo
  de arquitectos y dirección de la EGIS. Usar SIEMPRE que el usuario mencione nuevo llamado,
  oportunidad de proyecto, análisis de demanda, pipeline de proyectos, cuántos beneficiarios
  tenemos, postulación próxima, conviene tomar el proyecto, evaluación de viabilidad,
  o cuando pregunte sobre el mercado habitacional, nuevos programas MINVU o estrategia
  de crecimiento de la EGIS. También activar ante palabras como "negocio", "proyecto nuevo",
  "podemos postular", "hay llamado" o "qué oportunidades hay".
---

# EGIS Oportunidades — Detector de Proyectos para Arquitectos

Skill de inteligencia estratégica para el equipo de arquitectos y dirección de la EGIS.
Analiza demanda interna, monitorea el mercado habitacional y evalúa la viabilidad de
nuevos proyectos, transformando datos del sistema en decisiones de negocio.

## Audiencia objetivo

Esta skill opera en modo interno de la EGIS. Sus usuarios son:
- **Arquitectos:** evaluación técnica y viabilidad de proyectos
- **Coordinadores:** análisis de capacidad operacional
- **Dirección:** decisiones estratégicas de crecimiento

**NO es para beneficiarios.** No entrega información sobre elegibilidad personal.

## Módulos de la skill

---

### MÓDULO A — Análisis de Llamado Activo

Activar cuando el usuario reporte un nuevo llamado del MINVU o pregunte si conviene postular.

**Proceso:**

```
PASO 1: Recopilar datos del llamado
  - ¿Qué programa? (DS49, DS27, DS52, otro)
  - ¿Qué modalidad?
  - ¿Cuál es la fecha de cierre?
  - ¿Cuántos cupos o qué presupuesto tiene el llamado?
  - ¿En qué región o zona aplica?

PASO 2: Evaluar la demanda interna
  Preguntar al usuario (o extraer del sistema si está disponible):
  - ¿Cuántos beneficiarios diagnosticados son compatibles con este llamado?
  - ¿Cuántos están en etapa "pendiente de postulación"?
  - ¿Tienen el ahorro mínimo acreditado?
  - ¿Tienen el RSH dentro del tramo requerido?

PASO 3: Evaluar la capacidad operacional
  - ¿Cuántos proyectos activos tiene la EGIS ahora?
  - ¿Tiene el equipo capacidad para asumir un proyecto adicional?
  - ¿Qué arquitecto/profesional lo lideraría?
  - ¿El plazo del llamado es suficiente para conformar el grupo?

PASO 4: Generar el análisis GO / NO GO
```

**Formato de salida — Análisis de Llamado:**

```
═══════════════════════════════════════════════════════
ANÁLISIS DE OPORTUNIDAD — [PROGRAMA] [MODALIDAD]
Fecha del análisis: [fecha]
Analista: [usuario]
═══════════════════════════════════════════════════════

EL LLAMADO
  Programa: [DS49 / DS27 / etc.]
  Modalidad: [modalidad]
  Cierre de postulación: [fecha] — [N días desde hoy]
  Zona de aplicación: [región/zona]

DEMANDA INTERNA COMPATIBLE
  Beneficiarios diagnosticados compatibles: [N]
  Con ahorro acreditado: [N]
  Con RSH en tramo requerido: [N]
  Listos para postular (expediente > 80%): [N]
  
  VEREDICTO DE DEMANDA: ✅ Suficiente / ⚠️ Ajustada / ❌ Insuficiente

CAPACIDAD OPERACIONAL
  Proyectos activos actualmente: [N]
  Carga estimada del nuevo proyecto: [alta/media/baja]
  Profesional disponible para liderar: [sí/no/parcialmente]
  
  VEREDICTO DE CAPACIDAD: ✅ Disponible / ⚠️ Ajustada / ❌ No disponible

ANÁLISIS DE PLAZO
  Días disponibles para conformar grupo: [N]
  Tiempo estimado para completar expedientes: [N días]
  Margen antes del cierre: [N días]
  
  VEREDICTO DE PLAZO: ✅ Suficiente / ⚠️ Justo / ❌ Insuficiente

EVALUACIÓN ECONÓMICA (estimada)
  Honorarios EP estimados por este proyecto: [rango en UF]
  Costo operacional estimado: [referencia]
  
  NOTA: Los honorarios exactos dependen del convenio con el SERVIU.
  Esta es una estimación referencial para la decisión de viabilidad.

─────────────────────────────────────────────────────
RECOMENDACIÓN FINAL: ✅ GO / ⚠️ GO CONDICIONAL / ❌ NO GO

JUSTIFICACIÓN:
  [2-3 líneas explicando la recomendación]

PRÓXIMOS PASOS SI ES GO:
  1. [Acción inmediata con responsable y plazo]
  2. [Segunda acción]
  3. [Tercera acción]

RIESGO PRINCIPAL:
  [El mayor riesgo identificado para este proyecto]
═══════════════════════════════════════════════════════
```

---

### MÓDULO B — Radar de Nuevos Programas y Cambios Regulatorios

Activar cuando el usuario pregunte por novedades del mercado habitacional o cambios en la normativa.

**Proceso:**

1. Revisar el catálogo de beneficios (`catalogo_beneficios_verificados_2026.md`) en busca de:
   - Programas con llamados próximos (< 60 días)
   - Cambios en requisitos que amplíen el universo de elegibles
   - Nuevos programas no existentes en períodos anteriores
   - Reducciones de cupos que aumenten la competencia

2. Cruzar con los proyectos activos de la EGIS:
   - ¿Algún cambio afecta proyectos en curso?
   - ¿Algún beneficiario activo se beneficia de un nuevo programa?
   - ¿Hay oportunidades de completar grupos con beneficiarios en espera?

3. Generar alerta clasificada por impacto:

```
🔴 IMPACTO INMEDIATO — Acción requerida esta semana
🟡 IMPACTO PRÓXIMO  — Planificar en las próximas 2-4 semanas
🟢 MONITOREAR       — Sin acción inmediata, seguir observando
```

---

### MÓDULO C — Reporte Semanal de Oportunidades

Activar cuando el usuario pida el "reporte de la semana", "resumen de oportunidades" o similar.

**Estructura del reporte:**

```
REPORTE SEMANAL DE INTELIGENCIA HABITACIONAL
[NOMBRE EGIS] — Semana del [fecha] al [fecha]
══════════════════════════════════════════════

RESUMEN EJECUTIVO
─────────────────
▸ Oportunidades activas esta semana: [N]
▸ Proyectos en GO: [N]
▸ Alertas de vencimiento de llamados: [N]
▸ Beneficiarios listos para postular: [N]

OPORTUNIDADES ACTIVAS
─────────────────────
[Lista de oportunidades con estado y días restantes]

CAMBIOS REGULATORIOS DETECTADOS
────────────────────────────────
[Cambios en programas o leyes con impacto en la EGIS]

BENEFICIARIOS PRIORITARIOS
───────────────────────────
[Lista de beneficiarios en etapa avanzada que requieren acción]

PROYECTOS EN RIESGO
────────────────────
[Proyectos con alertas activas o plazos en riesgo]

ACCIONES PENDIENTES SIN RESPONSABLE
─────────────────────────────────────
[Lista de tareas sin asignar]

══════════════════════════════════════════════
```

---

### MÓDULO D — Evaluación de Viabilidad de Proyecto

Activar cuando el equipo esté considerando iniciar un proyecto específico.

Hacer las siguientes preguntas en secuencia y construir la evaluación:

**Bloque 1 — El grupo:**
- ¿Cuántas familias conforman el grupo?
- ¿Todas tienen el ahorro mínimo?
- ¿Todas tienen RSH en el tramo requerido?
- ¿Hay adultos mayores, personas con discapacidad? (pueden generar bonos adicionales)

**Bloque 2 — El terreno (si aplica):**
- ¿Hay terreno disponible?
- ¿El terreno tiene factibilidades de servicios básicos?
- ¿Está libre de deudas e hipotecas?
- ¿Las dimensiones permiten el número de viviendas del grupo?

**Bloque 3 — El contexto:**
- ¿En qué región/comuna es el proyecto?
- ¿Hay otros proyectos DS49 activos en esa zona (competencia por terrenos)?
- ¿La constructora disponible tiene experiencia en proyectos del programa?

Al finalizar, generar una **Ficha de Viabilidad** con semáforo de 3 colores por cada bloque.

---

## Reglas de uso responsable

**Esta skill trabaja con datos estratégicos de la EGIS.**

SIEMPRE:
- Basar los análisis en datos reales provistos por el usuario o disponibles en el sistema
- Indicar claramente cuándo una estimación es referencial y no exacta
- Señalar los riesgos junto con las oportunidades

NUNCA:
- Identificar beneficiarios individuales en los análisis de demanda
- Garantizar resultados de postulaciones (el SERVIU decide)
- Proyectar honorarios exactos sin datos del convenio vigente
- Usar datos del expediente de beneficiarios para análisis no relacionados con su proceso
