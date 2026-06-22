// Shared data — one card per case study (Sphara, Tech 3CD, TechTDS)

const CASE_STUDIES = [
  {
    slug: "sphara",
    idx: "02",
    company: "Sphara",
    subtitle: "Emergency Response Platform",
    logo: "S",
    tagline: "Designing a fast, reliable and accessible emergency response app that connects people to help in seconds.",
    note: "Designed for real-world urgency",
    role: "UX/UI Designer",
    category: "Mobile · Public-safety",
    year: "2019",
    href: "work/case-study-1.html",
    cover: "sphara-cover",
    cta: "View Sphara",
    metrics: [{ k: "Scope", v: "End-to-end" }, { k: "Year", v: "2019" }]
  },
  {
    slug: "deloitte",
    idx: "03",
    company: "Audit Management Tool",
    subtitle: "Tax compliance · Redesign",
    logo: "TA",
    tagline: "Helping teams navigate regulatory complexity with clarity, visibility, and confidence.",
    role: "UX/UI Designer",
    category: "Enterprise · Compliance",
    year: "2024",
    href: "work/case-study-2.html",
    cover: "deloitte-cover",
    cta: "Read case study",
    metrics: [{ k: "Surface", v: "Web app" }, { k: "Year", v: "2024" }]
  },
  {
    slug: "techtds",
    idx: "04",
    company: "Tax Filing Platform",
    subtitle: "Tax compliance · Built from scratch",
    logo: "TD",
    tagline: "Simplifying tax preparation and compliance workflows through a structured and human-centered experience.",
    note: "Clarity that keeps teams one step ahead",
    role: "UX/UI Designer",
    category: "FinTech · Compliance",
    year: "2024",
    href: "work/case-study-3.html",
    cover: "techtds-cover",
    cta: "Read case study",
    metrics: [{ k: "Modules", v: "Two" }, { k: "Year", v: "2024" }]
  }
];

const TOTAL_CARDS = 2 + CASE_STUDIES.length; // About + N case studies + Thanks

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "playground", label: "Playground" },
  { id: "resume", label: "Resume" }
];

window.PORTFOLIO_DATA = { CASE_STUDIES, NAV_ITEMS, TOTAL_CARDS };
