import type { Project } from "@/data/projects";
import { MetadataChips } from "@/components/metadata-chips";
import type { Locale } from "@/data/locales";
import { categoryLabelsEs, projectEs } from "@/data/translations";

export function ProjectEntry({ project, locale = "en" }: { project: Project; locale?: Locale }) {
  const translation = locale === "es-AR" ? projectEs[project.slug] : undefined;
  const base = locale === "es-AR" ? "/es" : "";
  const category = translation?.category ?? (locale === "es-AR" ? categoryLabelsEs[project.category] ?? project.category : project.category);
  return <article className="project-entry" id={project.anchorId ?? project.caseStudy?.projectAnchorId}><MetadataChips value={category} className="project-category" /><div className="project-content"><h3>{project.name}</h3><p>{translation?.description ?? project.description}</p>{project.technologies && <MetadataChips value={project.technologies} className="technology" />}{project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">{translation?.linkText ?? project.linkText} <span aria-hidden="true">↗</span></a>}{project.caseStudy && project.caseStudySlug && <p className="case-study-link"><a href={`${base}/work/${project.caseStudySlug}`}>{locale === "es-AR" ? "Ver caso de estudio →" : "Read case study →"}</a></p>}</div></article>;
}
