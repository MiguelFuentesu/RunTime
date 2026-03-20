# Estándares Técnicos de Seguridad — Cifrado, Autenticación y Protección de la Aplicación

## Marco de Referencia

Este documento define los estándares técnicos mínimos obligatorios para el sistema, basados en:
- **ISO/IEC 27001:2022** — Controles tecnológicos del Anexo A
- **OWASP Top 10:2025** — Vulnerabilidades más críticas en aplicaciones web
- **NIST SP 800-53** — Controles de seguridad y privacidad
- **Ley N°21.663** — Ley Marco de Ciberseguridad Chile
- **Ley N°21.719** — Protección de Datos Personales Chile

---

## MÓDULO 1 — Cifrado

### 1.1 Datos en Reposo (Base de Datos)

| Dato | Algoritmo | Implementación | Obligatorio |
|------|-----------|---------------|-------------|
| RUT | AES-256-GCM | Cifrado a nivel de columna en BD | ✅ Sí |
| RSH / datos socioeconómicos | AES-256-GCM | Cifrado a nivel de columna | ✅ Sí |
| Datos del expediente completo | AES-256-GCM | Cifrado a nivel de columna | ✅ Sí |
| Contraseñas de usuarios | Argon2id | Hash con salt único por usuario | ✅ Sí |
| API Keys y secretos | AES-256 | Variables de entorno cifradas / vault | ✅ Sí |
| Archivos adjuntos (documentos escaneados) | AES-256 | Cifrado en almacenamiento de archivos | ✅ Sí |
| Logs de auditoría | Firma criptográfica HMAC-SHA256 | Firma por lote para detectar alteración | ✅ Sí |

```
❌ PROHIBIDOS para contraseñas: MD5, SHA1, SHA256 sin salt, bcrypt solo (preferir Argon2id)
❌ PROHIBIDOS para datos: DES, 3DES, RC4, AES-128, AES-ECB
✅ CORRECTOS: AES-256-GCM (datos), Argon2id (contraseñas), ChaCha20-Poly1305 (alternativa)
```

### 1.2 Datos en Tránsito (Comunicaciones)

| Canal | Protocolo | Versión | Configuración |
|-------|-----------|---------|--------------|
| Navegador ↔ Servidor web | HTTPS/TLS | **TLS 1.3** (mínimo TLS 1.2) | HSTS habilitado (min-age 1 año) |
| Servidor web ↔ Base de datos | TLS | TLS 1.3 | Certificado mutuo (mTLS) |
| Servidor ↔ API Anthropic | HTTPS/TLS | TLS 1.3 | Verificación de certificado siempre activa |
| Servidor ↔ Proveedor de correo | STARTTLS / TLS | TLS 1.2+ | SPF + DKIM + DMARC en dominio |

**Configuración TLS obligatoria:**
```nginx
# Ejemplo configuración nginx
ssl_protocols TLSv1.3;                          # Solo TLS 1.3
ssl_ciphers TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options nosniff;
add_header X-Frame-Options DENY;
add_header Content-Security-Policy "default-src 'self'";
```

### 1.3 Gestión de Claves Criptográficas

- Las claves de cifrado **nunca se almacenan en el código fuente** ni en el repositorio
- Usar un **gestor de secretos** (HashiCorp Vault, AWS Secrets Manager, o equivalente)
- Rotación de claves: al menos **cada 12 meses** o inmediatamente ante sospecha de compromiso
- Copia de respaldo de claves en lugar físicamente separado y cifrado
- Acceso a claves maestras restringido a máximo 2 personas con MFA

---

## MÓDULO 2 — Autenticación y Control de Acceso

### 2.1 Requisitos de Contraseñas

```
Longitud mínima:        12 caracteres
Complejidad:            mayúsculas + minúsculas + números + símbolos
Prohibiciones:          contraseñas de diccionario, secuencias (123456), nombre del sistema
Expiración:             cada 90 días para usuarios internos con acceso a datos sensibles
Historial:              no reutilizar las últimas 12 contraseñas
Intentos fallidos:      bloqueo temporal tras 5 intentos (incrementar tiempo de bloqueo)
Almacenamiento:         Argon2id (nunca MD5, SHA1 ni bcrypt simple)
```

