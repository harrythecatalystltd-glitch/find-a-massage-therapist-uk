# Find a Massage Therapist UK — Brand & Design System

## Brand Identity

**Name:** Find a Massage Therapist UK  
**Positioning:** The UK's premier luxury wellness directory — elite, trustworthy, tranquil.  
**Tone:** Premium, calm, professional. Think high-end spa meets clinical credibility.

---

## Colour Palette

### Primary Brand Colours

| Role | Name | Hex |
|------|------|-----|
| Primary | Deep Purple | `#34005f` |
| Primary Container | Dark Violet | `#4b1e78` |
| On Primary Container | Soft Lavender | `#ba8beb` |
| Secondary | Muted Purple | `#6b5583` |
| Secondary Container | Pale Lilac | `#e4caff` |
| On Secondary Container | Mid Purple | `#685280` |
| Brand Accent | Dusty Mauve | `#BFA6D9` |
| Inverse Primary | Light Lavender | `#dcb8ff` |

### Surface & Background

| Role | Name | Hex |
|------|------|-----|
| Background | Off White | `#f9f9f9` |
| Surface | Off White | `#f9f9f9` |
| Surface Container Lowest | Pure White | `#ffffff` |
| Surface Container Low | Near White | `#f3f3f3` |
| Surface Container | Light Grey | `#eeeeee` |
| Surface Container High | Pale Grey | `#e8e8e8` |
| Surface Container Highest | Grey | `#e2e2e2` |
| Surface Dim | Soft Grey | `#dadada` |

### Text & Content

| Role | Name | Hex |
|------|------|-----|
| On Background / On Surface | Near Black | `#1a1c1c` |
| On Surface Variant | Muted Charcoal | `#4b4450` |
| Outline | Mid Purple-Grey | `#7c7481` |
| Outline Variant | Soft Lilac Border | `#cdc3d2` |

### Dark / Footer Surfaces

| Role | Name | Hex |
|------|------|-----|
| Tertiary (footer bg) | Near Black | `#212125` |
| Tertiary Container | Dark Charcoal | `#36363a` |
| On Tertiary | White | `#ffffff` |
| On Tertiary Container | Mid Grey | `#a19fa3` |
| Tertiary Fixed | Light Warm Grey | `#e4e1e6` |
| Primary Fixed Dim | Soft Lavender | `#dcb8ff` |

### Feedback & State

| Role | Hex |
|------|-----|
| Error | `#ba1a1a` |
| Error Container | `#ffdad6` |
| On Error | `#ffffff` |

---

## Typography

### Font Families

| Role | Family | Use For |
|------|--------|---------|
| **Display / Headlines** | Playfair Display | Page titles, section headings, hero H1 |
| **Body / Labels / UI** | Montserrat | Body text, navigation, buttons, tags, captions |

### Type Scale

| Token | Size | Line Height | Weight | Letter Spacing | Use |
|-------|------|-------------|--------|----------------|-----|
| `display-lg` | 48px | 1.1 | 700 | -0.02em | Hero display only |
| `headline-lg` | 32px | 1.3 | 600 | -0.01em | Section headings |
| `headline-lg-mobile` | 28px | 1.3 | 600 | — | Section headings on mobile |
| `headline-md` | 24px | 1.4 | 600 | — | Card titles, sub-sections |
| `body-lg` | 18px | 1.6 | 400 | — | Lead paragraphs |
| `body-md` | 16px | 1.6 | 400 | — | Standard body copy |
| `label-md` | 14px | 1.2 | 600 | 0.05em | Buttons, nav links, tags |
| `label-sm` | 12px | 1.2 | 500 | — | Captions, badges, meta |

### Typography Rules
- Hero H1: 44px mobile → 64px tablet → 72px desktop (Playfair Display, weight 700)
- Section eyebrow labels: `label-md`, ALL CAPS, `tracking-[0.2em]`, colour `secondary`
- Italic accent in headlines uses `<i class="font-normal italic">` (Playfair Display italic, weight 400)

---

## Spacing & Layout

| Token | Value | Use |
|-------|-------|-----|
| `base` | 8px | Base grid unit |
| `gutter` | 24px | Gap between grid columns/cards |
| `section-gap` | 80px | Vertical padding between page sections |
| `margin-desktop` | 40px | Horizontal page padding on desktop |
| `margin-mobile` | 16px | Horizontal page padding on mobile |
| `container-max` | 1200px | Maximum content width |

---

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `DEFAULT` | 4px | Small elements |
| `lg` | 8px | Medium elements |
| `xl` | 12px | Inputs, search bar |
| `2xl` (Tailwind) | 16px | Cards |
| `[2rem]` (custom) | 32px | Hero banner/CTA panels |
| `full` | 9999px | Pills — buttons, badges, tags |

---

## Shadows & Elevation

```css
/* Signature spa shadow — used on cards and search bar */
.spa-shadow {
    box-shadow: 0 15px 45px -10px rgba(75, 30, 120, 0.1);
}
```

Cards use `spa-shadow` + `border border-outline-variant/30` at rest.  
On hover: border shifts to `border-primary-container/40`.

