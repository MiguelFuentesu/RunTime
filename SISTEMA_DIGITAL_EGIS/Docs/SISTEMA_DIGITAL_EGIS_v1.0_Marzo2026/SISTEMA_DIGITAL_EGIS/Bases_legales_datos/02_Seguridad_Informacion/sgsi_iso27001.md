# Sistema de Gestión de Seguridad de la Información (SGSI)
## Basado en ISO/IEC 27001:2022 — Aplicado al Sistema Digital EGIS

---

## 1. Por Qué ISO 27001:2022 es el Estándar Correcto

La ISO 27001 es una norma internacional que define los requisitos para establecer, implementar, mantener y mejorar un Sistema de Gestión de Seguridad de la Información (SGSI). A diferencia de otros enfoques centrados en herramientas específicas, propone una visión sistémica basada en procesos, controles organizacionales y cultura de mejora continua.

Para el sistema de la EGIS, esta norma es la elección correcta por tres razones concretas:

1. **Cumplimiento legal directo:** La Ley Marco de Ciberseguridad (Ley N° 21.663) exige que las organizaciones demuestren controles efectivos de seguridad de la información, gobernanza y gestión de riesgos. La forma más reconocida internacionalmente de cumplir estas exigencias es implementando un SGSI según la norma ISO/IEC 27001.

2. **Versión 2022 cubre privacidad:** La versión más reciente ISO 27001/27002:2022 agrega controles de protección a la privacidad, adicionalmente a la seguridad de la información y ciberseguridad. Esto alinea directamente con la Ley 21.719.

3. **No requiere certificación inmediata:** La Ley Marco exige demostrar cumplimiento real, no solo un sello. Es posible implementar el SGSI en módulos con resultados verificables, avanzando por etapas.

---

## 2. Los 4 Dominios del SGSI (Estructura ISO 27001:2022)

Los controles del Anexo A de ISO 27001:2022 se reorganizaron en 4 categorías clave:

