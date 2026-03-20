# Ley N° 21.719 — Protección de Datos Personales

## Ficha de la Norma

| Dato | Detalle |
|------|---------|
| Número | 21.719 |
| Publicación | 13 de diciembre de 2024, Diario Oficial |
| Entrada en vigencia | **1 de diciembre de 2026** |
| Reemplaza | Ley N° 19.628 (de 1999) |
| Organismo fiscalizador | Agencia de Protección de Datos Personales (nueva, autónoma) |
| Relevancia para el sistema | **CRÍTICA** — Rige todo el tratamiento de datos personales |

> ⚠️ Aunque entra en vigencia en dic. 2026, el sistema debe diseñarse bajo este estándar desde hoy. La Ley 19.628 sigue vigente en el intertanto.

---

## Principios Fundamentales (Obligatorios para el Diseño)

### 1. Finalidad
Los datos solo pueden recopilarse para fines **específicos, explícitos y legítimos**, declarados al usuario antes de recopilarlos. No se pueden usar para fines distintos sin nuevo consentimiento.

**Aplicación al sistema:** Declarar en el registro exactamente para qué se usará cada dato. Si el sistema cambia de funcionalidad, requiere nuevo consentimiento.

### 2. Minimización de Datos
Solo tratar los datos **estrictamente necesarios** para el fin declarado.

**Aplicación al sistema:**
- No pedir RUT si no es indispensable para el servicio
- No pedir nombre completo si basta un alias
- El chat con IA no debe almacenar datos personales identificables
- Evitar logging de conversaciones con datos sensibles

### 3. Privacy by Design y Privacy by Default
Las medidas técnicas y organizativas deben aplicarse **desde el diseño** y los parámetros por defecto deben garantizar la mayor protección posible.

**Aplicación al sistema:**
- Base de datos cifrada desde el inicio (no como parche)
- Permisos mínimos en la arquitectura base
- Por defecto: no compartir datos con terceros
- Formularios con mínima información solicitada

### 4. Exactitud
Los datos deben mantenerse actualizados y exactos.

**Aplicación al sistema:** Permitir que el usuario actualice sus datos. No conservar datos obsoletos.

### 5. Limitación del Plazo de Conservación
Los datos no pueden conservarse más tiempo del necesario para el fin declarado.

**Aplicación al sistema:** Definir política de retención: ¿cuánto tiempo se guardan conversaciones, registros de acceso, datos del usuario? Documentarlo en la Política de Privacidad.

---

## Consentimiento — Requisitos Estrictos

El consentimiento para tratar datos personales debe ser:

| Requisito | Descripción | Implicancia práctica |
|-----------|-------------|---------------------|
| **Libre** | Sin presión, sin condicionar el servicio | No obligar a entregar datos para acceder a funciones básicas |
| **Específico** | Para cada finalidad por separado | Checkbox separado para cada uso distinto |
| **Informado** | En lenguaje claro y comprensible | Especialmente importante para adultos mayores |
| **Inequívoco** | Acción afirmativa, no casillas pre-marcadas | Nunca pre-tickear consentimientos |
| **Revocable** | El usuario puede retirarlo en cualquier momento | Debe haber un mecanismo simple de revocación |

---

## Datos Sensibles — Máxima Protección

El sistema puede entrar en contacto con datos sensibles:

| Tipo de Dato | ¿Es sensible según Ley 21.719? | Regla |
|-------------|-------------------------------|-------|
| RUT | Identificador único personal — alta sensibilidad | No almacenar sin cifrado fuerte; solo si es imprescindible |
| Situación socioeconómica (RSH, ingresos) | **Sí — sensible** | No procesar directamente; solo orientar al usuario |
| Estado de salud, discapacidades | **Sí — sensible** | Evitar recopilar; si el usuario lo entrega, anonimizar |
| Dirección del hogar (en contexto de reconstrucción) | Sensible en contexto | Cifrar; no exponer en logs |
| Condición de vulnerabilidad | **Sí — sensible** | Máxima precaución; solo con consentimiento diferenciado |

**Regla de oro:** Si no es estrictamente necesario para dar el servicio, **no lo pidas y no lo almacenes.**

---

## Derechos ARCO+ — Obligatorios de Implementar

