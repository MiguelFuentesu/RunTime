# Plan de Auditoría de Seguridad
## Sistema Digital EGIS — Ciclo Anual

---

## Por Qué la Auditoría es Crítica en Este Sistema

Este sistema gestiona datos de categoría sensible (RUT, RSH, situación socioeconómica) de personas adultas mayores en situación de vulnerabilidad. Tres marcos legales obligan a la auditoría:

| Marco | Obligación de auditoría | Consecuencia si no se cumple |
|-------|------------------------|------------------------------|
| Ley 21.663 | Verificación periódica de controles de ciberseguridad | Sanción ANCI |
| Ley 21.719 | Demostrar que los controles de protección de datos funcionan | Multa hasta 10.000 UTM |
| ISO 27001:2022 | Auditoría interna mínimo anual para mantener el SGSI | Pérdida de certificación |

Adicionalmente, el convenio SEREMI/MINVU puede requerir demostrar prácticas de gestión segura de datos de beneficiarios.

---

## Tipos de Auditoría y Frecuencia

```
AUDITORÍA CONTINUA (automatizada, 24/7)
├── Monitoreo de logs de acceso
├── Alertas de anomalías (logins fuera de horario, accesos masivos)
├── Monitoreo de disponibilidad del sistema
└── Escaneo automático de vulnerabilidades en dependencias

AUDITORÍA OPERACIONAL (mensual, interna)
├── Revisión de accesos activos y roles
├── Verificación de respaldos (prueba de restauración)
├── Revisión de incidentes y anomalías del mes
└── Estado de parches y actualizaciones pendientes

AUDITORÍA DE SEGURIDAD INTERNA (semestral, equipo interno)
├── Revisión completa del SGSI
├── Verificación de controles técnicos
├── Revisión de accesos y privilegios
└── Actualización de la evaluación de riesgos

AUDITORÍA EXTERNA / PENTEST (anual, empresa especializada)
├── Pruebas de penetración al sistema web
├── Revisión de configuración de infraestructura
├── Simulación de ataques reales
└── Informe con hallazgos y recomendaciones

AUDITORÍA DE CUMPLIMIENTO LEGAL (anual, asesor externo)
├── Verificación de cumplimiento Ley 21.719
├── Verificación de cumplimiento Ley 21.663
├── Revisión de contratos DPA con terceros
└── Actualización de documentación legal
```

---

## Programa Detallado de Auditoría Mensual Interna

### Checklist Mensual — Seguridad Operacional

**SECCIÓN A: Control de Accesos**

| # | Verificación | Cómo verificar | Resultado | Responsable |
|---|-------------|----------------|-----------|-------------|
| A1 | Lista de usuarios activos vs. personal actual de la EGIS | Comparar BD usuarios con RRHH | ☐ | Admin TI |
| A2 | Usuarios desvinculados con acceso revocado | Verificar no existen sesiones activas de ex empleados | ☐ | Admin TI |
| A3 | Todos los usuarios con acceso a datos sensibles tienen MFA activo | Log de MFA del sistema | ☐ | Admin TI |
| A4 | Ningún usuario tiene más permisos de los que necesita | Revisar asignación de roles vs. funciones reales | ☐ | Coordinador |
| A5 | API Keys y credenciales rotadas según política | Registro de última rotación | ☐ | Admin TI |

**SECCIÓN B: Respaldos y Recuperación**

| # | Verificación | Cómo verificar | Resultado | Responsable |
|---|-------------|----------------|-----------|-------------|
| B1 | Respaldo diario ejecutado correctamente los 30 días | Log del sistema de backups | ☐ | Admin TI |
| B2 | Prueba de restauración de respaldo exitosa | Restaurar en ambiente de prueba | ☐ | Admin TI |
| B3 | Respaldos almacenados en ubicación separada del servidor principal | Verificar destino del backup | ☐ | Admin TI |
| B4 | Respaldos cifrados (verificar que no son texto plano) | Intentar leer backup sin clave | ☐ | Admin TI |

**SECCIÓN C: Parches y Actualizaciones**

