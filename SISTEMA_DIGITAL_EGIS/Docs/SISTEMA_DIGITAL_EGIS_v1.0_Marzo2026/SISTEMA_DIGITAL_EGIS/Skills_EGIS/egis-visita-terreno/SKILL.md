---
name: egis-visita-terreno
description: >
  Generador de informes profesionales de visitas en terreno para arquitectos y
  profesionales de la EGIS. Usar SIEMPRE que el usuario mencione visita, inspección,
  terreno, avance de obra, informe de visita, acta de terreno, no conformidad,
  fotografías de obra, control de avance, recepción de vivienda, entrega de obra,
  diagnóstico habitacional, o cuando diga "fui a ver la obra", "hice la visita",
  "necesito el informe", "redacta el acta" o similar.
  Genera informes estructurados, detecta no conformidades, registra avances
  por etapa y prepara documentación lista para el expediente técnico.
---

# EGIS Visita Terreno — Generador de Informes Profesionales

Skill para generar informes técnicos de visitas en terreno de forma estructurada,
trazable y lista para incorporar al expediente del proyecto. Cada informe generado
es un documento legal que puede ser requerido por el SERVIU.

## Tipos de visita que cubre esta skill

| Tipo | Cuándo se usa |
|------|--------------|
| **Diagnóstico inicial** | Primera visita a la vivienda del beneficiario antes de iniciar el proyecto |
| **Control de avance** | Inspecciones periódicas durante la construcción o reparación |
| **Recepción de etapa** | Cierre formal de una etapa de obra (fundaciones, estructura, techado, etc.) |
| **Entrega final** | Entrega formal de la vivienda terminada al beneficiario |
| **Visita de emergencia** | Ante anomalías, no conformidades graves o solicitud del beneficiario |

---

## Proceso de trabajo

### PASO 1 — Recopilar los datos de la visita

Preguntar al profesional que realizó la visita:

**Datos básicos:**
- ¿Qué tipo de visita? (diagnóstico / control avance / recepción etapa / entrega / emergencia)
- ¿Fecha y hora de la visita?
- ¿Nombre del profesional que visitó?
- ¿Nombre del proyecto e ID del beneficiario?
- ¿Estuvo presente el beneficiario? ¿Firmó?

**Datos técnicos (según tipo de visita):**

*Para diagnóstico inicial:*
- Descripción del estado actual de la vivienda
- Materialidad existente (muros, techo, piso)
- Superficie aproximada actual
- Servicios básicos presentes (agua, luz, alcantarillado)
- Condiciones de habitabilidad (buena / regular / mala / inhabitable)
- Observaciones especiales (humedad, grietas, riesgo estructural)

*Para control de avance:*
- ¿Qué etapa de obra se está ejecutando?
- ¿Cuál es el avance real vs. el avance programado?
- ¿Hay trabajos conformes? Describir
- ¿Hay no conformidades? Describir cada una
- ¿Hay materiales en obra? ¿En buen estado?
- ¿Hay trabajadores activos? ¿Cuántos?

*Para entrega final:*
- Estado de cada componente de la vivienda (puerta, ventanas, baño, cocina, etc.)
- ¿Se entregaron llaves?
- ¿Se explicaron los sistemas de la vivienda al beneficiario?
- ¿Hay observaciones pendientes post-entrega?

### PASO 2 — Clasificar no conformidades detectadas

Si el profesional reporta problemas, clasificarlos:

```
NIVEL 1 — CRÍTICO (detener obra hasta resolver)
  Ejemplos: riesgo estructural, materiales no especificados,
  incumplimiento de normativa sísmica, riesgo para habitabilidad

NIVEL 2 — GRAVE (resolver en < 7 días)
  Ejemplos: terminaciones deficientes, filtraciones,
  instalaciones incorrectas no críticas

NIVEL 3 — MENOR (resolver antes de la próxima visita)
  Ejemplos: detalles de terminación, limpieza de obra,
  documentos pendientes de la constructora
```

### PASO 3 — Generar el informe

Usar esta estructura según el tipo de visita:

---

**FORMATO: CONTROL DE AVANCE**

```
════════════════════════════════════════════════════════
INFORME DE VISITA EN TERRENO — CONTROL DE AVANCE
════════════════════════════════════════════════════════
N° de visita: [correlativo del proyecto]
Proyecto: [nombre del proyecto]
ID Beneficiario: [ID interno]
Dirección: [dirección exacta]
Programa: [DS49 / DS27 / etc.]

DATOS DE LA VISITA
  Fecha: [DD-MM-YYYY]
  Hora de inicio: [HH:MM]
  Hora de término: [HH:MM]
  Profesional: [nombre y cargo]
  Beneficiario presente: Sí / No
  Representante constructora presente: Sí / No / [nombre]

ESTADO DE AVANCE
  Etapa actual: [nombre de la etapa]
  Avance programado a esta fecha: [XX]%
  Avance real observado: [XX]%
  Diferencia: [adelanto / atraso de X días]

TRABAJOS CONFORMES OBSERVADOS
  ✅ [descripción del trabajo conforme 1]
  ✅ [descripción del trabajo conforme 2]

NO CONFORMIDADES DETECTADAS
  🔴 NC-001 [CRÍTICA]: [descripción detallada]
       Acción requerida: [qué debe hacerse]
       Plazo de resolución: [fecha]
       Responsable: [constructora / EP / beneficiario]

  🟡 NC-002 [GRAVE]: [descripción]
       Acción requerida: [qué debe hacerse]
       Plazo de resolución: [fecha]

MATERIALES EN OBRA
  [Descripción de materiales presentes y su estado]

OBSERVACIONES GENERALES
  [Texto libre del profesional]

FOTOGRAFÍAS
  [Lista de fotografías tomadas con descripción de cada una]
  Foto 1: [descripción — ej: "Vista frontal del avance de muros"]
  Foto 2: [descripción]

COMPROMISOS ADQUIRIDOS EN VISITA
  [Lo que se acordó con la constructora o el beneficiario]

PRÓXIMA VISITA
  Fecha estimada: [fecha]
  Foco de la próxima inspección: [qué se verificará]

────────────────────────────────────────────────────────
FIRMA PROFESIONAL: _____________________ Fecha: ________
FIRMA BENEFICIARIO: ____________________ Fecha: ________
(Si estuvo presente)
════════════════════════════════════════════════════════
```

