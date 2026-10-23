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

export const metadata = createPageMetadata({ title: "Andrés Hernández — Ingeniero de Software Senior | AI, Backend y SaaS", description: "Ingeniero de software senior con más de 15 años de experiencia desarrollando productos SaaS, backend, APIs y flujos de ingeniería con AI, TypeScript, Node.js, PostgreSQL, MCP y agentes de código.", path: "/es", locale: "es-AR", englishPath: "/" });

export default function SpanishHome() {
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: profile.name, url: `${profile.productionUrl}/es`, jobTitle: "Ingeniero de Software Senior", email: profile.emailHref, sameAs: [profile.linkedin], knowsAbout: ["Ingeniería de software asistida por AI", "Agentes de AI", "MCP", "Integraciones con LLMs", "Backend", "Node.js", "TypeScript", "REST APIs", "PostgreSQL", "Docker", "CI/CD", "Infraestructura cloud", "PHP", "WordPress"] };
  return <><a className="skip-link" href="#main-content">Ir al contenido</a><Header locale="es-AR" /><main id="main-content" className="container"><Intro locale="es-AR" /><EngineeringFocus locale="es-AR" /><ExperienceSection locale="es-AR" /><SelectedWork locale="es-AR" /><TechnicalWriting locale="es-AR" /><Skills locale="es-AR" /><Contact locale="es-AR" /></main><Footer locale="es-AR" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