| # | Verificación | Cómo verificar | Resultado | Responsable |
|---|-------------|----------------|-----------|-------------|
| C1 | Sistema operativo del servidor al día | `apt list --upgradable` o equivalente | ☐ | Admin TI |
| C2 | Dependencias sin vulnerabilidades críticas conocidas | `npm audit` / `pip-audit` | ☐ | Desarrollador |
| C3 | Certificado TLS con más de 30 días de vigencia | Verificar fecha de expiración | ☐ | Admin TI |
| C4 | No existen vulnerabilidades CVSS ≥ 9.0 sin parchear | Escaneo con herramienta automatizada | ☐ | Admin TI |

**SECCIÓN D: Logs y Monitoreo**

| # | Verificación | Cómo verificar | Resultado | Responsable |
|---|-------------|----------------|-----------|-------------|
| D1 | Logs de auditoría del mes íntegros y sin gaps | Verificar continuidad temporal de logs | ☐ | Admin TI |
| D2 | Ningún acceso a expedientes fuera del horario laboral sin justificación | Revisar logs de acceso nocturno/fin de semana | ☐ | Coordinador |
| D3 | Alertas de seguridad revisadas y atendidas | Log del sistema de alertas | ☐ | Admin TI |
| D4 | No hay intentos de acceso a recursos restringidos no investigados | Log de errores 403/401 inusuales | ☐ | Admin TI |

---

## Programa de Auditoría Semestral Interna

### Alcance del SGSI

La auditoría semestral verifica que el SGSI en su conjunto sigue siendo efectivo. Cubre cuatro áreas:

**ÁREA 1: Controles Organizacionales**

| Control a verificar | Método | Evidencia esperada |
|--------------------|--------|--------------------|
| Política de Seguridad vigente y comunicada | Revisión documental + entrevistas | Documento firmado + confirmación del equipo |
| Roles y responsabilidades actualizados | Revisión de documentos de cargo | Matriz RACI actualizada |
| Acuerdos de confidencialidad firmados por todo el personal | Revisión de contratos | 100% del personal con acuerdo vigente |
| Canal ARCO operativo y respondiendo en plazo | Revisar solicitudes recibidas y tiempos de respuesta | Registro de solicitudes ARCO |
| DPA con Anthropic vigente | Verificar contrato | Contrato con fecha vigente |

**ÁREA 2: Controles de Personas**

| Control a verificar | Método | Evidencia esperada |
|--------------------|--------|--------------------|
| 100% del personal capacitado en ciberseguridad básica | Registro de capacitaciones | Certificados o lista de asistencia |
| Simulacro de phishing realizado | Log del ejercicio | Informe de resultados |
| El personal conoce el procedimiento de reporte de incidentes | Entrevistas de verificación | Respuestas correctas al procedimiento |

**ÁREA 3: Controles Tecnológicos**

| Control a verificar | Método | Evidencia esperada |
|--------------------|--------|--------------------|
| Cifrado activo en todos los datos sensibles | Test técnico en BD | Campos cifrados confirmados |
| TLS 1.3 activo en todos los endpoints | SSL Labs / testssl.sh | Calificación A o A+ |
| RBAC funcionando correctamente | Prueba de acceso cruzado entre roles | Denegaciones correctas documentadas |
| Logs íntegros y firma criptográfica válida | Verificación de firma HMAC | Verificación exitosa |
| WAF bloqueando patrones de ataque | Prueba con payloads de prueba | Bloqueos registrados en WAF |
| No hay cuentas inactivas > 90 días con acceso | Query a BD de usuarios | Lista vacía o justificadas |

**ÁREA 4: Evaluación de Riesgos**

| Control a verificar | Método | Evidencia esperada |
|--------------------|--------|--------------------|
| Riesgos identificados con tratamiento activo | Revisión de la matriz de riesgos | Todos los riesgos tienen control activo |
| Nuevos riesgos identificados e incorporados | Reunión de revisión | Acta de reunión y matriz actualizada |
| Incidentes del semestre analizados y con lección aprendida | Revisión de registro de incidentes | Informe de lecciones aprendidas |

