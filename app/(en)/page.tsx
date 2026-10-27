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

export const metadata = createPageMetadata({ title: "Andrés Hernández — Senior Software Engineer | AI, Backend & SaaS", description: "Senior Software Engineer with 15+ years of experience building SaaS products, backend systems, APIs and AI-powered engineering workflows with TypeScript, Node.js, PostgreSQL, MCP and modern coding agents.", path: "/", englishPath: "/" });

export default function Home() {
  const personId = `${profile.productionUrl}/#person`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${profile.productionUrl}/#profile-page`,
        url: profile.productionUrl,
        name: `${profile.name} — ${profile.title}`,
        mainEntity: { "@id": personId },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: profile.productionUrl,
        jobTitle: profile.title,
        sameAs: [profile.linkedin],
        knowsAbout: ["AI-assisted software engineering", "Agentic engineering", "MCP", "LLM integrations", "Backend development", "Node.js", "TypeScript", "REST APIs", "PostgreSQL", "Docker", "CI/CD", "Cloud infrastructure", "PHP", "WordPress"],
      },
    ],
  };
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" className="container"><Intro /><EngineeringFocus /><ExperienceSection /><SelectedWork /><TechnicalWriting /><Skills /><Contact /></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
