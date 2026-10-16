export type Link = { label: string; href: string; external?: boolean };

export const profile = {
  name: "Andrés Hernández",
  title: "Senior Software Engineer",
  eyebrow: "Senior Software Engineer · Backend & Web · Córdoba, Argentina",
  headline: "I build and operate production software.",
  intro:
    "I'm a senior software engineer with 15+ years of experience building backend systems, web applications, APIs, integrations and production infrastructure for international teams.",
  detail:
    "My strongest background is in PHP and WordPress, but my work extends across Node.js, TypeScript, PostgreSQL, cloud platforms, CI/CD and third-party systems. I focus on understanding the system, choosing the right pieces and taking responsibility for getting it into production.",
  location: "Córdoba, Argentina · Remote · US / international teams",
  email: "andreeesh@gmail.com",
  emailHref: "mailto:andreeesh@gmail.com",
  linkedin: "https://linkedin.com/in/andreeesh",
  productionUrl: "https://andreshernandez.ar",
  summary:
    "Senior Software Engineer with 15+ years of experience building and maintaining production systems for international teams. Strong background in PHP and WordPress, with hands-on work across backend development, REST APIs, relational databases, Node.js, TypeScript, cloud infrastructure, CI/CD, e-commerce and third-party integrations. Experienced taking ownership of unfamiliar and legacy systems, troubleshooting production incidents, designing integrations and delivering software across the full lifecycle.",
} as const;

export const navigation: Link[] = [
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Articles", href: "/articles" },
  { label: "Skills", href: "/#skills" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];
