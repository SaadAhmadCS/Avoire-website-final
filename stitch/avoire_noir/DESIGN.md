# High-End Editorial: The Design System for Luxury Fragrance

## 1. Overview & Creative North Star

### Creative North Star: "The Noir Atelier"
This design system is conceptualized as "The Noir Atelier"—a digital environment that mimics the exclusivity of a private fragrance gallery. We reject the "template" look of modern e-commerce. Instead, we embrace **Obsidian Depth** and **Editorial Precision**.

The experience is defined by dramatic contrast: the weightless elegance of serif typography set against an infinite, moody void. We break the rigid grid through **Intentional Asymmetry**—overlapping product photography over text and using negative space not just as a gap, but as a luxury statement. The goal is to make the user feel as though they are leafing through a high-fashion archival book, where every element is placed with curatorial intent.

---

## 2. Colors

The palette is a study in tonal subtlety, moving away from flat black into a spectrum of charcoals and champagnes.

### The Palette (Material Design Convention)
*   **Background / Surface:** `#131313` (The Primary Void)
*   **Primary (Gold/Champagne):** `#e8cfb8` (Used for critical accents and brand identifiers)
*   **Primary Container:** `#cbb49e` (A muted, sophisticated gold for secondary emphasis)
*   **Surface Tiers:**
    *   `surface_container_lowest`: `#0e0e0e` (For deep, recessed areas)
    *   `surface_container_high`: `#2a2a2a` (For elevated interactive cards)
*   **On-Surface (Text):** `#e5e2e1` (Soft white to prevent eye strain against dark backgrounds)

### The "No-Line" Rule
**Strict Mandate:** Prohibit 1px solid borders for sectioning. High-end design does not rely on wireframes. Boundaries must be defined solely through background color shifts or the use of spacing scale `16` (5.5rem) to separate concepts. A `surface-container-low` section sitting on a `surface` background is the only permissible way to define a "row."

### Signature Textures & The Glass Rule
To move beyond a "standard" feel, all floating UI (modals, dropdowns, navigation bars) must utilize **Glassmorphism**.
*   **Effect:** Use a semi-transparent `surface_variant` (`#353535` at 60% opacity) with a `backdrop-blur` of 20px.
*   **Gradients:** Use subtle radial gradients on CTAs, transitioning from `primary` (`#e8cfb8`) to `primary_container` (`#cbb49e`). This mimics the way light hits a gold perfume cap.

---

## 3. Typography

The typography strategy relies on the tension between the classicism of **Noto Serif** and the modern utility of **Inter**.

*   **Display & Headlines (Noto Serif):** These are the "voice" of the brand. Use `display-lg` (3.5rem) for hero statements. Apply negative letter-spacing (-0.02em) to large headers to create a "tight," custom-typeset feel.
*   **Body (Inter):** Clean and functional. Use `body-md` (0.875rem) for product descriptions. To maintain the luxury feel, increase the line-height to 1.6 to ensure the text "breathes."
*   **Labels (Inter All-Caps):** Use `label-md` (0.75rem) with increased letter-spacing (0.1em) for category tags or "New Arrival" badges. This mimics the small print on luxury perfume labels.

---

## 4. Elevation & Depth

We achieve hierarchy through **Tonal Layering** rather than structural lines.

### The Layering Principle
Depth is achieved by "stacking" surface tiers. Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural lift.

### Ambient Shadows
Shadows are forbidden from being "black."
*   **Specification:** Shadows must be extra-diffused (blur: 40px) and low-opacity (4%-6%).
*   **Color:** Use a tinted version of the `on_surface` color (`#e5e2e1`) to mimic how light scatters in a dark room.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., input fields), use a **Ghost Border**: `outline_variant` (`#4d453e`) at 15% opacity. Never use 100% opaque, high-contrast borders.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (`#e8cfb8`) with `on_primary` text. Use `roundedness-sm` (0.125rem) for a sharp, architectural look.
*   **Secondary:** Ghost style. Transparent background with a `Ghost Border`. Text in `primary`.
*   **Interactions:** On hover, the button should transition to a 2px vertical lift using an `Ambient Shadow`.

### Input Fields
*   **Style:** Underline only. Use a `Ghost Border` (1px) at the bottom. The label should use `label-sm` in `primary` gold, floating above the input on focus.

### Cards & Lists
*   **Separation:** Forbid divider lines. Use vertical spacing (Scale `8` or `10`) or a subtle shift from `surface` to `surface_container_low`. 
*   **Imagery:** All product cards must feature high-contrast, moody photography. The product should emerge from the shadow, blending into the `surface` color at the edges.

### The "Scent Profile" Chip
*   **Custom Component:** Small, pill-shaped (`rounded-full`) chips using `surface_container_highest` with `on_surface_variant` text. These identify fragrance notes (e.g., *Oud, Bergamot*).

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts where imagery overlaps text containers by `Spacing Scale 4`.
*   **Do** use extreme white space (or "dark space") to frame featured products.
*   **Do** use "Entrance Animations"—subtle, slow fades and slides (800ms) to mimic the slow unfolding of a scent.

### Don't:
*   **Don't** use 1px solid lines to separate content. It breaks the "Atelier" illusion.
*   **Don't** use pure white (`#FFFFFF`). It is too aggressive for the "Noir" aesthetic; use `on_surface` (`#e5e2e1`) instead.
*   **Don't** use traditional "Drop Shadows" with high opacity. They make the UI feel "pasted on" rather than integrated.
*   **Don't** use generic icons. Use thin-stroke, custom-styled SVG icons that match the `outline` token weight.