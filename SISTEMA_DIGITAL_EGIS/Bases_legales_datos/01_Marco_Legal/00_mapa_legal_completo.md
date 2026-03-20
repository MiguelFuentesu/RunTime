# 00 — Mapa Legal Completo del Sistema

> **LEER PRIMERO.** Este documento es la brújula legal del proyecto. Resume todas las normativas aplicables, su jerarquía, estado de vigencia y cómo se relacionan entre sí.

---

## 🗺️ Visión General: Leyes que Rigen el Sistema

El sistema está sujeto a **6 capas normativas simultáneas**. Ignorar cualquiera de ellas expone al proyecto a sanciones, responsabilidad civil o cierre.

```
CAPA 1 — Derechos Fundamentales (Constitución + Tratados)
    └─► Derecho a la privacidad, no discriminación, protección grupos vulnerables

CAPA 2 — Protección de Datos Personales
    └─► Ley 21.719 (2026) + Ley 19.628 (vigente hasta 2026)

CAPA 3 — Ciberseguridad
    └─► Ley 21.663 (2024) — Marco Nacional de Ciberseguridad

CAPA 4 — Derechos del Consumidor
    └─► Ley 19.496 + Ley 21.398 (Ley Pro Consumidor)

CAPA 5 — Protección de Adultos Mayores
    └─► Ley 19.828 (SENAMA) + Convención Interamericana OEA

CAPA 6 — Interacción con el Estado Digital
    └─► Ley 21.180 (Transformación Digital) + Ley 19.799 (Firma Electrónica)
```

---

## 📋 Tabla Maestra de Normativas

| # | Ley / Norma | Materia | Estado | Impacto en el Sistema |
|---|-------------|---------|--------|----------------------|
| 1 | **Ley 21.719** | Protección de Datos Personales | Vigente desde dic. 2026 | **CRÍTICO** — Rige todo el tratamiento de datos |
| 2 | **Ley 19.628** | Protección Vida Privada (anterior) | Vigente hasta nov. 2026 | **CRÍTICO** — Aplica hoy durante el desarrollo |
| 3 | **Ley 21.663** | Marco Ciberseguridad | Vigente desde abr. 2024 | **ALTO** — Obliga SGSI y reporte de incidentes |
| 4 | **Ley 19.496** | Protección del Consumidor | Vigente | **ALTO** — Aplica si hay relación comercial |
| 5 | **Ley 21.398** | Pro Consumidor (modifica 19.496) | Vigente | **ALTO** — Derechos digitales del usuario |
| 6 | **Ley 19.828** | Crea SENAMA (adultos mayores) | Vigente | **MEDIO** — Define derechos del segmento |
| 7 | **Conv. Interamericana PM** | Derechos Personas Mayores (OEA) | Ratificada por Chile | **MEDIO** — Estándar de protección internacional |
| 8 | **Ley 21.180** | Transformación Digital del Estado | Vigente desde jun. 2022 | **MEDIO** — Rige si interactúas con trámites estatales |
| 9 | **Ley 19.799** | Firma Electrónica | Vigente | **MEDIO** — Aplica para autenticación y contratos |
| 10 | **Ley 21.459** | Delitos Informáticos | Vigente desde jun. 2022 | **ALTO** — Define responsabilidades penales TI |
| 11 | **DL 3.500 / Ley 20.255** | Previsión social (si orientas en pensiones) | Vigente | **BAJO-MEDIO** — Solo si hay contenido previsional |

---

## ⚖️ Jerarquía de Obligaciones por Urgencia

### 🔴 OBLIGACIONES INMEDIATAS (desde el primer día de desarrollo)

| Obligación | Base Legal | Consecuencia si se omite |
|-----------|-----------|--------------------------|
| Diseñar con Privacy by Design | Ley 21.719 Art. nuevo | Multa hasta 10.000 UTM al lanzar |
| Proteger datos con Ley 19.628 (vigente HOY) | Ley 19.628 | Denuncia ante tribunales civiles |
| No almacenar datos sin consentimiento explícito | Ley 19.628 Art. 4 | Nulidad del tratamiento + indemnización |
| Implementar SGSI básico | Ley 21.663 | Exposición a sanciones ANCI |
| No prometer lo que la IA no puede garantizar | Ley 19.496 Art. 28 | Infracción SERNAC por publicidad engañosa |
| Firmar DPA con Anthropic | Ley 21.719 + 19.628 | Responsabilidad solidaria por datos |

