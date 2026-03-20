# Marco Legal Específico — Sistema Digital para EGIS
## Herramienta de Gestión Interna: Expedientes, Beneficiarios y Seguimiento

> Este documento es la guía legal operacional del sistema. Combina el marco general de protección de datos con las obligaciones específicas del Decreto Supremo N°174 y N°49 del MINVU que regulan a las EGIS / Entidades Patrocinantes.

---

## 1. Contexto Legal de la EGIS como Operadora del Sistema

Las Entidades Patrocinantes (antiguas EGIS) son personas naturales o jurídicas, públicas o privadas, con o sin fines de lucro, cuya función principal es asesorar a las familias en términos sociales, técnicos y jurídicos para acceder a subsidios habitacionales. La Entidad está obligada a no efectuar, ni directa ni indirectamente, ningún cobro a las personas que organice, asista o asesore.

**Consecuencia directa para el sistema:**
El sistema es una herramienta interna de la EGIS. **Los beneficiarios no pagan por usarlo ni por los servicios gestionados a través de él.** Si el sistema cobrara algo al beneficiario por tramitar subsidios, la EGIS infringiría el Convenio Marco con el MINVU/SEREMI y podría perderlo.

---

## 2. Los Dos Marcos Normativos que Rigen Simultáneamente

El sistema opera bajo **dos marcos normativos que deben cumplirse al mismo tiempo** y no pueden contradecirse:

```
MARCO 1 — MINVU / SERVIU
(D.S. N°174, D.S. N°49, Convenio Marco SEREMI)
  └─► Regula QUÉ datos debe recopilar la EGIS de los beneficiarios
  └─► Regula CÓMO deben conformarse los expedientes
  └─► Regula la responsabilidad por errores ante el SERVIU

MARCO 2 — PROTECCIÓN DE DATOS Y CIBERSEGURIDAD
(Ley 21.719, Ley 19.628, Ley 21.663)
  └─► Regula CÓMO se almacenan y protegen esos mismos datos
  └─► Regula los derechos del beneficiario sobre su información
  └─► Regula la seguridad del sistema que los contiene
```

**El sistema debe satisfacer ambos marcos.** No puede decir "el MINVU me obliga a tener este dato" para eludir la Ley de Protección de Datos. La base legal para tratar datos sensibles requeridos por el MINVU es **obligación legal**, lo que sí es una base válida bajo la Ley 21.719.

---

## 3. Datos que el Sistema Gestionará y su Base Legal de Tratamiento

La elaboración del expediente social abarca el registro de demandantes, acreditación de ahorros y las planillas de postulación del SERVIU. El expediente legal incluye: documento de contrato, acta de factibilidad de servicios básicos y acuerdo de asistencia técnica.

La siguiente tabla define la base legal para tratar cada tipo de dato:

| Dato del Beneficiario | ¿Por qué se trata? | Base Legal (Ley 21.719) | Nivel de Sensibilidad |
|----------------------|---------------------|------------------------|----------------------|
| Nombre completo | Identificación en expediente SERVIU | Obligación legal (D.S. N°49/174) | Medio |
| RUT | Requerido por SERVIU para postulación | Obligación legal | **Alto** |
| Dirección del hogar | Diagnóstico habitacional | Obligación legal + consentimiento | **Alto** |
| Situación socioeconómica / RSH | Verificación de elegibilidad al subsidio | Obligación legal | **Muy Alto — Sensible** |
| Ahorro acreditado | Requisito del programa habitacional | Obligación legal | Alto |
| Composición del grupo familiar | Requerido por SERVIU | Obligación legal | Alto |
| Datos de contacto (teléfono, correo) | Comunicación con el beneficiario | Consentimiento | Medio |
| Avance del proyecto / seguimiento | Gestión interna y reporte al SERVIU | Interés legítimo + obligación | Bajo |

**Regla de oro:** Aunque la base legal sea "obligación legal" (requerimiento MINVU/SERVIU), **la protección técnica de los datos sigue siendo obligatoria.** La ley no los hace menos sensibles, solo justifica su recopilación.