```
┌─────────────────────────────────────────────────────────┐
│           SGSI — ISO 27001:2022                         │
│                                                         │
│  DOMINIO 1          DOMINIO 2          DOMINIO 3        │
│  Controles          Controles          Controles        │
│  Organizacionales   de Personas        Físicos          │
│  (políticas,        (capacitación,     (acceso físico   │
│  roles, procesos)   concienciación)    a servidores)    │
│                                                         │
│                    DOMINIO 4                            │
│                    Controles Tecnológicos               │
│                    (cifrado, acceso, logs, backups)     │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Implementación por Fases (Modelo Ágil para EGIS)

### FASE 1 — Fundamentos (Semanas 1–4)
*Objetivo: Tener la base documentada y los controles críticos activos*

#### Documentos Obligatorios a Crear
| Documento | Descripción | Prioridad |
|-----------|-------------|-----------|
| **Política de Seguridad de la Información** | Declaración de compromiso de la dirección | 🔴 Crítica |
| **Inventario de Activos** | Qué datos, sistemas y accesos existen | 🔴 Crítica |
| **Evaluación de Riesgos** | Qué puede salir mal y con qué probabilidad | 🔴 Crítica |
| **Plan de Tratamiento de Riesgos** | Cómo se mitiga cada riesgo identificado | 🔴 Crítica |
| **Declaración de Aplicabilidad (SoA)** | Qué controles aplican y por qué | 🟡 Alta |
| **Roles y Responsabilidades** | Quién es responsable de qué | 🟡 Alta |

#### Controles Técnicos Inmediatos a Activar
```
☐ Cifrado AES-256 en base de datos (datos en reposo)
☐ TLS 1.3 en toda comunicación web (datos en tránsito)
☐ Hashing de contraseñas con bcrypt/Argon2 (nunca MD5/SHA1)
☐ Control de acceso por roles (RBAC) activo
☐ Logs de auditoría inmutables funcionando
☐ MFA en panel administrativo
☐ Respaldo automático diario cifrado
```

### FASE 2 — Consolidación (Semanas 5–8)
*Objetivo: Procesos operacionales documentados y probados*

```
☐ Procedimiento de gestión de incidentes documentado y probado
☐ Plan de continuidad operacional (BCP) básico
☐ Proceso de onboarding/offboarding de usuarios internos
☐ Acuerdos de confidencialidad firmados por TODO el personal
☐ Capacitación de ciberseguridad básica para el equipo
☐ Pentest inicial realizado
☐ Monitoreo de anomalías configurado (SIEM básico)
```

### FASE 3 — Madurez (Semanas 9–12)
*Objetivo: Ciclo de mejora continua operativo*

```
☐ Primera auditoría interna del SGSI realizada
☐ Revisión por la dirección documentada
☐ No conformidades identificadas y con plan de corrección
☐ Métricas de seguridad definidas y en seguimiento
☐ Ejercicio de respuesta a incidentes simulado
☐ Plan de certificación ISO 27001 formal evaluado (si aplica)
```

---

## 4. Inventario de Activos — Plantilla para la EGIS

Cada activo debe catalogarse con su valor, propietario y controles:

| ID | Activo | Tipo | Propietario | Confidencialidad | Integridad | Disponibilidad | Valor Total |
|----|--------|------|-------------|-----------------|-----------|----------------|-------------|
| A01 | Base de datos expedientes | Dato | Coordinador | Alta | Crítica | Alta | **Crítico** |
| A02 | RUTs de beneficiarios | Dato | Coordinador | Crítica | Crítica | Media | **Crítico** |
| A03 | Datos RSH | Dato | Coord. Social | Crítica | Crítica | Media | **Crítico** |
| A04 | Contraseñas de usuarios | Dato | Admin TI | Crítica | Crítica | Alta | **Crítico** |
| A05 | Servidor de aplicación | Sistema | Admin TI | Alta | Alta | Crítica | **Alto** |
| A06 | Servidor de base de datos | Sistema | Admin TI | Crítica | Crítica | Alta | **Crítico** |
| A07 | Sistema de respaldo | Sistema | Admin TI | Alta | Crítica | Media | **Alto** |
| A08 | Correos electrónicos internos | Dato | Dirección | Alta | Media | Alta | **Alto** |
| A09 | Documentos escaneados (notaría) | Dato | Legal | Alta | Crítica | Media | **Alto** |
| A10 | Logs de auditoría | Dato | Admin TI | Media | Crítica | Alta | **Alto** |
| A11 | API Key Anthropic | Credencial | Admin TI | Crítica | Crítica | Alta | **Crítico** |
| A12 | Credenciales de hosting/cloud | Credencial | Admin TI | Crítica | Crítica | Alta | **Crítico** |

**Escala de valor:** Crítico (impacto severo si comprometido) > Alto > Medio > Bajo

---

## 5. Matriz de Riesgos — Amenazas Específicas para el Sistema EGIS

### Metodología
- **Probabilidad:** 1 (muy baja) a 5 (muy alta)
- **Impacto:** 1 (despreciable) a 5 (catastrófico)
- **Riesgo = Probabilidad × Impacto**
- **Umbral de aceptación:** ≤ 6 (aceptable), 7–12 (requiere tratamiento), ≥ 15 (inaceptable)

| # | Amenaza | Activo afectado | P | I | Riesgo | Tratamiento |
|---|---------|----------------|---|---|--------|-------------|
| R01 | Acceso no autorizado a expedientes por usuario interno | BD expedientes | 3 | 5 | **15** | RBAC + logs + MFA |
| R02 | Ataque SQL Injection a la base de datos | BD expedientes, RUTs | 3 | 5 | **15** | ORM + validación inputs + WAF |
| R03 | Robo de credenciales de administrador | Todos los activos | 3 | 5 | **15** | MFA + gestor de contraseñas + alerta logins |
| R04 | Ransomware cifra el servidor | Todos los activos | 2 | 5 | **10** | Backups offline + segmentación de red |
| R05 | Filtración de datos RSH por brecha | RSH, RUTs | 2 | 5 | **10** | Cifrado + minimización + DLP |
| R06 | Pérdida de datos por fallo del servidor | BD expedientes | 3 | 4 | **12** | Backups diarios + BCP + redundancia |
| R07 | Phishing a funcionario interno | Credenciales, correo | 4 | 3 | **12** | Capacitación + MFA + filtros correo |
| R08 | Exposición de API Key de Anthropic | Consultas IA | 2 | 4 | **8** | Variables de entorno + rotación periódica |
| R09 | Acceso físico no autorizado al servidor | Servidor físico | 1 | 5 | **5** | Preferir cloud + acceso físico controlado |
| R10 | Datos en logs con información sensible | Logs | 3 | 3 | **9** | Sanitización de logs + no loggear datos sensibles |
| R11 | Expiración sin eliminar datos vencidos | BD histórica | 2 | 3 | **6** | Política retención + eliminación automática |
| R12 | DDoS al sistema web | Disponibilidad | 2 | 3 | **6** | CDN + rate limiting + WAF |

### Riesgos Inaceptables (≥15) — Tratamiento Prioritario
Los riesgos R01, R02 y R03 son inaceptables y deben estar **mitigados antes del lanzamiento**.

---

## 6. Ciclo PDCA — Mejora Continua del SGSI

```
      PLANIFICAR (Plan)
      ┌────────────────┐
      │ - Evaluación   │
      │   de riesgos   │
      │ - Definir      │
      │   controles    │
      └───────┬────────┘
              │
