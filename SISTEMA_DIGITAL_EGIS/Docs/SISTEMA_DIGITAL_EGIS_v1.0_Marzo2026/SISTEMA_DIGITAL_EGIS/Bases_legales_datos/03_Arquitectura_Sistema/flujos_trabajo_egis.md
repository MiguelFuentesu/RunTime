# Flujos de Trabajo del Sistema Interno EGIS
## Mapa Completo de Procesos con Soporte de IA

> Este documento mapea todos los flujos de trabajo de la EGIS desde el primer
> contacto con el beneficiario hasta la entrega de la vivienda, definiendo
> en cada etapa qué hace el sistema, qué hace la IA y qué hace el equipo humano.

---

## El Proceso EGIS: Visión Global

La EGIS desarrolla un rol integral que va desde la formación de grupos hábiles, creación del proyecto, postulación a los subsidios, ejecutar las obras, y acompañar a las familias durante el proceso de construcción, hasta la entrega de las viviendas y su respectiva inscripción en el Conservador de Bienes Raíces.

Esto se traduce en **6 macroprocesos** que el sistema debe soportar:

```
MACROPROCESO 1      MACROPROCESO 2      MACROPROCESO 3
Captación y         Conformación del    Elaboración del
Diagnóstico    →    Grupo / Proyecto  → Expediente
─────────────────────────────────────────────────────
MACROPROCESO 4      MACROPROCESO 5      MACROPROCESO 6
Postulación y       Ejecución de        Entrega y
SERVIU         →    Obras          →    Cierre
```

Cada macroproceso tiene módulos específicos en el sistema, con flujos de trabajo, roles involucrados, documentos requeridos y puntos de apoyo de la IA.

---

## MACROPROCESO 1 — Captación y Diagnóstico

### Flujo 1.1 — Contacto desde el Chat IA Público

```
[Beneficiario habla con ARIA (chat público)]
         │
         ▼
[ARIA orienta y, con consentimiento, registra interés]
         │
         ▼ Si el beneficiario consiente ser contactado
[Sistema crea LEAD en la intranet]
  - Nombre (si lo entregó)
  - Tipo de necesidad habitacional detectada
  - Programa(s) potencialmente aplicables
  - Fecha y resumen de la conversación
  - Estado: PENDIENTE CONTACTO
         │
         ▼
[Alerta automática → Asistente Social (R03) asignado]
  "Nuevo potencial beneficiario — responder en 48h"
         │
         ▼
[AS-001 revisa el lead y agenda primera llamada/visita]
```

**Soporte IA en este flujo:**
- La IA del chat clasifica automáticamente el tipo de necesidad (nueva vivienda, mejora, ampliación, arriendo)
- El sistema sugiere al AS el programa más probable según los datos del lead
- Si hay llamado activo compatible con el perfil → alerta de urgencia de plazo

---

### Flujo 1.2 — Diagnóstico Social del Beneficiario

```
[Primera entrevista: presencial o telefónica]
         │
         ▼
[AS ingresa ficha de diagnóstico en el sistema]
  DATOS BÁSICOS:
  - Nombre completo, RUT, fecha de nacimiento
  - Dirección actual, tipo de vivienda actual
  - Composición grupo familiar
  - Situación de tenencia (arrendatario, allegado, sitio propio, otro)
  
  DATOS HABITACIONALES:
  - Tipo de solución que necesita
  - Ubicación deseada (si aplica)
  - Situación de ahorro
  
  DATOS RSH (el beneficiario los aporta voluntariamente):
  - Tramo RSH (no el puntaje exacto — solo el tramo)
  - Beneficios vigentes que recibe
         │
         ▼
[IA INTERNA ANALIZA EL PERFIL]
  Genera sugerencia de elegibilidad preliminar:
  "Perfil compatible con DS49 modalidad sitio propio
   y DS27 línea reparación. Verificar ahorro mínimo."
  
  ⚠️ La IA sugiere — el AS decide y valida
         │
         ▼
[AS valida la sugerencia y registra el programa objetivo]
[Estado del lead: DIAGNOSTICADO]
```

