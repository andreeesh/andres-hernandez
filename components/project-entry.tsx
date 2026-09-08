import type { Project } from "@/data/projects";
import { MetadataChips } from "@/components/metadata-chips";

export function ProjectEntry({ project }: { project: Project }) {
  return <article className="project-entry" id={project.anchorId ?? project.caseStudy?.projectAnchorId}><MetadataChips value={project.category} className="project-category" /><div className="project-content"><h3>{project.name}</h3><p>{project.description}</p>{project.technologies && <MetadataChips value={project.technologies} className="technology" />}{project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">{project.linkText} <span aria-hidden="true">↗</span></a>}{project.caseStudy && project.caseStudySlug && <p className="case-study-link"><a href={`/work/${project.caseStudySlug}`}>Read case study →</a></p>}</div></article>;
}
