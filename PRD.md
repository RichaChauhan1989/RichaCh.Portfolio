# Product Requirements Document (PRD)

## 1. Document Info

- **Product Name**: Richa Chauhan — Designer Portfolio
- **Version**: v1.0
- **Created On**: 2026-05-19
- **Product Manager**: AI Product Manager
- **Document Status**: Draft

---

## 2. Product Overview

### 2.1 Background

Richa Chauhan is a Product Designer & Researcher with 4+ years of experience, based in New Zealand. She needs a personal portfolio website to present her work, personality, and contact details to recruiters evaluating her for design roles. The site must create a strong first impression fast — recruiters spend seconds scanning before deciding to engage.

### 2.2 Positioning

A single-page responsive portfolio website for Richa Chauhan that lets recruiters quickly understand who she is, review her case studies, and get in touch or download her CV — all with minimal friction.

### 2.3 Goals

- **Designer's Goal**: Land interviews and freelance inquiries by clearly communicating her design thinking and experience.
- **Recruiter's Goal**: Quickly assess fit — read the About, browse Work, and contact or download the CV within one visit.

### 2.4 Success Metrics

- Recruiter can navigate from landing to a case study in under 2 clicks
- CV download accessible from both the nav bar and the Contact section
- All 3 case study entries visible without scrolling past the Work section on desktop
- Page loads in under 2 seconds on mobile (3G)

---

## 3. User Analysis

### 3.1 Target Users

| User Type | Traits | Core Needs | Frequency |
|-----------|--------|-----------|-----------|
| Recruiter (Primary) | HR / talent acquisition, time-poor, scans fast | Quick overview of skills, see work quality, easy download of CV | High |
| Hiring Manager (Secondary) | Design lead or product manager, detail-oriented | Depth of case studies, design process, problem-solving approach | Medium |

### 3.2 Persona

**Core Persona: Sarah, Talent Acquisition Specialist**
- **Basics**: 32, female, tech recruiter, Auckland NZ
- **Behaviours**: Reviews 20+ portfolios per week on laptop and phone, opens CVs in new tab, responds to clean and fast-loading sites
- **Pain Points**: Portfolios that are slow, cluttered, or bury the CV link; unclear role titles
- **Expected Value**: Within 30 seconds, understand who Richa is, what she does, and how to reach her or get her CV

### 3.3 Scenarios

**Scenario 1: Quick Scan on Desktop**
- **Trigger**: Recruiter receives portfolio link via LinkedIn or email
- **Flow**: Lands on About → reads tagline + intro → clicks Work in nav → scans 3 case study cards → opens Sphara or Deloitte case study → returns → clicks Contact or downloads CV
- **Expected Outcome**: Recruiter has enough signal to reach out or forward the profile

**Scenario 2: Mobile Browse**
- **Trigger**: Recruiter checks link on phone between meetings
- **Flow**: Page loads → taps hamburger → taps Work → scrolls cards → taps case study link → back → taps Contact
- **Expected Outcome**: Smooth, readable experience with no horizontal scroll or broken layout

---

## 4. Functional Requirements

### 4.1 Functional Architecture

```
Richa Chauhan Portfolio (index.html)
├── Navigation
│   ├── Name / Logo (left)
│   ├── Nav Links: About | Work | Contact Me (centre/right)
│   ├── Resume Download Button (right)
│   └── Hamburger Menu (mobile only)
├── About Section
│   ├── Greeting + Name
│   ├── Tagline
│   ├── Bio (role, experience, location)
│   └── Scroll-to-Work CTA (optional)
├── Work Section
│   ├── Case Study Card — Sphara Emergency App
│   ├── Case Study Card — Deloitte Tech 3CD Redesign
│   └── Case Study Card — TechTDS Tax Compliance Tool (placeholder)
├── Contact Section
│   ├── Contact Form (Name, Email, Message)
│   └── Resume Download Button
└── Footer
    └── Copyright
```

### 4.2 Feature List