**Documentos que el sistema genera automáticamente:**
- Ficha de diagnóstico en formato PDF con todos los datos ingresados
- Lista de documentos que el beneficiario debe reunir (según programa objetivo)
- Carta de bienvenida al proceso EGIS (plantilla personalizable)

---

## MACROPROCESO 2 — Conformación del Grupo / Proyecto

### Flujo 2.1 — Conformación de Comité Habitacional

```
[Coordinador (R02) define criterios del grupo]
  - Programa objetivo (DS49, DS27, etc.)
  - Modalidad (construcción, sitio propio, mejora)
  - Zona geográfica
  - Tamaño del grupo (10-160 familias para DS49 estándar)
         │
         ▼
[Sistema muestra beneficiarios diagnosticados compatibles]
  Panel de conformación de grupo:
  - Filtro por programa compatible
  - Filtro por zona
  - Filtro por estado del proceso
  - Indicador de "urgencia" (beneficiarios con plazo próximo)
         │
         ▼
[Coordinador selecciona y asigna beneficiarios al grupo]
         │
         ▼
[Sistema genera automáticamente:]
  - Lista del comité con datos básicos
  - Verificación de que no hay duplicados entre grupos
  - Alerta si algún miembro no tiene todos los documentos base
```

### Flujo 2.2 — Gestión de Oportunidades de Proyecto (Módulo Arquitectos)

```
[Sistema detecta llamado activo en MINVU (monitor automático)]
         │
         ▼
[Alerta en Panel de Inteligencia → R01, R02, R04]
  "Llamado DS49 abierto — cierre en 45 días
   Demanda detectada en sistema: 23 beneficiarios compatibles
   Zona con mayor concentración: [región]"
         │
         ▼
[Arquitecto (R04) evalúa viabilidad del proyecto]
  Módulo de análisis de proyecto:
  - Número de beneficiarios disponibles
  - Terrenos potenciales (si aplica)
  - Presupuesto estimado (plantilla base)
  - Plazo estimado vs. plazo del llamado
         │
         ▼
[IA INTERNA genera borrador de ficha técnica del proyecto]
  Basada en:
  - Datos del llamado del MINVU
  - Perfil del grupo (composición familiar promedio)
  - Requisitos del decreto aplicable
  
  ⚠️ El arquitecto revisa, ajusta y valida
         │
         ▼
[Decisión: GO / NO GO del proyecto]
[Si GO → Estado: PROYECTO EN DESARROLLO]
```

---

## MACROPROCESO 3 — Elaboración del Expediente

### Flujo 3.1 — Módulo de Verificación de Documentos con IA

Este es uno de los flujos más innovadores del sistema. La elaboración del expediente social abarca el registro de demandantes, acreditación de ahorros y las planillas de postulación del SERVIU. El expediente legal comprende el documento de contrato, acta de factibilidad de servicios básicos y el acuerdo de asistencia técnica.

```
[AS o Administrativo escanea documento del beneficiario]
         │
         ▼
[Sistema recibe la imagen del documento]
         │
         ▼
[IA INTERNA analiza el documento] — Qwen3 local
  VERIFICACIONES AUTOMÁTICAS:
  ✅ ¿El tipo de documento es el correcto para esta etapa?
  ✅ ¿El nombre coincide con el beneficiario del expediente?
  ✅ ¿El RUT del documento coincide con el registrado?
  ✅ ¿El documento está vigente (fechas de emisión/vencimiento)?
  ✅ ¿La imagen es legible o está borrosa?
  ✅ ¿Hay indicios de alteración digital?
         │
    ┌────┴────┐
    ▼         ▼
[✅ OK]   [⚠️ OBSERVACIÓN]
    │         │
    │         ▼
    │    [Alerta al responsable con detalle:]
    │    "Cédula de identidad: fecha de vencimiento
    │     2024-03-15 — documento VENCIDO.
    │     Solicitar documento vigente al beneficiario."
    ▼
[Documento ingresa al expediente digital]
[Log de auditoría: quién subió, cuándo, qué verificó la IA]
```

