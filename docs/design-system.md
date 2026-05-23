# Zinns Design System

> Version: 1.0  
> Scope: color palette, usage rules, accepted implementations, and Tailwind configuration  
> Brand direction: creative technology with human warmth

---

## 1. Design Principles

Zinns should feel modern, reliable, digital, and creative. The current isologo already combines a cold technological side through cyan and teal with a warm human side through coral and pink. The design system should preserve that DNA while making it easier to build websites, apps, dashboards, social assets, and internal documents consistently.

### Core principles

1. **Clarity before decoration**  
   Colors should support hierarchy, readability, and usability before visual flair.

2. **Teal is the foundation**  
   Deep teal represents trust, stability, and professionalism. It should be the main brand anchor.

3. **Cyan is the digital spark**  
   Aqua and cyan should be used to communicate technology, motion, freshness, and interaction.

4. **Coral is the emotional accent**  
   Coral and pink should be used intentionally to create warmth, contrast, and visual memorability.

5. **Gradients are brand moments, not everyday UI**  
   Gradients should appear in hero sections, brand graphics, social media, presentation covers, and special highlights. They should not be used heavily in dense interfaces.

6. **Neutral colors carry the system**  
   Most interfaces should be built with white, soft mint backgrounds, deep text colors, and subtle borders.

---

## 2. Brand Color Palette

### 2.1 Core Brand Colors

| Token             | Name       |       Hex | Role                                          |
| ----------------- | ---------- | --------: | --------------------------------------------- |
| `brand.primary`   | Zinns Teal | `#155F6B` | Main identity color                           |
| `brand.secondary` | Aqua Cyan  | `#39BFD3` | Digital accent and interactive highlights     |
| `brand.accent`    | Soft Coral | `#E85F86` | Warm creative accent                          |
| `brand.softAqua`  | Soft Aqua  | `#8ED2D8` | Light highlights, gradients, backgrounds      |
| `brand.softPink`  | Soft Pink  | `#E89AAD` | Gradient support, illustrations, soft accents |

### 2.2 Neutral Colors

| Token                | Name       |       Hex | Role                               |
| -------------------- | ---------- | --------: | ---------------------------------- |
| `text.primary`       | Ink Teal   | `#102F35` | Main text                          |
| `text.secondary`     | Slate Teal | `#496970` | Supporting text                    |
| `text.muted`         | Mist Gray  | `#7D9298` | Labels, metadata, placeholders     |
| `border.default`     | Cloud Line | `#D8E5E8` | Default borders                    |
| `border.strong`      | Fog Teal   | `#AFC8CE` | Stronger borders, dividers         |
| `background.soft`    | Ice Mint   | `#F4FAFB` | Soft sections and page backgrounds |
| `background.default` | Snow       | `#FFFFFF` | Default page background            |
| `background.dark`    | Deep Ocean | `#092B31` | Dark hero, footer, dark theme base |

### 2.3 Semantic Colors

Semantic colors are used for interface feedback. They should not be replaced with brand colors unless accessibility and meaning remain clear.

| Token              |       Hex | Usage                             |
| ------------------ | --------: | --------------------------------- |
| `semantic.success` | `#1FA971` | Success states, completed actions |
| `semantic.warning` | `#F4A62A` | Warnings, attention states        |
| `semantic.error`   | `#D9435E` | Errors, destructive states        |
| `semantic.info`    | `#2CA9C2` | Information messages              |

---

## 3. Color Usage Ratio

Use this approximate distribution across UI and marketing assets:

| Color group                       | Suggested usage |
| --------------------------------- | --------------: |
| Neutrals and backgrounds          |             70% |
| Primary teal                      |             20% |
| Cyan, coral, and gradient accents |             10% |

This prevents the brand from becoming visually noisy. The bright colors should feel intentional, not spilled confetti.

---

## 4. Color Roles and Rules

### 4.1 Zinns Teal: `#155F6B`

Use for:

- Main navigation elements
- Primary buttons
- Main brand headings
- Important icons
- Footer backgrounds
- Key UI states
- Logo text when applicable

Avoid using for:

- Long text on dark backgrounds
- Disabled states
- Error states

Accepted implementations:

```html
<button class="bg-brand-primary text-white hover:bg-brand-primary-hover">Get started</button>
```

