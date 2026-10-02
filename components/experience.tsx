import { experience, earlierExperience } from "@/data/experience";
import { ExperienceEntry } from "./experience-entry";
import type { Locale } from "@/data/locales";
import { experienceEs, earlierExperienceEs } from "@/data/locales";
import { homeEs } from "@/data/translations";

export function ExperienceSection({ locale = "en" }: { locale?: Locale }) {
  const es = locale === "es-AR";
  return <section id="experience" className="section" aria-labelledby="experience-title"><div className="section-heading"><p className="section-label">{es ? homeEs.experienceLabel : "Experience"}</p><h2 id="experience-title">{es ? homeEs.experienceTitle : "15+ years building for the web."}</h2></div><div className="experience-list">{experience.map((entry, i) => <ExperienceEntry entry={entry} localized={es ? experienceEs[i] : undefined} locale={locale} key={entry.company} />)}<article className="experience-entry earlier-entry"><div className="entry-meta"><time>{earlierExperience.dates}</time><strong>{es ? earlierExperienceEs.title : earlierExperience.title}</strong><span>{earlierExperience.companies}</span></div><div className="entry-content"><p>{es ? earlierExperienceEs.description : earlierExperience.description}</p><p>{es ? earlierExperienceEs.additional : earlierExperience.additional}</p></div></article></div></section>;
}
