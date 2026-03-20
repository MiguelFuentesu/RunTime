# Motor de Actualización y Sistema de Inteligencia de Oportunidades
## Mantener el Sistema al Día + Alertas Estratégicas para el Equipo de Arquitectos EGIS

---

## Por Qué Este Módulo es Tan Crítico Como la Seguridad

Un sistema de IA con información desactualizada es tan peligroso como uno sin cifrado. La diferencia es que el error de seguridad lo detectas rápido. El error de información desactualizada puede pasar meses sin detectarse, mientras el sistema orienta mal a docenas de beneficiarios.

**Escenario real de riesgo:**
El MINVU cambia la fecha de cierre del llamado DS49 de julio a junio. El sistema sigue informando "julio" durante semanas. Una familia adulta mayor no postula porque confió en la fecha de la IA. Pierde el llamado. Ese error tiene nombre y apellido.

El objetivo de este módulo es que eso sea estructuralmente imposible.

---

## PARTE 1 — Motor de Actualización del RAG

### Arquitectura del Proceso de Actualización

```
DETECCIÓN DE CAMBIO
       │
       ├─► Automática (monitoreo web scraping)
       └─► Manual (alerta del equipo / usuario)
              │
              ▼
       VERIFICACIÓN EN FUENTE PRIMARIA
       (MINVU.cl, ChileAtiende.cl, BCN.cl)
              │
              ▼
       VALIDACIÓN POR RESPONSABLE
       (Coordinador EGIS aprueba el cambio)
              │
              ▼
       ACTUALIZACIÓN DEL DOCUMENTO
       (en la base de conocimiento del RAG)
              │
              ▼
       RE-INDEXACIÓN AUTOMÁTICA
       (el sistema vectorial se actualiza)
              │
              ▼
       PRUEBA DE VERIFICACIÓN
       (3 preguntas sobre el tema actualizado)
              │
              ▼
       REGISTRO EN LOG DE CAMBIOS
       + notificación al equipo
```

---

### Sistema de Monitoreo Automático de Fuentes

El sistema debe monitorear automáticamente las siguientes URLs y alertar ante cambios en su contenido:

```python
# Configuración del monitor de fuentes — ejecutar diariamente

FUENTES_CRITICAS = [
    {
        "nombre": "MINVU — Calendario Subsidios",
        "url": "https://www.minvu.gob.cl",
        "keywords_alerta": ["llamado", "subsidio", "DS49", "DS1", "DS27", "DS52", "plazo", "postulación"],
        "frecuencia": "diaria",
        "responsable": "Coordinador EGIS",
        "prioridad": "CRÍTICA"
    },
    {
        "nombre": "ChileAtiende — PGU",
        "url": "https://www.chileatiende.gob.cl",
        "keywords_alerta": ["PGU", "pensión", "monto", "requisito", "plazo"],
        "frecuencia": "semanal",
        "responsable": "Asistente Social",
        "prioridad": "ALTA"
    },
    {
        "nombre": "Diario Oficial — Decretos MINVU",
        "url": "https://www.diariooficial.interior.gob.cl",
        "keywords_alerta": ["Ministerio de Vivienda", "decreto supremo", "subsidio", "habitacional"],
        "frecuencia": "diaria",
        "responsable": "Coordinador EGIS",
        "prioridad": "CRÍTICA"
    },
    {
        "nombre": "BCN — Nuevas Leyes",
        "url": "https://www.bcn.cl/leychile",
        "keywords_alerta": ["adulto mayor", "vivienda", "subsidio", "SENAMA", "habitacional"],
        "frecuencia": "semanal",
        "responsable": "Asesor Legal",
        "prioridad": "ALTA"
    },
    {
        "nombre": "SENAMA — Programas",
        "url": "http://www.senama.gob.cl/programas-y-beneficios",
        "keywords_alerta": ["programa", "beneficio", "fondo", "postulación"],
        "frecuencia": "mensual",
        "responsable": "Asistente Social",
        "prioridad": "MEDIA"
    },
    {
        "nombre": "ANCI — Ciberseguridad",
        "url": "https://www.anci.gob.cl",
        "keywords_alerta": ["obligación", "reglamento", "circular", "resolución"],
        "frecuencia": "mensual",
        "responsable": "Admin TI",
        "prioridad": "ALTA"
    }
]
```

**Cuando el monitor detecta un cambio:**
1. Genera una alerta en el panel del sistema con nivel de prioridad
2. Envía notificación por correo al responsable asignado
3. El documento afectado queda marcado como "PENDIENTE VERIFICACIÓN" en el RAG
4. La IA, ante preguntas sobre ese tema, añade automáticamente: "Esta información está siendo verificada. Por favor confirme en [fuente oficial]."

---

### Tabla de Frecuencias de Actualización por Documento