---

## 4. Responsabilidad por Errores — Doble Exposición

La EGIS enfrenta responsabilidad desde dos frentes distintos ante errores del sistema:

### Frente al MINVU/SERVIU
El encargado EGIS es responsable de la confección del expediente legal y administrativo del proyecto, que debe contener: redacción de contrato y firma ante notario, certificados de factibilidad de servicios básicos y el Convenio de Asistencia Técnica entre el grupo organizado y la entidad patrocinante.

Si el sistema registra mal un dato y eso genera un error en el expediente presentado al SERVIU, la EGIS responde ante el MINVU. Los errores u omisiones quedan registrados en el sistema de Registros Técnicos del MINVU y pueden afectar la calificación anual de la EGIS.

### Frente al Beneficiario
Si un error del sistema provoca que un beneficiario pierda un subsidio al que tenía derecho (por ejemplo, datos mal ingresados, notificaciones perdidas, plazos no alertados), la EGIS enfrenta:
- Responsabilidad civil (Código Civil — art. 2314 y siguientes)
- Posible infracción a la Ley del Consumidor (Ley 19.496) si hay relación de servicio
- Responsabilidad especial por tratarse de adultos mayores (Convención OEA)

**Diseño del sistema ante este riesgo:**
- Validación automática de campos obligatorios antes de guardar expedientes
- Alertas de plazo con anticipación suficiente (no el mismo día)
- Log inmutable de quién modificó cada dato y cuándo
- Confirmación explícita antes de enviar o modificar datos críticos

---

## 5. Obligaciones Específicas del Sistema como Herramienta Interna de una EGIS

### 5.1 Registro de Usuarios Internos (Funcionarios y Profesionales)

El sistema permite que funcionarios y profesionales accedan a datos de beneficiarios. Esto genera obligaciones adicionales:

- Cada usuario interno (asistente social, arquitecto, administrativo) debe tener **credenciales únicas e intransferibles**
- El sistema debe registrar qué usuario accedió a qué expediente y cuándo (log de auditoría)
- Los usuarios internos deben firmar un **acuerdo de confidencialidad** que incluya el uso del sistema
- El acceso debe ser **por roles**: quien gestiona expedientes sociales no necesariamente debe ver datos financieros, y viceversa

### 5.2 El Convenio Marco como Límite de Uso del Sistema

La SEREMI de Vivienda y Urbanismo es el organismo encargado de fiscalizar a las Entidades Patrocinantes, particularmente si cumplen los requisitos establecidos en el Convenio Marco. A los SERVIU les corresponde supervisar el correcto desarrollo de los servicios de asistencia técnica.

**El sistema solo puede usarse para los fines contemplados en el Convenio Marco.** No puede usarse para gestionar beneficiarios de otros programas no habitacionales sin que la EGIS tenga mandato para ello. Usar los datos recopilados bajo el mandato MINVU para otros fines constituye una desviación de finalidad prohibida por la Ley 21.719.

### 5.3 Calificación Anual de la EGIS por el MINVU

Cada año el Ministerio de Vivienda y Urbanismo califica a las entidades patrocinantes en una escala de 1 a 100 puntos de acuerdo a su nivel de gestión y ejecución.

Un sistema digital bien implementado puede mejorar directamente esta calificación al reducir errores en expedientes, mejorar tiempos de respuesta y mantener trazabilidad de procesos. Documentar el uso del sistema como parte de los procesos de calidad puede ser un argumento de mejora ante el MINVU.

---

## 6. Flujo de Datos — Fronteras Legales del Sistema

