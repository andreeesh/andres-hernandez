import { profile } from "@/data/profile";
import type { Locale } from "@/data/locales";
import { profileEs } from "@/data/locales";

export function Intro({ locale = "en" }: { locale?: Locale }) {
  const es = locale === "es-AR";
  const title = es ? profileEs.eyebrow : profile.eyebrow;
  const headline = es ? profileEs.headline : profile.headline;
  const intro = es ? profileEs.intro : profile.intro;
  const detail = es ? profileEs.detail : profile.detail;
  return <section className="hero" aria-labelledby="page-title"><p className="eyebrow">{title}</p><h1 id="page-title">{headline}</h1><div className="hero-copy"><p>{intro}</p><p>{detail}</p></div><p className="location">{es ? profileEs.location : profile.location}</p><p className="link-row"><a href={es ? "/es/resume" : "/resume"}>{es ? "CV" : "Resume"}</a><a href={es ? "/es/#work" : "/#work"}>{es ? "Proyectos" : "Selected work"}</a><a href={profile.emailHref}>{es ? "Correo" : "Email"}</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></p></section>;
}