ACTUAR        │         HACER (Do)
(Act)         ▼         ┌──────────────┐
┌──────────┐  ┌──────┐  │ - Implementar│
│ - Mejora │  │      │  │   controles  │
│   de     │◄─┤      ├─►│ - Capacitar  │
│ procesos │  │      │  │   al equipo  │
│ - Nuevos │  └──────┘  │ - Operar el  │
│ controles│     ▲      │   SGSI       │
└──────────┘     │      └──────┬───────┘
                 │             │
         VERIFICAR (Check)     │
         ┌───────────────┐     │
         │ - Auditorías  │◄────┘
         │   internas    │
         │ - Métricas    │
         │ - Revisión    │
         │   dirección   │
         └───────────────┘
```

**Frecuencia mínima por actividad:**
| Actividad | Frecuencia |
|-----------|-----------|
| Revisión de logs de auditoría | Semanal |
| Revisión de accesos activos | Mensual |
| Auditoría interna del SGSI | Semestral |
| Evaluación de riesgos | Anual (o ante cambios) |
| Pentest externo | Anual |
| Revisión por la dirección | Anual |

---

## 7. Métricas de Seguridad (KPIs del SGSI)

Estas métricas deben medirse y reportarse periódicamente a la dirección:

| Métrica | Frecuencia | Meta |
|---------|-----------|------|
| Incidentes de seguridad detectados | Mensual | Tendencia decreciente |
| Tiempo medio de detección de incidentes (MTTD) | Por incidente | < 24 horas |
| Tiempo medio de respuesta a incidentes (MTTR) | Por incidente | < 72 horas |
| % solicitudes ARCO respondidas en plazo | Mensual | 100% |
| % usuarios con MFA activo | Mensual | 100% |
| Días desde último pentest | Mensual | < 365 días |
| % del personal capacitado en ciberseguridad | Semestral | 100% |
| % de respaldos verificados exitosamente | Mensual | 100% |
| Vulnerabilidades críticas sin parchear | Mensual | 0 |

---

*Estándar de referencia: ISO/IEC 27001:2022, ISO/IEC 27002:2022*
*Marco complementario: NIST Cybersecurity Framework 2.0, Ley N°21.663 (Chile)*
*Versión 1.0 — Marzo 2026*