---

**FORMATO: DIAGNÓSTICO INICIAL**

```
════════════════════════════════════════════════════════
INFORME DE DIAGNÓSTICO HABITACIONAL
════════════════════════════════════════════════════════
Proyecto: [nombre] | Beneficiario: [ID]
Fecha: [fecha] | Profesional: [nombre]
Dirección: [dirección exacta]

DESCRIPCIÓN DE LA VIVIENDA ACTUAL
  Tipología: [casa / departamento / mediagua / otro]
  Superficie aproximada: [m²]
  Antigüedad estimada: [años]
  N° de personas que habitan: [N]

MATERIALIDAD
  Muros: [adobe / madera / bloque / ladrillo / otro] — Estado: [bueno/regular/malo]
  Cubierta: [zinc / teja / otro] — Estado: [bueno/regular/malo]
  Piso: [tierra / madera / radier / otro] — Estado: [bueno/regular/malo]
  Ventanas: [madera / PVC / aluminio] — Estado: [bueno/regular/malo]

SERVICIOS BÁSICOS
  Agua potable: ✅ Sí / ❌ No — [observación]
  Alcantarillado: ✅ Sí / ❌ No — [observación]
  Electricidad: ✅ Sí / ❌ No — [observación]

CONDICIONES DE HABITABILIDAD
  Calificación general: Buena / Regular / Mala / Inhabitable
  Humedad: Sin problemas / Con humedad / Con filtración activa
  Estabilidad estructural: Sin problemas / Con grietas menores / Con grietas graves
  Riesgo inmediato: Sí / No — [descripción si es sí]

DIAGNÓSTICO Y RECOMENDACIÓN
  [Texto profesional describiendo la situación y recomendando el tipo de intervención]

PROGRAMA RECOMENDADO
  [DS49 modalidad X / DS27 línea Y / etc. — con justificación breve]
════════════════════════════════════════════════════════
```

---

**FORMATO: ENTREGA FINAL**

```
════════════════════════════════════════════════════════
ACTA DE ENTREGA DE VIVIENDA
════════════════════════════════════════════════════════
Proyecto: [nombre] | Beneficiario: [nombre completo e ID]
Fecha: [fecha] | Hora: [hora]
Dirección de la vivienda entregada: [dirección]

ESTADO DE COMPONENTES
  Puerta principal:   ✅ Conforme / ⚠️ Con observación
  Ventanas:           ✅ Conforme / ⚠️ Con observación
  Techado:            ✅ Conforme / ⚠️ Con observación
  Muros interiores:   ✅ Conforme / ⚠️ Con observación
  Piso:               ✅ Conforme / ⚠️ Con observación
  Baño:               ✅ Conforme / ⚠️ Con observación
  Cocina:             ✅ Conforme / ⚠️ Con observación
  Instalación eléctrica: ✅ Conforme / ⚠️ Con observación
  Agua potable:       ✅ Funciona / ❌ Con problemas
  Alcantarillado:     ✅ Funciona / ❌ Con problemas

OBSERVACIONES POST-ENTREGA (si las hay)
  [Lista de ítems menores pendientes con plazo de resolución]

DOCUMENTOS ENTREGADOS AL BENEFICIARIO
  ☐ Llaves de la vivienda
  ☐ Manual de uso y mantención
  ☐ Certificado de recepción municipal
  ☐ Garantías de materiales y equipos

DECLARACIÓN DEL BENEFICIARIO
  "Declaro haber recibido la vivienda en las condiciones descritas
   en este documento y haber sido informado/a de su correcto uso."

FIRMA BENEFICIARIO: _________________________ RUT: _____________
FIRMA PROFESIONAL EP: _______________________ Fecha: ___________
FIRMA REPRESENTANTE CONSTRUCTORA: ___________________________
════════════════════════════════════════════════════════
```

### PASO 4 — Instrucciones de archivo

Al finalizar el informe, indicar al profesional:

```
ARCHIVO DEL INFORME:
  ✅ Guardar en el expediente técnico del proyecto [ID]
  ✅ Adjuntar fotografías numeradas según lista del informe
  ✅ Si hay no conformidades CRÍTICAS → notificar al coordinador hoy
  ✅ Si el beneficiario firmó → digitalizar la firma y adjuntar al expediente
  ✅ Programar la próxima visita en el calendario del sistema
```

## Reglas de esta skill

SIEMPRE:
- Usar lenguaje técnico profesional apropiado para un documento legal
- Numerar correlativamente las no conformidades dentro del proyecto
- Indicar claramente quién es responsable de resolver cada no conformidad
- Generar el campo de firma aunque sea digital (el beneficiario debe poder firmar)

NUNCA:
- Omitir no conformidades para "no complicar" el informe
- Generar un informe de visita sin haber recopilado los datos básicos mínimos
- Certificar el avance de obra sin que el profesional haya visitado físicamente

*Nota: Este informe es un documento técnico-legal. La información debe ser
provista por el profesional que realizó la visita física.*