**Tipos de documentos que el sistema puede verificar:**

| Documento | Verificaciones automáticas |
|-----------|--------------------------|
| Cédula de identidad | Vigencia, legibilidad, nombre vs. expediente |
| Certificado RSH | Nombre, RUT, tramo, fecha de emisión |
| Cartola de ahorro | Nombre, monto, institución, fecha |
| Certificado de nacimiento | Nombres, RUT, vigencia |
| Certificado de matrimonio/unión | Nombres, vigencia |
| Certificado de dominio (sitio propio) | Nombre del propietario, dirección, vigencia |
| Factibilidad de servicios básicos | Dirección, organismo emisor, vigencia |

---

### Flujo 3.2 — Control de Completitud del Expediente

```
[Sistema mantiene checklist dinámico por expediente]

EXPEDIENTE: Familia [ID] — Proyecto [ID]
════════════════════════════════════════
EXPEDIENTE SOCIAL
  ✅ Ficha de diagnóstico completada
  ✅ Cédula de identidad titular
  ✅ Cédulas grupo familiar
  ⚠️ Certificado RSH (PENDIENTE — vence en 30 días)
  ❌ Cartola de ahorro (FALTANTE)
  ✅ Certificado de nacimiento hijos menores

EXPEDIENTE LEGAL
  ❌ Contrato firmado ante notario (PENDIENTE firma)
  ✅ Certificado de factibilidad agua potable
  ❌ Certificado de factibilidad alcantarillado (FALTANTE)
  ❌ Convenio de asistencia técnica (PENDIENTE)

EXPEDIENTE TÉCNICO
  ✅ Plano de emplazamiento
  ❌ Presupuesto de obras (EN ELABORACIÓN — arquitecto)
  ❌ Especificaciones técnicas (EN ELABORACIÓN)

COMPLETITUD: 47% ████████░░░░░░░░░
PRÓXIMO VENCIMIENTO: RSH caduca el 20-04-2026 (31 días)
════════════════════════════════════════
```

**Alertas automáticas del módulo de expediente:**
- 60 días antes del vencimiento de cualquier documento → alerta amarilla
- 30 días antes → alerta naranja + tarea asignada al responsable
- 7 días antes → alerta roja + notificación al coordinador
- Vencimiento → bloqueo del expediente hasta renovación

---

## MACROPROCESO 4 — Postulación y Gestión SERVIU

### Flujo 4.1 — Preparación para Ingreso al SERVIU

```
[Coordinador verifica que el expediente está 100% completo]
         │
         ▼
[Sistema genera checklist de pre-ingreso SERVIU]
  Según el programa (DS49, DS27, etc.) y la modalidad,
  el sistema lista exactamente qué documentos exige el SERVIU.
  
  [IA INTERNA revisa el expediente completo]
  "Expediente listo para ingreso. Observaciones:
   - El plano de emplazamiento no incluye norte geográfico (requisito DS49 Art. 12)
   - La cartola de ahorro tiene más de 30 días — SERVIU puede observarlo"
         │
         ▼
[Correcciones realizadas → Coordinador aprueba ingreso]
         │
         ▼
[Sistema registra: fecha de ingreso al SERVIU, número de ingreso]
[Estado: INGRESADO A SERVIU — En revisión]
```

### Flujo 4.2 — Gestión de Observaciones SERVIU

Posteriormente a la revisión del SERVIU se debe proceder a la subsanación de observaciones en la eventualidad que el SERVIU las plantee. Este es uno de los cuellos de botella más comunes.

