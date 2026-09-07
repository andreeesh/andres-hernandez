import { Header } from "@/components/header";
import { Intro } from "@/components/intro";
import { CannabisExperience } from "@/components/cannabis-experience";
import { ExperienceSection } from "@/components/experience";
import { SelectedWork } from "@/components/selected-work";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { profile } from "@/data/profile";

export default function Home() {
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: profile.name, url: profile.productionUrl, jobTitle: profile.title, email: profile.emailHref, sameAs: [profile.linkedin], knowsAbout: ["WordPress", "WooCommerce", "PHP", "JavaScript", "TypeScript", "React", "E-commerce", "REST APIs", "Cannabis technology"] };
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" className="container"><Intro /><CannabisExperience /><ExperienceSection /><SelectedWork /><Skills /><Contact /></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
