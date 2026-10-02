import { profile } from "@/data/profile";
import type { Locale } from "@/data/locales";
import { homeEs } from "@/data/translations";

export function Contact({ locale = "en" }: { locale?: Locale }) {
  const es = locale === "es-AR";
  return <section id="contact" className="section contact-section" aria-labelledby="contact-title"><p className="section-label">{es ? "Contacto" : "Contact"}</p><h2 id="contact-title">{es ? homeEs.contactTitle : "Looking for an experienced web developer for your team?"}</h2><p>{es ? homeEs.contactCopy : "I'm based in Córdoba, Argentina and work remotely with teams in the US and internationally."}</p><address><a href={profile.emailHref}>{profile.email}</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></address></section>;
}
