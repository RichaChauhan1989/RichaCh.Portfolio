---
title: DESIGN_SPEC
product: Richa Chauhan — Designer Portfolio
version: 1.0.0
date: 2026-05-19
owner: AI Designer
source_prd: PRD.md
---

## 1. Overview

### Goals & Value
- Deliver a fast, credible, editorially polished portfolio for Richa Chauhan that converts recruiter attention into contact or CV download.
- Extend the existing case study design system to the homepage so the entire site feels like one cohesive product.
- Priority KPIs: ≤ 2 clicks from landing to case study; CV download reachable at all times; ≤ 2s desktop load.

### In-Scope
- `index.html` — single-page portfolio (About, Work, Contact sections)
- Top navigation with hamburger on mobile
- 3 case study cards (2 live, 1 placeholder)
- CSS-generated geometric avatar (no photo)
- Contact form (mailto / Formspree)
- CV download button (nav + contact section)
- Footer

### Out-of-Scope
- Dark mode
- Analytics / tracking scripts
- Social media links
- TechTDS case study page (future)
- Backend / database

### Terms
| Term | Definition |
|------|-----------|
| Paper | Background colour `#F5F3EF` |
| Ink | Primary text colour `#1C1C1A` |
| Orange | Accent / CTA colour `#E8622A` |
| Rule | Divider / border colour `#E2E0DA` |
| Card | A case study preview block |
| Avatar | CSS-generated geometric illustration replacing a photo |

---

## 2. Users & Scenarios

### Target Personas

| Persona | Device | Network | Behaviour |
|---------|--------|---------|-----------|
| Sarah — Talent Recruiter | Desktop Chrome, occasionally mobile Safari | Fast broadband / 4G | Scans fast, looks for role clarity + work quality, downloads CV |
| James — Design Lead | Desktop Firefox | Fast broadband | Reads case study depth, evaluates process thinking |

### Primary Use Scenarios

| # | Scenario | Priority |
|---|----------|----------|
| 1 | Land → read About → scroll Work → open case study | P0 |
| 2 | Land → click Download CV from nav | P0 |
| 3 | Land → scroll to Contact → submit form | P0 |
| 4 | Mobile: hamburger nav → jump to section | P0 |

### Key Task Flows & Success Criteria

**Flow 1 — Read & Browse**
```
Page load → About section (auto) → scroll or click Work nav link
→ 3 case study cards visible → click card → case study page opens
```
Success: < 2 clicks from landing to case study open.

**Flow 2 — CV Download**
```
Any scroll position → click "Download CV" in nav OR
scroll to Contact section → click "Download CV" button
→ PDF downloads / opens in new tab
```
Success: Always accessible; zero friction.

**Flow 3 — Contact**
```
Click "Contact Me" nav link → smooth scroll to Contact section
→ fill Name + Email + Message → click Send → confirmation shown
```
Success: Form submits without page reload; confirmation message displayed.

---

## 3. Information Architecture & Navigation

### Site Map
```
index.html
├── <nav>               sticky, z-index 100
│   ├── Name (home anchor)
│   ├── About (scroll link)
│   ├── Work (scroll link)
│   ├── Contact Me (scroll link)
│   └── Download CV (button)
│   └── [mobile] Hamburger toggle
├── #about              About section
├── #work               Work / Case Studies section
├── #contact            Contact section
└── <footer>            Copyright

External pages (existing, not rebuilt):
├── sphara-case-study%20(3).html
├── deloitte-case-study%20(2).html
└── [TechTDS — future]
```

### Navigation Model
- **Type**: Sticky horizontal top nav, collapses to hamburger on mobile.
- **Active state**: Current section highlighted in nav using IntersectionObserver (or scroll position check).
- **Scroll behaviour**: `scroll-behavior: smooth` on `<html>`.
- **Back / breadcrumb**: Not needed (single page). Case study pages have their own back-to-portfolio nav.
- **Mobile menu**: Full-width overlay dropdown, closes on link click or outside tap.

---

