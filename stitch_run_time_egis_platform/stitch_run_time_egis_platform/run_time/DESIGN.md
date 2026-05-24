---
name: RUN TIME
colors:
  surface: '#f9faf6'
  surface-dim: '#d9dad7'
  surface-bright: '#f9faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f0'
  surface-container: '#edeeeb'
  surface-container-high: '#e7e9e5'
  surface-container-highest: '#e2e3df'
  on-surface: '#1a1c1a'
  on-surface-variant: '#414943'
  inverse-surface: '#2e312f'
  inverse-on-surface: '#f0f1ed'
  outline: '#717973'
  outline-variant: '#c0c9c1'
  surface-tint: '#396751'
  primary: '#013623'
  on-primary: '#ffffff'
  primary-container: '#1e4d38'
  on-primary-container: '#8cbda2'
  inverse-primary: '#a0d2b6'
  secondary: '#895120'
  on-secondary: '#ffffff'
  secondary-container: '#feb37a'
  on-secondary-container: '#784313'
  tertiary: '#4d2022'
  on-tertiary: '#ffffff'
  tertiary-container: '#683637'
  on-tertiary-container: '#e5a0a0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bbeed1'
  primary-fixed-dim: '#a0d2b6'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#204f3a'
  secondary-fixed: '#ffdcc4'
  secondary-fixed-dim: '#ffb780'
  on-secondary-fixed: '#2f1400'
  on-secondary-fixed-variant: '#6c3a09'
  tertiary-fixed: '#ffdad9'
  tertiary-fixed-dim: '#fcb4b4'
  on-tertiary-fixed: '#360e10'
  on-tertiary-fixed-variant: '#6b3839'
  background: '#f9faf6'
  on-background: '#1a1c1a'
  surface-variant: '#e2e3df'
typography:
  h1:
    fontFamily: Fraunces
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Fraunces
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Fraunces
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  h1-mobile:
    fontFamily: Fraunces
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.08em
  button:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is built upon the intersection of architectural precision and social responsibility. It serves Chilean social housing entities (EGIS) with a visual language that feels both institutional and deeply human. 

The aesthetic is **Modern Architectural**, blending the stability of Chilean public sector tools with the refined elegance of high-end urban planning. It avoids the coldness of typical SaaS by utilizing an earthy, grounded palette and tactile textures. The emotional response is one of "sturdy trust"—a platform that feels like a permanent structure rather than a fleeting digital service.

Key visual pillars include:
- **Authority through Typography:** High-contrast serif headings that command respect.
- **Tectonic Layering:** Using thin lines and subtle offsets rather than heavy shadows to denote structure.
- **Organic Professionalism:** A color palette that references the Chilean landscape (Andean forests and dry earth) to remain culturally resonant.

## Colors

The color palette is derived from the natural and built environments of Chile. 

- **Primary (Deep Forest Green):** Used for primary actions, navigation backgrounds, and authoritative elements. It represents growth and institutional stability.
- **Accent (Warm Bronze/Tierra):** Used sparingly for highlights, active states, and structural borders. It references the tectonic materials of architecture—copper and clay.
- **Background (Warm Cream):** The base layer of the entire system. It provides a softer, more "paper-like" reading experience than pure white, reducing eye strain for professional users.
- **Text (Near Black):** A deep, green-tinted black that ensures maximum legibility while maintaining the organic warmth of the system.

## Typography

This design system utilizes a sophisticated typographic pairing to balance editorial elegance with functional clarity.

**Fraunces** is the voice of the organization. It is used for all major headings. Its variable weights allow for an "authoritative yet soft" appearance, reminiscent of official architectural blueprints or legal documents.

**DM Sans** handles the heavy lifting of data and interface management. It was chosen for its low-contrast, geometric shapes that remain highly legible in dense B2B tables and complex forms. 

Use **Label-Caps** for metadata, table headers, and small section titles to provide a clear hierarchy without occupying significant vertical space.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to maintain the "blueprinted" feel of professional software, transitioning to a fluid model on smaller screens.

- **Desktop (1440px+):** 12-column grid with 24px gutters. Centralized content container maxes out at 1280px.
- **Tablet (768px - 1024px):** 8-column grid with 16px gutters and 24px side margins.
- **Mobile (Up to 767px):** 4-column fluid grid with 16px side margins.

A strict 4px baseline grid ensures vertical rhythm. Spacing between major architectural sections (e.g., card components in a dashboard) should default to `lg` (24px) to allow the design to "breathe," mirroring the open spaces of modern architecture.

## Elevation & Depth

In this design system, depth is communicated through **Low-Contrast Outlines** and **Tonal Layering** rather than realistic shadows. 

1.  **Level 0 (Background):** The Warm Cream (#FAF6F0) base.
2.  **Level 1 (Sub-surface):** Subtle Stone (#E5E1DA) used for inset areas like search bars or inactive navigation panels.
3.  **Level 2 (Raised):** Cards and Primary containers. These use the background color but are defined by a 1px Bronze (#C17F4A) border at 30% opacity.
4.  **Level 3 (Overlay):** Modals and Dropdowns. These use a very soft, diffused shadow (10% opacity Deep Forest Green) to indicate they are temporarily "floating" above the architecture.

Subtle geometric textures (e.g., a fine dot grid or diagonal hatch patterns) may be used on Level 0 or Level 1 to provide a "tactile paper" feel.

## Shapes

The shape language is **Soft and Precise**. 

The use of `0.25rem` (4px) corner radii ensures that elements feel approachable but maintain their structural integrity. It avoids the "bubbly" look of consumer apps, favoring a disciplined, professional aesthetic. 

- **Cards & Containers:** Use `rounded-lg` (8px) to softly frame content.
- **Buttons & Inputs:** Use the standard `rounded` (4px) for a crisp, tool-like appearance.
- **Selection Indicators:** (e.g., active tab markers) should be sharp (0px) to mimic a drafting pen’s precision.

## Components

### Buttons
- **Primary:** Solid Deep Forest Green with white text. No shadow. 4px radius.
- **Secondary:** Transparent background with 1px Bronze border. Bronze text.
- **Tertiary:** Text-only in Deep Forest Green with a 1px underline on hover.

### Cards (The Hero Component)
Cards represent housing projects or files. They must feature:
- A 1px border in #C17F4A (Bronze) at 30% opacity.
- Top-aligned "Fraunces" H3 headings.
- A "footer" area separated by a thin rule, containing "Label-Caps" metadata.
- Backgrounds may include a subtle 5% opacity geometric watermark of a site plan or grid.

### Input Fields
- Background: Pure White or #FAF6F0.
- Border: 1px #E5E1DA (Stone). On focus, border changes to 1px #1E4D38 (Deep Forest Green).
- Labels are always positioned above the field in DM Sans Bold, 12px.

### Progress Indicators (Project Tracking)
Since this is for housing EGIS, project stages are critical. Use a custom "Tectonic Stepper":
- A horizontal line in Bronze.
- Completed steps are solid Green circles.
- Current step is a Green ring with a Bronze center.
- Future steps are Stone circles.

### Lists & Tables
- Zebra striping using the #E5E1DA Stone color at 20% opacity.
- No vertical borders; use generous horizontal padding (16px) and thin Bronze dividers between rows.