```tsx
<h1 className="text-brand-primary">Build better digital products</h1>
```

---

### 4.2 Aqua Cyan: `#39BFD3`

Use for:

- Interactive highlights
- Active navigation indicators
- Icons
- Data visualization accents
- Small decorative elements
- Focus rings
- Link hover states

Avoid using for:

- Small body text on white backgrounds
- Large areas without contrast control
- Critical semantic states

Accepted implementations:

```html
<a class="text-link hover:text-brand-primary"> Learn more </a>
```

```tsx
<div className="border-l-4 border-brand-secondary bg-background-soft p-4">Highlighted content</div>
```

---

### 4.3 Soft Coral: `#E85F86`

Use for:

- Campaign CTAs
- Promotional badges
- Creative highlights
- Illustration accents
- Social media visuals
- Special product moments

Avoid using for:

- Main navigation
- Repeated primary CTAs across the whole product
- Error messages, unless using the semantic error color instead
- Dense dashboards

Accepted implementations:

```html
<span class="rounded-full bg-brand-accent/10 px-3 py-1 text-brand-accent"> New </span>
```

```tsx
<button className="bg-brand-accent text-white hover:bg-brand-accent-hover">
  Join the waitlist
</button>
```

---

## 5. Gradients

### 5.1 Main Brand Gradient

```css
linear-gradient(135deg, #39BFD3 0%, #8ED2D8 38%, #E89AAD 70%, #E85F86 100%)
```

Use for:

- Hero backgrounds
- Marketing banners
- Social media templates
- Presentation covers
- Decorative cards
- Large brand moments
- Loading or empty states

Avoid using for:

- Body text
- Small buttons
- Dense dashboards
- Forms
- Tables
- Input fields
- Accessibility-critical information

Accepted implementation:

```html
<section class="bg-gradient-brand text-white">
  <h1>Creative technology with human warmth</h1>
</section>
```

### 5.2 Subtle Gradient

```css
linear-gradient(135deg, rgba(57, 191, 211, 0.14), rgba(232, 95, 134, 0.14))
```

Use for:

- Light section backgrounds
- Soft cards
- Decorative panels
- Empty states

Accepted implementation:

```html
<div class="bg-gradient-brand-soft rounded-2xl p-6">
  <h2>Design, code, and strategy in one place.</h2>
</div>
```

---

## 6. Light Theme

| Role            | Token                |       Hex |
| --------------- | -------------------- | --------: |
| Page background | `background.default` | `#FFFFFF` |
| Soft background | `background.soft`    | `#F4FAFB` |
| Card background | `surface.card`       | `#FFFFFF` |
| Primary text    | `text.primary`       | `#102F35` |
| Secondary text  | `text.secondary`     | `#496970` |
| Muted text      | `text.muted`         | `#7D9298` |
| Main border     | `border.default`     | `#D8E5E8` |
| Primary action  | `brand.primary`      | `#155F6B` |
| Accent action   | `brand.secondary`    | `#39BFD3` |

Recommended CSS variables:

```css
:root {
  --color-brand-primary: #155f6b;
  --color-brand-primary-hover: #0f4d57;
  --color-brand-secondary: #39bfd3;
  --color-brand-secondary-hover: #168ca0;
  --color-brand-accent: #e85f86;
  --color-brand-accent-hover: #d94f75;

  --color-background-default: #ffffff;
  --color-background-soft: #f4fafb;
  --color-background-dark: #092b31;

  --color-surface-card: #ffffff;

  --color-text-primary: #102f35;
  --color-text-secondary: #496970;
  --color-text-muted: #7d9298;
  --color-text-inverse: #ffffff;

  --color-border-default: #d8e5e8;
  --color-border-strong: #afc8ce;

  --color-success: #1fa971;
  --color-warning: #f4a62a;
  --color-error: #d9435e;
  --color-info: #2ca9c2;
}
```

---

## 7. Dark Theme

Dark mode should feel elegant and technological. In dark mode, cyan becomes more useful as an interactive color because deep teal loses contrast against dark surfaces.

