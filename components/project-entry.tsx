import type { Project } from "@/data/projects";

export function ProjectEntry({ project }: { project: Project }) {
  return <article className="project-entry" id={project.caseStudy?.projectAnchorId}><p className="project-category">{project.category}</p><div className="project-content"><h3>{project.name}</h3><p>{project.description}</p>{project.technologies && <p className="technology">{project.technologies}</p>}{project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">{project.linkText} <span aria-hidden="true">↗</span></a>}{project.caseStudy && project.caseStudySlug && <p className="case-study-link"><a href={`/work/${project.caseStudySlug}`}>Read case study →</a></p>}</div></article>;
}