## 4. Pages & Flows

### Page List

| Page | Route | Auth |
|------|-------|------|
| Portfolio home | `index.html` | None |
| Sphara case study | `sphara-case-study%20(3).html` | None |
| Deloitte case study | `deloitte-case-study%20(2).html` | None |

### Section Flows

#### About Section
```
Page load (0ms)
  → nav fades in (opacity 0→1, 300ms ease)
  → about section content fades up (opacity 0→1, translateY 20px→0, 400ms, 100ms delay)
```

#### Work Section
```
User scrolls to #work or clicks "Work" in nav
  → section title and subtitle animate in
  → 3 cards stacked vertically, full-width
  → hover on live card → lift effect (translateY -4px + shadow deepen)
  → click live card → navigate to case study HTML
  → Card 3 shows "Coming Soon" badge, cursor: default, no hover lift
```

#### Contact Section
```
User scrolls to #contact or clicks "Contact Me" in nav
  → form centred, max-width 600px
  → fill fields → click "Send Message"
  → button shows loading spinner (300ms)
  → on success → form hidden, success message shown
  → on error → inline error message below submit button
```

### State Definitions

| State | Copy | Visual |
|-------|------|--------|
| Form loading | — | Button text → spinner icon |
| Form success | "Thanks! I'll be in touch soon." | Green checkmark icon, form hidden |
| Form error | "Something went wrong. Please email richasain1989@gmail.com directly." | Error text below button |
| Card 3 (placeholder) | "Coming Soon" | Orange badge overlay, reduced opacity 0.7 |
| Nav active link | — | Orange underline / colour shift |

---

## 5. Visual Guidelines (Design System)

### 5.1 Design Tokens

#### Colours

| Token | Value | Usage | Notes |
|-------|-------|-------|-------|
| `--paper` | `#F5F3EF` | Page background, section backgrounds | Warm off-white |
| `--ink` | `#1C1C1A` | Body text, headings, nav links | Near-black |
| `--orange` | `#E8622A` | CTAs, active nav, accents, card hover border | Primary accent |
| `--orange-dark` | `#B84A1A` | Button hover state | |
| `--orange-light` | `#FDF0EA` | Pull-quote backgrounds, badge fill | |
| `--mid` | `#6B6B65` | Secondary text, labels, captions | |
| `--rule` | `#E2E0DA` | Dividers, borders, card outlines | |
| `--white` | `#FFFFFF` | Cards, form fields, nav background | |
| `--success` | `#27ae60` | Form success message | |
| `--error` | `#c0392b` | Form validation errors | |

#### Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--font-serif` | `"Playfair Display", Georgia, serif` | All headings, name, tagline |
| `--font-sans` | `"DM Sans", system-ui, sans-serif` | Body, nav, labels, form, buttons |
| `--text-xs` | `12px / 1.4` | Labels, captions, meta |
| `--text-sm` | `14px / 1.5` | Secondary text, card categories |
| `--text-base` | `17px / 1.75` | Body text |
| `--text-lg` | `20px / 1.6` | Lead text, about bio |
| `--text-xl` | `clamp(1.4rem, 3vw, 2rem)` | Section headings (h2) |
| `--text-2xl` | `clamp(2rem, 5vw, 3.5rem)` | About name / tagline (h1) |
| `--weight-light` | `300` | Body, lead text |
| `--weight-regular` | `400` | Standard body |
| `--weight-medium` | `500` | Nav links, card titles |
| `--weight-semibold` | `600` | Buttons, labels, uppercase caps |
| `--weight-bold` | `700` | Headings |

#### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-2` | `8px` | Tight gaps |
| `--space-4` | `16px` | Component internal padding |
| `--space-6` | `24px` | Section horizontal padding (mobile) |
| `--space-8` | `32px` | Card padding, form field gap |
| `--space-12` | `48px` | Section vertical padding (mobile) |
| `--space-16` | `64px` | Section vertical padding (desktop) |
| `--space-18` | `72px` | Nav height / hero top padding |

#### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `4px` | Badges, tags |
| `--radius-md` | `8px` | Form inputs, small cards |
| `--radius-lg` | `12px` | Case study cards |
| `--radius-full` | `9999px` | Avatar circle, pill buttons |

#### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 4px rgba(28,28,26,0.06)` | Default card |
| `--shadow-md` | `0 4px 16px rgba(28,28,26,0.10)` | Card hover |
| `--shadow-nav` | `0 1px 0 var(--rule)` | Nav bottom border |

#### Motion

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | All transitions |
| `--duration-fast` | `150ms` | Hover states |
| `--duration-base` | `300ms` | Nav, button, menu |
| `--duration-enter` | `400ms` | Section / element fade-in |

---

### 5.2 Grid & Layout

#### Breakpoints

| Name | Width | Behaviour |
|------|-------|-----------|
| Mobile | `< 768px` | Single column, hamburger nav, stacked cards |
| Tablet | `768px – 1199px` | Single column content, full nav visible |
| Desktop | `≥ 1200px` | Max-width container, side margins |

#### Container

```css
.wrap {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px;
}
```

- Nav max-width: `1200px` (wider to fill header)
- Content max-width: `860px`
- Form max-width: `600px`
- Cards: full container width (one per row)

#### Grid

- Single-column layout throughout (editorial, focused reading)
- No multi-column content grids — whitespace and typography create hierarchy
- Case study cards: `display: flex`, horizontal layout, full container width, `min-height: 320px`

---

### 5.3 Component Library

---

#### Component: Navigation Bar

**Purpose:** Primary wayfinding; always visible; provides quick access to all sections and CV download.

**Structure:**
```
<nav class="site-nav">
  <div class="nav-inner wrap-nav">
    <a class="nav-name" href="#about">Richa Chauhan</a>
    <div class="nav-links" id="navLinks">
      <a href="#about" class="nav-link">About</a>
      <a href="#work" class="nav-link">Work</a>
      <a href="#contact" class="nav-link">Contact Me</a>
    </div>
    <a href="RichaChauhan-CV.pdf" download class="btn btn-outline nav-cv">Download CV</a>
    <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
```

**Props / States:**

| State | Visual |
|-------|--------|
| Default | White bg, ink text, `--shadow-nav` |
| Scrolled | Same (always sticky) |
| Active link | `color: --orange`, subtle underline `2px solid --orange` |
| Hamburger open | Nav links shown as dropdown; button transforms to ✕ |
| CV button hover | `background: --orange`, `color: #fff`, `border-color: --orange` |

**Interactions:**
- Links trigger `scrollIntoView({ behavior: 'smooth' })`
- Active link updated on scroll via `IntersectionObserver`
- Hamburger toggles `aria-expanded` and `class="open"` on `#navLinks`
- Clicking a mobile nav link closes the menu

**Accessibility:**
- `<nav>` has `aria-label="Main navigation"`
- Hamburger button has `aria-expanded` and `aria-controls="navLinks"`
- All links have visible focus ring (`outline: 2px solid --orange; outline-offset: 2px`)

---

#### Component: About Section

**Purpose:** Introduce the designer — name, tagline, bio, and a CSS geometric avatar.

**Structure:**
```
<section id="about" class="about-section">
  <div class="wrap">
    <div class="about-avatar"><!-- CSS geometric shapes --></div>
    <p class="about-eyebrow">PRODUCT DESIGNER & RESEARCHER</p>
    <h1 class="about-name">Hello! I'm Richa Chauhan</h1>
    <p class="about-tagline">I'm a designer who makes magic through product & brand.</p>
    <p class="about-bio">
      With 4+ years of experience, I craft thoughtful digital products
      that balance user needs with business goals. Based in New Zealand,
      I work across product design and research — turning complex problems
      into clear, elegant experiences.
    </p>
  </div>
</section>
```

