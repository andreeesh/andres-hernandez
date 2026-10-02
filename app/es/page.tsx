import { Header } from "@/components/header";
import { Intro } from "@/components/intro";
import { CannabisExperience } from "@/components/cannabis-experience";
import { ExperienceSection } from "@/components/experience";
import { SelectedWork } from "@/components/selected-work";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { profile } from "@/data/profile";
import { profileEs } from "@/data/locales";
import { createPageMetadata } from "@/data/seo";

export const metadata = createPageMetadata({ title: "Inicio", description: "Desarrollador web senior con más de 15 años de experiencia en WordPress, e-commerce, integraciones con APIs y tecnología para la industria del cannabis. Trabajo de forma remota con equipos de Estados Unidos y de otros países.", path: "/es", locale: "es-AR", englishPath: "/" });

export default function SpanishHome() {
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: profile.name, url: `${profile.productionUrl}/es`, jobTitle: profileEs.title, email: profile.emailHref, sameAs: [profile.linkedin], knowsAbout: ["WordPress", "WooCommerce", "PHP", "JavaScript", "TypeScript", "React", "E-commerce", "REST APIs", "Tecnología para la industria del cannabis"] };
  return <><a className="skip-link" href="#main-content">Ir al contenido</a><Header locale="es-AR" /><main id="main-content" className="container"><Intro locale="es-AR" /><CannabisExperience locale="es-AR" /><ExperienceSection locale="es-AR" /><SelectedWork locale="es-AR" /><Skills locale="es-AR" /><Contact locale="es-AR" /></main><Footer locale="es-AR" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