### 2.2 Autenticación Multifactor (MFA)

**Obligatorio para:**
- ✅ Panel de administración del sistema
- ✅ Acceso a expedientes con datos sensibles (RUT, RSH)
- ✅ Acceso a credenciales del servidor / base de datos
- ✅ Acceso al repositorio de código fuente

**Métodos aceptados (de mayor a menor seguridad):**
1. Llave de seguridad física (FIDO2/WebAuthn) — recomendado para admin
2. App TOTP (Google Authenticator, Authy) — recomendado para usuarios internos
3. SMS — aceptable pero vulnerable a SIM swapping, no recomendado para roles críticos

### 2.3 Control de Acceso por Roles (RBAC)

Principio de **mínimo privilegio**: cada usuario solo puede ver y hacer lo estrictamente necesario para su función.

```
Implementación técnica requerida:
- Verificación de autorización en CADA endpoint de la API (no solo en el frontend)
- Tokens JWT con expiración corta (máx. 1 hora) + refresh token seguro
- Verificación del rol en cada operación de lectura/escritura de datos sensibles
- Logs de acceso por usuario, recurso, timestamp e IP

Prueba obligatoria (OWASP A01:2025 — Broken Access Control):
- Verificar que usuario con rol A no puede acceder a recursos de rol B
  modificando manualmente la URL o el token
- Verificar que endpoints de API retornan 403 para roles no autorizados
```

---

## MÓDULO 3 — OWASP Top 10:2025 — Controles por Vulnerabilidad

El OWASP Top 10:2025 identifica el control de acceso roto (A01) como el riesgo más grave, presente en el 3,73% de las aplicaciones testeadas. La configuración insegura (A02) subió al segundo lugar, y se introducen dos nuevas categorías: fallos en la cadena de suministro de software (A03) y manejo incorrecto de condiciones excepcionales (A10).

### A01:2025 — Control de Acceso Roto *(Riesgo #1)*
**Qué es:** Usuarios pueden acceder a datos o funciones fuera de su perfil de permisos.

**Controles para el sistema:**
```
✅ Verificar autorización en CADA request al servidor (no confiar en el frontend)
✅ Implementar RBAC completo (ver sección 2.3)
✅ No exponer IDs de base de datos secuenciales en URLs (usar UUIDs)
✅ Denegar por defecto — aprobar explícitamente solo lo autorizado
✅ Pruebas de penetración específicas para control de acceso antes de lanzar
```

### A02:2025 — Configuración Insegura *(Riesgo #2)*
**Qué es:** El sistema está configurado incorrectamente, creando vulnerabilidades.

**Controles para el sistema:**
```
✅ Remover todas las cuentas y contraseñas por defecto antes de producción
✅ Deshabilitar listado de directorios en el servidor web
✅ Configurar headers de seguridad HTTP (CSP, HSTS, X-Frame-Options)
✅ Ambiente de producción con configuración diferente al de desarrollo
✅ Mensajes de error genéricos al usuario (nunca mostrar stack traces)
✅ Revisar configuración de seguridad ante cada actualización del sistema
```

### A03:2025 — Fallos en Cadena de Suministro *(NUEVO en 2025)*
**Qué es:** Vulnerabilidades en librerías, dependencias o servicios de terceros.

**Controles para el sistema:**
```
✅ Inventario de todas las dependencias (npm audit, pip-audit o equivalente)
✅ Actualización periódica de dependencias con revisión de cambios
✅ Verificar integridad de paquetes (checksums, firmas)
✅ No usar dependencias sin mantenimiento activo
✅ Revisar permisos que solicita cada librería nueva
✅ Monitoreo de CVEs para las librerías usadas (Dependabot o equivalente)
```

### A04:2025 — Fallos Criptográficos *(Riesgo #4)*
**Qué es:** Cifrado débil, ausente o mal implementado que expone datos sensibles.

**Controles para el sistema:**
```
✅ Usar solo algoritmos del Módulo 1 de este documento
✅ No transmitir datos sensibles en URLs o logs
✅ No almacenar datos sensibles más tiempo del necesario
✅ Cifrado de campos de BD (no solo cifrado de disco)
✅ Verificar que TLS está activo en TODOS los endpoints, incluidos internos
```

