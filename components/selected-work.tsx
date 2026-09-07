import { projects } from "@/data/projects";
import { ProjectEntry } from "./project-entry";

export function SelectedWork() {
  return <section id="work" className="section" aria-labelledby="work-title"><div className="section-heading"><p className="section-label">Selected work</p><h2 id="work-title">A few things I&apos;ve built.</h2></div><div className="projects-list">{projects.filter((project) => project.featured).map((project) => <ProjectEntry project={project} key={project.slug} />)}</div></section>;
}