**Avatar — CSS Geometric Specification:**
- Container: `80px × 80px`, `border-radius: 50%`, `background: --ink`
- Inner: 2–3 overlapping geometric shapes in `--orange` and `--orange-light`
- Style: Abstract, architectural — circles and rectangles offset for a Bauhaus/editorial feel
- No external image required; pure CSS + HTML

```
Avatar visual concept:
  ┌─────────────────────────┐
  │   ●  dark circle        │   outer: 80px circle, fill: --ink
  │   ◐  orange half        │   inner: 48px circle, fill: --orange, offset top-right
  │   ─  horizontal line    │   accent: 2px rule, fill: --paper, centered
  └─────────────────────────┘
```

**Typography:**
- Eyebrow: `10px`, `600`, `letter-spacing: 0.18em`, `text-transform: uppercase`, `color: --orange`
- Name (h1): `clamp(2rem, 5vw, 3.5rem)`, Playfair Display, `700`, `--ink`
- Tagline: `clamp(1.1rem, 2.5vw, 1.4rem)`, Playfair Display, `400 italic`, `--mid`
- Bio: `18px`, DM Sans, `300`, `--mid`, `max-width: 600px`

**Spacing:**
- Section padding: `80px 0` desktop, `56px 0` mobile
- Avatar margin-bottom: `32px`
- Gap between elements: `16px`

---

#### Component: Work Section

**Purpose:** Showcase 3 case studies as full-width landscape cards.

**Section Structure:**
```
<section id="work" class="work-section">
  <div class="wrap">
    <div class="section-header">
      <span class="chapter-num">SELECTED WORK</span>
      <div class="chapter-line"></div>
    </div>
    <div class="work-cards">
      <!-- 3 × <article class="case-card"> -->
    </div>
  </div>
</section>
```

**Card Structure (live card):**
```
<article class="case-card case-card--live">
  <div class="card-thumbnail card-thumb--sphara">
    <!-- CSS-generated visual, no img required -->
  </div>
  <div class="card-body">
    <div class="card-meta">
      <span class="card-tag">UX Design</span>
      <span class="card-tag">Emergency Services</span>
    </div>
    <h3 class="card-title">Sphara Emergency App</h3>
    <p class="card-desc">Redesigning emergency response for faster, clearer communication under pressure.</p>
    <a href="sphara-case-study%20(3).html" class="card-link">
      View Case Study <span aria-hidden="true">→</span>
    </a>
  </div>
</article>
```

**Card Structure (placeholder card):**
```
<article class="case-card case-card--placeholder">
  <div class="card-thumbnail card-thumb--techdts">
    <div class="coming-soon-badge">Coming Soon</div>
  </div>
  <div class="card-body">
    <div class="card-meta">
      <span class="card-tag">Product Design</span>
      <span class="card-tag">Deloitte Bangalore</span>
    </div>
    <h3 class="card-title">Tax Compliance Tool TechTDS</h3>
    <p class="card-desc">Case study coming soon.</p>
  </div>
</article>
```

**Card Layout:**
```
┌──────────────────────────────────────────────────────┐
│  [THUMBNAIL — 40% width]  │  [CONTENT — 60% width]   │
│  CSS-generated visual      │  Tags                    │
│  min-height: 320px         │  Title (h3, serif)       │
│                            │  Short description       │
│                            │  View Case Study →       │
└──────────────────────────────────────────────────────┘
```

- `display: flex`, `flex-direction: row`
- On mobile (`< 768px`): `flex-direction: column`, thumbnail on top
- Gap between cards: `32px`

**Thumbnail CSS Visual Specs:**

| Card | Theme | Background | Visual Element |
|------|-------|-----------|----------------|
| Sphara | Emergency / Motion | `linear-gradient(135deg, #1a2744 0%, #0f1b35 100%)` | Orange concentric rings (CSS circles), a location pin SVG outline in white |
| Deloitte 3CD | Enterprise / Grid | `linear-gradient(135deg, #1C1C1A 0%, #2a2a30 100%)` | CSS grid of small white dots (pattern), green accent bar |
| TechTDS | Tax / Neutral | `linear-gradient(135deg, #2d2318 0%, #3a2d20 100%)` | Subtle diagonal line pattern in `--rule` colour, Coming Soon overlay |