```
[SERVIU emite observaciones al proyecto]
         │
         ▼
[Coordinador ingresa las observaciones al sistema]
         │
         ▼
[IA INTERNA analiza cada observación]
  "Observación 3: 'El certificado de factibilidad de agua
   potable no indica la capacidad de la red para el
   número de viviendas del proyecto.'
   
   SUGERENCIA: Solicitar certificado ampliado a [empresa
   de agua de la región]. Plazo habitual de emisión: 5-10
   días hábiles. Responsable sugerido: ARQ-001."
         │
         ▼
[Sistema genera plan de subsanación:]
  - Lista de observaciones
  - Responsable asignado por observación
  - Plazo de resolución
  - Estado: Pendiente / En gestión / Resuelto
         │
         ▼
[Alerta automática si el plazo de subsanación está próximo a vencer]
```

---

## MACROPROCESO 5 — Ejecución de Obras

### Flujo 5.1 — Gestión de Visitas en Terreno

```
[Arquitecto (R04) programa visita de inspección]
         │
         ▼
[Sistema crea registro de visita:]
  - Fecha y hora
  - Proyecto y beneficiarios a visitar
  - Tipo de visita: diagnóstico inicial / control de avance / entrega
  - Dirección exacta (desde expediente técnico)
  - Arquitecto responsable
  - ¿Se notifica al beneficiario? → si sí, sistema envía aviso automático
         │
         ▼
[ANTES DE LA VISITA — sistema prepara ficha de terreno:]
  IA genera resumen del expediente del beneficiario:
  - Historial de visitas anteriores
  - Observaciones pendientes de visitas previas
  - Estado de avance según el cronograma
  - Alertas especiales (adulto mayor con movilidad reducida, etc.)
         │
         ▼
[DURANTE LA VISITA — arquitecto usa la app en terreno:]
  - Registro de fotos georreferenciadas (coordenadas GPS)
  - Formulario de inspección según etapa de la obra
  - Registro de observaciones y no conformidades
  - Firma digital del beneficiario al finalizar la visita
         │
         ▼
[DESPUÉS DE LA VISITA — sistema registra:]
  - Informe completo con fotos y observaciones
  - Estado de avance actualizado
  - Tareas generadas a partir de las observaciones
  - Log de auditoría: quién visitó, cuándo, qué registró
         │
         ▼
[Si hay no conformidades:]
[Sistema genera alerta al coordinador con plazo de resolución]
```

### Flujo 5.2 — Control de Avance de Obras

```
PANEL DE ESTADO DE PROYECTOS (Vista Coordinador)
════════════════════════════════════════════════════
PROYECTO DS49-2026-001 — [Nombre del proyecto]
Familias: 24 | Inicio: 01-04-2026 | Plazo: 01-10-2026

ETAPA ACTUAL: Estructura ████████░░░░░ 60%

Última visita: 15-03-2026 (ARQ-001)
Próxima visita: 29-03-2026 (programada)

ALERTAS:
  🔴 Familia ID-012: visita pendiente hace 45 días (sobre plazo)
  🟡 Familia ID-008: observación de obra sin resolver (28 días)

HITOS CRÍTICOS:
  ✅ Fundaciones — completado 15-02-2026
  ✅ Estructura    — completado 10-03-2026
  ⏳ Techado       — en curso (estimado 05-04-2026)
  ❌ Terminaciones — pendiente
  ❌ Entrega       — pendiente
════════════════════════════════════════════════════
```

---

## MACROPROCESO 6 — Entrega y Cierre

### Flujo 6.1 — Proceso de Entrega de Vivienda

```
[Arquitecto realiza inspección final de la vivienda]
         │
         ▼
[Sistema genera acta de entrega con:]
  - Datos de la vivienda (superficie, materialidad, acabados)
  - Checklist de entrega (puertas, ventanas, instalaciones, etc.)
  - Estado de las observaciones pendientes
  - Certificados de recepción municipal
         │
         ▼
[Firma digital del beneficiario y del arquitecto]
         │
         ▼
[Sistema registra la entrega formal:]
  - Fecha y hora exacta
  - Documentos firmados
  - Fotos del estado final de la vivienda
  - Estado del proyecto: ENTREGADO
         │
         ▼
[Post-entrega — EGIS mantiene acompañamiento]
  Las Entidades Patrocinantes vinculadas a proyectos
  deben seguir apoyando a las familias hasta la entrega.
  El sistema mantiene el expediente activo en modo
  POST-ENTREGA por 6 meses.
```