```
BENEFICIARIO (adulto mayor)
       │
       │  Entrega datos voluntariamente a la EGIS
       ▼
┌─────────────────────────────────────────┐
│         SISTEMA INTERNO EGIS            │
│                                         │
│  ┌──────────────┐  ┌─────────────────┐  │
│  │  Expediente  │  │  Chat IA        │  │
│  │  Social      │  │  (orientación)  │  │
│  └──────────────┘  └─────────────────┘  │
│                                         │
│  ┌──────────────┐  ┌─────────────────┐  │
│  │  Seguimiento │  │  Agenda con     │  │
│  │  del proyecto│  │  funcionarios   │  │
│  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────┘
       │                        │
       │ NUNCA datos sensibles  │ Datos anonimizados
       │ del expediente         │ o estadísticos
       ▼                        ▼
  API ANTHROPIC            Reportes internos
  (solo texto de           de gestión
  consultas generales)
       │
       ▼
  FRONTERA LEGAL:
  El prompt enviado a Claude NO puede contener
  RUT, nombre completo, RSH ni datos del expediente
```

---

## 7. Delegado de Protección de Datos (DPO)

La figura del Delegado de Protección de Datos (DPO) será fundamental en el modelo de cumplimiento. Entre sus obligaciones estará cooperar con la Agencia de Protección de Datos y asistir a los miembros de la empresa en la identificación de riesgos. En el caso de las micro, pequeñas y medianas empresas, el dueño o sus máximas autoridades podrán asumir personalmente estas tareas.

Para una EGIS de tamaño mediano o pequeño, el representante legal o director puede asumir el rol de DPO. Lo importante es **designarlo formalmente y documentarlo** antes del lanzamiento del sistema.

---

## 8. Líneas Rojas Específicas para el Contexto EGIS

Las siguientes conductas están expresamente prohibidas bajo este marco legal combinado:

1. **Usar datos del expediente MINVU para contactar al beneficiario con fines comerciales ajenos al subsidio** — viola el principio de finalidad (Ley 21.719) y podría infringir el Convenio Marco MINVU.

2. **Compartir expedientes entre EGIS distintas** sin autorización expresa del beneficiario y del SERVIU — viola la confidencialidad y potencialmente el Convenio Marco.

3. **Cobrar al beneficiario por el uso del sistema o por gestionar su expediente** — viola expresamente las condiciones del Convenio Marco con la SEREMI.

4. **Usar la IA para certificar elegibilidad a subsidios** — solo el SERVIU puede certificar. La IA solo orienta.

5. **Almacenar datos del RSH del beneficiario directamente en el sistema** sin que el beneficiario los haya entregado voluntariamente para ese fin específico — el RSH es del Ministerio de Desarrollo Social, no de la EGIS.

6. **Guardar contraseñas en texto plano** — viola Ley 21.663 y es negligencia técnica grave dado el tipo de datos que contiene el sistema.

---

## 9. Resumen de Obligaciones por Fase del Proyecto

### Antes de desarrollar el sistema
- [ ] Revisar el Convenio Marco vigente de la EGIS con la SEREMI para entender qué datos se deben gestionar
- [ ] Identificar qué campos exige el SERVIU en los expedientes y documentarlos
- [ ] Determinar quiénes son los usuarios internos del sistema y sus roles
- [ ] Designar formalmente el DPO (o asumir el rol en la dirección)

### Antes de lanzar el sistema
- [ ] EIPD realizada y documentada (obligatoria por datos sensibles a escala)
- [ ] Política de Privacidad para beneficiarios publicada y accesible
- [ ] Acuerdos de confidencialidad firmados por todos los usuarios internos
- [ ] DPA firmado con Anthropic
- [ ] Cifrado implementado (AES-256 en reposo, TLS 1.3 en tránsito)
- [ ] Logs de auditoría funcionales
- [ ] Protocolo de brechas documentado

### Durante la operación
- [ ] Auditoría de accesos internos al menos cada 6 meses
- [ ] Revisión y actualización de información de beneficios habitacionales
- [ ] Respuesta a solicitudes ARCO en plazo (30 días hábiles)
- [ ] Notificación de brechas a ANCI en 72 horas si ocurren

---

*Fuentes: D.S. N°174 MINVU (2006), D.S. N°49 MINVU (2012), SERVIU Valparaíso, Ley 21.719, Ley 21.663*
*Versión 1.0 — Marzo 2026 — Específico para EGIS con gestión interna sin integración directa SERVIU*