| Role            | Token                |       Hex |
| --------------- | -------------------- | --------: |
| Page background | `background.default` | `#071E23` |
| Soft background | `background.soft`    | `#0D2B31` |
| Card background | `surface.card`       | `#123A42` |
| Primary text    | `text.primary`       | `#EAF7F9` |
| Secondary text  | `text.secondary`     | `#A8C6CC` |
| Muted text      | `text.muted`         | `#719199` |
| Border          | `border.default`     | `#1F4E57` |
| Primary action  | `brand.primary`      | `#39BFD3` |
| Accent action   | `brand.accent`       | `#E85F86` |

Recommended CSS variables:

```css
.dark {
  --color-brand-primary: #39bfd3;
  --color-brand-primary-hover: #8ed2d8;
  --color-brand-secondary: #8ed2d8;
  --color-brand-secondary-hover: #bde8ee;
  --color-brand-accent: #e85f86;
  --color-brand-accent-hover: #f08eaa;

  --color-background-default: #071e23;
  --color-background-soft: #0d2b31;
  --color-background-dark: #041417;

  --color-surface-card: #123a42;

  --color-text-primary: #eaf7f9;
  --color-text-secondary: #a8c6cc;
  --color-text-muted: #719199;
  --color-text-inverse: #071e23;

  --color-border-default: #1f4e57;
  --color-border-strong: #34717d;

  --color-success: #38c98b;
  --color-warning: #f7b84b;
  --color-error: #f06b80;
  --color-info: #39bfd3;
}
```

---

## 8. Component Rules

### 8.1 Buttons

#### Primary button

Use for the most important action on a screen.

```html
<button
  class="rounded-xl bg-brand-primary px-5 py-3 font-medium text-white transition hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
>
  Primary action
</button>
```

Rules:

- Only one primary button should dominate a view.
- Use `brand.primary` in light mode.
- Use cyan-based primary in dark mode through CSS variables.
- Text must be white or inverse depending on theme.

#### Secondary button

Use for supportive actions.

```html
<button
  class="rounded-xl border border-border-default bg-background-soft px-5 py-3 font-medium text-brand-primary transition hover:border-brand-secondary hover:bg-white"
>
  Secondary action
</button>
```

Rules:

- Secondary buttons should not compete with primary CTAs.
- Use borders and soft backgrounds instead of saturated fills.

#### Accent button

Use only for special campaigns or high-energy marketing moments.

```html
<button
  class="rounded-xl bg-brand-accent px-5 py-3 font-medium text-white transition hover:bg-brand-accent-hover"
>
  Special action
</button>
```

Rules:

- Do not use as the default CTA across the product.
- Avoid using next to error messages to prevent semantic confusion.

---

### 8.2 Links

```html
<a class="font-medium text-link underline-offset-4 hover:text-brand-primary hover:underline">
  Read more
</a>
```

Rules:

- Default links should use `text-link`, not raw cyan.
- Hover can shift to `brand.primary`.
- Links inside dark backgrounds should use `brand.secondary` or `text.inverse` with underline.

---

### 8.3 Cards

```html
<article class="rounded-2xl border border-border-default bg-surface-card p-6 shadow-sm">
  <h3 class="text-lg font-semibold text-text-primary">Card title</h3>
  <p class="mt-2 text-text-secondary">Card description.</p>
</article>
```

Rules:

- Default card background should remain clean and neutral.
- Use cyan or coral as a small accent, not as the entire card background.
- Prefer `rounded-2xl` for brand softness.
- Use subtle shadows. Avoid heavy, black shadows.

---

### 8.4 Forms

```html
<label class="block text-sm font-medium text-text-secondary"> Email </label>
<input
  class="mt-2 w-full rounded-xl border border-border-default bg-white px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/30"
  placeholder="you@company.com"
/>
```

Rules:

- Inputs should use neutral borders by default.
- Focus states should use cyan.
- Error states should use semantic error, not coral.
- Placeholder text should use muted text.

---

### 8.5 Badges

```html
<span class="rounded-full bg-brand-secondary/10 px-3 py-1 text-sm font-medium text-brand-primary">
  Featured
</span>
```

```html
<span class="rounded-full bg-brand-accent/10 px-3 py-1 text-sm font-medium text-brand-accent">
  New
</span>
```

Rules:

- Use badges for metadata, status, or emphasis.
- Do not use badges as buttons unless they are explicitly interactive.
- Semantic badges should use semantic colors.

---

### 8.6 Alerts

Success:

