# Intranet EGIS — Arquitectura de Seguridad Ultra Detallada
## Acceso Controlado, Auditoría de Precisión y Modelo de Confianza Cero

> Todo lo que se mueve, lee, modifica o descarga en el sistema queda registrado.
> Sin excepciones. Sin omisiones. Sin privilegios que escapen al log.

---

## Modelo de Seguridad: Zero Trust Architecture (ZTA)

La intranet de la EGIS opera bajo el principio de **Zero Trust**: ningún usuario,
dispositivo ni conexión es confiable por defecto, aunque esté dentro de la red.
Cada acceso se verifica, cada acción se registra, cada privilegio se justifica.

```
PRINCIPIO ZERO TRUST
─────────────────────────────────────────────────────
"Nunca confiar, siempre verificar"

NO existe una zona segura donde un usuario sea
"de confianza automática". Todo acceso requiere:

  1. IDENTIDAD verificada    (¿quién eres?)
  2. DISPOSITIVO autorizado  (¿desde dónde accedes?)
  3. CONTEXTO válido         (¿en qué horario? ¿desde qué IP?)
  4. PERMISO explícito       (¿tienes derecho a ver esto?)
  5. PROPÓSITO registrado    (el sistema registra por qué accediste)
─────────────────────────────────────────────────────
```

---

## Arquitectura de Red de la Intranet

```
INTERNET
    │
    ▼
┌─────────────────────────────────────────────┐
│  CAPA 0 — PERÍMETRO EXTERNO                 │
│  Cloudflare / CDN + WAF industrial          │
│  DDoS protection + IP reputation filtering  │
│  Acceso solo desde IPs autorizadas (lista   │
│  blanca de IPs de las oficinas de la EGIS)  │
└──────────────────┬──────────────────────────┘
                   │ Solo tráfico HTTPS/TLS 1.3
                   ▼
┌─────────────────────────────────────────────┐
│  CAPA 1 — GATEWAY DE IDENTIDAD              │
│  Identity Provider (IdP): Keycloak / Auth0  │
│  • Verifica usuario + MFA antes de pasar    │
│  • Emite token JWT con rol y tiempo de vida │
│  • Registra cada autenticación              │
└──────────────────┬──────────────────────────┘
                   │ Solo usuarios autenticados + MFA
                   ▼
┌─────────────────────────────────────────────┐
│  CAPA 2 — API GATEWAY + POLICY ENGINE       │
│  • Verifica permisos en CADA request        │
│  • Aplica políticas RBAC por recurso        │
│  • Rate limiting por usuario y por rol      │
│  • Registra CADA llamada a la API           │
└──────────────────┬──────────────────────────┘
                   │ Solo requests con token válido y permiso
                   ▼
┌──────────────────────────────────────────────────────────┐
│  CAPA 3 — SERVICIOS INTERNOS (Red privada, sin internet) │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  Módulo     │  │  Módulo     │  │  Módulo         │  │
│  │  Expedientes│  │  Visitas    │  │  Documentos     │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  Módulo     │  │  Módulo     │  │  Módulo         │  │
│  │  Beneficia. │  │  Proyectos  │  │  Inteligencia   │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└──────────────────┬───────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  CAPA 4 — BASE DE DATOS (Red aislada)       │
│  PostgreSQL con cifrado de columnas         │
│  NUNCA expuesta a internet                  │
│  Acceso solo desde servicios internos       │
│  con credenciales rotativas                 │
└─────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  CAPA 5 — SISTEMA DE LOGS INMUTABLES        │
│  Servidor separado, solo escritura          │
│  Firma criptográfica HMAC-SHA256 por lote   │
│  Retención: 5 años mínimo                   │
│  Acceso: solo Admin + Auditor (con MFA)     │
└─────────────────────────────────────────────┘
```

---

## Sistema de Roles — Matriz de Acceso Ultra Detallada

### Roles del Sistema

| ID Rol | Nombre | Descripción |
|--------|--------|-------------|
| R00 | Super Admin | Administración del sistema — máximo 2 personas |
| R01 | Director EGIS | Visión completa de operaciones y reportes |
| R02 | Coordinador General | Gestión de proyectos, equipos y expedientes |
| R03 | Asistente Social | Expediente social y contacto con beneficiarios |
| R04 | Arquitecto | Expediente técnico y visitas en terreno |
| R05 | Abogado / Legal | Expediente legal y contratos |
| R06 | Administrativo | Agenda, comunicaciones y datos de contacto |
| R07 | Auditor Interno | Solo lectura de logs — sin acceso a expedientes |
| R08 | IA Interna (sistema) | Rol técnico — acceso de solo lectura a datos anonimizados |

---

### Matriz de Permisos por Módulo

**Leyenda:** ✅ Acceso total | 📖 Solo lectura | ✏️ Edición propia | ❌ Sin acceso | 🔔 Solo alertas