| Module | Feature | Description | Priority | Notes |
|--------|---------|-------------|----------|-------|
| Navigation | Sticky top nav | Fixed nav bar, visible on scroll | P0 | |
| Navigation | Smooth scroll | Nav links scroll to sections | P0 | |
| Navigation | Resume download | Button links to `RichaChauhan-CV.pdf` | P0 | Opens in new tab or triggers download |
| Navigation | Hamburger menu | Collapsible nav on mobile (<768px) | P0 | |
| About | Intro block | Name, tagline, bio text | P0 | |
| Work | Case study cards | 3 cards with thumbnail, title, link | P0 | |
| Work | Styled thumbnails | Generated placeholder visuals per project | P1 | Derived from case study colour/theme |
| Work | Placeholder card | TechTDS card marked "Coming Soon" | P0 | |
| Contact | Contact form | Name, Email, Message fields + submit | P0 | mailto: richasain1989@gmail.com |
| Contact | Resume download | Second resume download button | P0 | |
| Footer | Copyright | "© 2026 Richa Chauhan" | P1 | |
| Global | Responsive layout | Works on mobile, tablet, desktop | P0 | |
| Global | Consistent palette | Matches belleduffner.com editorial aesthetic | P0 | |

### 4.3 Core Feature Details

---

#### Feature 1: Top Navigation Bar

**Description**
- **Definition**: A sticky navigation bar fixed to the top of the viewport at all times
- **User Value**: Gives recruiters instant access to any section without scrolling back to the top
- **Business Value**: Reduces drop-off by keeping CV download always reachable

**Layout**
- Left: Designer name (acts as home link / scroll-to-top)
- Centre/Right: `About` | `Work` | `Contact Me`
- Far Right: `Download CV` button (distinct style — outlined or filled)

**Interaction**
- Clicking a nav link smooth-scrolls to the corresponding section
- `Download CV` opens/downloads `RichaChauhan-CV.pdf`
- On mobile (<768px): links collapse into a hamburger icon; tapping opens a full-width dropdown or slide-in menu

**Business Rules**
- Nav remains visible during scroll (position: sticky or fixed)
- Active section is visually highlighted in the nav

---

#### Feature 2: About Section

**Description**
- **Definition**: The first full-width section the user sees after the nav
- **User Value**: Gives recruiters a fast, human introduction to Richa
- **Business Value**: Sets tone, communicates role and credibility, encourages scroll

**Content**
- Greeting: `Hello! I'm Richa Chauhan`
- Tagline: `I'm a designer who makes magic through product & brand.`
- Body: Short bio — Product Designer & Researcher, 4+ years of experience, based in New Zealand
- Optional: Subtle CTA to scroll to Work

**Interaction**
- Static section; no interactive elements beyond optional CTA button

---

#### Feature 3: Work Section (Case Study Cards)

**Description**
- **Definition**: A section containing 3 project cards, each representing a case study
- **User Value**: Lets recruiters quickly browse projects and select one to read in depth
- **Business Value**: Showcases the breadth and quality of design work

**Cards**

| # | Title | Subtitle | Status | Links To |
|---|-------|----------|--------|----------|
| 1 | Sphara Emergency App | UX Design · Emergency Services | Live | `sphara-case-study (3).html` |
| 2 | Deloitte Tech 3CD Redesign | UX Design · Enterprise · Deloitte | Live | `deloitte-case-study (2).html` |
| 3 | Tax Compliance Tool TechTDS | Product Design · Deloitte Bangalore | Coming Soon | Placeholder — no link |

**Card Anatomy**
- Styled thumbnail (generated from project colours/theme — no real screenshot required)
- Project title (serif headline)
- Short descriptor / category tags
- "View Case Study →" link (hidden / replaced with "Coming Soon" badge on card 3)

**Interaction**
- Cards link out to the case study HTML files (open in same tab)
- Card 3 shows a "Coming Soon" overlay or badge; non-clickable
- On mobile: cards stack vertically

**Business Rules**
- All 3 cards visible without horizontal scroll on desktop (grid layout)
- Thumbnails generated using CSS gradients/shapes inspired by each project's colour theme

---

#### Feature 4: Contact Section

**Description**
- **Definition**: A section with a simple contact form and a second CV download button
- **User Value**: Gives recruiters a direct, low-friction way to reach out
- **Business Value**: Converts interest into leads / interview requests

