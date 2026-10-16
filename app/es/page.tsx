import { Header } from "@/components/header";
import { Intro } from "@/components/intro";
import { CannabisExperience } from "@/components/cannabis-experience";
import { ExperienceSection } from "@/components/experience";
import { SelectedWork } from "@/components/selected-work";
import { TechnicalWriting } from "@/components/technical-writing";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/data/seo";

export const metadata = createPageMetadata({ title: "Andrés Hernández — Ingeniero de Software Senior | Backend, Web e Infraestructura", description: "Ingeniero de software senior con más de 15 años de experiencia desarrollando sistemas en producción, backend, APIs, integraciones y plataformas web para equipos internacionales.", path: "/es", locale: "es-AR", englishPath: "/" });

export default function SpanishHome() {
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: profile.name, url: `${profile.productionUrl}/es`, jobTitle: "Ingeniero de Software Senior", email: profile.emailHref, sameAs: [profile.linkedin], knowsAbout: ["Backend", "PHP", "Node.js", "TypeScript", "REST APIs", "PostgreSQL", "Docker", "CI/CD", "Infraestructura cloud", "WordPress"] };
  return <><a className="skip-link" href="#main-content">Ir al contenido</a><Header locale="es-AR" /><main id="main-content" className="container"><Intro locale="es-AR" /><CannabisExperience locale="es-AR" /><ExperienceSection locale="es-AR" /><SelectedWork locale="es-AR" /><TechnicalWriting locale="es-AR" /><Skills locale="es-AR" /><Contact locale="es-AR" /></main><Footer locale="es-AR" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