```html
<div class="rounded-xl border border-success/20 bg-success/10 p-4 text-success">
  Your changes were saved successfully.
</div>
```

Error:

```html
<div class="rounded-xl border border-error/20 bg-error/10 p-4 text-error">
  Something went wrong. Please try again.
</div>
```

Rules:

- Alerts must use semantic colors.
- Do not use brand accent as a replacement for error.
- Text should remain readable and direct.

---

## 9. Typography Recommendations

Typography is not finalized in this version, but the color system works best with clean, modern sans-serif typefaces.

Recommended options:

1. **Inter**  
   Best for SaaS, dashboards, apps, and technical interfaces.

2. **Manrope**  
   More expressive and modern, useful for marketing and brand pages.

3. **Plus Jakarta Sans**  
   Friendly, polished, and slightly more distinctive.

Suggested default:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  sans-serif;
```

Rules:

- Do not use more than two font families in the same product.
- Use strong weight contrast instead of too many colors.
- Body text should use `text.primary` or `text.secondary`, never pure black.

---

## 10. Spacing and Radius

### 10.1 Spacing

Use an 8-point spacing system.

| Token      |  Value | Usage                   |
| ---------- | -----: | ----------------------- |
| `space.1`  |  `4px` | Tiny gaps               |
| `space.2`  |  `8px` | Small gaps              |
| `space.3`  | `12px` | Compact spacing         |
| `space.4`  | `16px` | Default element spacing |
| `space.6`  | `24px` | Card padding            |
| `space.8`  | `32px` | Section spacing         |
| `space.12` | `48px` | Large sections          |
| `space.16` | `64px` | Hero spacing            |

### 10.2 Border radius

| Token         |    Value | Usage                      |
| ------------- | -------: | -------------------------- |
| `radius.sm`   |    `8px` | Small elements             |
| `radius.md`   |   `12px` | Buttons, inputs            |
| `radius.lg`   |   `16px` | Cards                      |
| `radius.xl`   |   `24px` | Hero cards, feature panels |
| `radius.full` | `9999px` | Pills, avatars             |

Rules:

- Use rounded corners consistently.
- Default buttons and inputs should use `rounded-xl`.
- Default cards should use `rounded-2xl`.
- Avoid mixing sharp and rounded styles in the same interface.

---

## 11. Shadows

Use soft shadows only. The brand should feel clean and precise, not heavy.

Recommended shadows:

```css
--shadow-soft: 0 8px 24px rgba(16, 47, 53, 0.08);
--shadow-card: 0 12px 32px rgba(16, 47, 53, 0.1);
--shadow-glow: 0 0 32px rgba(57, 191, 211, 0.24);
```

Rules:

- Use `shadow-soft` for cards.
- Use `shadow-card` for floating panels and modals.
- Use `shadow-glow` sparingly for brand moments.
- Avoid pure black shadows.

---

## 12. Accessibility Rules

1. Body text must use `text.primary` or `text.secondary`.
2. Avoid using `brand.secondary` as small text on white.
3. Do not place coral text over pink or gradient backgrounds.
4. Do not rely on color alone to communicate state.
5. Error, warning, success, and info states must include text, icon, or layout support.
6. Interactive elements must have visible focus styles.
7. Gradients must not reduce text contrast.
8. Avoid gradient text for critical information.
9. Use semantic colors for system feedback.
10. Test primary UI flows in light and dark mode.

---

## 13. Accepted Implementations

### 13.1 CSS Variables

Accepted for:

- Next.js apps
- React apps
- Design systems
- Multi-theme products
- Tailwind integration

Recommended pattern:

```css
:root {
  --color-brand-primary: #155f6b;
  --color-brand-secondary: #39bfd3;
  --color-brand-accent: #e85f86;
}