**Form Fields**
- Name (text input, required)
- Email (email input, required)
- Message (textarea, required)
- Submit button: `Send Message`

**Submission**
- Method: `mailto:` link (opens default email client) OR Formspree free tier for in-page submission
- Target email: `richasain1989@gmail.com`

**Additional Element**
- `Download CV` button — same behaviour as nav button

**Edge Cases**
- Empty required field → browser native validation message
- Successful send → clear confirmation message or thank-you state

---

#### Feature 5: Footer

**Description**
- Minimal single-line footer
- Content: `© 2026 Richa Chauhan. All rights reserved.`

---

## 5. User Stories

### 5.1 Epics

- **Epic 1**: As a recruiter, I want to quickly understand Richa's background so I can assess her fit for a role.
- **Epic 2**: As a recruiter, I want to browse her design work so I can evaluate the quality of her output.
- **Epic 3**: As a recruiter, I want to contact her or download her CV so I can move forward with outreach.

### 5.2 User Stories

**Story 1 — About**
- **As**: a recruiter
- **I want**: to read a clear introduction to who Richa is
- **So that**: I can quickly assess her background and experience level
- **Acceptance Criteria**:
  - [ ] Name and tagline are visible above the fold on desktop
  - [ ] Role (Product Designer & Researcher), years of experience, and location are stated
  - [ ] Section is readable on mobile without zooming

**Story 2 — Work**
- **As**: a recruiter
- **I want**: to browse Richa's projects at a glance
- **So that**: I can decide which case study to read
- **Acceptance Criteria**:
  - [ ] 3 case study cards are visible in the Work section
  - [ ] Each live card links to the correct HTML file
  - [ ] Card 3 is clearly marked as coming soon and is non-clickable
  - [ ] Cards display a styled visual thumbnail, title, and category

**Story 3 — CV Download**
- **As**: a recruiter
- **I want**: to download Richa's CV from anywhere on the page
- **So that**: I can save it for review or share it internally
- **Acceptance Criteria**:
  - [ ] Download CV button is present in the top nav
  - [ ] Download CV button is present in the Contact section
  - [ ] Both buttons link to `RichaChauhan-CV.pdf`

**Story 4 — Contact**
- **As**: a recruiter
- **I want**: to send Richa a message directly from the site
- **So that**: I can reach out without leaving the page
- **Acceptance Criteria**:
  - [ ] Form has Name, Email, and Message fields
  - [ ] All fields are required; form does not submit empty
  - [ ] Submission sends to `richasain1989@gmail.com`
  - [ ] User sees confirmation after successful send

**Story 5 — Mobile**
- **As**: a recruiter on mobile
- **I want**: the site to be fully readable and navigable on my phone
- **So that**: I can review the portfolio on the go
- **Acceptance Criteria**:
  - [ ] Nav collapses to hamburger on screens < 768px
  - [ ] All sections stack vertically with no horizontal overflow
  - [ ] Text is legible without zooming (min 16px body text)
  - [ ] Case study cards stack to single column

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Page load time: ≤ 2s on desktop (fast broadband)
- Mobile load: ≤ 3s on 3G
- No render-blocking resources; fonts loaded with `display: swap`

### 6.2 Security
- No user data stored on the site
- Contact form uses `mailto:` or Formspree — no custom backend required
- CV PDF served as a static file

### 6.3 Compatibility
- **Browsers**: Chrome, Safari, Firefox, Edge (latest 2 versions)
- **Devices**: Desktop (1280px+), Tablet (768–1279px), Mobile (< 768px)
- **OS**: Windows, macOS, iOS, Android

### 6.4 Usability
- Single-page architecture — no page reloads for section navigation
- Smooth scroll behaviour across all browsers
- All interactive elements have visible focus states (accessibility)
- Colour contrast meets WCAG AA minimum

---

## 7. UI Requirements

### 7.1 Design Principles

- **Editorial Minimalism**: Inspired by belleduffner.com — generous white space, strong typography hierarchy, restrained colour use
- **Consistency**: Match the visual language of the existing case study pages (Playfair Display serif + DM Sans sans-serif, warm cream base, orange accent)
- **Clarity**: One thing per section; nothing competes for attention
- **Mobile First**: Layout designed for mobile, scaled up for desktop