---

## Components

### Buttons

**Primary CTA (pill)**
```html
<a class="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all shadow-md active:scale-95">
  Label
</a>
```

**Ghost / Outline (pill)**
```html
<button class="w-full py-4 border-2 border-primary-container text-primary-container font-bold rounded-full hover:bg-primary-container hover:text-on-primary-container transition-all duration-300">
  Label
</button>
```

**Light CTA on dark background**
```html
<a class="bg-surface-container-lowest text-primary px-12 py-5 rounded-full font-bold text-lg hover:bg-brand-accent transition-all active:scale-95 shadow-xl">
  Label
</a>
```

### Navigation Header
- Fixed, z-50, glass blur effect
- `backdrop-filter: blur(12px)` + `background: rgba(249, 249, 249, 0.85)`
- Height: `h-20`
- Active nav link: `text-primary border-b-2 border-primary pb-1 font-bold`
- Inactive nav link: `text-on-surface-variant hover:text-primary transition-colors duration-300`

### Cards (Therapist / Content)
- Background: `bg-surface-container-lowest`
- Border: `border border-outline-variant/30`
- Radius: `rounded-2xl`
- Shadow: `spa-shadow`
- Hover: `hover:border-primary-container/40 transition-all duration-500`
- Image hover: `group-hover:scale-105 transition-transform duration-700`
- Padding: `p-8`

### Tags / Speciality Chips
```html
<span class="bg-secondary-container/50 text-on-secondary-container px-3 py-1 rounded-full text-label-sm font-medium">
  Tag Label
</span>
```

### Elite / Status Badges
```html
<!-- Elite badge on card image -->
<span class="bg-primary-container/90 text-on-primary-container text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur">
  Elite
</span>
```

### Star Rating Badge
```html
<div class="bg-surface-container-lowest/95 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-outline-variant/20">
  <span class="material-symbols-outlined text-yellow-500 text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
  <span class="text-label-md font-bold">4.9</span>
</div>
```

### Search Bar
- Container: `bg-surface-container-lowest p-2 rounded-xl spa-shadow border border-outline-variant/30`
- Fields divided by `border-r border-outline-variant/20`
- Icon: `material-symbols-outlined text-outline`, focus state: `text-primary`
- Submit: pill button `bg-primary-container` → hover `bg-primary`

### Section Eyebrow Label Pattern
```html
<span class="font-label-md text-label-md text-secondary mb-4 block tracking-[0.2em] uppercase">
  Section Name
</span>
```

### Accordion / FAQ
- Toggle via JS: `classList.toggle('active-accordion')` on parent
- Reveal: `max-height: 0` → `max-height: 200px` on `.active-accordion .reveal-accordion`
- Chevron rotates 180° on open: `group-[.active-accordion]:rotate-180`

---

## Iconography

**Library:** Google Material Symbols Outlined  
**Import:** `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1`

```css
.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
}
```

For filled icons (e.g. star ratings): add inline `style="font-variation-settings: 'FILL' 1;"`

---

## Imagery Style

- **Hero:** Full-bleed, high-quality spa/wellness photography. Overlay: `bg-black/5` + bottom fade gradient to background colour.
- **Therapist cards:** Portrait-orientation, professional clinical/spa environments. Height `h-72`, `object-cover`.
- **Location cards:** Aerial or landmark city photography, `h-64`, dark overlay `bg-black/40` → hover `bg-primary/50`.
- **CTA banner:** Editorial lifestyle photography, `bg-primary/20` colour wash overlay.

---

## Motion & Interaction

- Standard transition: `transition-all duration-300`
- Card image zoom: `transition-transform duration-700`
- Location card zoom: `transition-transform duration-1000`
- Button press: `active:scale-95`
- Nav arrow on hover: `group-hover:translate-x-1 transition-transform`
- Accordion chevron: `transition-transform` → `rotate-180`

---

## Page Section Structure (Homepage)

1. **Fixed Header** — glass nav
2. **Hero** — full-screen, image bg, search bar
3. **Featured Therapists** — 3-col card grid
4. **How It Works** — 3-col icon + text, `bg-surface-container-low`
5. **Grow Your Practice CTA** — split panel, `bg-primary`
6. **Locations** — 4-col image grid
7. **FAQ** — accordion, max-w-3xl centred
8. **Footer** — 4-col, `bg-tertiary` (dark)

---

## Tailwind Config Summary

```js
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: { /* all tokens above */ },
      borderRadius: { DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px" },
      spacing: {
        gutter: "24px", "section-gap": "80px",
        "margin-desktop": "40px", "margin-mobile": "16px",
        "container-max": "1200px", base: "8px"
      },
      fontFamily: {
        "display-lg": ["Playfair Display"],
        "headline-lg": ["Playfair Display"],
        "headline-md": ["Playfair Display"],
        "body-lg": ["Montserrat"],
        "body-md": ["Montserrat"],
        "label-md": ["Montserrat"],
        "label-sm": ["Montserrat"]
      }
    }
  }
}
```