### 🟡 OBLIGACIONES AL LANZAR (antes de publicar el sistema)

| Obligación | Base Legal |
|-----------|-----------|
| Política de Privacidad publicada y accesible | Ley 21.719 |
| Términos y Condiciones claros en lenguaje simple | Ley 19.496 |
| Canal ARCO operativo (Acceso, Rectificación, Cancelación, Oposición) | Ley 21.719 |
| EIPD realizada y documentada | Ley 21.719 (tratamiento de datos sensibles a escala) |
| Disclaimers visibles: la IA orienta, no decide ni certifica | Ley 19.496 + responsabilidad civil |
| Mecanismo de reclamo o sugerencia del usuario | Ley 19.496 |
| Protocolo de notificación de brechas documentado | Ley 21.663 (72h a ANCI) + Ley 21.719 |
| Registro de actividades de tratamiento de datos | Ley 21.719 |

### 🟢 OBLIGACIONES OPERATIVAS (durante la vida del sistema)

| Obligación | Base Legal | Frecuencia |
|-----------|-----------|-----------|
| Auditorías de seguridad | Ley 21.663 | Al menos anual |
| Actualizar información de beneficios y leyes | Ley 19.496 (información veraz) | Continua |
| Responder solicitudes ARCO | Ley 21.719 | Máx. 30 días hábiles |
| Capacitar personal en protección de datos | Ley 21.663 | Periódica |
| Revisar y actualizar Política de Privacidad | Ley 21.719 | Ante cambios |

---

## 🚫 Líneas Rojas — Lo que el Sistema NUNCA Puede Hacer

Estas acciones constituyen infracciones graves o delitos bajo la ley chilena:

1. **Almacenar o transmitir el RSH (Registro Social de Hogares)** del usuario sin autorización expresa del Ministerio de Desarrollo Social. Solo puede orientarse al usuario a consultar sus propios datos mediante ClaveÚnica.

2. **Hacer promesas de elegibilidad a beneficios** que solo el Estado puede determinar. Ej.: "Usted califica para el subsidio X" — esto puede constituir publicidad engañosa (Ley 19.496 Art. 28).

3. **Tratar datos sensibles sin consentimiento explícito** diferenciado: situación socioeconómica, salud, origen étnico.

4. **Guardar conversaciones con datos personales** identificables en logs sin consentimiento y sin cifrado.

5. **Transferir datos a Anthropic o cualquier tercero** sin que el usuario lo sepa y sin DPA vigente.

6. **Presentarse como servicio oficial del Estado** o insinuar afiliación con SENAMA, MINVU, MINDES u otro organismo sin convenio formal.

7. **Cobrar por orientación a beneficios del Estado** que son gratuitos por naturaleza — puede configurar estafa o infracción al consumidor.

8. **No informar que el interlocutor es una IA** — el usuario siempre debe saber que está hablando con un sistema automatizado.

---

## 🔗 Relación Entre las Leyes y el Sistema

```
Usuario adulto mayor
        │
        ▼
[SISTEMA WEB con IA]
        │
        ├──► Recopila datos → Ley 21.719 / 19.628 (consentimiento, minimización)
        │
        ├──► Almacena datos → Ley 21.663 (ciberseguridad, cifrado, SGSI)
        │
        ├──► Entrega información → Ley 19.496 (veracidad, no engaño)
        │
        ├──► Atiende a adulto mayor → Ley 19.828 + Convención OEA (protección especial)
        │
        ├──► Orienta a trámites → Ley 21.180 (conocer el ecosistema digital del Estado)
        │
        └──► Usa IA de tercero (Anthropic) → Ley 21.719 Art. encargado tratamiento (DPA)
```

---

## 📌 Vacíos Legales que Debes Monitorear

Chile aún **no tiene una ley específica de IA**, pero hay proyectos en tramitación. Los puntos grises son:

- **Responsabilidad por errores de la IA:** Por ahora aplica responsabilidad civil general (Código Civil) y Ley del Consumidor. Diseñar disclaimers claros es la única protección disponible hoy.
- **Decisiones automatizadas:** La Ley 21.719 introduce el derecho a no ser objeto de decisiones basadas **exclusivamente** en tratamiento automatizado. El sistema debe asegurarse de que la IA no toma decisiones, solo informa.
- **Regulación específica de IA para grupos vulnerables:** En tramitación a nivel parlamentario. Monitorear.

---

*Documento maestro — actualizar ante cambios legislativos*
*Versión 1.0 — Marzo 2026*