### A05:2025 — Inyección *(Riesgo #5)*
**Qué es:** SQL Injection, XSS, command injection — código malicioso insertado en el sistema.

**Controles para el sistema:**
```
✅ Usar ORM con queries parametrizadas (NUNCA concatenar SQL con datos del usuario)
✅ Validar y sanitizar TODOS los inputs en el servidor (no solo en el frontend)
✅ Escape de output al renderizar HTML (prevención XSS)
✅ Content Security Policy (CSP) configurado en headers
✅ Pruebas automáticas de SQL injection en pipeline CI/CD

Ejemplo CORRECTO (Node.js con Prisma/ORM):
  const user = await prisma.expediente.findUnique({ where: { rut: inputRut } });

Ejemplo INCORRECTO (vulnerable a SQL injection):
  const result = await db.query(`SELECT * FROM expedientes WHERE rut = '${inputRut}'`);
```

### A07:2025 — Fallos de Autenticación *(Riesgo #7)*
**Qué es:** Mecanismos de autenticación débiles que permiten acceso no autorizado.

**Controles para el sistema:**
```
✅ MFA obligatorio (ver sección 2.2)
✅ Bloqueo temporal tras intentos fallidos de login
✅ Tokens de sesión seguros (entropy alta, HttpOnly, Secure, SameSite=Strict)
✅ Expiración de sesión por inactividad (15-30 minutos)
✅ Invalidación de sesiones activas al cambiar contraseña
✅ Recuperación de contraseña por canal seguro (no revelar si email existe)
```

### A09:2025 — Fallos de Logging y Alertas *(Riesgo #9)*
**Qué es:** Sin logs o logs inadecuados que impiden detectar y responder a incidentes.

**Controles para el sistema:**
```
✅ Registrar: login/logout, acceso a expedientes sensibles, modificaciones, errores
✅ NO registrar: contraseñas, RUTs completos, RSH en texto plano en logs
✅ Logs con timestamp UTC, IP, usuario_id, acción, resultado
✅ Almacenamiento de logs en sistema separado (no el mismo servidor)
✅ Firma criptográfica de logs para detectar alteración
✅ Alertas automáticas ante: múltiples logins fallidos, acceso fuera de horario, 
   descarga masiva de expedientes, cambios en configuración
✅ Retención de logs: mínimo 5 años (responsabilidad MINVU)
```

### A10:2025 — Manejo Incorrecto de Condiciones Excepcionales *(NUEVO en 2025)*
**Qué es:** El sistema falla de forma insegura ante errores inesperados.

**Controles para el sistema:**
```
✅ Manejo global de errores que nunca expone información interna al usuario
✅ Mensajes de error genéricos al usuario, detallados solo en logs internos
✅ El sistema falla de forma "cerrada" (fail-closed): ante error, denegar acceso
   NO de forma abierta (fail-open): ante error, permitir acceso
✅ Timeouts en todas las conexiones externas (BD, API Anthropic, correo)
✅ Circuit breakers para servicios externos (si Anthropic no responde, mostrar
   mensaje de error sin romper la sesión ni exponer datos)
```

---

## MÓDULO 4 — Seguridad de la Infraestructura

### 4.1 Arquitectura de Red

```
INTERNET
    │
    ▼
[Cloudflare / CDN + WAF]  ← Primera línea de defensa
    │
    ▼
[Load Balancer / Reverse Proxy]
    │
    ▼
[DMZ — Servidor Web / API]  ← Solo puertos 80/443 expuestos
    │
    ▼
[Red Interna — Servidor de Aplicación]  ← Sin acceso directo desde internet
    │
    ▼
[Red Privada — Base de Datos]  ← NUNCA expuesta a internet
```

### 4.2 WAF (Web Application Firewall)

**Reglas mínimas del WAF:**
- Bloquear patrones de SQL injection conocidos
- Bloquear patrones de XSS
- Rate limiting: máximo 100 requests/minuto por IP (ajustar según uso real)
- Bloquear geolocalización si el sistema es solo para Chile (opcional)
- Alertar ante escaneo de vulnerabilidades (patrones de herramientas como sqlmap, nikto)

