import { profile } from "@/data/profile";
import type { Locale } from "@/data/locales";
import { profileEs } from "@/data/locales";

export function Intro({ locale = "en" }: { locale?: Locale }) {
  const es = locale === "es-AR";
  const title = es ? "Ingeniero de software senior · Backend y Web · Córdoba, Argentina" : profile.eyebrow;
  const headline = es ? "Desarrollo y opero software en producción." : profile.headline;
  const intro = es
    ? "Soy ingeniero de software senior y tengo más de 15 años de experiencia desarrollando sistemas backend, aplicaciones web, APIs, integraciones e infraestructura de producción para equipos internacionales."
    : profile.intro;
  const detail = es
    ? "Mi experiencia más profunda está en PHP y WordPress, pero mi trabajo abarca Node.js, TypeScript, PostgreSQL, plataformas cloud, CI/CD y sistemas de terceros. Me enfoco en entender el sistema, elegir las piezas adecuadas y hacerme cargo de llevarlo a producción."
    : profile.detail;
  return <section className="hero" aria-labelledby="page-title"><p className="eyebrow">{title}</p><h1 id="page-title">{headline}</h1><div className="hero-copy"><p>{intro}</p><p>{detail}</p></div><p className="location">{es ? profileEs.location : profile.location}</p><p className="link-row"><a href={profile.emailHref}>{es ? "Correo" : "Email"}</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></p></section>;
}