### Flujo 6.2 — Cierre de Expediente e Inscripción CBR

```
[Abogado (R05) gestiona la inscripción en el CBR]
  Sistema genera recordatorio y checklists legales
         │
         ▼
[Una vez inscrita la vivienda:]
[Sistema registra número de inscripción y fecha]
[Estado final: CERRADO — INSCRITO CBR]
         │
         ▼
[Sistema genera informe de cierre del proyecto:]
  - Resumen de todo el proceso (fechas, hitos, incidentes)
  - Estadísticas del proyecto (tiempo total, observaciones SERVIU, etc.)
  - Este informe queda archivado por 10 años
         │
         ▼
[Datos del beneficiario pasan a estado ARCHIVADO]
  - Retención: 5 años (obligación MINVU)
  - Acceso restringido a R00, R01 y R07
  - Visible para auditorías pero no operacional
```

---

## Módulo Transversal — Comunicación con Beneficiarios

### Flujo de Contacto Saliente (del equipo al beneficiario)

```
TIPOS DE CONTACTO REGISTRADOS EN EL SISTEMA:

1. LLAMADA TELEFÓNICA
   - AS o administrativo registra la llamada
   - Resultado: contactado / no contesta / número inválido
   - Resumen de lo conversado
   - Compromisos adquiridos y fechas

2. VISITA EN TERRENO
   [Ver Flujo 5.1]

3. MENSAJE / NOTIFICACIÓN AUTOMÁTICA (sistema)
   - Sistema envía automáticamente:
     * Recordatorio de documentos pendientes
     * Confirmación de visita programada
     * Alerta de fecha próxima de llamado
     * Notificación de estado del subsidio
   - Cada mensaje enviado queda registrado en el log

4. REUNIÓN GRUPAL
   - Coordinador crea evento grupal
   - Sistema envía convocatoria a todos los miembros del comité
   - Registro de asistencia post-reunión
   - Acta de reunión adjunta al expediente del proyecto
```

**Regla de privacidad:** Todo contacto con el beneficiario queda en el expediente. Nadie puede contactar a un beneficiario "fuera del sistema" sin registrarlo. Esto protege a la EGIS ante cualquier reclamo.

---

## Módulo de IA Interna — Casos de Uso por Flujo

| Flujo | Lo que hace la IA | Lo que hace el profesional |
|-------|-------------------|---------------------------|
| Diagnóstico inicial | Sugiere programa compatible según perfil | Valida y decide el programa objetivo |
| Conformación de grupo | Filtra y ordena candidatos compatibles | Selecciona los miembros del comité |
| Verificación documentos | Verifica completitud y vigencia | Valida documentos con observaciones |
| Pre-ingreso SERVIU | Detecta posibles observaciones antes de ingresar | Corrige y aprueba el ingreso |
| Subsanación SERVIU | Sugiere cómo resolver cada observación | Ejecuta la subsanación |
| Visita en terreno | Prepara ficha de contexto del beneficiario | Inspecciona, registra y decide |
| Control de avance | Detecta retrasos y genera alertas | Toma decisiones sobre los retrasos |
| Oportunidades nuevos proyectos | Detecta demanda y nuevos llamados | Evalúa viabilidad y decide |

**Principio invariable:** La IA apoya, informa y sugiere. El profesional humano decide, valida y firma. Ninguna acción crítica del sistema se ejecuta sin la aprobación explícita de un usuario autorizado.

---

*Fuentes del proceso: SERVIU Valparaíso, SERVIU Maule, D.S. N°49 MINVU, D.S. N°27 MINVU*
*Versión 1.0 — Marzo 2026*
