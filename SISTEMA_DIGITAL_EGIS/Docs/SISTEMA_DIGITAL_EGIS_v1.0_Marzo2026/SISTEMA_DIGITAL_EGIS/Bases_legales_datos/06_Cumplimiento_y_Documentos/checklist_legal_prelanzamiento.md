# Checklist Legal — Pre-lanzamiento del Sistema

> Este documento debe completarse y archivarse **antes** de poner el sistema en producción. Cada ítem debe tener evidencia documental asociada.

---

## BLOQUE 1 — Protección de Datos Personales
*(Ley 19.628 vigente + Ley 21.719 desde dic. 2026)*

| # | Ítem | Estado | Evidencia | Fecha |
|---|------|--------|-----------|-------|
| 1.1 | Política de Privacidad redactada en lenguaje simple y publicada en el sistema | ☐ | | |
| 1.2 | Política de Privacidad accesible desde todas las páginas (pie de página) | ☐ | | |
| 1.3 | Consentimiento explícito implementado para cada finalidad de tratamiento | ☐ | | |
| 1.4 | Ningún checkbox de consentimiento pre-marcado | ☐ | | |
| 1.5 | Canal ARCO operativo (formulario + correo dedicado) | ☐ | | |
| 1.6 | Proceso interno de respuesta a solicitudes ARCO (máx. 30 días hábiles) documentado | ☐ | | |
| 1.7 | Registro de Actividades de Tratamiento documentado | ☐ | | |
| 1.8 | Política de Retención de Datos definida y documentada | ☐ | | |
| 1.9 | EIPD (Evaluación de Impacto) realizada y documentada | ☐ | | |
| 1.10 | DPA (Data Processing Agreement) firmado con Anthropic | ☐ | | |
| 1.11 | Contrato con proveedor de hosting que incluya cláusulas de protección de datos | ☐ | | |
| 1.12 | La Política de Privacidad informa que los datos se procesan en EE.UU. (Anthropic) | ☐ | | |
| 1.13 | Mecanismo de revocación de consentimiento disponible para el usuario | ☐ | | |

---

## BLOQUE 2 — Ciberseguridad
*(Ley 21.663)*

| # | Ítem | Estado | Evidencia | Fecha |
|---|------|--------|-----------|-------|
| 2.1 | Política de Seguridad de la Información documentada y aprobada por dirección | ☐ | | |
| 2.2 | Inventario de activos de información completo | ☐ | | |
| 2.3 | Control de acceso basado en roles (RBAC) implementado | ☐ | | |
| 2.4 | Cifrado en reposo: AES-256 para datos sensibles | ☐ | | |
| 2.5 | Cifrado en tránsito: TLS 1.3 en todas las comunicaciones | ☐ | | |
| 2.6 | Contraseñas almacenadas con hash seguro (bcrypt o Argon2) | ☐ | | |
| 2.7 | Autenticación multifactor (MFA) en panel administrativo | ☐ | | |
| 2.8 | Logs de auditoría inmutables implementados | ☐ | | |
| 2.9 | WAF (Web Application Firewall) en producción | ☐ | | |
| 2.10 | Plan de respaldo y recuperación ante desastres documentado y probado | ☐ | | |
| 2.11 | Protocolo de notificación de brechas documentado (72h a ANCI) | ☐ | | |
| 2.12 | Pruebas de penetración (pentest) realizadas antes del lanzamiento | ☐ | | |
| 2.13 | Capacitación básica del equipo en ciberseguridad completada | ☐ | | |
| 2.14 | Monitoreo continuo de anomalías configurado | ☐ | | |

---

## BLOQUE 3 — Protección del Consumidor
*(Ley 19.496 + Ley 21.398)*

| # | Ítem | Estado | Evidencia | Fecha |
|---|------|--------|-----------|-------|
| 3.1 | Términos y Condiciones redactados en lenguaje claro y publicados | ☐ | | |
| 3.2 | T&C no contienen cláusulas abusivas prohibidas por Ley 19.496 | ☐ | | |
| 3.3 | Canal de reclamo formal disponible para usuarios (genera número de seguimiento) | ☐ | | |
| 3.4 | Disclaimers visibles: la IA es orientativa, no toma decisiones ni certifica elegibilidad | ☐ | | |
| 3.5 | Sistema claramente identificado como herramienta de orientación, no servicio oficial del Estado | ☐ | | |
| 3.6 | Información sobre beneficios verificada con fuentes oficiales y actualizada | ☐ | | |
| 3.7 | Precios del servicio (si aplica) claramente informados antes de la contratación | ☐ | | |
| 3.8 | Mecanismo de retracto disponible (10 días) si hay relación comercial | ☐ | | |

---

## BLOQUE 4 — Protección de Adultos Mayores
*(Ley 19.828 + Convención OEA)*

| # | Ítem | Estado | Evidencia | Fecha |
|---|------|--------|-----------|-------|
| 4.1 | Interfaz cumple estándar WCAG AA mínimo (preferible AAA) | ☐ | | |
| 4.2 | Tipografía mínima 18px en contenido principal | ☐ | | |
| 4.3 | Contraste visual adecuado para personas con baja visión | ☐ | | |
| 4.4 | Lenguaje del chat IA es simple, respetuoso y no paternalista | ☐ | | |
| 4.5 | El sistema no asume incapacidad del usuario por su edad | ☐ | | |
| 4.6 | Números de emergencia visibles (SENAMA 800400035, ChileAtiende 101) | ☐ | | |
| 4.7 | El sistema no puede ser usado para manipular decisiones económicas del adulto mayor | ☐ | | |
| 4.8 | Pruebas de usabilidad realizadas con usuarios adultos mayores reales | ☐ | | |

---

## BLOQUE 5 — IA y Transparencia Algorítmica

| # | Ítem | Estado | Evidencia | Fecha |
|---|------|--------|-----------|-------|
| 5.1 | El sistema informa claramente al usuario que está interactuando con una IA | ☐ | | |
| 5.2 | El sistema NO toma decisiones automáticas vinculantes sobre elegibilidad de beneficios | ☐ | | |
| 5.3 | System prompt del chat IA documentado y revisado legalmente | ☐ | | |
| 5.4 | Filtros de entrada y salida del chat IA implementados y probados | ☐ | | |
| 5.5 | El prompt enviado a la API de Anthropic NO contiene RUT, nombre completo ni datos RSH | ☐ | | |
| 5.6 | Las conversaciones del chat no se almacenan con datos personales identificables | ☐ | | |
| 5.7 | Proceso de actualización periódica de información del sistema definido | ☐ | | |

---

## BLOQUE 6 — Documentación Corporativa

| # | Ítem | Estado | Evidencia | Fecha |
|---|------|--------|-----------|-------|
| 6.1 | Empresa constituida legalmente en Chile (si aplica) | ☐ | | |
| 6.2 | Responsable de Protección de Datos designado (o decisión documentada de no designar) | ☐ | | |
| 6.3 | Registro de todos los contratos con terceros que tratan datos de usuarios | ☐ | | |
| 6.4 | Seguro de responsabilidad civil profesional evaluado | ☐ | | |
| 6.5 | Revisión legal por abogado especializado en datos y tecnología completada | ☐ | | |

---

## FIRMA DE CONFORMIDAD PRE-LANZAMIENTO

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| Responsable Legal | | | |
| Responsable Técnico | | | |
| Responsable del Proyecto | | | |

> **Política:** El sistema no puede lanzarse a producción hasta que todos los ítems de los bloques 1 a 5 estén completados y firmados.

---

*Versión 1.0 — Marzo 2026*
*Revisar ante cambios legales o de funcionalidad del sistema*