| Derecho | Descripción | Plazo de respuesta |
|---------|-------------|-------------------|
| **A**cceso | El usuario solicita qué datos tiene almacenados el sistema | 30 días hábiles |
| **R**ectificación | Corregir datos inexactos o incompletos | 30 días hábiles |
| **C**ancelación / Supresión | Eliminar datos cuando ya no son necesarios o el usuario lo pide | 30 días hábiles |
| **O**posición | Oponerse al tratamiento para ciertos fines | 30 días hábiles |
| **Portabilidad** | Recibir sus datos en formato estructurado y legible por máquina | 30 días hábiles |
| **No decisión automatizada** | No ser objeto de decisiones basadas exclusivamente en IA | Aplicación inmediata |

### Implementación Mínima del Canal ARCO
```
✅ Formulario web accesible desde el pie de página del sistema
✅ Correo electrónico dedicado (ej: datospersonales@sistema.cl)
✅ Proceso de verificación de identidad del solicitante
✅ Registro interno de todas las solicitudes y respuestas
✅ Plazo de respuesta máximo: 30 días hábiles
✅ Gratuito para el usuario
```

---

## Encargados de Tratamiento — Relación con Anthropic

Al usar la API de Claude (Anthropic), la empresa es un **encargado de tratamiento** de datos personales. La ley exige:

1. **DPA (Data Processing Agreement)** firmado con Anthropic antes de procesar datos de usuarios.
2. Verificar la política de retención de datos de Anthropic (¿por cuánto tiempo guarda las conversaciones?).
3. Confirmar que los datos del sistema NO se usan para entrenar modelos futuros.
4. Documentar el contrato en el **Registro de Actividades de Tratamiento**.
5. Informar a los usuarios en la Política de Privacidad que sus consultas son procesadas por Anthropic en EE.UU.

**Enlace DPA Anthropic:** https://www.anthropic.com/legal/data-processing-addendum

---

## Transferencia Internacional de Datos

Anthropic tiene servidores en EE.UU. Para que esto sea legal bajo la Ley 21.719:

- Incluir en la Política de Privacidad que los datos pueden ser procesados en EE.UU.
- Contar con DPA que incluya **cláusulas contractuales estándar** equivalentes
- No transferir datos sensibles a los servidores de Anthropic — el prompt enviado a la IA no debe contener RUT, nombre completo ni datos del RSH del usuario

---

## Evaluación de Impacto en Protección de Datos (EIPD)

**¿Es obligatoria?** Sí, porque el sistema cumple al menos dos de los tres criterios:

- ✅ Tratamiento de datos de grupos vulnerables (adultos mayores)
- ✅ Uso de nuevas tecnologías con riesgo potencial (IA conversacional)
- ✅ Posible tratamiento a escala de datos socioeconómicos sensibles

**Contenido mínimo de la EIPD:**
1. Descripción del tratamiento y sus finalidades
2. Evaluación de necesidad y proporcionalidad del tratamiento
3. Identificación y evaluación de riesgos para los derechos de los titulares
4. Medidas previstas para reducir los riesgos identificados
5. Resultado: si el riesgo es alto, consultar a la Agencia antes de lanzar

Ver plantilla completa en: `06_Cumplimiento_y_Documentos/plantilla_eipd.md`

---

## Notificación de Brechas de Seguridad

Si ocurre una brecha de datos (acceso no autorizado, filtración, pérdida):

| Acción | Plazo | Destinatario |
|--------|-------|-------------|
| Notificar a la Agencia de Protección de Datos | **72 horas** desde que se tiene conocimiento | Agencia de Protección de Datos Personales |
| Notificar a los usuarios afectados | Sin demora injustificada | Usuarios cuya información fue comprometida |
| Documentar el incidente | Inmediato | Registro interno obligatorio |

---

## Sanciones

| Clasificación | Ejemplos | Multa máxima |
|---------------|---------|-------------|
| **Leve** | No responder solicitud ARCO en plazo | 5.000 UTM (~$330M CLP a valor 2026) |
| **Grave** | Tratar datos sin consentimiento válido | 10.000 UTM (~$660M CLP) |
| **Gravísima** | Tratar datos sensibles sin consentimiento; transferencia internacional ilegal | Máximo del ordenamiento |

> Atención: El sistema atiende a adultos mayores (grupo vulnerable). Las sanciones pueden ser **agravadas** por este factor.

---

*Fuente: Diario Oficial de la República de Chile, 13 de diciembre de 2024*
*Versión 1.0 — Marzo 2026*