| Módulo / Recurso | R00 | R01 | R02 | R03 | R04 | R05 | R06 | R07 | R08 |
|-----------------|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| **Expediente social completo** | ✅ | 📖 | 📖 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Expediente técnico** | ✅ | 📖 | 📖 | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Expediente legal** | ✅ | 📖 | 📖 | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **RUT de beneficiarios** | ✅ | 📖 | 📖 | 📖 | ❌ | 📖 | ❌ | ❌ | ❌ |
| **RSH / datos socioeconómicos** | ✅ | 📖 | 📖 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Datos de contacto beneficiario** | ✅ | 📖 | 📖 | ✅ | ✏️ | ❌ | ✅ | ❌ | ❌ |
| **Agenda y visitas** | ✅ | 📖 | ✅ | ✏️ | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Documentos escaneados** | ✅ | 📖 | 📖 | ✏️ | ✏️ | ✏️ | ❌ | ❌ | ❌ |
| **Panel de oportunidades** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Reportes estadísticos** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Chat IA interno** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Gestión de usuarios** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Logs de auditoría** | ✅ | 🔔 | 🔔 | ❌ | ❌ | ❌ | ❌ | 📖 | ❌ |
| **Base de conocimiento RAG** | ✅ | 📖 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Credenciales del sistema** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## Sistema de Auditoría: Máxima Precisión

### Estructura del Registro de Auditoría

Cada evento en el sistema genera exactamente este registro:

```json
{
  "audit_id": "uuid-v4-único",
  "timestamp_utc": "2026-03-20T14:32:17.482Z",
  "timestamp_local": "2026-03-20T11:32:17.482-03:00",
  "session_id": "sess_uuid",
  "user_id": "usr_uuid",
  "user_rol": "R03",
  "user_nombre_display": "AS-001",
  "ip_origen": "190.xxx.xxx.xxx",
  "dispositivo_hash": "sha256_del_user_agent",
  "accion": "EXPEDIENTE_SOCIAL_LECTURA",
  "recurso_tipo": "expediente_social",
  "recurso_id": "exp_uuid",
  "beneficiario_id": "ben_uuid",
  "proyecto_id": "proy_uuid",
  "resultado": "EXITOSO",
  "datos_accedidos": ["nombre", "rsh_tramo", "composicion_familiar"],
  "datos_modificados": null,
  "valor_anterior": null,
  "valor_nuevo": null,
  "duracion_ms": 342,
  "firma_hmac": "sha256_del_registro_completo"
}
```

**Nota de privacidad:** El campo `user_nombre_display` usa un código interno, no el nombre real del funcionario. El nombre real se almacena separado y se cruza solo en investigaciones autorizadas.

---

### Eventos que Generan Registro de Auditoría

**NIVEL CRÍTICO** — Notificación inmediata al R00 y R01

| Código | Evento | Notificación |
|--------|--------|-------------|
| AUD-001 | Login exitoso fuera del horario laboral (antes 7am / después 10pm) | Inmediata |
| AUD-002 | Login exitoso desde IP no reconocida | Inmediata |
| AUD-003 | 3 o más intentos de login fallidos | Inmediata |
| AUD-004 | Acceso a expediente fuera del rol asignado (bloqueado) | Inmediata |
| AUD-005 | Descarga masiva: más de 10 expedientes en 1 hora | Inmediata |
| AUD-006 | Intento de acceso a logs de auditoría sin rol R07 | Inmediata |
| AUD-007 | Modificación de datos críticos (RUT, RSH) | Inmediata |
| AUD-008 | Eliminación de cualquier expediente | Inmediata |
| AUD-009 | Creación de nuevo usuario administrador | Inmediata |
| AUD-010 | Fallo en la firma HMAC de los logs (posible alteración) | Inmediata + escalar |

**NIVEL ALTO** — Revisión dentro de 4 horas

| Código | Evento |
|--------|--------|
| AUD-011 | Exportación de datos a archivo externo |
| AUD-012 | Cambio de contraseña de usuario |
| AUD-013 | Desactivación de MFA |
| AUD-014 | Acceso a expediente de beneficiario no asignado al usuario |
| AUD-015 | Modificación de documentos legales |

**NIVEL ESTÁNDAR** — Revisión en auditoría semanal

| Código | Evento |
|--------|--------|
| AUD-020 | Login exitoso |
| AUD-021 | Logout |
| AUD-022 | Lectura de expediente |
| AUD-023 | Actualización de datos básicos del expediente |
| AUD-024 | Creación de nueva visita en terreno |
| AUD-025 | Consulta al chat IA interno |
| AUD-026 | Actualización de la base de conocimiento RAG |

---

### Controles Anti-Manipulación de Logs

Los logs son el registro más crítico del sistema. Si alguien los borra o modifica, la EGIS pierde su capacidad de defenderse ante cualquier investigación.

**Medidas técnicas de inmutabilidad:**

