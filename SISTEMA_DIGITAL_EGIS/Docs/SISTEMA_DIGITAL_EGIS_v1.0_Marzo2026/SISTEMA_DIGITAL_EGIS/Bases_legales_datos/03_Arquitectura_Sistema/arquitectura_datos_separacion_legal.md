# Arquitectura de Datos — Separación Legal entre Expedientes e IA

## El Problema Central de Diseño

El sistema tiene dos funciones que **no pueden mezclarse**:

```
FUNCIÓN 1: Gestión de expedientes de beneficiarios
→ Contiene datos reales, sensibles, identificables
→ Nunca debe salir del sistema hacia APIs externas con datos personales

FUNCIÓN 2: Chat IA de orientación
→ Trabaja con consultas genéricas y orientación de beneficios
→ Nunca debe recibir datos del expediente individual
```

Esta separación no es solo una buena práctica — es una **obligación legal** bajo el principio de minimización de datos (Ley 21.719) y de confidencialidad del Convenio Marco MINVU.

---

## Regla de Oro del Sistema

> **El prompt que se envía a la API de Anthropic (Claude) NUNCA puede contener datos del expediente de un beneficiario específico.**

Si el funcionario pregunta "¿Qué subsidios aplican para Juan Pérez, RUT 12.345.678-9, que vive en calle X y tiene RSH 4.200?", el sistema **debe separar** la consulta genérica del dato personal:

```
❌ INCORRECTO — enviar a Claude:
"¿Qué subsidios aplican para Juan Pérez, RUT 12.345.678-9, RSH 4.200?"

✅ CORRECTO — el sistema procesa internamente y envía a Claude:
"¿Qué subsidios habitacionales están disponibles para personas
con RSH bajo 6.000 puntos que necesitan reconstrucción de vivienda?"
```

La IA responde con información genérica. El sistema interno cruza esa respuesta con el expediente del beneficiario para presentar la orientación personalizada al funcionario — pero ese cruce ocurre en el backend interno, nunca en la API de Anthropic.

---

## Diagrama de Separación de Datos

```
CAPA 1: BASE DE DATOS INTERNA (DATOS REALES)
┌────────────────────────────────────────────────────┐
│  Expediente Juan Pérez                             │
│  - RUT: 12.345.678-9           CIFRADO AES-256     │
│  - RSH: 4.200                                      │
│  - Dirección: Calle X          ACCESO SOLO         │
│  - Ahorro: $800.000            USUARIOS INTERNOS   │
│  - Estado: En postulación                          │
└────────────────────────────────────────────────────┘
            │
            │ NUNCA cruza esta frontera hacia Claude
            │
════════════╪════════════════════════════════════════
            │          FRONTERA DE PRIVACIDAD
════════════╪════════════════════════════════════════
            │
            ▼
CAPA 2: MOTOR DE CONSULTA INTERNO
┌────────────────────────────────────────────────────┐
│  Traduce: "¿Qué subsidio aplica a este expediente?"│
│  En parámetros anónimos:                           │
│  - Rango RSH: bajo 5.000                           │
│  - Tipo necesidad: reconstrucción                  │
│  - Región: [sin identificar persona]               │
└────────────────────────────────────────────────────┘
            │
            ▼
CAPA 3: API ANTHROPIC / CLAUDE
┌────────────────────────────────────────────────────┐
│  Recibe: parámetros anónimos                       │
│  Responde: información general sobre subsidios     │
│  NO sabe: quién es el beneficiario                 │
└────────────────────────────────────────────────────┘
            │
            ▼
CAPA 4: RESPUESTA INTEGRADA (INTERNO)
┌────────────────────────────────────────────────────┐
│  El sistema cruza internamente:                    │
│  Respuesta genérica de Claude +                    │
│  Datos del expediente de Juan Pérez               │
│  = Orientación personalizada al funcionario        │
│    (esto nunca sale del sistema interno)           │
└────────────────────────────────────────────────────┘
```

---

## Módulos del Sistema y sus Niveles de Acceso

