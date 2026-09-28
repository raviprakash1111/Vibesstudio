# VIBES STUDIO — MASTER BRAND FOUNDATION & COLOR SYSTEM (STEP 1A)
> **Tagline:** “Feel the way you move”  
> **Physical Identity:** Orange Feature Wall + Deep Green Feature Wall + Studio Black Logo + Warm Light Wood Flooring + Studio Cream Environment.

---

## 1. BRAND COLOR PHILOSOPHY & PROPORTIONS

The VIBES STUDIO website visual identity is directly anchored in the physical studio environment:
- **ORANGE FEATURE WALL** (`#D57E4D` Studio Orange) — Energy, Dance & Action.
- **GREEN FEATURE WALL** (`#266127` Studio Green / `#103A18` Studio Dark Green) — Studio, Balance & Support.
- **BLACK LOGO** (`#111111` Studio Black) — Typography & Identity Authority.
- **WOOD FLOORING** (`#C8B8A4` Studio Wood) — Warmth & Natural Frame.
- **CREAM SURROUNDINGS** (`#F7F2EA` Studio Cream) — Spacious Canvas.

### Strict Color Rules:
- **NO UNRELATED COLORS:** Do NOT introduce purple, blue, pink, neon gradients, or generic startup palettes.
- **COLOR PROPORTION GUIDELINE:**
  - **60–70%:** Studio Cream (`#F7F2EA`) / Clean White (`#FFFFFF`) / Studio Wood (`#C8B8A4`) spacious background space.
  - **20–30%:** Studio Dark Green (`#103A18`), Studio Green (`#266127`), and Studio Black (`#111111`) structural elements.
  - **5–10%:** Studio Orange (`#D57E4D`) action accents and active state highlights.
- **ORANGE + GREEN RULE:**
  - **Studio Orange (`#D57E4D`):** Primary CTA buttons, important action highlights, selected nav states, energetic details.
  - **Studio Green (`#266127`):** Secondary CTA buttons, category badges, section highlights, interactive support.
- **DARK SECTIONS:** Always use `#103A18` Studio Dark Green as the main background for dark hero/footer/cinematic sections instead of generic pure black.
- **BLACK:** `#111111` reserved for the exact logo and major headers.
- **GRADIENTS:** No generic colorful gradients. Only subtle single-hue palette transitions (e.g. `#D57E4D` → darker orange, `#266127` → `#103A18`).

---

## 2. OFFICIAL DESIGN TOKENS (STEP 1A)

### Brand Color Tokens
```css
--brand-orange: #D57E4D;       /* Studio Orange */
--brand-green: #266127;        /* Studio Green */
--brand-dark-green: #103A18;   /* Studio Dark Green */
--brand-black: #111111;        /* Studio Black */
--brand-cream: #F7F2EA;        /* Studio Cream */
--brand-wood: #C8B8A4;         /* Studio Wood */
--brand-white: #FFFFFF;        /* Clean White */
--brand-muted: #6B6B63;        /* Muted Gray */
```

### Semantic Tokens
```css
--primary: var(--brand-orange);         /* #D57E4D */
--secondary: var(--brand-green);       /* #266127 */
--accent: var(--brand-orange);          /* #D57E4D */
--background: var(--brand-cream);      /* #F7F2EA */
--foreground: var(--brand-black);      /* #111111 */
--muted: var(--brand-muted);           /* #6B6B63 */
--border: var(--brand-wood);           /* #C8B8A4 */
--card: var(--brand-white);            /* #FFFFFF */
--dark-section: var(--brand-dark-green);/* #103A18 */
```

---

## 3. COLOR BOARD & USAGE MATRIX

| Color Name | HEX Code | RGB Values | Recommended Usage |
| :--- | :--- | :--- | :--- |
| **Studio Orange** | `#D57E4D` | `RGB(213, 126, 77)` | Primary CTAs, active states, selected nav items, dance action highlights |
| **Studio Green** | `#266127` | `RGB(38, 97, 39)` | Secondary CTAs, category badges, section highlights, interactive support |
| **Studio Dark Green** | `#103A18` | `RGB(16, 58, 24)` | Dark hero sections, footer background, cinematic contrast areas |
| **Studio Black** | `#111111` | `RGB(17, 17, 17)` | Exact VIBES STUDIO logo, primary headers, high-contrast text |
| **Studio Cream** | `#F7F2EA` | `RGB(247, 242, 234)` | Main page background, content canvas, spacious negative areas |
| **Studio Wood** | `#C8B8A4` | `RGB(200, 184, 164)` | Card borders, dividers, subtle frames, background accents |
| **Clean White** | `#FFFFFF` | `RGB(255, 255, 255)` | Cards, crisp container surfaces, text on Dark Green backgrounds |
| **Muted Gray** | `#6B6B63` | `RGB(107, 107, 99)` | Secondary text descriptions, captions, metadata |

---

## 4. UI EXAMPLES SPECIFICATION

1. **Primary CTA:** Solid Studio Orange `#D57E4D` fill with white text `#FFFFFF` and pill border-radius `9999px`. Hover shift to `#C36B3B`.
2. **Secondary CTA:** Solid Studio Green `#266127` fill with white text `#FFFFFF` and pill border-radius `9999px`.
3. **Navigation Bar:** Studio White `#FFFFFF` background, Studio Wood `#C8B8A4` border, Studio Black `#111111` text, active link indicator in Studio Orange `#D57E4D`.
4. **Light Card:** Clean White `#FFFFFF` background, Studio Wood `#C8B8A4` border, Studio Black `#111111` title, Muted Gray `#6B6B63` body description.
5. **Class Card:** Aspect-ratio image, Studio Green `#266127` badge, Studio Black `#111111` title, Studio Orange `#D57E4D` primary CTA button.
6. **Dark Section:** Studio Dark Green `#103A18` background, White `#FFFFFF` headings and body text, Studio Orange `#D57E4D` highlights.
7. **Footer:** Studio Dark Green `#103A18` background with Studio Orange `#D57E4D` top border, white container logo display, Studio Wood `#C8B8A4` metadata links.
