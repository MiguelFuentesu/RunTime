# EGIS Design System v1.0
## Norma de construcción visual — Sistema Digital EGIS
> **Este documento es LEY en todas las sesiones de desarrollo.**
> Antes de escribir cualquier línea de CSS o HTML, leer este archivo.
> Versión: 1.0 · Marzo 2026 · Autor: Claude + Miguel Fuentes

---

## 1. CONTEXTO Y PROPÓSITO

El sistema tiene dos interfaces con identidades distintas pero misma base visual:

| Interfaz | Usuarios | Tono |
|---|---|---|
| **ARIA** (chat público) | Beneficiarios, adultos mayores, bajo nivel digital | Cálido, simple, humano, no gubernamental |
| **Intranet EGIS** | Profesionales (AS, arquitectos, abogados) | Claro, eficiente, profesional, confiable |

### Foco del proyecto
La EGIS se dedica al **mejoramiento habitacional** (reparación, ampliación, eficiencia energética), NO a nueva vivienda. Toda comunicación visual debe reflejar esto.

---

## 2. PALETA CROMÁTICA — FUNDAMENTO PSICOLÓGICO

### Tokens de color (CSS variables canónicas)

```css
:root {
  /* — Verdes — */
  --verde:          #3D7A5C;
  --verde-claro:    #E8F4EE;
  --verde-medio:    #6BA888;
  --verde-oscuro:   #1E4D38;
  --verde-profundo: #102D21;

  /* — Tierras — */
  --tierra:         #C17F4A;
  --tierra-claro:   #F5E6D3;
  --tierra-medio:   #E0A876;
  --tierra-oscuro:  #8A5530;

  /* — Cremas — */
  --crema:          #FAF6F0;
  --crema-medio:    #F0E8DC;
  --crema-oscuro:   #DDD0BF;

  /* — Texto — */
  --texto:          #2C2420;
  --texto-suave:    #6B5C52;
  --texto-tenue:    #A89088;
}
```

### Semántica de cada color

| Color | Rol | Por qué |
|---|---|---|
| `--verde-oscuro` `#1E4D38` | Header, footer, elementos de autoridad | Transmite oficialidad y confianza sin la frialdad del azul gubernamental |
| `--verde` `#3D7A5C` | Elementos activos, íconos, acentos | Esperanza, naturaleza, calma — reduce ansiedad del usuario en situación vulnerable |
| `--tierra` `#C17F4A` | CTA principal, acciones, badges de urgencia | Calidez, hogar, confort — cultura latinoamericana asocia terracota con vivienda |
| `--crema` `#FAF6F0` | Fondo principal | Nunca blanco puro (frío/clínico). Crema evoca papel, calidez, lo hecho a mano |
| `--texto` `#2C2420` | Cuerpo de texto | Casi negro con tono cálido, nunca negro puro |

