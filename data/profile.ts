export type Link = { label: string; href: string; external?: boolean };

export const profile = {
  name: "Andrés Hernández",
  title: "Senior Web Developer",
  eyebrow: "Senior Web Developer · Córdoba, Argentina",
  headline: "I build WordPress, e-commerce and cannabis technology.",
  intro:
    "I'm a senior web developer with 15+ years of experience building production websites, custom systems and complex integrations for international teams.",
  cannabisIntro:
    "For over two years, I've worked primarily with cannabis brands and dispensaries in the US, building custom e-commerce experiences, menu integrations, store locators and third-party integrations.",
  location: "Córdoba, Argentina · Remote · US / international teams",
  email: "andreeesh@gmail.com",
  emailHref: "mailto:andreeesh@gmail.com",
  linkedin: "https://linkedin.com/in/andreeesh",
  // Central production origin used by metadata, sitemap, robots, and JSON-LD.
  productionUrl: "https://andreshernandez.ar",
  summary:
    "Senior Web Developer with 15+ years of experience building production websites, custom WordPress systems, e-commerce platforms and third-party integrations for international clients. For over two years, I've focused primarily on the US cannabis industry, working with dispensary commerce platforms, custom APIs, store locators and third-party integrations.",
} as const;

export const navigation: Link[] = [
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];