.dark {
  --color-brand-primary: #39bfd3;
  --color-brand-secondary: #8ed2d8;
  --color-brand-accent: #e85f86;
}
```

### 13.2 Tailwind Tokens

Accepted for:

- Fast implementation
- Design consistency
- Component libraries
- Responsive websites
- Apps with shared UI primitives

Recommended pattern:

```tsx
<button className="bg-brand-primary text-white hover:bg-brand-primary-hover">Save</button>
```

### 13.3 Design Tokens in TypeScript

Accepted for:

- React Native
- Expo apps
- Theme providers
- Shared packages
- Documentation

Recommended pattern:

```ts
export const colors = {
  brand: {
    primary: '#155F6B',
    secondary: '#39BFD3',
    accent: '#E85F86',
  },
};
```

---

## 14. Not Accepted Implementations

Avoid these patterns:

```tsx
// Do not hardcode random brand-like colors.
<div className="bg-[#22d3ee] text-[#123]" />
```

```tsx
// Do not use coral as an error state.
<p className="text-brand-accent">Invalid password</p>
```

```tsx
// Do not use cyan for long paragraphs on white.
<p className="text-brand-secondary">Long paragraph content...</p>
```

```tsx
// Do not use gradients in small form controls.
<input className="bg-gradient-brand" />
```

```tsx
// Do not use too many accent colors together.
<section className="bg-brand-secondary text-brand-accent border-brand-primary" />
```

Rules:

- Do not invent new colors without adding them to the design system.
- Do not use arbitrary hex colors in production UI unless documenting a new token.
- Do not use logo gradients as default UI backgrounds everywhere.
- Do not use semantic colors for decorative brand moments.
- Do not use brand colors in ways that break accessibility.

---

## 15. Suggested Tailwind Configuration

### 15.1 Tailwind config using CSS variables

This is the recommended implementation because it supports light and dark themes cleanly.

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          'primary-hover': 'var(--color-brand-primary-hover)',
          secondary: 'var(--color-brand-secondary)',
          'secondary-hover': 'var(--color-brand-secondary-hover)',
          accent: 'var(--color-brand-accent)',
          'accent-hover': 'var(--color-brand-accent-hover)',
          'soft-aqua': '#8ED2D8',
          'soft-pink': '#E89AAD',
        },
        background: {
          default: 'var(--color-background-default)',
          soft: 'var(--color-background-soft)',
          dark: 'var(--color-background-dark)',
        },
        surface: {
          card: 'var(--color-surface-card)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        border: {
          default: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        link: '#168CA0',
      },
      backgroundImage: {
        'gradient-brand':
          'linear-gradient(135deg, #39BFD3 0%, #8ED2D8 38%, #E89AAD 70%, #E85F86 100%)',
        'gradient-brand-soft':
          'linear-gradient(135deg, rgba(57, 191, 211, 0.14), rgba(232, 95, 134, 0.14))',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(16, 47, 53, 0.08)',
        card: '0 12px 32px rgba(16, 47, 53, 0.10)',
        glow: '0 0 32px rgba(57, 191, 211, 0.24)',
      },
      borderRadius: {
        brand: '1rem',
        'brand-lg': '1.5rem',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 16. Suggested Global CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-brand-primary: #155f6b;
  --color-brand-primary-hover: #0f4d57;
  --color-brand-secondary: #39bfd3;
  --color-brand-secondary-hover: #168ca0;
  --color-brand-accent: #e85f86;
  --color-brand-accent-hover: #d94f75;

  --color-background-default: #ffffff;
  --color-background-soft: #f4fafb;
  --color-background-dark: #092b31;

  --color-surface-card: #ffffff;

  --color-text-primary: #102f35;
  --color-text-secondary: #496970;
  --color-text-muted: #7d9298;
  --color-text-inverse: #ffffff;

  --color-border-default: #d8e5e8;
  --color-border-strong: #afc8ce;

  --color-success: #1fa971;
  --color-warning: #f4a62a;
  --color-error: #d9435e;
  --color-info: #2ca9c2;
}

.dark {
  --color-brand-primary: #39bfd3;
  --color-brand-primary-hover: #8ed2d8;
  --color-brand-secondary: #8ed2d8;
  --color-brand-secondary-hover: #bde8ee;
  --color-brand-accent: #e85f86;
  --color-brand-accent-hover: #f08eaa;

  --color-background-default: #071e23;
  --color-background-soft: #0d2b31;
  --color-background-dark: #041417;

  --color-surface-card: #123a42;

  --color-text-primary: #eaf7f9;
  --color-text-secondary: #a8c6cc;
  --color-text-muted: #719199;
  --color-text-inverse: #071e23;

  --color-border-default: #1f4e57;
  --color-border-strong: #34717d;

  --color-success: #38c98b;
  --color-warning: #f7b84b;
  --color-error: #f06b80;
  --color-info: #39bfd3;
}

html {
  background: var(--color-background-default);
  color: var(--color-text-primary);
}

body {
  background: var(--color-background-default);
  color: var(--color-text-primary);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

::selection {
  background: rgba(57, 191, 211, 0.28);
  color: var(--color-text-primary);
}
```

