export type Link = { label: string; href: string; external?: boolean };

export const profile = {
  name: "Andrés Hernández",
  title: "Senior Web Developer",
  eyebrow: "Senior Web Developer · Córdoba, Argentina",
  headline: "WordPress, e-commerce and cannabis technology.",
  intro:
    "I'm a senior web developer with 15+ years of experience building production websites, custom systems and complex integrations for international teams.",
  cannabisIntro:
    "For the past 2.5 years, I've worked primarily with cannabis brands and dispensaries in the US, building custom e-commerce experiences, menu integrations, store locators and marketing infrastructure.",
  location: "Córdoba, Argentina · Remote · US / international teams",
  email: "andreeesh@gmail.com",
  emailHref: "mailto:andreeesh@gmail.com",
  linkedin: "https://linkedin.com/in/andreeesh",
  // Central production origin used by metadata, sitemap, robots, and JSON-LD.
  productionUrl: "https://andreshernandez.ar",
  summary:
    "Senior Web Developer with 15+ years of experience building production websites, custom WordPress systems, e-commerce platforms and third-party integrations for international clients. For the past 2.5 years, focused primarily on the US cannabis industry, working with dispensary commerce platforms, custom APIs, store locators and marketing infrastructure.",
} as const;

export const navigation: Link[] = [
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];