**Card States:**

| State | Visual |
|-------|--------|
| Default | `border: 1px solid --rule`, `border-radius: --radius-lg`, `box-shadow: --shadow-sm` |
| Hover (live) | `transform: translateY(-4px)`, `box-shadow: --shadow-md`, `border-color: --orange` — `transition: 250ms --ease-standard` |
| Hover (placeholder) | No change — `cursor: default` |
| Focus | `outline: 2px solid --orange; outline-offset: 3px` |

**Accessibility:**
- `<article>` semantic element per card
- `<h3>` for card titles (within `<section>` with `<h2>`)
- Link text "View Case Study" is descriptive
- Placeholder card has no `<a>` element (not keyboard focusable)

---

#### Component: Contact Section

**Purpose:** Provide a direct contact form and second CV download CTA.

**Structure:**
```
<section id="contact" class="contact-section">
  <div class="wrap">
    <div class="section-header">
      <span class="chapter-num">GET IN TOUCH</span>
      <div class="chapter-line"></div>
    </div>
    <h2 class="contact-heading">Let's work together</h2>
    <p class="contact-subhead">Open to new opportunities in New Zealand and remote.</p>
    <div class="contact-inner">
      <form class="contact-form" id="contactForm" novalidate>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required autocomplete="name" placeholder="Your name">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required autocomplete="email" placeholder="your@email.com">
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" required rows="5" placeholder="Tell me about the opportunity..."></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" id="submitBtn">
            <span class="btn-text">Send Message</span>
            <span class="btn-loader" aria-hidden="true" hidden></span>
          </button>
        </div>
        <div class="form-feedback" role="alert" aria-live="polite"></div>
      </form>
      <a href="RichaChauhan-CV.pdf" download class="btn btn-outline contact-cv">Download CV</a>
    </div>
  </div>
</section>
```

**Form Field States:**

| State | Visual |
|-------|--------|
| Default | `border: 1px solid --rule`, `background: --white`, `border-radius: --radius-md` |
| Focus | `border-color: --orange`, `box-shadow: 0 0 0 3px --orange-light`, outline removed |
| Error | `border-color: --error`, error message below in `--error` colour |
| Success (form) | Form element hidden, replaced by `"Thanks! I'll be in touch soon." + ✓` |

**Button Variants:**

| Variant | CSS | Usage |
|---------|-----|-------|
| Primary | `bg: --orange; color: #fff; border: none` | Submit, primary CTA |
| Primary hover | `bg: --orange-dark` | |
| Outline | `bg: transparent; border: 1.5px solid --ink; color: --ink` | Download CV |
| Outline hover | `bg: --ink; color: --white` | |
| Disabled | `opacity: 0.5; cursor: not-allowed` | Form loading state |

**Form submission:** Formspree endpoint OR `action="mailto:richasain1989@gmail.com"` fallback. Recommended: Formspree free tier with `fetch` API for in-page feedback.

---

#### Component: Footer

**Structure:**
```
<footer class="site-footer">
  <div class="wrap">
    <p class="footer-copy">© 2026 Richa Chauhan. All rights reserved.</p>
  </div>
</footer>
```

- Font: DM Sans, `13px`, `--mid`
- Padding: `32px 0`
- Top border: `1px solid --rule`
- Centred text

---

## 6. Interaction & Motion

### Page / Section Entrance
- Nav bar: `opacity: 0 → 1`, `duration: 300ms`, fires on DOM ready
- About section content: `opacity: 0, translateY: 20px → opacity: 1, translateY: 0`, `duration: 400ms`, `delay: 100ms`
- Work cards: Stagger entrance as cards enter viewport — `IntersectionObserver` triggers `opacity: 0 → 1`, `translateY: 16px → 0`, `duration: 350ms`, `100ms stagger` between cards
- Contact section: Same fade-up on viewport entry

### Micro-Interactions

