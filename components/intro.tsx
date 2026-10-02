import { profile } from "@/data/profile";
import type { Locale } from "@/data/locales";
import { profileEs } from "@/data/locales";

export function Intro({ locale = "en" }: { locale?: Locale }) {
  const es = locale === "es-AR";
  return <section className="hero" aria-labelledby="page-title"><p className="eyebrow">{es ? profileEs.eyebrow : profile.eyebrow}</p><h1 id="page-title">{es ? profileEs.headline : profile.headline}</h1><div className="hero-copy"><p>{es ? profileEs.intro : profile.intro}</p><p>{es ? profileEs.cannabisIntro : profile.cannabisIntro}</p></div><p className="location">{es ? profileEs.location : profile.location}</p><p className="link-row"><a href={profile.emailHref}>{es ? "Correo" : "Email"}</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></p></section>;
}