| Documento | Frecuencia obligatoria | Evento que activa revisión urgente |
|-----------|----------------------|-----------------------------------|
| Calendario de llamados MINVU | Mensual + ante cualquier publicación MINVU | Apertura o cierre de llamado |
| Requisitos DS49/DS1/DS27/DS52 | Trimestral | Nuevo decreto supremo MINVU |
| Montos de subsidios (UF) | Trimestral | Cambio en valor UF significativo |
| PGU y beneficios previsionales | Trimestral | Publicación en Diario Oficial |
| Contactos y teléfonos de organismos | Semestral | Cualquier cambio detectado |
| Marco legal (leyes, decretos) | Ante publicación en Diario Oficial | Publicación de nueva ley |
| Glosario de términos MINVU | Anual | Cambio en nomenclatura oficial |

---

### Log de Cambios de la Base de Conocimiento (Obligatorio)

Cada actualización debe registrarse en este log. Es evidencia de que el sistema se mantiene actualizado y protege a la EGIS ante reclamos por información incorrecta.

| # | Fecha | Documento | Qué cambió | Fuente | Responsable | Verificado |
|---|-------|-----------|-----------|--------|-------------|-----------|
| 001 | | | | | | ☐ |
| 002 | | | | | | ☐ |

**Regla:** Ninguna actualización se sube al RAG sin estar registrada en este log con fuente verificable.

---

### Protocolo ante Información Desactualizada Detectada por un Usuario

Si un beneficiario o funcionario reporta que la IA entregó información incorrecta:

```
PASO 1 (inmediato): Registrar el reporte con fecha, usuario y dato incorrecto
PASO 2 (< 2 horas): Verificar en la fuente oficial si el dato es efectivamente incorrecto
PASO 3 (< 4 horas): Si es incorrecto → actualizar el RAG inmediatamente
PASO 4 (< 24 horas): Contactar al usuario que recibió la información incorrecta
                      para entregarle la información correcta
PASO 5 (< 48 horas): Analizar cómo ingresó el error → mejorar el proceso
PASO 6: Registrar en el log de cambios con categoría "CORRECCIÓN DE ERROR"
```

Este protocolo no es opcional. Si la información incorrecta causó un perjuicio al beneficiario, la EGIS puede ser responsable — y tener este log documentado demuestra diligencia.

---

## PARTE 2 — Sistema de Inteligencia de Oportunidades para el Equipo de Arquitectos

### El Doble Rol del Sistema: Informar al Usuario Y Detectar Oportunidades

El sistema tiene dos flujos de información que corren en paralelo:

```
FLUJO 1 → USUARIO (beneficiario / adulto mayor)
Pregunta: "¿Qué beneficio me corresponde?"
Respuesta: Orientación personalizada con información verificada

FLUJO 2 → EQUIPO EGIS (arquitectos y coordinadores)
Dato: "Se detectaron 15 consultas sobre DS49 modalidad construcción en sitio propio en la Región del Maule esta semana"
Alerta: "Oportunidad de proyecto habitacional: hay demanda activa en esa zona y modalidad"
```

El equipo de arquitectos ve cosas que el beneficiario no ve: **patrones de demanda** que se traducen en proyectos.

---

### Panel Interno de Inteligencia de Oportunidades

Este panel es visible solo para coordinadores y arquitectos de la EGIS (no para beneficiarios). Muestra:

#### Módulo 1 — Mapa de Demanda por Programa y Zona

```
ANÁLISIS DE CONSULTAS (últimos 30 días)
┌─────────────────────────────────────────────────────────┐
│ PROGRAMA    │ CONSULTAS │ REGIÓN MÁS ACTIVA │ TENDENCIA │
├─────────────┼───────────┼───────────────────┼───────────┤
│ DS49 Const. │    87     │ Maule             │   ↑ +34%  │
│ DS49 Compra │    43     │ Biobío            │   → 0%    │
│ DS27 Amplia.│    61     │ Valparaíso        │   ↑ +12%  │
│ DS52 Arrend.│    29     │ RM                │   ↓ -5%   │
│ DS10 Rural  │    18     │ Araucanía         │   ↑ +22%  │
└─────────────┴───────────┴───────────────────┴───────────┘
Nota: Datos anonimizados — no identifican a beneficiarios individuales
```

#### Módulo 2 — Alertas de Nuevos Llamados (Oportunidades Activas)

El sistema monitorea el calendario del MINVU y genera alertas automáticas cuando se abre un llamado:

```
⚡ ALERTA DE OPORTUNIDAD — 15 de Marzo 2026
────────────────────────────────────────────
PROGRAMA: DS27 — Mejoramiento de Vivienda
ESTADO: Llamado abierto — Postulaciones hasta el 30 de mayo
TRAMO: Eficiencia energética (acondicionamiento térmico)
VENTANA DE ACCIÓN: 45 días para conformar grupos
ZONA DE MAYOR DEMANDA REGISTRADA: Región de Valparaíso (61 consultas / 30 días)
ACCIÓN SUGERIDA: Contactar a beneficiarios con consultas previas sobre DS27
                 en Valparaíso y Región del Maule para conformar grupos
RESPONSABLE: [Arquitecto asignado]
ESTADO: ☐ En revisión ☐ En gestión ✅ Descartado
```

#### Módulo 3 — Radar de Nuevos Programas y Cambios Legislativos

