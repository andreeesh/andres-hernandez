import { Header } from "@/components/header";
import { Intro } from "@/components/intro";
import { EngineeringFocus } from "@/components/engineering-focus";
import { ExperienceSection } from "@/components/experience";
import { SelectedWork } from "@/components/selected-work";
import { TechnicalWriting } from "@/components/technical-writing";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/data/seo";

export const metadata = createPageMetadata({ title: "Andrés Hernández — Senior Software Engineer | Backend & Infrastructure", description: "Senior Software Engineer with 15+ years of experience building production systems, backend services, APIs, integrations and web platforms for international teams.", path: "/", englishPath: "/" });

export default function Home() {
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: profile.name, url: profile.productionUrl, jobTitle: profile.title, email: profile.emailHref, sameAs: [profile.linkedin], knowsAbout: ["Backend development", "PHP", "Node.js", "TypeScript", "REST APIs", "PostgreSQL", "Docker", "CI/CD", "Cloud infrastructure", "WordPress"] };
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" className="container"><Intro /><EngineeringFocus /><ExperienceSection /><SelectedWork /><TechnicalWriting /><Skills /><Contact /></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
