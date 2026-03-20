# Evaluación de Impacto en la Protección de Datos (EIPD)
## Sistema Digital EGIS — [NOMBRE DE LA EGIS]

> **Clasificación:** CONFIDENCIAL
> **Versión:** 1.0 — Borrador para revisión legal
> **Fecha de elaboración:** [FECHA]
> **Elaborado por:** [NOMBRE Y CARGO]
> **Revisado por:** [ASESOR LEGAL]
> **Aprobado por:** [DIRECTOR/REPRESENTANTE LEGAL]
>
> ⚠️ Este documento debe ser revisado y firmado por un abogado especializado
> en protección de datos antes de su uso como instrumento de cumplimiento.

---

## PARTE 1 — DETERMINACIÓN DE OBLIGATORIEDAD

### ¿Por qué esta EIPD es obligatoria?

La EIPD es obligatoria para tratamientos de alto riesgo para los derechos y libertades de los titulares. El sistema cumple los tres criterios que activan esta obligación simultáneamente:

| Criterio | ¿Aplica? | Justificación |
|----------|---------|---------------|
| Tratamiento a escala de datos sensibles | ✅ Sí | RSH, situación socioeconómica, composición familiar de múltiples beneficiarios |
| Datos de grupos vulnerables | ✅ Sí | Adultos mayores como segmento principal (Ley 19.828 + Convención OEA) |
| Uso de nuevas tecnologías con riesgo potencial | ✅ Sí | IA conversacional, verificación automática de documentos, análisis de perfiles |

**Conclusión:** La EIPD es **obligatoria** bajo la Ley N° 21.719 y no puede omitirse.

**Consecuencia de omitir la EIPD:** Constituye una infracción grave bajo la Ley 21.719, sancionable con hasta 10.000 UTM por falta de medidas de seguridad adecuadas y tratamiento sin base legal válida.

---

## PARTE 2 — DESCRIPCIÓN DEL SISTEMA Y SUS TRATAMIENTOS

### 2.1 Identificación del Responsable del Tratamiento

| Campo | Detalle |
|-------|---------|
| Razón social | [NOMBRE DE LA EGIS] |
| RUT | [RUT] |
| Dirección | [DIRECCIÓN] |
| Representante legal | [NOMBRE] |
| Correo de contacto privacidad | [datospersonales@egis.cl] |
| DPO designado | [NOMBRE o "El representante legal asume este rol"] |

### 2.2 Descripción del Sistema

El sistema es una plataforma digital de gestión interna para la [NOMBRE EGIS], Entidad Patrocinante acreditada ante la SEREMI de Vivienda y Urbanismo de la Región [X], que opera bajo el Convenio Marco N° [número] suscrito con fecha [fecha].

El sistema comprende dos componentes principales:

**Componente A — Chat IA Público (ARIA):**
Asistente virtual de orientación habitacional y social para beneficiarios y público general. Procesa consultas textuales y genera respuestas orientativas basadas en una base de conocimiento verificada.

**Componente B — Intranet de Gestión Interna:**
Sistema de gestión de expedientes, seguimiento de proyectos, agenda y comunicaciones para el equipo profesional de la EGIS. Procesa datos completos de los beneficiarios durante todo el ciclo del proyecto habitacional.

### 2.3 Inventario Completo de Tratamientos de Datos

| ID | Actividad de tratamiento | Datos involucrados | Base legal | Finalidad |
|----|--------------------------|-------------------|-----------|-----------|
| T01 | Registro de beneficiario | Nombre, RUT, fecha nacimiento, dirección | Obligación legal (D.S. N°49) + consentimiento | Gestión del expediente habitacional |
| T02 | Diagnóstico social | Composición familiar, tenencia de vivienda, situación laboral | Obligación legal + consentimiento | Determinar elegibilidad y programa adecuado |
| T03 | Registro RSH | Tramo RSH aportado por el beneficiario | Consentimiento explícito | Verificar elegibilidad preliminar |
| T04 | Expediente de ahorro | Monto, institución, cartola | Obligación legal (D.S. N°49) | Acreditar ahorro mínimo para subsidio |
| T05 | Documentos digitalizados | Cédulas, certificados, contratos | Obligación legal | Conformar expediente para SERVIU |
| T06 | Visitas en terreno | Fotos georreferenciadas, informes de inspección | Interés legítimo + obligación legal | Verificar estado de la vivienda |
| T07 | Comunicaciones | Correo, teléfono, historial de contactos | Consentimiento | Mantener contacto durante el proceso |
| T08 | Log de auditoría | ID usuario, acción, timestamp, IP | Obligación legal (Ley 21.663) | Seguridad y trazabilidad del sistema |
| T09 | Chat IA (consultas públicas) | Texto de consultas (potencialmente con datos) | Consentimiento en términos de uso | Orientación habitacional y social |
| T10 | Análisis de inteligencia | Datos estadísticos agregados y anonimizados | Interés legítimo | Detección de oportunidades de proyecto |

---

## PARTE 3 — EVALUACIÓN DE NECESIDAD Y PROPORCIONALIDAD