| Element | Trigger | Effect | Duration |
|---------|---------|--------|----------|
| Nav link | hover | `color → --orange` | 150ms |
| CV button (nav) | hover | fill orange | 200ms |
| Case study card | hover | `translateY(-4px)`, shadow deepen | 250ms |
| Card link | hover | `color → --orange`, arrow nudge right `2px` | 150ms |
| Form input | focus | orange border + glow | 200ms |
| Submit button | hover | darken bg | 150ms |
| Hamburger | click | bars animate to ✕ | 250ms |
| Mobile menu | open/close | `max-height: 0 → auto` + `opacity` | 300ms |

### Reduced Motion
All transitions wrapped in:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Accessibility (A11y)

### Contrast Targets (WCAG 2.1 AA)

| Pairing | Ratio | Pass |
|---------|-------|------|
| `--ink` (#1C1C1A) on `--paper` (#F5F3EF) | ~16:1 | AA + AAA |
| `--mid` (#6B6B65) on `--paper` | ~5.8:1 | AA |
| `#fff` on `--orange` (#E8622A) | ~3.1:1 | AA Large only — use only for decorative / icon buttons ≥ 18pt |
| `--ink` on `--white` | ~17:1 | AA + AAA |
| `--orange` on `--white` | ~3.1:1 | Use for large text (headings) only |

> Note: White text on `--orange` at small sizes does not meet AA. All button text uses adequate size (≥ 16px / 600 weight) or swap to `--ink` on `--orange-light`.

### Keyboard Navigation
- Tab order follows visual DOM order (top-to-bottom, left-to-right)
- All interactive elements reachable via Tab
- Enter / Space activates links and buttons
- Hamburger accessible via keyboard, `aria-expanded` toggled
- Form labels programmatically associated with inputs via `for` / `id`
- Error messages injected into `role="alert"` region

### ARIA & Semantics Matrix

| Element | Tag | ARIA |
|---------|-----|------|
| Nav | `<nav>` | `aria-label="Main navigation"` |
| Hamburger | `<button>` | `aria-expanded`, `aria-controls="navLinks"`, `aria-label="Open menu"` |
| About | `<section>` | `aria-labelledby="about-heading"` |
| Work | `<section>` | `aria-labelledby="work-heading"` |
| Contact form | `<form>` | `aria-label="Contact form"`, `novalidate` |
| Form feedback | `<div>` | `role="alert"`, `aria-live="polite"` |
| Coming soon card | `<article>` | `aria-label="Coming soon project"` |
| Card link | `<a>` | `aria-label="View Sphara Emergency App case study"` |

---

## 8. Responsiveness & Adaptation

### Breakpoint Behaviour

| Component | Mobile < 768px | Tablet 768–1199px | Desktop ≥ 1200px |
|-----------|---------------|------------------|-----------------|
| Nav | Hamburger, full-width dropdown | Full inline nav | Full inline nav, wider container |
| About text | Centred, full width | Max 680px centred | Max 680px centred |
| Work cards | Stack vertical (thumbnail top, content below) | Horizontal (40/60 split) | Horizontal (40/60 split) |
| Contact form | Full width | Max 600px centred | Max 600px centred |
| Font sizes | Clamp min values | Clamp mid values | Clamp max values |
| Section padding | `48px 0` | `64px 0` | `80px 0` |

### Touch Considerations
- All tap targets minimum `44px × 44px`
- Nav links in mobile menu: `padding: 16px 24px` for easy tapping
- Hamburger button: `44px × 44px` minimum
- Card link: Full card is tappable on mobile (wrapping `<a>` around card on mobile or `onclick` delegation)
- Form inputs: `font-size: 16px` minimum to prevent iOS zoom on focus

---

## 9. Copy & Localisation

### Copy Style
- Tone: Warm, confident, professional — not corporate
- Tense: Present tense ("I design", "I work")
- Person: First-person singular
- Length: Short sentences; no jargon
- Terminology: "Case Study" not "Project"; "Download CV" not "Get Resume"

### All Copy Strings

| ID | Copy | Location |
|----|------|----------|
| `nav.about` | About | Nav |
| `nav.work` | Work | Nav |
| `nav.contact` | Contact Me | Nav |
| `nav.cv` | Download CV | Nav button |
| `about.eyebrow` | PRODUCT DESIGNER & RESEARCHER | About section |
| `about.greeting` | Hello! I'm Richa Chauhan | About h1 |
| `about.tagline` | I'm a designer who makes magic through product & brand. | About subhead |
| `about.bio` | With 4+ years of experience, I craft thoughtful digital products that balance user needs with business goals. Based in New Zealand, I work across product design and research — turning complex problems into clear, elegant experiences. | About body |
| `work.eyebrow` | SELECTED WORK | Work section |
| `card1.tags` | UX Design · Emergency Services | Card 1 |
| `card1.title` | Sphara Emergency App | Card 1 |
| `card1.desc` | Redesigning emergency response for faster, clearer communication under pressure. | Card 1 |
| `card1.cta` | View Case Study → | Card 1 link |
| `card2.tags` | UX Design · Enterprise · Deloitte | Card 2 |
| `card2.title` | Deloitte Tech 3CD Redesign | Card 2 |
| `card2.desc` | Streamlining a complex internal tool used by thousands of consultants globally. | Card 2 |
| `card2.cta` | View Case Study → | Card 2 link |
| `card3.tags` | Product Design · Deloitte Bangalore | Card 3 |
| `card3.title` | Tax Compliance Tool TechTDS | Card 3 |
| `card3.desc` | Case study coming soon. | Card 3 |
| `card3.badge` | Coming Soon | Card 3 badge |
| `contact.eyebrow` | GET IN TOUCH | Contact section |
| `contact.heading` | Let's work together | Contact h2 |
| `contact.subhead` | Open to new opportunities in New Zealand and remote. | Contact body |
| `form.name.label` | Name | Form |
| `form.name.placeholder` | Your name | Form |
| `form.email.label` | Email | Form |
| `form.email.placeholder` | your@email.com | Form |
| `form.message.label` | Message | Form |
| `form.message.placeholder` | Tell me about the opportunity... | Form |
| `form.submit` | Send Message | Button |
| `form.success` | Thanks! I'll be in touch soon. | Feedback |
| `form.error` | Something went wrong. Please email richasain1989@gmail.com directly. | Feedback |
| `footer.copy` | © 2026 Richa Chauhan. All rights reserved. | Footer |

### Localisation
- English only. No RTL. No i18n framework needed.

---

## 10. Assets & Handoff

### File Structure
```
Portfolio/
├── index.html                          ← to be built
├── style.css                           ← linked stylesheet (or inline in <style>)
├── RichaChauhan-CV.pdf                 ← existing
├── sphara-case-study (3).html          ← existing
├── deloitte-case-study (2).html        ← existing
└── DESIGN_SPEC.md                      ← this file
```

### Fonts
- Source: Google Fonts CDN
- URL: `https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap`
- `font-display: swap` to avoid FOIT

### Icons
- No icon library required
- Arrow character `→` used as text in links (accessible)
- Hamburger bars: pure CSS `<span>` elements
- Checkmark / spinner for form states: CSS-only or inline SVG (no library)

### No External Images
- All visuals are CSS-generated (avatar, card thumbnails)
- No `<img>` tags required in the main page

---

## 11. Dev Handoff Guide

### Stack
- Pure HTML5 + CSS3 + vanilla JavaScript (ES6+)
- No framework, no build step, no npm required
- Single `index.html` file; CSS may be in `<style>` block or external `style.css`
- Fonts via Google Fonts CDN

### CSS Architecture
- CSS custom properties (variables) defined in `:root` — match exact tokens from Section 5.1
- Mobile-first: base styles for mobile, `@media (min-width: 768px)` for tablet+
- No CSS framework — hand-written

### JavaScript Requirements
- Smooth scroll: Native `scroll-behavior: smooth` on `html` element
- Active nav: `IntersectionObserver` watching each section, updates `.active` class on nav links
- Hamburger toggle: `classList.toggle('open')`, `aria-expanded` update
- Mobile menu close: Event listener on nav links and outside click
- Entrance animations: `IntersectionObserver` adds `.visible` class; CSS handles transition
- Form: `fetch` to Formspree OR `mailto:` fallback; show/hide feedback states

### Case Study Links
Filenames contain spaces — must be URL-encoded in `href`:
```html
<!-- Correct -->
<a href="sphara-case-study%20(3).html">
<a href="deloitte-case-study%20(2).html">
```

### Contact Form Submission
Option A — Formspree (recommended):
```html
<form action="https://formspree.io/f/{YOUR_ID}" method="POST">
```
Or via `fetch`:
```js
fetch('https://formspree.io/f/{YOUR_ID}', {
  method: 'POST',
  body: new FormData(form),
  headers: { 'Accept': 'application/json' }
})
```

Option B — mailto fallback:
```html
<form action="mailto:richasain1989@gmail.com" method="POST" enctype="text/plain">
```

### Performance
- Fonts: `display=swap` parameter in Google Fonts URL
- CSS: minimal, no unused rules
- JS: `<script>` at bottom of `<body>` or with `defer`
- No images to optimise

### SEO
```html
<meta name="description" content="Richa Chauhan — Product Designer & Researcher based in New Zealand. 4+ years crafting digital products and brand experiences.">
<meta property="og:title" content="Richa Chauhan — Designer Portfolio">
<meta property="og:description" content="Product Designer & Researcher. Based in New Zealand.">
```

---

## 12. Quality & Metrics

### Design Acceptance Checklist

- [ ] Nav is sticky and visible at all scroll positions
- [ ] All 3 nav links smooth-scroll to correct sections
- [ ] Download CV button in nav triggers PDF download
- [ ] Download CV button in Contact section triggers PDF download
- [ ] About section: name, tagline, bio, avatar all visible above fold on desktop
- [ ] Work section: 3 cards visible, 2 live cards link to correct HTML files
- [ ] Card 3 has "Coming Soon" badge; click does nothing
- [ ] Card hover effect (lift + shadow) works on cards 1 & 2
- [ ] Contact form: all 3 fields required; empty submit blocked
- [ ] Contact form: success message shown after send
- [ ] Mobile nav collapses to hamburger at < 768px
- [ ] Hamburger opens/closes menu; aria-expanded toggles
- [ ] No horizontal scroll on any viewport width
- [ ] All text readable at 16px+ on mobile
- [ ] Focus rings visible on all interactive elements
- [ ] No contrast failures (mid text on paper ≥ 4.5:1)
- [ ] `prefers-reduced-motion` disables transitions
- [ ] Page loads in < 2s on desktop (no render-blocking)
- [ ] Case study links use URL-encoded filenames

### KPIs

| Metric | Target |
|--------|--------|
| Clicks from landing to case study | ≤ 2 |
| Desktop page load | ≤ 2s |
| Mobile page load | ≤ 3s |
| CV download reachability | 100% — always in viewport (nav) |
| Contrast AA pass rate | 100% of text elements |

---

## 13. Risks & Changes

### Known Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Spaces in case study filenames cause broken links | High | URL-encode all hrefs: `%20` for spaces |
| White text on `--orange` button fails AA at small sizes | Medium | Use `--ink` text on `--orange-light` for small labels; reserve white-on-orange for large CTAs ≥ 18pt |
| `mailto:` form unreliable (no mail client configured) | Medium | Implement Formspree free tier as primary; mailto as fallback |
| CSS avatar may look too abstract / impersonal | Low | Avatar is supplementary; name + tagline are the real greeting. Can swap for photo later. |
| Formspree free tier limit (50 submissions/month) | Low | Sufficient for portfolio use; upgrade if needed |

### Versioning / CHANGELOG

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-05-19 | Initial design spec | AI Designer |
