export type Link = { label: string; href: string; external?: boolean };

export const profile = {
  name: "Andrés Hernández",
  title: "Senior Software Engineer",
  eyebrow: "Senior Software Engineer · AI, Backend & Product Engineering · Córdoba, Argentina",
  headline: "I build production software with AI at the core of my engineering workflow.",
  intro:
    "I'm a Senior Software Engineer with 15+ years of experience building and operating SaaS products, backend systems, APIs, integrations and production infrastructure for international teams.",
  detail:
    "I work across TypeScript, Node.js, PHP, PostgreSQL and modern AI engineering workflows, including coding agents, MCP servers, LLM integrations and automation. I use AI throughout the software development lifecycle—from architecture and implementation to testing, debugging, security review and CI/CD—while remaining responsible for the software that reaches production.",
  location: "Córdoba, Argentina · Remote · US / international teams",
  email: "andreeesh@gmail.com",
  emailHref: "mailto:andreeesh@gmail.com",
  linkedin: "https://linkedin.com/in/andreeesh",
  productionUrl: "https://andreshernandez.ar",
  summary:
    "Senior Software Engineer with 15+ years of experience building and operating production systems for international teams. Current work spans AI and agentic engineering, MCP servers, multi-tenant SaaS, backend APIs, relational data and production infrastructure across TypeScript, Node.js, PostgreSQL and PHP. I use coding agents throughout the software lifecycle while retaining ownership of architecture, testing, security and delivery. Strong background in third-party integrations, unfamiliar and legacy systems, and production incident response.",
} as const;

export const navigation: Link[] = [
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Articles", href: "/articles" },
  { label: "Skills", href: "/#skills" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];