---

## Programa de Pentest Anual Externo

### Qué Debe Incluir el Pentest

Un pentest (prueba de penetración) debe ser realizado por empresa especializada externa, independiente del equipo de desarrollo.

**Alcance mínimo del pentest:**

```
PRUEBAS WEB (OWASP Top 10:2025)
├── A01: Pruebas de control de acceso (acceso entre roles, bypass de URL)
├── A02: Revisión de configuración del servidor y headers de seguridad
├── A03: Inventario y verificación de dependencias de terceros
├── A04: Verificación de cifrado en tránsito y reposo
├── A05: SQL Injection, XSS, Command Injection
├── A07: Pruebas de autenticación (fuerza bruta, bypass, session fixation)
├── A08: Pruebas de integridad de datos y tokens
├── A09: Verificación de logging adecuado
└── A10: Pruebas de manejo de errores

PRUEBAS DE INFRAESTRUCTURA
├── Escaneo de puertos expuestos
├── Verificación de servicios innecesarios activos
├── Revisión de configuración de firewall/WAF
└── Verificación de segmentación de red (BD no expuesta a internet)

PRUEBAS DE API
├── Autenticación y autorización en cada endpoint
├── Rate limiting activo
├── Validación de inputs en la API
└── Exposición de información sensible en respuestas
```

### Cómo Seleccionar la Empresa de Pentest

Requisitos mínimos de la empresa contratada:
- Certificaciones: OSCP, CEH o CREST de sus profesionales
- Metodología documentada (PTES, OWASP, NIST)
- Entrega de informe ejecutivo + técnico + plan de remediación
- Firma de NDA antes de iniciar
- Seguro de responsabilidad civil profesional

### Ciclo Post-Pentest

```
SEMANA 1-2: Recibir informe y clasificar hallazgos
├── Críticos: plan de remediación inmediata (< 7 días)
├── Altos: remediación en < 30 días
└── Medios/Bajos: incluir en backlog técnico

SEMANA 3-6: Remediar vulnerabilidades críticas y altas
SEMANA 7-8: Pentest de verificación (retest de hallazgos corregidos)
SEMANA 9: Informe final con estado de todas las vulnerabilidades
```

---

## Registro de Auditorías (Obligatorio)

Cada auditoría debe quedar documentada en el siguiente registro:

| # | Tipo | Fecha | Realizada por | Hallazgos críticos | Estado remediación | Próxima |
|---|------|-------|--------------|-------------------|-------------------|---------|
| 001 | Mensual operacional | | | | | |
| 002 | Semestral SGSI | | | | | |
| 003 | Pentest externo | | | | | |
| 004 | Cumplimiento legal | | | | | |

**Este registro es evidencia ante la ANCI, ante la Agencia de Protección de Datos y ante el MINVU.**

---

## Indicadores de Madurez de Seguridad

Usar esta escala para evaluar el nivel de madurez global del sistema:

| Nivel | Descripción | Indicadores |
|-------|-------------|-------------|
| **1 — Inicial** | Sin procesos definidos, seguridad reactiva | Sin SGSI, sin auditorías, incidentes sin documentar |
| **2 — Repetible** | Procesos básicos, pero informales | Algunos controles activos, sin métricas |
| **3 — Definido** | Procesos documentados y seguidos | SGSI documentado, auditorías regulares, métricas básicas |
| **4 — Gestionado** | Procesos medidos y controlados | Métricas de seguridad seguidas, mejora continua activa |
| **5 — Optimizado** | Mejora continua sistemática | Certificación ISO 27001, madurez demostrable |

**Meta para el lanzamiento:** Nivel 3 mínimo.
**Meta a 12 meses:** Nivel 4.

---

*Referencia: ISO 27001:2022 Cláusula 9 (Evaluación del desempeño), NIST CSF 2.0*
*Herramientas recomendadas para pentest: OWASP ZAP, Burp Suite, Nessus, testssl.sh*
*Versión 1.0 — Marzo 2026*