### 3.1 ¿Son los datos mínimos necesarios?

Para cada tratamiento, se evaluó si los datos son estrictamente necesarios:

| ID | ¿Son los datos mínimos necesarios? | Medida de minimización aplicada |
|----|-----------------------------------|--------------------------------|
| T01 | ✅ Sí — exigidos por D.S. N°49 MINVU | No se recopilan datos adicionales no exigidos |
| T02 | ✅ Sí — necesario para diagnóstico habitacional | Solo se registra lo relevante para el programa |
| T03 | ⚠️ Parcial — solo el tramo RSH, no el puntaje exacto | El sistema no almacena el puntaje exacto del RSH |
| T04 | ✅ Sí — exigido por el programa | Solo monto y certificación, no movimientos completos |
| T05 | ✅ Sí — exigidos para el expediente SERVIU | Se almacenan solo los documentos del checklist oficial |
| T06 | ✅ Sí — necesario para control de obra | Las fotos se almacenan en el expediente técnico, no en registros separados |
| T07 | ✅ Sí — necesario para el proceso | Solo se almacenan contactos provistos voluntariamente |
| T08 | ✅ Sí — obligatorio por Ley 21.663 | Logs anonimizados donde es posible |
| T09 | ✅ Sí — necesario para el servicio | El chat no solicita datos identificables — se anonimiza automáticamente |
| T10 | ✅ Sí — datos anonimizados y agregados | Nunca se identifican personas individuales en el análisis |

### 3.2 Proporcionalidad del Tratamiento

El volumen y sensibilidad de los datos tratados es proporcional a la finalidad porque:

1. La EGIS está legalmente obligada a recopilar estos datos para cumplir con los requisitos del SERVIU (D.S. N°49 y N°27 del MINVU)
2. Sin estos datos, es imposible prestar el servicio de asistencia técnica habitacional
3. Los datos se usan exclusivamente para el proceso habitacional del beneficiario
4. No se usan para fines comerciales, publicidad ni análisis no relacionados con el proceso

---

## PARTE 4 — IDENTIFICACIÓN Y EVALUACIÓN DE RIESGOS

### 4.1 Metodología de Evaluación

- **Probabilidad:** 1 (muy baja) a 5 (muy alta)
- **Impacto en derechos del titular:** 1 (mínimo) a 5 (severo/irreversible)
- **Riesgo residual = Probabilidad × Impacto** tras aplicar controles

### 4.2 Matriz de Riesgos para los Titulares

| # | Riesgo para el titular | P | I | Riesgo bruto | Control aplicado | Riesgo residual |
|---|----------------------|---|---|-------------|-----------------|----------------|
| R1 | Acceso no autorizado a datos del expediente por tercero externo | 2 | 5 | 10 | Cifrado AES-256 + TLS 1.3 + WAF + Zero Trust | **3** |
| R2 | Filtración de RUT + dirección → riesgo de estafa dirigida al adulto mayor | 2 | 5 | 10 | Cifrado de columna + RBAC + logs | **4** |
| R3 | Funcionario interno accede a datos fuera de su rol | 3 | 4 | 12 | RBAC + log auditoría + alertas automáticas | **4** |
| R4 | Datos del chat enviados a la API de Anthropic con RUT o RSH | 2 | 4 | 8 | Filtro automático pre-modelo que anonimiza RUT | **2** |
| R5 | IA entrega información incorrecta que afecta el proceso del beneficiario | 3 | 4 | 12 | RAG con fuentes verificadas + disclaimer + revisión humana | **4** |
| R6 | Beneficiario no puede ejercer sus derechos ARCO+ | 2 | 3 | 6 | Canal ARCO operativo + proceso documentado | **2** |
| R7 | Datos retenidos más allá del plazo legal | 2 | 3 | 6 | Política retención + eliminación automática | **2** |
| R8 | Brecha de seguridad no detectada oportunamente | 2 | 5 | 10 | SIEM + monitoreo continuo + protocolo 72h | **3** |
| R9 | Uso de datos del expediente para fines no declarados | 1 | 5 | 5 | Política de finalidad + auditoría de acceso | **1** |
| R10 | Datos de beneficiario compartidos entre proyectos sin consentimiento | 2 | 4 | 8 | Control técnico: expediente vinculado solo al proyecto activo | **2** |

**Umbral de aceptabilidad:** Riesgo residual ≤ 4 es aceptable con monitoreo. Los riesgos R2, R3 y R5 con riesgo residual 4 requieren revisión periódica adicional.

### 4.3 Riesgos Específicos por Uso de IA

| Riesgo IA | Descripción | Control |
|-----------|-------------|---------|
| Alucinación con consecuencias legales | La IA inventa un requisito o fecha incorrecta | RAG obligatorio + disclaimer + revisión humana |
| Jailbreak por beneficiario | Usuario intenta extraer información fuera del dominio | Filtros de entrada + system prompt robusto + logs |
| Sesgo en orientación | La IA orienta mejor a usuarios con mejor expresión escrita | Diseño UX inclusivo + evaluación periódica de sesgos |
| Decisión automatizada vinculante | La IA determina elegibilidad sin revisión humana | Prohibición técnica y de policy: la IA sugiere, el profesional decide |