Esta sección alerta al equipo sobre cambios con potencial impacto en el pipeline de proyectos:

```
📋 CAMBIOS CON IMPACTO EN PROYECTOS (últimos 90 días)
────────────────────────────────────────────────────────
[ALTA PRIORIDAD]
▶ Plan Emergencia Habitacional prorrogado hasta diciembre 2029
  → Ventana de proyectos de reconstrucción extendida 4 años
  → Acción: Evaluar capacidad para tomar proyectos adicionales en zonas afectadas

[MEDIA PRIORIDAD]
▶ Llamado especial DS52 para adultos mayores — agosto 2026
  → Nuestros beneficiarios actuales pueden postular
  → Acción: Notificar proactivamente a beneficiarios elegibles antes de junio

[MONITOREAR]
▶ DS49 con reducción de cupos proyectada en 2026
  → Puede aumentar la competencia por los cupos disponibles
  → Acción: Priorizar postulaciones con mayor puntaje RSH y expedientes completos
```

---

### Tipos de Oportunidades que el Sistema Detecta Automáticamente

| Tipo | Descripción | Fuente del dato |
|------|-------------|-----------------|
| **Demanda latente** | Muchas consultas sobre un programa con llamado próximo en una región | Log de consultas del chat IA (anonimizado) |
| **Ventana de llamado** | Apertura de un proceso de postulación con plazo corto | Monitor de MINVU.cl |
| **Nuevo programa** | Publicación de un nuevo DS o modificación de uno existente | Monitor de Diario Oficial |
| **Zona de catástrofe** | Declaración de zona de emergencia o catástrofe | Monitor de SENAPRED.cl |
| **Cambio de requisitos** | Modificación en los requisitos de un programa (puede ampliar elegibles) | Monitor de MINVU.cl |
| **Presupuesto asignado** | Ley de Presupuesto con nuevos recursos para vivienda social | Monitor de BCN.cl y Dipres.cl |

---

### Reglas de Privacidad del Módulo de Inteligencia

Este módulo trabaja con datos del sistema, por lo que aplican reglas estrictas:

**Lo que el módulo PUEDE hacer:**
- Contar y clasificar consultas por tema y región (datos estadísticos agregados)
- Mostrar tendencias de demanda sin identificar personas
- Alertar sobre cambios en programas o nuevos llamados
- Cruzar demanda detectada con disponibilidad de llamados

**Lo que el módulo NO PUEDE hacer:**
- Identificar qué beneficiario consultó qué cosa
- Usar datos del expediente individual para análisis de oportunidades
- Exportar listados de beneficiarios por programa o zona
- Correlacionar consultas del chat con datos del expediente

**Base legal:** Ley 21.719 — los datos del chat se recopilaron para orientar al beneficiario, no para análisis comercial de la EGIS. El análisis estadístico agregado es compatible con ese fin; la identificación individual no lo es.

---

### Flujo de Trabajo del Equipo de Arquitectos con el Sistema

```
LUNES (inicio de semana)
├── Revisar Panel de Inteligencia de Oportunidades
├── Ver alertas activas de nuevos llamados
└── Asignar responsable por cada alerta activa

DURANTE LA SEMANA
├── El sistema actualiza automáticamente el mapa de demanda
├── Las alertas urgentes se notifican por correo inmediatamente
└── El equipo puede marcar alertas como "en gestión" o "descartado"

VIERNES (cierre de semana)
├── Revisar log de actualizaciones del RAG (¿hay cambios pendientes?)
├── Verificar que las alertas activas tienen responsable asignado
└── Exportar reporte semanal de oportunidades para la dirección de la EGIS
```

---

### Plantilla de Reporte Semanal de Oportunidades

Este reporte se genera automáticamente y se envía a la dirección de la EGIS cada viernes:

```
REPORTE SEMANAL DE INTELIGENCIA HABITACIONAL
Semana del [fecha] al [fecha]
Sistema Digital EGIS — [NOMBRE EGIS]
════════════════════════════════════════════

RESUMEN EJECUTIVO
─────────────────
Consultas recibidas esta semana: [N]
Nuevas alertas de oportunidad generadas: [N]
Alertas activas en gestión: [N]
Actualizaciones del RAG realizadas: [N]

OPORTUNIDADES ACTIVAS
─────────────────────
[Lista de oportunidades con estado]

CAMBIOS EN EL MARCO REGULATORIO
─────────────────────────────────
[Cambios detectados en leyes, decretos o programas]

INDICADORES DE DEMANDA
───────────────────────
[Top 3 programas más consultados esta semana]
[Región con mayor actividad de consultas]

ACCIONES PENDIENTES
────────────────────
[Lista de acciones sin responsable asignado]

════════════════════════════════════════════
Generado automáticamente por el Sistema Digital EGIS
```

---

*Versión 1.0 — Marzo 2026*
*Este módulo combina gestión del conocimiento (RAG) con inteligencia de negocio para la EGIS*
*Revisar las fuentes monitoreadas ante cambios en la estructura de los sitios web oficiales*
