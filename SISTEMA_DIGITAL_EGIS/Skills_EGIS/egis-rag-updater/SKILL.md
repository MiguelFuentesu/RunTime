---
name: egis-rag-updater
description: >
  Gestor de actualizaciones de la base de conocimiento verificada (RAG) del sistema EGIS.
  Usar SIEMPRE que el usuario mencione actualizar información, cambio en la ley, nuevo decreto,
  nuevo llamado del MINVU, cambio en requisitos, información desactualizada, beneficio nuevo,
  cambio en monto de subsidio, nueva circular del SERVIU, o cuando diga "hay que actualizar",
  "cambió el requisito", "salió un nuevo programa", "actualizá el sistema" o similar.
  Guía el proceso completo: verificación en fuente oficial → validación → actualización
  del documento → registro del cambio → prueba de verificación.
---

# EGIS RAG Updater

Skill para gestionar actualizaciones de la base de conocimiento del sistema EGIS
de forma estructurada, trazable y con fuente verificable. Ninguna actualización
puede ingresar al sistema sin fuente oficial documentada.

## Principio fundamental

> Un dato desactualizado en el sistema es tan peligroso como uno incorrecto.
> Un beneficiario que pierde un plazo porque el sistema informó una fecha vieja
> tiene nombre y apellido. Esta skill existe para que eso sea imposible.

## Flujo de trabajo

### PASO 1 — Clasificar el tipo de cambio

Al recibir la notificación de un posible cambio, clasificar:

| Tipo | Urgencia | Ejemplos |
|------|---------|----------|
| **CRÍTICO** | Inmediato | Cambio de fecha de cierre de llamado, cambio en monto de subsidio, nuevo decreto que modifica requisitos |
| **ALTO** | < 48 horas | Nuevo programa publicado, cambio en requisitos de un programa existente |
| **MEDIO** | < 7 días | Actualización de contactos de organismos, cambio en procedimientos internos |
| **BAJO** | Próximo ciclo mensual | Ajustes menores de redacción, corrección de ortografía en documentos |

### PASO 2 — Solicitar la fuente oficial

**NUNCA actualizar el sistema basándose en:**
- Comentarios verbales de funcionarios
- Redes sociales (ni las oficiales de organismos del Estado)
- Noticias de prensa (pueden tener errores)
- Documentos sin membrete oficial

**SIEMPRE exigir una de estas fuentes:**
- URL del sitio oficial del MINVU (minvu.gob.cl)
- URL de ChileAtiende (chileatiende.gob.cl)
- Resolución o decreto del Diario Oficial (diariooficial.interior.gob.cl)
- Circular o resolución del SERVIU regional (con número y fecha)
- Correo oficial del SERVIU (con dirección @serviu.cl o @minvu.gob.cl)

Preguntar al usuario: *"¿Tienes el enlace o documento oficial que confirma este cambio? Necesito la fuente antes de actualizar."*

### PASO 3 — Verificar la fuente

Una vez recibida la fuente, verificar:

```
CHECKLIST DE VERIFICACIÓN DE FUENTE:
☐ La URL es del dominio oficial (minvu.gob.cl, serviu.cl, bcn.cl, etc.)
☐ El documento tiene fecha de publicación visible
☐ El contenido coincide con lo reportado por el usuario
☐ No hay contradicción con otros documentos en la base de conocimiento
☐ El cambio tiene vigencia a partir de [fecha] (¿ya está en vigor?)
```

Si hay contradicción con documentos existentes: identificar cuál es el más reciente y cuál debe prevalecer.

### PASO 4 — Documentar el cambio

Antes de actualizar cualquier documento, completar esta ficha:

```
═══════════════════════════════════════════════════
FICHA DE ACTUALIZACIÓN DEL RAG
═══════════════════════════════════════════════════
Fecha de detección del cambio: [fecha]
Detectado por: [nombre del funcionario]
Tipo de cambio: CRÍTICO / ALTO / MEDIO / BAJO

CAMBIO:
  Documento afectado: [nombre del archivo en el RAG]
  Sección afectada: [sección específica]
  
  Texto ANTERIOR:
  "[texto que se reemplaza]"
  
  Texto NUEVO:
  "[texto actualizado]"

FUENTE OFICIAL:
  URL / Número de documento: [fuente]
  Fecha de publicación: [fecha]
  Organismo emisor: [MINVU / SERVIU / BCR / etc.]

VALIDADO POR: [nombre del coordinador que aprueba]
FECHA DE VALIDACIÓN: [fecha]
═══════════════════════════════════════════════════
```

### PASO 5 — Actualizar el documento en el RAG

Instrucciones para el equipo técnico:

1. Abrir el documento afectado en la base de conocimiento
2. Realizar el cambio exactamente como se describe en la ficha
3. Actualizar la línea de metadatos al inicio del documento:
   ```
   **ESTADO:** Verificado — [NUEVA FECHA]
   **PRÓXIMA REVISIÓN:** [fecha + 3 meses]
   ```
4. Re-indexar la base vectorial (el sistema lo hace automáticamente al guardar)

### PASO 6 — Prueba de verificación

Después de actualizar, hacer estas 3 preguntas al sistema y verificar que responde con la información nueva:

```
PREGUNTA 1: Sobre el dato exacto que cambió
  → La respuesta debe reflejar el cambio

PREGUNTA 2: Sobre el contexto general del tema
  → La respuesta no debe mostrar contradicciones

PREGUNTA 3: Sobre la fuente de la información
  → El sistema debe poder indicar de dónde proviene el dato
```

Si alguna prueba falla → revisar el proceso de re-indexación con el equipo técnico.

### PASO 7 — Registro en el log de cambios

Agregar una línea al registro del archivo `catalogo_beneficios_verificados_2026.md`:

```
| [número] | [fecha] | [documento] | [resumen del cambio] | [fuente] | [responsable] | ✅ |
```

### PASO 8 — Notificación al equipo

Si el cambio es CRÍTICO o ALTO, notificar automáticamente:
- Al coordinador de la EGIS
- Al equipo de arquitectos si afecta proyectos en curso
- Indicar claramente: qué cambió, desde cuándo aplica, qué proyectos podrían verse afectados

## Protocolo especial: cambio detectado por un beneficiario

Si un usuario reporta que la IA dio información incorrecta:

```
PROTOCOLO DE CORRECCIÓN DE EMERGENCIA:
1. Agradecer el reporte y registrar: fecha, usuario, dato incorrecto reportado
2. Verificar en la fuente oficial INMEDIATAMENTE (< 2 horas)
3. Si es incorrecto:
   a. Actualizar el RAG (pasos 4-7)
   b. El documento queda marcado "VERIFICADO - CORRECCIÓN" en el log
   c. Contactar al usuario que recibió la información incorrecta (< 24 horas)
      con la información correcta
4. Si la información era correcta y el usuario estaba confundido:
   a. Clarificar amablemente la información
   b. Registrar como "consulta aclarada" sin cambios en el RAG
```

## Calendario de revisiones obligatorias

Generar recordatorios automáticos para:

| Documento | Próxima revisión obligatoria |
|-----------|------------------------------|
| Calendario de llamados MINVU | Mensual |
| Requisitos DS49/DS27/DS52 | Trimestral |
| Montos PGU y beneficios previsionales | Trimestral |
| Contactos y teléfonos de organismos | Semestral |
| Marco legal (leyes, decretos) | Ante publicación en Diario Oficial |

Si el usuario dice "revisar el calendario de actualizaciones", mostrar qué documentos tienen revisión vencida.