### 4.3 Gestión de Parches y Actualizaciones

```
Criticidad CRÍTICA:  Parchear en menos de 48 horas
Criticidad ALTA:     Parchear en menos de 7 días
Criticidad MEDIA:    Parchear en menos de 30 días
Criticidad BAJA:     Incluir en ciclo de actualización mensual
```

**Inventario de componentes a mantener actualizados:**
- Sistema operativo del servidor
- Motor de base de datos
- Framework web (Node.js/Python/etc.)
- Dependencias NPM/pip
- Certificados TLS (renovación automática con Let's Encrypt o equivalente)
- Imagen Docker (si se usa contenedores)

---

## MÓDULO 5 — Gestión de Incidentes de Seguridad

### Clasificación de Incidentes

| Nivel | Descripción | Tiempo de Respuesta | Notificaciones |
|-------|-------------|--------------------|-|
| **CRÍTICO** | Brecha confirmada con datos exfiltrados | Inmediato — 1 hora | Dirección + ANCI (72h) + Afectados |
| **ALTO** | Acceso no autorizado detectado | < 4 horas | Dirección + equipo técnico |
| **MEDIO** | Intento de ataque bloqueado por WAF | < 24 horas | Equipo técnico |
| **BAJO** | Anomalía en logs sin impacto confirmado | < 72 horas | Responsable TI |

### Protocolo de Respuesta a Incidente Crítico (72 horas)

```
HORA 0 — Detección
├── Confirmar el incidente (no actuar sobre falsos positivos)
├── Aislar los sistemas afectados (desconectar de red si es necesario)
├── Preservar evidencia (NO borrar logs, NO apagar abruptamente)
└── Notificar a la dirección

HORA 1-4 — Contención
├── Revocar credenciales comprometidas
├── Activar sistema de respaldo si es necesario
├── Iniciar investigación forense básica
└── Documentar todo con timestamps

HORA 4-24 — Evaluación
├── Determinar alcance: ¿qué datos fueron expuestos?
├── Identificar a los beneficiarios afectados
├── Preparar notificación a la ANCI (plazo legal: 72 horas)
└── Preparar comunicación a afectados

HORA 24-72 — Notificación legal
├── Notificar a la ANCI (obligatorio Ley 21.663 / 21.719)
├── Notificar a beneficiarios afectados (sin demora injustificada)
└── Documentar incidente en el Registro del SGSI

POST-INCIDENTE — Mejora
├── Análisis de causa raíz
├── Implementar controles para evitar recurrencia
└── Actualizar el plan de respuesta a incidentes
```

---

## MÓDULO 6 — Plan de Continuidad Operacional (BCP)

### Objetivos de Recuperación

| Escenario | RTO (tiempo máximo sin servicio) | RPO (máxima pérdida de datos) |
|-----------|----------------------------------|-------------------------------|
| Fallo del servidor web | 4 horas | 0 (sin pérdida de datos) |
| Fallo de base de datos | 8 horas | 1 hora (respaldo horario) |
| Ransomware / fallo total | 24 horas | 24 horas (respaldo diario) |
| Desastre físico (incendio/inundación) | 48 horas | 24 horas |

**RTO** = Recovery Time Objective (cuánto tiempo puede estar el sistema caído)
**RPO** = Recovery Point Objective (cuántos datos podemos permitirnos perder)

### Estrategia de Respaldo

```
RESPALDO DIARIO COMPLETO
├── Horario: 02:00 AM (fuera de horario laboral)
├── Destino: almacenamiento cloud en región distinta (ej. otro datacenter en Chile)
├── Cifrado: AES-256 antes de transferir
├── Retención: 30 días los diarios, 12 meses los semanales, indefinido los anuales
└── Verificación: prueba de restauración mensual documentada

RESPALDO INCREMENTAL HORARIO
├── Solo cambios desde el último respaldo
├── Retención: 7 días
└── Para expedientes activos en proceso
```

---

*Estándares de referencia: ISO 27001:2022, OWASP Top 10:2025, NIST SP 800-53 Rev.5, NIST CSF 2.0*
*Marco legal: Ley N°21.663, Ley N°21.719 — Chile*
*Versión 1.0 — Marzo 2026*