---

## 17. Example Components

### 17.1 Hero section

```tsx
export function Hero() {
  return (
    <section className="bg-background-soft px-6 py-20">
      <div className="mx-auto max-w-6xl rounded-brand-lg bg-gradient-brand p-10 text-white shadow-glow">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide">Zinns</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Creative technology with human warmth.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/90">
          We design and build digital products that feel clear, useful, and memorable.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-xl bg-white px-5 py-3 font-medium text-brand-primary hover:bg-background-soft">
            Start a project
          </button>
          <button className="rounded-xl border border-white/40 px-5 py-3 font-medium text-white hover:bg-white/10">
            View work
          </button>
        </div>
      </div>
    </section>
  );
}
```

### 17.2 Feature card

```tsx
export function FeatureCard() {
  return (
    <article className="rounded-2xl border border-border-default bg-surface-card p-6 shadow-soft">
      <div className="mb-4 h-10 w-10 rounded-xl bg-brand-secondary/10 text-brand-primary" />
      <h3 className="text-xl font-semibold text-text-primary">Product strategy</h3>
      <p className="mt-2 text-text-secondary">
        Define the right product direction before jumping into screens and code.
      </p>
    </article>
  );
}
```

### 17.3 Form field

```tsx
export function TextField() {
  return (
    <div>
      <label className="text-sm font-medium text-text-secondary">Email</label>
      <input
        type="email"
        placeholder="you@company.com"
        className="mt-2 w-full rounded-xl border border-border-default bg-background-default px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/30"
      />
    </div>
  );
}
```

---

## 18. Brand Application Guidelines

### Website

Use:

- White or Ice Mint backgrounds
- Deep teal headings
- Primary teal buttons
- Cyan focus and hover states
- Coral for selected highlights
- Gradient only in hero or brand sections

Avoid:

- Full-page gradients in every section
- Coral as the dominant site color
- Cyan paragraphs on white
- Overusing shadows

### App or Dashboard

Use:

- Neutral backgrounds
- Strong text hierarchy
- Cyan for active states and focus
- Semantic colors for statuses
- Minimal coral accents

Avoid:

- Gradient-heavy panels
- Decorative colors in data-dense views
- Brand colors replacing semantic meaning

### Social Media

Use:

- More expressive gradients
- Larger coral and cyan blocks
- Deep teal text blocks
- Logo on dark or white backgrounds
- Consistent template spacing

Avoid:

- Too many gradients in a single composition
- Low-contrast text over the logo colors
- Random colors outside the palette

### Presentations

Use:

- Gradient cover slides
- White or Ice Mint content slides
- Deep teal titles
- Cyan section dividers
- Coral for key numbers or callouts

Avoid:

- Gradient text for paragraphs
- Multiple accent colors on one slide
- Heavy decorative backgrounds behind dense content

---

## 19. Implementation Checklist

Before shipping a new Zinns interface, verify:

- [ ] Colors use defined tokens.
- [ ] No arbitrary hex colors are used without approval.
- [ ] Primary action is visually clear.
- [ ] Semantic states use semantic colors.
- [ ] Focus states are visible.
- [ ] Text contrast is readable.
- [ ] Gradients are used only for brand moments.
- [ ] Dark mode has enough contrast.
- [ ] Cards and sections follow spacing rules.
- [ ] Components feel consistent across pages.

---

## 20. Future Extensions

The next design system versions should define:

1. Logo usage rules
2. Typography scale
3. Icon style
4. Illustration style
5. Motion principles
6. Data visualization palette
7. Social media templates
8. Presentation templates
9. React component library
10. Figma variables and component tokens

---

## 21. Summary

The Zinns design system should be built around a mature teal foundation, energized by cyan, warmed by coral, and supported by calm neutrals. The final result should feel professional enough for serious digital work, but expressive enough to avoid becoming another gray software brand.

The palette is not just decoration. It is the brand's operating system.
