import type { CaseStudy } from "@/data/projects";
import { MetadataChips } from "@/components/metadata-chips";
import type { Locale } from "@/data/locales";
import { ui } from "@/data/locales";
import { categoryLabelsEs, projectEs } from "@/data/translations";

export function CaseStudyPage({ caseStudy, slug, locale = "en" }: { caseStudy: CaseStudy; slug?: string; locale?: Locale }) {
  const es = locale === "es-AR";
  const translated = es && slug ? projectEs[slug] : undefined;
  const projectHref = `${es ? "/es" : ""}/#${caseStudy.projectAnchorId}`;
  const sections = es && translated?.sections ? translated.sections : caseStudy.sections;
  const metadata = es ? categoryLabelsEs[caseStudy.metadata] ?? caseStudy.metadata : caseStudy.metadata;
  return <article className="detail-page"><a href={projectHref}>{ui[locale].backWork}</a><MetadataChips value={metadata} className="eyebrow case-study-meta" /><h1>{translated?.caseTitle ?? caseStudy.title}</h1><p className="case-study-intro">{translated?.caseIntro ?? caseStudy.intro}</p>{sections.map((section) => <section className="case-study-section" key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}{caseStudy.relatedPlatformExperience && <section className="case-study-section"><h2>{ui[locale].related}</h2><p>{translated?.related ?? caseStudy.relatedPlatformExperience}</p></section>}{caseStudy.technologies && <section className="case-study-section"><h2>{ui[locale].technologies}</h2><MetadataChips value={caseStudy.technologies} className="technology" /></section>}{caseStudy.liveProject && <section className="case-study-section"><h2>{ui[locale].liveProject}</h2><p><a href={caseStudy.liveProject.url} target="_blank" rel="noopener noreferrer">{translated?.liveProjectLabel ?? caseStudy.liveProject.label} <span aria-hidden="true">↗</span></a></p></section>}{caseStudy.liveExample && <section className="case-study-section"><h2>{ui[locale].liveExample}</h2><p>{translated?.liveExampleDescription ?? caseStudy.liveExample.description}</p><p><a href={caseStudy.liveExample.url} target="_blank" rel="noopener noreferrer">{translated?.liveExampleLabel ?? caseStudy.liveExample.label} <span aria-hidden="true">↗</span></a></p></section>}<p className="case-study-back"><a href={projectHref}>{ui[locale].back}</a></p></article>;
}