### Reglas de uso de color
- **Fondo principal:** siempre `--crema`, nunca `#ffffff`
- **CTA principal:** siempre `--tierra` sobre fondo claro; `--verde-oscuro` sobre fondo oscuro
- **Bordes:** `--crema-oscuro` en reposo, `--tierra` en hover/focus
- **Texto sobre fondos oscuros:** `rgba(255,255,255,0.9)` para primario, `rgba(255,255,255,0.6)` para secundario, `rgba(255,255,255,0.4)` para terciario
- **Alertas/disclaimers:** fondo `--tierra-claro`, borde `rgba(193,127,74,.25)`, texto `--tierra-oscuro`
- **PROHIBIDO:** gradientes de púrpura, azul corporativo (#0055B3 o similar), verde lima, paletas "tech startup"

---

## 3. TIPOGRAFÍA

### Fuentes del sistema

```html
<!-- Incluir siempre en <head> -->
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,300;1,9..144,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
```

| Variable | Fuente | Uso |
|---|---|---|
| `--font-display` | Fraunces, Georgia, serif | Títulos H1, H2, elementos emocionales |
| `--font-body` | DM Sans, system-ui, sans-serif | Todo el resto — interfaz, botones, labels |

### Escala tipográfica

```css
/* ARIA (público — accesibilidad máxima) */
h1: Fraunces 300, 32px, line-height 1.2
h2: Fraunces 300, 22px, line-height 1.3
h3 (card): DM Sans 500, 14px, line-height 1.3
body: DM Sans 400, 16px, line-height 1.6  ← MÍNIMO 16px siempre
label/eyebrow: DM Sans 400, 11px, uppercase, letter-spacing 2px
caption/disclaimer: DM Sans 400, 11-12px, line-height 1.5

/* Intranet (profesional) */
h1: Fraunces 300, 28px
h2: DM Sans 500, 18px
body: DM Sans 400, 14px  ← puede ser 14px en intranet (usuarios jóvenes)
```

### Reglas tipográficas
- En ARIA, texto mínimo es 16px — adultos mayores con visión reducida
- `em` en itálica de Fraunces es la firma visual del proyecto (ej: `<h1>Mejora tu <em>vivienda</em>`)
- Nunca usar Inter, Roboto, Arial, o Space Grotesk — son genéricos
- Peso 300 (light) para display + 500 para UI. Nunca 700 (pesado)

---

## 4. ESPACIADO Y LAYOUT

```css
--sp-xs:   6px;   /* Entre elementos del mismo grupo */
--sp-sm:  12px;   /* Padding interno de chips/badges */
--sp-md:  20px;   /* Padding de sección, gap de grid */
--sp-lg:  32px;   /* Padding de secciones grandes */
--sp-xl:  56px;   /* Espacio entre secciones mayores */
```

### Layout ARIA (mobile-first)
- **Max width:** 440px centrado (experiencia de app)
- **Padding lateral:** 20px constante
- **Grid de opciones:** 2 columnas, gap 10px
- **Botones táctiles:** mínimo 44×44px (WCAG 2.1)
- En desktop: `max-width: 440px; margin: 0 auto; box-shadow: 0 0 60px rgba(0,0,0,.15)`

### Layout Intranet
- **Max width:** 1280px
- **Sidebar:** 240px fijo
- **Contenido:** fluid con padding 24px

---

## 5. COMPONENTES BASE

### Border radius
```css
--r-sm:   8px;   /* Chips, badges pequeños */
--r-md:  14px;   /* Cards compactas, inputs */
--r-lg:  20px;   /* Cards principales */
--r-xl:  28px;   /* Frames grandes (chat) */
--r-full: 9999px; /* Pills, botones redondeados */
```

### Sombras
```css
--shadow-sm: 0 2px 8px rgba(44,36,32,.07);   /* Hover estados */
--shadow-md: 0 6px 24px rgba(44,36,32,.10);  /* Cards activas */
--shadow-lg: 0 16px 48px rgba(44,36,32,.13); /* Modales, frames */
```

### Botón CTA Principal
```css
background: var(--tierra);
color: #fff;
border-radius: var(--r-md);
padding: 14px 24px;
font-size: 15px;
font-weight: 500;
transition: all .22s cubic-bezier(.4,0,.2,1);
/* hover: background --tierra-oscuro, transform: translateY(-2px) */
```

### Card de opción rápida
```css
background: #fff;
border: 1.5px solid var(--crema-oscuro);
border-radius: var(--r-lg);
padding: 18px 14px;
/* hover: border-color --tierra, background --tierra-claro, translateY(-3px) */
```

### Inputs / Chat input
```css
background: var(--crema);
border: 1.5px solid var(--crema-oscuro);
border-radius: var(--r-md);
padding: 11px 14px;
font-size: 14px;  /* mínimo — ARIA es 14px en input */
/* focus: border-color --tierra */
```

### Disclaimer ARIA (obligatorio en respuestas con datos)
```css
background: var(--tierra-claro);
border: 1px solid rgba(193,127,74,.25);
border-radius: var(--r-sm);
padding: 7px 10px;
font-size: 11px;
color: var(--tierra-oscuro);
```

---

## 6. PRINCIPIOS UX — BASADOS EN INVESTIGACIÓN

### Regla de los 15 segundos
El usuario debe entender "¿esto es para mí?" en menos de 15 segundos. El hero siempre responde: quién eres, qué ofreces, es gratis.

### Regla de las 3 opciones
Máximo 5 opciones visibles a la vez. El cerebro bajo estrés (usuario vulnerable) en más de 5 opciones entra en parálisis decisional.

### Lenguaje humano primero
- ❌ "Postula al DS27 modalidad mejoramiento"
- ✅ "Repara tu casa con subsidio del Estado"
El código técnico (DS27) aparece en segundo plano, nunca en el primer contacto.

### Jerarquía visual del CTA
1. Botón ancho verde oscuro = acción principal (hablar con ARIA)
2. Cards 2 columnas = opciones secundarias
Nunca dos CTA del mismo peso visual en la misma pantalla.

### Confianza antes que información
En Chile, cultura de desconfianza institucional post-2019. El diseño debe transmitir:
- Gratuidad (visible siempre)
- Personas reales detrás (fotos o avatares humanos)
- Respaldo oficial (MINVU) sin frialdad burocrática

### Accesibilidad adulto mayor
- Texto mínimo 16px
- Botones táctiles mínimo 44px
- Alto contraste: texto oscuro sobre crema, nunca gris claro sobre blanco
- Sin gestos complejos (swipe, pinch)
- Sin scroll horizontal

---

## 7. ÍCONOS

**Librería:** Lucide Icons (stroke, no fill)
**Stroke width:** 1.8px para íconos de interfaz, 1.5px para decorativos
**Tamaño base:** 20px en cards, 18px en listas, 14px en inline

Stroke siempre, nunca fill sólido (excepto íconos de estado: check, alerta)

---

## 8. ANIMACIONES

```css
/* Entrada de elementos */
@keyframes fadeUp {
  from { opacity:0; transform:translateY(16px); }
  to   { opacity:1; transform:translateY(0); }
}
.fade-up { animation: fadeUp .5s cubic-bezier(.4,0,.2,1) both; }

/* Delays escalonados */
.delay-1 { animation-delay: .08s; }
.delay-2 { animation-delay: .16s; }
/* ... hasta .delay-5 */

/* Micro-interacciones */
transition: all .22s cubic-bezier(.4,0,.2,1);

/* Hover cards: translateY(-3px) + shadow-md */
/* Hover botones: translateY(-2px) o scale(1.05) */
```

**Reglas:**
- Solo `transform` y `opacity` en animaciones (no afecta layout)
- Duración máxima 500ms para UI, 800ms para decorativos
- Respetar `prefers-reduced-motion` en producción

---

## 9. ESTRUCTURA HTML DE ARIA (página tipo)

```
topbar           → logo + botón llamar
  └ sticky, verde-oscuro

hero             → h1 + subtítulo + ilustración SVG
  └ fondo verde-oscuro, curva inferior crema

quick-section    → card-wide (CTA chat) + grid 2×2
  └ fondo crema

chat-section     → frame con topbar + mensajes + input
  └ fondo crema, frame blanco

programs-section → cards de programas (DS27, DS52...)
  └ fondo crema-medio

trust-section    → 3 items: gratuito, profesionales, datos
  └ fondo verde-oscuro

footer           → logo + legal + links
  └ fondo verde-profundo
```

---

## 10. CHECKLIST ANTES DE ENTREGAR CUALQUIER COMPONENTE

- [ ] ¿Usa los tokens CSS del sistema? (no colores hardcodeados)
- [ ] ¿El texto más pequeño es ≥16px en ARIA, ≥14px en intranet?
- [ ] ¿Los botones táctiles son ≥44×44px?
- [ ] ¿Hay disclaimer en respuestas con datos de subsidios?
- [ ] ¿El CTA principal usa `--tierra`?
- [ ] ¿El fondo es `--crema` y no `#ffffff`?
- [ ] ¿Fraunces para títulos, DM Sans para el resto?
- [ ] ¿Las animaciones usan solo `transform` y `opacity`?
- [ ] ¿El lenguaje evita tecnicismos en el primer contacto?
- [ ] ¿Máximo 5 opciones visibles a la vez?

---

## 11. LO QUE NUNCA SE HACE

- ❌ Fondo blanco puro `#ffffff` en áreas grandes
- ❌ Fuentes genéricas: Inter, Roboto, Arial, Space Grotesk
- ❌ Gradientes de color (excepto fondo hero: verde → verde)
- ❌ Azul institucional (#0055B3, #003087, etc.)
- ❌ Textos < 16px en ARIA
- ❌ Botones menores a 44px de alto
- ❌ Menús de navegación profundos (más de 2 niveles)
- ❌ Tecnicismos en hero o CTA principal
- ❌ Certificar elegibilidad de subsidios en la UI (solo SERVIU)
- ❌ Mostrar RUT, RSH o datos sensibles en pantalla sin necesidad

---

*EGIS Design System v1.0 — Marzo 2026*
*Desarrollado para el Sistema Digital EGIS — Miguel Fuentes*
*Basado en investigación UX para adultos mayores en Chile*
