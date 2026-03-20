# Ley N° 21.663 — Marco de Ciberseguridad

## Ficha de la Norma

| Dato | Detalle |
|------|---------|
| Número | 21.663 |
| Publicación | 8 de abril de 2024, Diario Oficial |
| Promulgación | 26 de marzo de 2024 |
| Estado reglamentos | En desarrollo — algunos decretos aún pendientes |
| Organismo fiscalizador | Agencia Nacional de Ciberseguridad (ANCI) — nueva |
| Relevancia para el sistema | **ALTA** — Obliga medidas de seguridad y reporte de incidentes |

---

## Nueva Institucionalidad que Crea la Ley

- **ANCI** (Agencia Nacional de Ciberseguridad): Primera de su tipo en América Latina. Regula, fiscaliza y sanciona a entidades públicas y privadas que brindan servicios esenciales.
- **Consejo Multisectorial sobre Ciberseguridad**
- **Comité Interministerial sobre Ciberseguridad**
- **CSIRT Nacional** (Equipo de Respuesta a Incidentes de Seguridad Informática)

---

## ¿A Quién Aplica la Ley?

La ley distingue dos categorías principales:

### Prestadores de Servicios Esenciales (PSE)
Servicios críticos para el funcionamiento del país. Incluye organismos del Estado y concesionarios de derecho público.

### Operadores de Importancia Vital (OIV)
Empresas privadas que la ANCI puede calificar como vitales por el impacto que tendría una interrupción de sus servicios.

### ¿Aplica al sistema de este proyecto?
Para el sistema de orientación a adultos mayores, **es probable que no sea calificado como PSE ni OIV en un inicio**. Sin embargo:

- Las **obligaciones generales** de ciberseguridad aplican a toda empresa que preste servicios digitales
- Si el sistema escala y es adoptado por municipios u organismos del Estado, podría ser calificado como OIV
- Los principios de la ley son buena práctica obligatoria independientemente de la clasificación

---

## Obligaciones Generales (Aplicables al Sistema)

### Obligaciones que aplican a todos los prestadores de servicios digitales:

**1. Implementar medidas de protección de la información**
- Proteger la confidencialidad, integridad y disponibilidad de los datos
- Resguardar la propiedad de los datos de los usuarios

**2. Reportar incidentes cibernéticos**
- Notificar a la ANCI ante ataques o incidentes con efectos significativos
- **Plazo: 3 horas** desde que se tiene conocimiento (para PSE/OIV)
- Para el sistema: documentar el proceso aunque no sea PSE/OIV, como buena práctica

**3. Aplicar permanentemente medidas preventivas**
- Implementar protocolos y estándares de seguridad continuos
- No es suficiente con instalar una solución inicial; la seguridad es un proceso

---

## Obligaciones Específicas para OIV (Referencia para Escalar)

Si el sistema fuera calificado OIV en el futuro, deberá además:

| Obligación | Descripción |
|-----------|-------------|
| **SGSI** | Implementar Sistema de Gestión de Seguridad de la Información (ISO 27001 o equivalente) |
| **Plan de Continuidad** | Elaborar e implementar planes de continuidad operacional y ciberseguridad |
| **Revisiones periódicas** | Ejercicios, simulacros y análisis de redes y sistemas informáticos |
| **Certificaciones** | Obtener certificaciones de ciberseguridad que defina la ANCI por reglamento |
| **Capacitación** | Programas de formación continua para trabajadores, incluyendo campañas de ciberhigiene |
| **Reducción de impacto** | Medidas para reducir propagación de incidentes |

---

## Principios de Ciberseguridad que Rigen el Sistema

La Ley 21.663 establece principios que toda organización debe observar:

1. **Control de daños** — minimizar el impacto de incidentes cuando ocurren
2. **Coordinación con la autoridad** — colaborar con ANCI y CSIRT ante incidentes
3. **Respuesta responsable** — actuar de forma diligente y documentada
4. **Seguridad informática** — mantener niveles adecuados de protección
5. **Racionalidad** — las medidas deben ser proporcionales al riesgo
6. **Seguridad y privacidad por defecto y desde el diseño** — alineado con Ley 21.719

---

## Sistema de Gestión de Seguridad de la Información (SGSI)

El estándar recomendado por la ley y la práctica internacional es **ISO/IEC 27001**.

### Componentes mínimos de un SGSI para el sistema:

```
SGSI Básico para Sistema IA Adultos Mayores
│
├── Política de Seguridad de la Información
│   └── Documento formal que define el compromiso de la organización
│
├── Gestión de Activos
│   └── Inventario de datos, sistemas y accesos
│
├── Control de Acceso
│   └── Quién puede ver qué datos y por qué
│
├── Criptografía
│   └── Qué datos se cifran y con qué algoritmos
│
├── Seguridad Operacional
│   └── Procedimientos para operación segura del sistema
│
├── Gestión de Incidentes
│   └── Protocolo ante brechas, ataques o anomalías
│
└── Mejora Continua
    └── Auditorías periódicas y ajustes
```

---

## Delitos Informáticos — Ley N° 21.459 (Complementaria)

La Ley 21.459 (Delitos Informáticos, 2022) establece delitos relevantes que el sistema debe conocer:

| Delito | Descripción | Relevancia |
|--------|-------------|-----------|
| Acceso ilícito | Acceder a sistemas sin autorización | Proteger el sistema de intrusiones |
| Interceptación ilícita | Interceptar datos en tránsito | Usar TLS 1.3 en todas las comunicaciones |
| Ataque a la integridad de datos | Alterar, borrar o dañar datos | Logs inmutables, backups |
| Ataque a la integridad de sistemas | Dañar el funcionamiento del sistema | WAF, monitoreo de anomalías |
| Fraude informático | Engaño mediante sistemas | Verificar identidad de usuarios; no usar el sistema para engañar |

**Importante:** Si el sistema sufre un ataque, los administradores no solo deben reportarlo a la ANCI, sino que pueden ser víctimas de un delito penal que debe denunciarse a la PDI/Fiscalía.

---

## Sanciones Ley 21.663

| Tipo | Ejemplos | Consecuencia |
|------|---------|-------------|
| **Leve** | No reportar incidente en plazo | Multa |
| **Grave** | No implementar medidas básicas de seguridad | Multa mayor |
| **Gravísima** | Negligencia que cause daño masivo | Multas máximas + suspensión |

---

## Checklist de Cumplimiento Mínimo

```
☐ Política de Seguridad de la Información documentada
☐ Inventario de activos de información
☐ Control de acceso basado en roles (RBAC)
☐ Cifrado de datos en reposo (AES-256) y en tránsito (TLS 1.3)
☐ Logs de auditoría inmutables
☐ Procedimiento de respuesta a incidentes documentado
☐ Plan de respaldo y recuperación ante desastres
☐ Capacitación básica del equipo en ciberseguridad
☐ Monitoreo continuo de anomalías
☐ WAF (Web Application Firewall) en producción
```

---

*Fuente: Diario Oficial, 8 de abril de 2024; ANCI — anci.gob.cl*
*Versión 1.0 — Marzo 2026*