| Módulo | Qué contiene | Quién accede | Puede conectar con IA |
|--------|-------------|-------------|----------------------|
| **Expediente Social** | RSH, composición familiar, diagnóstico social | Asistente social, coordinador | ❌ No directo |
| **Expediente Legal** | RUT, contratos, notaría, SERVIU | Abogado, coordinador | ❌ No |
| **Expediente Técnico** | Dirección, planos, presupuesto obra | Arquitecto, constructor | ❌ No |
| **Seguimiento** | Estado del proyecto, hitos, fechas | Todos los roles | ⚠️ Solo fechas/hitos anónimos |
| **Chat IA** | Consultas genéricas de orientación | Todos los roles | ✅ Sí, sin datos personales |
| **Agenda** | Citas con beneficiarios y funcionarios | Todos los roles | ⚠️ Solo disponibilidad, no datos |
| **Reportes** | Estadísticas agregadas y anonimizadas | Dirección, coordinador | ✅ Sí, datos anonimizados |

---

## Control de Acceso por Roles (RBAC)

El sistema debe implementar estos roles mínimos:

```
ROL: Administrador del Sistema
  └─► Acceso total + gestión de usuarios
  └─► Solo 1-2 personas máximo

ROL: Coordinador EGIS
  └─► Acceso a todos los expedientes (solo lectura de sensibles)
  └─► Puede asignar casos a profesionales
  └─► Ve reportes y seguimiento

ROL: Asistente Social
  └─► Expediente social de sus casos asignados
  └─► No ve expediente legal ni financiero de otros casos

ROL: Arquitecto / Constructor
  └─► Expediente técnico de sus proyectos asignados
  └─► No ve RSH ni datos socioeconómicos

ROL: Abogado / Administrativo
  └─► Expediente legal
  └─► No ve RSH ni diagnóstico social más allá de lo necesario

ROL: Beneficiario (si tiene acceso al sistema)
  └─► Solo SU expediente (lectura)
  └─► Chat IA de orientación
  └─► Estado de SU proyecto
```

---

## Obligaciones Técnicas Derivadas de Esta Arquitectura

### Cifrado
- **En reposo:** AES-256 para todos los campos del expediente
- **En tránsito:** TLS 1.3 en todas las comunicaciones
- **Campos específicos:** RUT y RSH con cifrado de columna en la base de datos (no solo a nivel de disco)

### Logs de Auditoría (Obligatorio — Ley 21.663 + responsabilidad MINVU)
Cada log debe registrar:
```
TIMESTAMP | USUARIO_ID | ROL | ACCIÓN | EXPEDIENTE_ID | IP_ORIGEN | RESULTADO
```
Ejemplos de acciones a registrar:
- Visualización de expediente sensible
- Modificación de cualquier campo
- Exportación de datos
- Intento de acceso denegado
- Consulta al chat IA con qué parámetros

Los logs deben ser **inmutables** — ni siquiera el administrador puede borrarlos. Almacenar en sistema separado o con firma criptográfica.

### Sesiones
- Expiración automática de sesión tras **15-30 minutos** de inactividad
- Cierre de sesión obligatorio al cerrar el navegador
- No más de una sesión activa simultánea por usuario (opcional pero recomendado)

### Respaldo
- Respaldo completo diario cifrado
- Respaldo incremental cada hora para datos en proceso
- Prueba de restauración mensual documentada
- Retención de respaldos según política definida (mínimo 5 años para expedientes MINVU)

---

## Retención de Datos — Marco Legal

| Tipo de Dato | Plazo Mínimo de Retención | Base Legal |
|-------------|--------------------------|-----------|
| Expediente completo del beneficiario | 5 años desde cierre del proyecto | D.S. N°49/174 MINVU — responsabilidad ante SERVIU |
| Logs de auditoría | 5 años | Ley 21.663 + responsabilidad civil |
| Conversaciones del chat IA | No más de 90 días (recomendado: 30) | Ley 21.719 — minimización |
| Datos de acceso de usuarios internos | 3 años tras desvinculación | Ley 21.663 |
| Documentos notariales digitalizados | 10 años | Normas de archivo y Código Civil |

**Importante:** Al vencer el plazo, los datos deben eliminarse de forma **irreversible** (no solo "borrados" de la interfaz). Documentar el proceso de eliminación.

---

*Versión 1.0 — Marzo 2026*
*Revisar ante cambios en reglamentos MINVU o legislación de datos*
