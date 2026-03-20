# Registro de Actividades de Tratamiento de Datos
## Obligatorio bajo Ley N° 21.719 — Sistema Digital EGIS

> **Clasificación:** CONFIDENCIAL — Documento interno
> **Responsable del registro:** [NOMBRE DEL DPO O REPRESENTANTE LEGAL]
> **Última actualización:** [FECHA]
>
> Este registro debe mantenerse actualizado en todo momento. Debe estar disponible
> para la Agencia de Protección de Datos si lo solicita.

---

## Identificación del Responsable

| Campo | Detalle |
|-------|---------|
| Organización | [NOMBRE DE LA EGIS] |
| RUT | [NÚMERO] |
| Dirección | [DIRECCIÓN] |
| DPO / Responsable | [NOMBRE Y CARGO] |
| Correo de contacto | [datospersonales@egis.cl] |

---

## Registro de Tratamientos

### Tratamiento T01 — Expediente del Beneficiario

| Campo | Detalle |
|-------|---------|
| **Nombre del tratamiento** | Gestión del expediente habitacional del beneficiario |
| **Responsable interno** | Coordinador EGIS |
| **Finalidad** | Gestionar el proceso de postulación y seguimiento del subsidio habitacional |
| **Base legal** | Obligación legal (D.S. N°49 y N°27 MINVU) + consentimiento para datos no exigidos por la ley |
| **Categorías de datos** | Nombre, RUT, fecha de nacimiento, dirección, composición familiar, situación de tenencia, RSH (tramo), datos de ahorro, documentos de identidad |
| **Categorías de titulares** | Beneficiarios del programa habitacional — incluye adultos mayores (grupo vulnerable) |
| **Destinatarios** | Personal interno EGIS (según roles); SERVIU (solo datos requeridos para postulación) |
| **Transferencias internacionales** | No aplica para este tratamiento |
| **Plazo de conservación** | 5 años desde el cierre del proyecto (obligación MINVU) |
| **Medidas de seguridad** | Cifrado AES-256, RBAC, logs de auditoría, TLS 1.3 |

---

### Tratamiento T02 — Chat IA Público (ARIA)

| Campo | Detalle |
|-------|---------|
| **Nombre del tratamiento** | Orientación mediante asistente de inteligencia artificial |
| **Responsable interno** | Administrador TI |
| **Finalidad** | Orientar a usuarios sobre beneficios habitacionales y sociales |
| **Base legal** | Consentimiento del titular (aceptación de Términos y Condiciones) |
| **Categorías de datos** | Texto de consultas; potencialmente datos personales mencionados voluntariamente por el usuario |
| **Categorías de titulares** | Público general; adultos mayores que consultan sobre beneficios |
| **Destinatarios** | Anthropic PBC (EE.UU.) — encargado de tratamiento, bajo DPA firmado |
| **Transferencias internacionales** | Sí — a Anthropic PBC, EE.UU., bajo DPA con cláusulas de protección equivalente |
| **Plazo de conservación** | Máximo 30 días para consultas sin datos sensibles; eliminación inmediata si contiene datos sensibles detectados |
| **Medidas de seguridad** | Filtro pre-modelo (anonimización RUT), TLS 1.3, no almacenamiento de conversaciones con datos identificables |

---

### Tratamiento T03 — Logs de Auditoría

| Campo | Detalle |
|-------|---------|
| **Nombre del tratamiento** | Registro de auditoría de acciones en el sistema |
| **Responsable interno** | Administrador TI |
| **Finalidad** | Seguridad del sistema, trazabilidad, respuesta a incidentes |
| **Base legal** | Obligación legal (Ley N° 21.663 de Ciberseguridad) |
| **Categorías de datos** | ID de usuario (seudonimizado), IP de acceso, acción realizada, recurso accedido, timestamp |
| **Categorías de titulares** | Usuarios internos del sistema (funcionarios EGIS) |
| **Destinatarios** | Solo administrador TI y auditor interno (R07); autoridades competentes si lo requieren |
| **Transferencias internacionales** | No aplica |
| **Plazo de conservación** | 5 años mínimo (responsabilidad ante MINVU y Ley 21.663) |
| **Medidas de seguridad** | WORM storage, firma HMAC-SHA256, replicación, acceso restringido con MFA |

---

### Tratamiento T04 — Comunicaciones con Beneficiarios

| Campo | Detalle |
|-------|---------|
| **Nombre del tratamiento** | Registro de comunicaciones y contactos con beneficiarios |
| **Responsable interno** | Asistente Social / Administrativo |
| **Finalidad** | Mantener contacto durante el proceso habitacional y registrar compromisos |
| **Base legal** | Consentimiento del titular + interés legítimo (gestión del proceso) |
| **Categorías de datos** | Teléfono, correo electrónico, historial de llamadas (resumen), registro de visitas |
| **Categorías de titulares** | Beneficiarios activos del proceso habitacional |
| **Destinatarios** | Personal EGIS asignado al caso |
| **Transferencias internacionales** | No aplica |
| **Plazo de conservación** | Duración del proceso + 2 años |
| **Medidas de seguridad** | Acceso restringido por RBAC, cifrado en tránsito |

---

### Tratamiento T05 — Análisis Estadístico (Módulo Inteligencia)

| Campo | Detalle |
|-------|---------|
| **Nombre del tratamiento** | Análisis agregado de demanda para identificación de oportunidades de proyecto |
| **Responsable interno** | Coordinador / Director EGIS |
| **Finalidad** | Identificar oportunidades de nuevos proyectos habitacionales |
| **Base legal** | Interés legítimo (los datos son anonimizados y agregados — no hay impacto en derechos individuales) |
| **Categorías de datos** | Datos estadísticos anonimizados: número de consultas por tema, zona geográfica aproximada |
| **Categorías de titulares** | No identificable — datos completamente anonimizados |
| **Destinatarios** | Dirección EGIS, equipo de arquitectos |
| **Transferencias internacionales** | No aplica |
| **Plazo de conservación** | 12 meses (datos estadísticos históricos) |
| **Medidas de seguridad** | Anonimización irreversible antes del análisis; acceso restringido a roles R01, R02, R04 |

---

## Registro de Encargados de Tratamiento (Terceros)

| Encargado | Actividad | País | Garantías | DPA | Fecha firma |
|-----------|-----------|------|-----------|-----|-------------|
| Anthropic PBC | Procesamiento de consultas al chat IA | EE.UU. | DPA con cláusulas de protección | ✅ Firmado | [FECHA] |
| [Proveedor Hosting] | Alojamiento del sistema y base de datos | [País] | [Garantías] | ☐ Pendiente | |
| [Proveedor Email] | Envío de notificaciones a usuarios | [País] | [Garantías] | ☐ Pendiente | |

---

## Historial de Cambios del Registro

| Versión | Fecha | Cambio realizado | Responsable |
|---------|-------|-----------------|-------------|
| 1.0 | [FECHA] | Creación inicial del registro | [NOMBRE] |
| | | | |

---

*Obligatorio bajo Ley N° 21.719 (Art. sobre registro de actividades de tratamiento)*
*Debe estar disponible para la Agencia de Protección de Datos si lo solicita*
*Versión 1.0 — [FECHA] — CONFIDENCIAL*
