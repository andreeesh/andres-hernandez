import { experience, earlierExperience } from "@/data/experience";
import { ExperienceEntry } from "./experience-entry";

export function ExperienceSection() {
  return <section id="experience" className="section" aria-labelledby="experience-title"><div className="section-heading"><p className="section-label">Experience</p><h2 id="experience-title">15+ years building for the web.</h2></div><div className="experience-list">{experience.map((entry) => <ExperienceEntry entry={entry} key={entry.company} />)}<article className="experience-entry earlier-entry"><div className="entry-meta"><time>{earlierExperience.dates}</time><strong>{earlierExperience.title}</strong><span>{earlierExperience.companies}</span></div><div className="entry-content"><p>{earlierExperience.description}</p><p>{earlierExperience.additional}</p></div></article></div></section>;
}
