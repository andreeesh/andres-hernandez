import { education, skillGroups } from "@/data/skills";
import type { Locale } from "@/data/locales";
import { educationEs, skillItemsEs, skillLeadEs, skillNamesEs } from "@/data/locales";
import { homeEs } from "@/data/translations";

export function Skills({ locale = "en" }: { locale?: Locale }) {
  const es = locale === "es-AR";
  return <><section id="skills" className="section" aria-labelledby="skills-title"><div className="section-heading"><p className="section-label">{es ? homeEs.skillsLabel : "Skills"}</p><h2 id="skills-title">{es ? homeEs.skillsTitle : "Tools I use to get the work done."}</h2></div><div className="skill-groups">{skillGroups.map((group) => <article className="skill-group" key={group.name}><h3>{es ? skillNamesEs[group.name] ?? group.name : group.name}</h3><p>{es ? skillLeadEs[group.name] ?? skillItemsEs[group.name] ?? group.items : group.items}</p></article>)}</div><p className="ai-note">{es ? homeEs.aiNote : "AI-assisted development is part of my daily engineering workflow for implementation, debugging, testing and code review. I use it as an engineering tool, not as a substitute for understanding the systems I work on."}</p></section><section className="section education-section" aria-labelledby="education-title"><p className="section-label">{es ? homeEs.education : "Education"}</p><h2 id="education-title">{es ? "Formación" : "Education"}</h2><ul className="education-list">{(es ? educationEs : education).map((item) => <li key={item}>{item}</li>)}</ul></section></>;
}
