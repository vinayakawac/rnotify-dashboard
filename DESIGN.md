# Nebula Design System — Brand Colors (RXD)

**Source files (ground truth):**
- `src/atoms/shared/nb-tokens.css` — canonical `--nb-*` custom properties (all themes)
- `src/atoms/shared/nb-theme.css` — legacy `--color-*` custom properties (pre-Tailwind components)
- `tailwind.config.js` — maps `--nb-*` / `--xia-*` vars to Tailwind color utilities

**Apply a theme** via a class on any container — nothing else is required, all tokens cascade:

| Class | Mode |
|---|---|
| *(none)* or `.theme-rxd` | **RXD Light** — brand default |
| `.theme-rxd-dark` | **RXD Dark** |
| `.theme-xia` | XIA Light (alternate skin, see [Alternate theme](#alternate-theme-xia)) |
| `.theme-xia-dark` | XIA Dark |

---

## ☀️ Light Theme — `.theme-rxd` (default)

### Brand / Interactive

| Token | Hex | Role |
|---|---|---|
| `--nb-brand-500` | `#316ADD` | Primary interactive |
| `--nb-brand-600` | `#2057C5` | Hover |
| `--nb-brand-700` | `#1B4AA7` | Focus / pressed |
| `--nb-brand-disabled` | `#B8CFEF` | Disabled state |
| `--nb-brand-tint` | `#EBF3FF` | Active background |
| `--nb-brand-dark-tint` | `#D6E8FF` | Elevated active background |

### Semantic base

| Token | Hex | Usage |
|---|---|---|
| `--nb-white` | `#FFFFFF` | Surfaces, card backgrounds |
| `--nb-black` | `#000000` | Base foreground |
| `--nb-border` | `#E5E7EB` | Default border (gray-200) |
| `--nb-border-dark` | `#D0D5DD` | Elevated border (gray-300) |
| `--nb-text-primary` | `#1D2939` | Body text (gray-800) |
| `--nb-text-secondary` | `#667085` | Supporting text, labels (gray-500) |

### Gray scale

| Step | Hex |
|---|---|
| 25 | `#FCFCFD` |
| 50 | `#F9FAFB` |
| 100 | `#F2F4F7` |
| 200 | `#EAECF0` |
| 300 | `#D0D5DD` |
| 400 | `#98A2B3` |
| 500 | `#667085` |
| 600 | `#475467` |
| 700 | `#344054` |
| 800 | `#1D2939` |
| 900 | `#101828` |

### Shadows (elevation)

| Token | Value |
|---|---|
| `--nb-shadow-xs` | `0px 1px 2px 0px rgba(24,40,88,0.05)` |
| `--nb-shadow-sm` | `0px 1px 2px rgba(24,40,88,0.06), 0px 1px 3px rgba(24,40,88,0.10)` |
| `--nb-shadow-md` | `0px 2px 4px -2px rgba(24,40,88,0.06), 0px 4px 8px -2px rgba(24,40,88,0.10)` |
| `--nb-shadow-lg` | `0px 4px 6px -2px rgba(24,40,88,0.03), 0px 12px 16px -4px rgba(24,40,88,0.08)` |
| `--nb-shadow-xl` | `0px 8px 8px -4px rgba(24,40,88,0.03), 0px 20px 24px -4px rgba(24,40,88,0.08)` |
| `--nb-shadow-2xl` | `0px 24px 48px -12px rgba(24,40,88,0.18)` |
| `--nb-shadow-3xl` | `0px 32px 64px -12px rgba(24,40,88,0.14)` |

### Component tokens

| Token | Hex | Component |
|---|---|---|
| `--nb-tab-bg` | `#F3F4F6` | Tab wrapper background |
| `--nb-tab-text` | `#5C667A` | Tab text (inactive) |
| `--nb-tab-text-active` | `#12151C` | Tab text (active) |
| `--nb-tab-bg-active` | `#FFFFFF` | Tab background (active) |
| `--nb-tab-hover-bg` | `#F3F4F6` | Tab hover background |
| `--nb-tab-disabled` | `#D1D5DB` | Tab disabled text |
| `--nb-listview-header-bg` | `#F2F4F7` | ListView header (gray-100) |
| `--nb-listview-popover-header-bg` | `#EBEFF9` | ListView popover header (information-50) |
| `--nb-datepicker-input-bg` | `#F6F7F9` | DatePicker input background |
| `--nb-datepicker-input-text-color` | `#12151C` | DatePicker input text |
| `--nb-datepicker-input-border-color` | `#E5E7EB` | DatePicker input border |
| `--nb-label-text` | `#12151C` | Label text |
| `--nb-actionicon-hover-bg` | `#EEEFF2` | ActionIcon hover background |

---

## 🌙 Dark Theme — `.theme-rxd-dark`

### Brand / Interactive

| Token | Hex | Role | vs. Light |
|---|---|---|---|
| `--nb-brand-500` | `#316ADD` | Primary interactive | unchanged |
| `--nb-brand-600` | `#2057C5` | Hover | unchanged |
| `--nb-brand-700` | `#1B4AA7` | Focus / pressed | unchanged |
| `--nb-brand-disabled` | `#B8CFEF` | Disabled state | unchanged |
| `--nb-brand-tint` | `#1D3B6A` | Active background | **overridden** (was `#EBF3FF`) |
| `--nb-brand-dark-tint` | `#1E3A5F` | Elevated active background | **overridden** (was `#D6E8FF`) |

### Semantic base

| Token | Hex | Usage |
|---|---|---|
| `--nb-white` | `#1D2939` | Surfaces — inverted to dark surface |
| `--nb-black` | `#FFFFFF` | Base foreground — inverted |
| `--nb-border` | `#344054` | Default border (gray-700) |
| `--nb-border-dark` | `#475467` | Elevated border (gray-600) |
| `--nb-text-primary` | `#F2F4F7` | Body text (gray-100) |
| `--nb-text-secondary` | `#98A2B3` | Supporting text, labels (gray-400) |

### Gray scale — fully inverted

`gray-25` becomes the darkest surface, `gray-900` the lightest — the ramp is flipped, not remapped to new hexes:

| Step | Hex | Light-theme equivalent |
|---|---|---|
| 25 | `#101828` | (light `900`) |
| 50 | `#1D2939` | (light `800`) |
| 100 | `#344054` | (light `700`) |
| 200 | `#475467` | (light `600`) |
| 300 | `#667085` | (light `500`) |
| 400 | `#98A2B3` | (light `400`, unchanged) |
| 500 | `#D0D5DD` | (light `300`) |
| 600 | `#EAECF0` | (light `200`) |
| 700 | `#F2F4F7` | (light `100`) |
| 800 | `#F9FAFB` | (light `50`) |
| 900 | `#FCFCFD` | (light `25`) |

### Shadows (elevation) — higher alpha for dark surfaces

| Token | Value |
|---|---|
| `--nb-shadow-xs` | `0px 1px 2px 0px rgba(0,0,0,0.20)` |
| `--nb-shadow-sm` | `0px 1px 2px rgba(0,0,0,0.24), 0px 1px 3px rgba(0,0,0,0.20)` |
| `--nb-shadow-md` | `0px 2px 4px -2px rgba(0,0,0,0.24), 0px 4px 8px -2px rgba(0,0,0,0.20)` |
| `--nb-shadow-lg` | `0px 4px 6px -2px rgba(0,0,0,0.12), 0px 12px 16px -4px rgba(0,0,0,0.16)` |
| `--nb-shadow-xl` | `0px 8px 8px -4px rgba(0,0,0,0.12), 0px 20px 24px -4px rgba(0,0,0,0.16)` |
| `--nb-shadow-2xl` | `0px 24px 48px -12px rgba(0,0,0,0.36)` |
| `--nb-shadow-3xl` | `0px 32px 64px -12px rgba(0,0,0,0.28)` |

### Component tokens

| Token | Hex | Component |
|---|---|---|
| `--nb-tab-bg` | `#374151` | Tab wrapper background |
| `--nb-tab-text` | `#9CA3AF` | Tab text (inactive) |
| `--nb-tab-text-active` | `#F3F4F6` | Tab text (active) |
| `--nb-tab-bg-active` | `#1F2937` | Tab background (active) |
| `--nb-tab-hover-bg` | `#4B5563` | Tab hover background |
| `--nb-tab-disabled` | `#6B7280` | Tab disabled text |

> ⚠️ **Gap:** `--nb-listview-*`, `--nb-datepicker-input-*`, `--nb-label-text`, and `--nb-actionicon-hover-bg` have **no dark-mode override** in `.theme-rxd-dark` today — they cascade the light-theme value even inside a dark container. Flagging so it isn't mistaken for an intentional design choice; ListView/DatePicker/Label/ActionIcon dark-mode work is still open.

---

## Accent color scales — identical in Light & Dark

These 12 families are status/accent colors used for tags, badges, and semantic states. Confirmed in source: `.theme-rxd-dark` does **not** override them, so the same hex renders in both themes (deliberate — status colors stay legible/recognizable regardless of theme).

Scale steps: `25 → 50 → 100` (tints for backgrounds/hover) · `500 → 600 → 700 → 800` (solid tones for text/icons/borders)

| Family | 25 | 50 | 100 | 500 | 600 | 700 | 800 |
|---|---|---|---|---|---|---|---|
| **Primary** (Blue) | `#F5FAFF` | `#EAF4FF` | `#CFE7FF` | `#0066CC` | `#005BB5` | `#004A99` | `#003D82` |
| **Success** (Green) | `#F6FEF9` | `#ECFDF3` | `#D1FADF` | `#0E9F63` | `#2BAB60` | `#239752` | `#1A7A3F` |
| **Warning** (Amber) | `#FFFCF5` | `#FFFAEB` | `#FEF0C7` | `#C76A00` | `#F5A314` | `#DD9100` | `#C57F00` |
| **Error** (Red) | `#FFFBFA` | `#FEF3F2` | `#FEE4E2` | `#DF3A3A` | `#C92C2C` | `#B01F1F` | `#6F1712` |
| **Information** (Blue) | `#F8F9FC` | `#EBEFF9` | `#D9E0F5` | `#4264CC` | `#2C49A3` | `#253E8A` | `#1E3371` |
| **Blue Gray** | `#FCFCFD` | `#F8F9FC` | `#EAECF5` | `#4E5BA6` | `#3E4784` | `#363F72` | `#293056` |
| **Fresh Green** | `#FCFEF6` | `#F7FCE8` | `#F0F9D5` | `#8EB819` | `#779A15` | `#617E11` | `#4C620D` |
| **Turquoise** | `#F2FDFC` | `#E9FBFA` | `#D7F7F4` | `#27BFB3` | `#1E9288` | `#187770` | `#135D57` |
| **Blue Light** | `#F5FBFF` | `#F0F9FF` | `#E0F2FE` | `#0BA5EC` | `#0086C9` | `#026AA2` | `#065986` |
| **Blue (Accent)** | `#F5FAFF` | `#EFF8FF` | `#D1E9FF` | `#2E90FA` | `#1570EF` | `#175CD3` | `#293056`¹ |
| **Royal Blue** | `#FCFCFD` | `#F8F9FC` | `#EAECF5` | `#4E5BA6` | `#3E4784` | `#363F72` | `#293056` |
| **Indigo** | `#F5F8FF` | `#EEF4FF` | `#E0EAFF` | `#6172F3` | `#444CE7` | `#3538CD` | `#2D31A6` |
| **Purple** | `#FAFAFF` | `#F4F3FF` | `#EBE9FE` | `#7A5AF8` | `#6938EF` | `#5925DC` | `#4A1FB8` |
| **Pink** | `#FEF6FB` | `#FDF2FA` | `#FCE7F6` | `#EE46BC` | `#DD2590` | `#C11574` | `#9E165F` |
| **Rose** | `#FFF5F6` | `#FFF1F3` | `#FFE4E8` | `#F63D68` | `#E31B54` | `#C01048` | `#A11043` |
| **Orange** | `#FFFAF5` | `#FFF6ED` | `#FFEAD5` | `#FB6514` | `#EC4A0A` | `#C4320A` | `#9C2A10` |
| **Brown** | `#FDF9F7` | `#F8F0EC` | `#F0E3DE` | `#A7624A` | `#905440` | `#794736` | `#633A2C` |

¹ Flagged in source (`nb-tokens.css`) as a likely copy-paste error — `--nb-blue-800` duplicates Royal Blue/Blue Gray `800` instead of a value derived from the Blue family. Left as-is here to match the shipped token.

> `--nb-bluegray-*` and `--nb-royalblue-*` are intentionally identical — both are kept because different components (`NbTag`, `NbBadge` vs. `NbCircularProgress`) reference them independently.

---

## Alternate theme: XIA

A second, HSL-based skin exists alongside RXD — `.theme-xia` / `.theme-xia-dark` — sourced from the "xia-lovable" style guide. It remaps the same `--nb-*` tokens to `--xia-*` primitives, so any component built against `--nb-*` automatically re-skins.

| | Light (`.theme-xia`) | Dark (`.theme-xia-dark`) |
|---|---|---|
| Background | `hsl(220 20% 97%)` | `hsl(222 30% 8%)` |
| Foreground / text | `hsl(222 20% 9%)` | `hsl(210 25% 92%)` |
| Card / surface | `hsl(0 0% 100%)` | `hsl(222 25% 12%)` |
| Primary | `hsl(220 72% 53%)` ≈ `#316ADD` | `hsl(220 72% 53%)` (unchanged) |
| Border / input | `hsl(220 13% 91%)` | `hsl(220 20% 20%)` |
| Destructive / critical | `hsl(0 72% 55%)` | `hsl(0 62.8% 30.6%)` |

XIA's primary hue matches RXD's brand blue, so the two skins can share components without a color clash — only surfaces, borders, and radii diverge (XIA uses a 10px default radius vs. RXD's 8px `--border-radius-btn`).

---

## Legacy token system (`--color-*`, pre-Tailwind components)

Older SCSS-based components (not yet migrated) read from `src/atoms/shared/nb-theme.css` instead of `nb-tokens.css`. It defines its **own** primary blue, separate from `--nb-brand-500` / `--nb-primary-500` — a reminder that this repo currently ships three shades of "primary blue" depending on which era a component was built in.

### Light (`.theme-light`, `.theme-rxd`)

| Token | Hex |
|---|---|
| `--color-primary` (royalblue-30) | `#0073E6` |
| `--color-primary-light` | `#4D9DEE` |
| `--color-text` | `#17294A` |
| `--color-border` | `#CCD1D6` |
| `--color-background` | `#f7f9fb` |
| `--color-surface` | `#FFFFFF` |
| `--color-error` (red-30) | `#CF1322` |
| `--color-success` (green-30) | `#158932` |
| `--color-warning` (amber-30) | `#FFB224` |
| `--color-info` (accentblue-30) | `#1B9CFC` |

### Dark (`.theme-dark`, `.theme-rxd-dark`)

| Token | Hex |
|---|---|
| `--color-text` | `#F3F5F7` (grey-80) |
| `--color-border` | `#45546E` (greyblue-20) |
| `--color-background` | `#17294A` (greyblue-10) |
| `--color-surface` | `#45546E` (greyblue-20) |
| `--color-surface-hover` | `#5D6980` (greyblue-30) |

> Status colors (`--color-error/success/warning/info`) are **not** overridden in `.theme-dark` — they cascade unchanged from `:root`, same as the `--nb-*` accent scales above.

---

## Typography, spacing & other tokens (theme-independent)

These don't vary between light/dark — included for completeness since they live in the same source files.

**Font families:** `IBM Plex Sans` (default, `--nb-font-family`) · `IBM Plex Mono` (`--nb-font-family-mono`)

**Border radius:** `--border-radius-sm` 4px · `--border-radius-btn` / `--border-radius-md` 8px · `--border-radius-lg` 12px · `--border-radius-full` 9999px

**Transitions:** `--transition-fast` 150ms · `--transition-normal` 300ms · `--transition-slow` 500ms

**Spacing scale (rem/px):** `quarter` 2 · `half` 4 · `half-three` 6 · `1s` 8 · `1.5s` 12 · `1.75s` 14 · `2s` 16 · `2.5s` 20 · `3s` 24 · `4s` 32

**Z-index:** dropdown `1000` · sticky `1020` · fixed `1030` · modal-backdrop `1040` · modal `1050` · popover `1060` · tooltip `1070`

---

## Tailwind usage

```html
<!-- Brand-aware colors (auto-adapt to whichever .theme-* class wraps them) -->
<button class="bg-nb-brand-500 hover:bg-nb-brand-600 active:bg-nb-brand-700 text-nb-white">
<div class="bg-nb-white text-nb-text-primary border border-nb-border">
<span class="text-nb-text-secondary">

<!-- Status -->
<div class="bg-nb-success-50 text-nb-success-700 border border-nb-success-100">
<div class="bg-nb-error-50 text-nb-error-700 border border-nb-error-100">
<div class="bg-nb-warning-50 text-nb-warning-700 border border-nb-warning-100">

<!-- Gray scale (inverts automatically under .theme-rxd-dark) -->
<div class="bg-nb-gray-50 text-nb-gray-800">

<!-- Component-scoped tokens via arbitrary value syntax -->
<button class="bg-[var(--btn-primary)] h-[var(--btn-sm-h)]">
```

Wrap any subtree in `.theme-rxd-dark` to preview dark mode — no rebuild required, values resolve at runtime via CSS custom properties.