1. **Servidor de logs separado:** Los logs se escriben en un servidor distinto al de la aplicación. El servidor de aplicación puede ESCRIBIR en el servidor de logs, pero no puede LEER ni MODIFICAR registros existentes.

2. **Firma HMAC-SHA256 por lote:** Cada lote de 100 registros se firma criptográficamente. Si alguien altera un registro, la firma no coincide y el sistema genera alerta AUD-010.

3. **Write-Once Storage:** El almacenamiento de logs usa tecnología WORM (Write Once, Read Many) — imposible modificar o borrar lo escrito.

4. **Replicación en tiempo real:** Los logs se replican a un segundo servidor en ubicación diferente. Ambos deben coincidir en todo momento.

5. **Acceso con doble factor:** Solo el Auditor Interno (R07) puede leer los logs, y solo con MFA activo. El Super Admin puede leer pero no modificar.

---

## Política de Sesiones y Dispositivos

### Sesiones

| Parámetro | Valor | Razón |
|-----------|-------|-------|
| Duración máxima de sesión activa | 8 horas | Jornada laboral completa |
| Inactividad máxima | 15 minutos | Prevenir acceso desde escritorio abandonado |
| Sesiones simultáneas permitidas | 1 | Detectar uso compartido de credenciales |
| Tiempo de bloqueo tras 3 intentos | 30 minutos, luego 2 horas, luego bloqueo permanente | Fuerza bruta |
| Re-autenticación para datos críticos | Siempre (RUT, RSH, documentos legales) | Capa adicional |

### Dispositivos Autorizados

Cada usuario debe registrar sus dispositivos antes de acceder al sistema:

```
REGISTRO DE DISPOSITIVO
─────────────────────────────────────
Dispositivo: [nombre del equipo]
Hash de fingerprint: [calculado automáticamente]
Usuario propietario: [ID usuario]
Fecha de registro: [fecha]
Autorizado por: [R00 o R02]
Estado: Activo / Suspendido / Revocado
─────────────────────────────────────
```

- Acceso desde dispositivo no registrado → bloqueado + alerta AUD-002
- Máximo 2 dispositivos por usuario (PC de oficina + laptop o tablet)
- Dispositivos de usuarios desvinculados: revocación inmediata

---

## Panel de Monitoreo en Tiempo Real (Solo R00 y R07)

El panel muestra en tiempo real:

```
DASHBOARD DE SEGURIDAD — INTRANET EGIS
════════════════════════════════════════════════════
USUARIOS ACTIVOS AHORA: 4
  └─► AS-001 (R03) — Expediente social — 14:32
  └─► ARQ-001 (R04) — Visitas — 14:28
  └─► ADM-001 (R06) — Agenda — 14:15
  └─► COORD-001 (R02) — Panel proyectos — 14:30

ALERTAS HOY: 2
  🔴 AUD-001 — Login fuera horario (01:23 AM) — PENDIENTE
  🟡 AUD-014 — Acceso expediente no asignado — REVISADO

INTENTOS FALLIDOS ÚLTIMAS 24H: 3 (umbral: 5)

ACCIONES CRÍTICAS HOY: 0

INTEGRIDAD DE LOGS: ✅ Verificada (última comprobación: 14:00)
════════════════════════════════════════════════════
```

---

## Onboarding y Offboarding de Usuarios

### Onboarding (nuevo funcionario)

```
DÍA 1
☐ Crear cuenta con rol mínimo necesario (principio mínimo privilegio)
☐ Generar credenciales temporales (primera vez requiere cambio forzado)
☐ Registrar dispositivo(s) autorizado(s)
☐ Activar MFA (obligatorio antes de primer acceso)
☐ Firmar acuerdo de confidencialidad y uso del sistema
☐ Capacitación obligatoria de 30 min en seguridad del sistema
☐ Registrar en el log de usuarios: quién creó la cuenta, fecha, rol, autorización

DÍA 1-5 (período supervisado)
☐ El coordinador revisa los accesos del nuevo usuario diariamente
☐ Ajustar permisos si se detecta acceso innecesario
```

### Offboarding (baja de funcionario)

```
DÍA 0 (mismo día de la baja, antes de que el funcionario se retire)
☐ Revocar TODOS los accesos activos inmediatamente
☐ Invalidar todas las sesiones activas
☐ Revocar certificados MFA
☐ Revocar dispositivos registrados
☐ Cambiar contraseñas de cuentas compartidas que el usuario conocía
☐ Registrar en el log: quién revocó, fecha, motivo (sin detalles personales)
☐ Archivar (no borrar) el historial de actividad del usuario por 5 años
```

**Regla crítica:** La revocación de acceso es el mismo día, no el día siguiente. Cada hora de acceso post-baja es un riesgo.

---

*Estándares: NIST SP 800-207 (Zero Trust), ISO 27001:2022 Controles A.5-A.8, OWASP ASVS Level 3*
*Marco legal: Ley 21.663, Ley 21.719 — Chile*
*Versión 1.0 — Marzo 2026 — CONFIDENCIAL*