### 7.2 Design Tokens (Reference)

| Token | Value | Usage |
|-------|-------|-------|
| `--paper` | `#F5F3EF` | Page background |
| `--ink` | `#1C1C1A` | Primary text |
| `--mid` | `#6B6B65` | Secondary text, labels |
| `--orange` | `#E8622A` | Accent, CTA buttons, highlights |
| `--rule` | `#E2E0DA` | Dividers, borders |
| `--white` | `#FFFFFF` | Cards, form backgrounds |
| Font — Serif | Playfair Display | Headings, hero text |
| Font — Sans | DM Sans (300, 400, 500, 600) | Body, labels, nav |

### 7.3 Information Architecture

```
index.html (single page)
├── <nav> — sticky, full-width
├── <section id="about">
├── <section id="work">
│   ├── Card: Sphara
│   ├── Card: Deloitte 3CD
│   └── Card: TechTDS (Coming Soon)
├── <section id="contact">
│   ├── Contact form
│   └── Download CV button
└── <footer>
```

### 7.4 Interaction Specs

- **Nav links**: smooth scroll to section anchor; active state on current section
- **Download CV**: `<a href="RichaChauhan-CV.pdf" download>` — triggers browser download
- **Case study cards**: cursor pointer, subtle hover lift (transform + shadow)
- **Form submit**: button changes to loading state → success message on completion
- **Hamburger**: toggles nav menu open/close with smooth transition
- **Card 3 (Coming Soon)**: visual overlay or badge; `cursor: default`; no hover effect

---

## 8. Data Requirements

### 8.1 Data Collection
No analytics or tracking required for MVP. No cookies, no third-party scripts beyond Google Fonts.

### 8.2 Contact Data
Submissions route directly to `richasain1989@gmail.com` via `mailto:` or Formspree. No data is stored on any server by the portfolio site itself.

---

## 9. Project Planning

### 9.1 Versions

**MVP (v1.0)**
- Core Features: About, Work (3 cards), Contact form, CV download, responsive nav
- Deliverable: Single `index.html` + linked CSS (or inline) + linked case study pages

**Iteration (v1.1)**
- Add TechTDS case study page when ready
- Replace placeholder thumbnail with real screenshot
- Optionally add subtle entrance animations

### 9.2 Milestones

| Phase | Deliverable | Owner |
|-------|-------------|-------|
| PRD Complete | This document | AI Product Manager |
| Design Spec | DESIGN_SPEC.md (run `/design`) | AI Designer |
| Implementation | index.html, complete and responsive | AI Developer |
| Review & Launch | Final QA + deploy | Richa / AI |

---

## 10. Risk Assessment

### 10.1 Technical Risks

- **Risk**: Case study HTML files have spaces in filenames (`sphara-case-study (3).html`) which may cause link issues on some servers
  - **Impact**: Medium
  - **Mitigation**: URL-encode filenames in links, or rename files during dev phase

- **Risk**: `mailto:` form opens email client — some recruiters may not have one configured
  - **Impact**: Low–Medium
  - **Mitigation**: Use Formspree free tier as a fallback for in-browser form submission

### 10.2 Design Risks

- **Risk**: Placeholder thumbnails may look low-effort without real screenshots
  - **Impact**: Medium
  - **Mitigation**: Use rich CSS-generated compositions (colour blocks, typography excerpts, abstract shapes) that clearly signal each project's theme

---

## 11. Appendix

### 11.1 Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main portfolio page (to be built) |
| `RichaChauhan-CV.pdf` | Resume for download |
| `sphara-case-study (3).html` | Sphara case study subpage |
| `deloitte-case-study (2).html` | Deloitte 3CD case study subpage |

### 11.2 Reference

- Design inspiration: belleduffner.com
- Existing design system: warm cream + orange palette from case study pages
- Fonts: Google Fonts — Playfair Display, DM Sans

### 11.3 Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| v1.0 | 2026-05-19 | Initial draft | AI Product Manager |
