import { projects } from "@/data/projects";
import { ProjectEntry } from "./project-entry";
import type { Locale } from "@/data/locales";
import { homeEs } from "@/data/translations";

export function SelectedWork({ locale = "en" }: { locale?: Locale }) {
  const es = locale === "es-AR";
  return <section id="work" className="section" aria-labelledby="work-title"><div className="section-heading"><p className="section-label">{es ? homeEs.workLabel : "Selected work"}</p><h2 id="work-title">{es ? homeEs.workTitle : "A few things I've built."}</h2></div><div className="projects-list">{projects.filter((project) => project.featured).map((project) => <ProjectEntry project={project} locale={locale} key={project.slug} />)}</div></section>;
}