---

## PARTE 5 — MEDIDAS DE MITIGACIÓN

### 5.1 Medidas Técnicas Implementadas

| Medida | Descripción | Referencia técnica |
|--------|-------------|-------------------|
| Cifrado en reposo | AES-256-GCM en columnas sensibles de BD | `02_Seguridad/estandares_tecnicos.md` |
| Cifrado en tránsito | TLS 1.3 en todas las comunicaciones | `02_Seguridad/estandares_tecnicos.md` |
| Control de acceso | RBAC con 9 roles y matriz de 15 recursos | `03_Arquitectura/intranet_seguridad.md` |
| Autenticación fuerte | MFA obligatorio para datos sensibles | `03_Arquitectura/intranet_seguridad.md` |
| Logs inmutables | HMAC-SHA256 + WORM storage + replicación | `03_Arquitectura/intranet_seguridad.md` |
| Filtro pre-IA | Anonimización automática de RUT antes de enviar a Claude | `04_Chat_IA/control_absoluto_ia.md` |
| Monitoreo continuo | SIEM + alertas automáticas ante anomalías | `02_Seguridad/plan_auditoria.md` |
| Pentest anual | Por empresa externa especializada | `02_Seguridad/plan_auditoria.md` |

### 5.2 Medidas Organizacionales Implementadas

| Medida | Descripción | Responsable |
|--------|-------------|-------------|
| DPO designado | [Nombre] asume el rol de Delegado de Protección de Datos | Dirección EGIS |
| Capacitación | Todo el personal capacitado antes del lanzamiento | Coordinador |
| Acuerdos de confidencialidad | Firmados por 100% del personal con acceso al sistema | RRHH |
| DPA con Anthropic | Firmado antes del lanzamiento | Dirección EGIS |
| DPA con proveedor hosting | Firmado antes del lanzamiento | Dirección EGIS |
| Canal ARCO | Operativo desde el primer día del sistema | Administrativo |
| Política de retención | Documentada y con eliminación programada | Admin TI |
| Protocolo de brechas | Proceso de 72h documentado y probado | Admin TI |

---

## PARTE 6 — DERECHOS DE LOS TITULARES

### 6.1 Cómo se Garantiza Cada Derecho

| Derecho | Mecanismo implementado | Plazo de respuesta | Responsable |
|---------|----------------------|-------------------|-------------|
| Acceso | Formulario web + correo dedicado | 30 días hábiles | [Cargo] |
| Rectificación | Mismo canal + verificación de identidad | 30 días hábiles | [Cargo] |
| Supresión | Evaluación + eliminación técnica verificada | 30 días hábiles | [Cargo] |
| Oposición | Canal ARCO + evaluación de base legal | 30 días hábiles | [Cargo] |
| Portabilidad | Exportación en formato JSON/CSV | 30 días hábiles | Admin TI |
| No decisión automatizada | Control técnico: ninguna acción crítica sin aprobación humana | Inmediato (diseño del sistema) | Admin TI |

---

## PARTE 7 — CONSULTA PREVIA A LA AGENCIA

### ¿Se requiere consulta previa a la Agencia de Protección de Datos?

La obligatoriedad de realizar EIPD en tratamientos de alto riesgo es una práctica estándar en legislaciones como el GDPR europeo, y la Ley 21.719 incorpora el principio de responsabilidad proactiva que exige a los responsables implementar técnicas organizativas adecuadas para demostrar cumplimiento.

Tras la aplicación de los controles descritos en la Parte 5, los riesgos residuales están dentro del umbral de aceptabilidad (≤ 4). **No se requiere consulta previa obligatoria a la Agencia en este momento.**

Sin embargo, se recomienda notificar voluntariamente a la Agencia al iniciar operaciones, como buena práctica de transparencia y para establecer un canal de comunicación proactivo.

---

## PARTE 8 — PLAN DE REVISIÓN

| Evento | Acción requerida |
|--------|-----------------|
| Antes del lanzamiento del sistema | Firma de esta EIPD por dirección + asesor legal |
| Cambio significativo en el sistema (nueva funcionalidad) | Actualizar la EIPD |
| Cambio en la legislación aplicable | Actualizar la EIPD |
| Incidente de seguridad con datos personales | Revisión urgente de la EIPD |
| Revisión periódica | Anual, cada [mes] |

---

## PARTE 9 — FIRMAS Y APROBACIÓN

| Rol | Nombre | RUT | Firma | Fecha |
|-----|--------|-----|-------|-------|
| Representante Legal / Director EGIS | | | | |
| Delegado de Protección de Datos (DPO) | | | | |
| Asesor Legal Externo | | | | |
| Responsable Técnico del Sistema | | | | |

---

*Base legal: Ley N° 21.719, Art. sobre EIPD; Ley N° 19.628 (vigente); Ley N° 21.663*
*Metodología: GDPR Art. 35 (referencia), CNIL DPIA Guide, ISO 29134*
*Versión 1.0 — [FECHA] — CONFIDENCIAL — Documento legal*
