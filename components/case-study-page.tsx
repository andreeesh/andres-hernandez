import type { CaseStudy } from "@/data/projects";
import { MetadataChips } from "@/components/metadata-chips";
import type { Locale } from "@/data/locales";
import { ui } from "@/data/locales";
import { categoryLabelsEs, projectEs } from "@/data/translations";
import { technicalArticles } from "@/data/articles";
import { profile } from "@/data/profile";

export function CaseStudyPage({ caseStudy, slug, locale = "en" }: { caseStudy: CaseStudy; slug?: string; locale?: Locale }) {
  const es = locale === "es-AR";
  const translated = es && slug ? projectEs[slug] : undefined;
  const projectHref = `${es ? "/es" : ""}/#${caseStudy.projectAnchorId}`;
  const sections = es && translated?.sections ? translated.sections : caseStudy.sections;
  const metadata = es ? categoryLabelsEs[caseStudy.metadata] ?? caseStudy.metadata : caseStudy.metadata;
  const title = translated?.caseTitle ?? caseStudy.title;
  const intro = translated?.caseIntro ?? caseStudy.intro;
  const relatedArticles = slug ? technicalArticles.filter((article) => article.relatedCaseStudy.href === `/work/${slug}`) : [];
  const homePath = es ? "/es" : "/";
  const selectedWorkLabel = es ? "Proyectos destacados" : "Selected work";
  const pagePath = slug ? `${es ? "/es" : ""}/work/${slug}` : projectHref;
  const pageUrl = new URL(pagePath, profile.productionUrl).toString();
  const homeUrl = new URL(homePath, profile.productionUrl).toString();
  const workUrl = new URL(`${es ? "/es/" : "/"}#work`, profile.productionUrl).toString();

  const jsonLd = slug ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#case-study`,
        headline: title,
        description: intro,
        author: {
          "@type": "Person",
          name: profile.name,
          url: profile.productionUrl,
        },
        mainEntityOfPage: pageUrl,
        inLanguage: es ? "es-AR" : "en",
        about: caseStudy.metadata.split(" · "),
        ...(caseStudy.technologies ? { keywords: caseStudy.technologies.split(" · ") } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: es ? "Inicio" : "Home",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: selectedWorkLabel,
            item: workUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: pageUrl,
          },
        ],
      },
    ],
  } : undefined;

  return <article className="detail-page">
    {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    <nav aria-label={es ? "Ruta de navegación" : "Breadcrumb"} style={{ marginBottom: "32px" }}>
      <a href={homePath}>{es ? "Inicio" : "Home"}</a>
      <span aria-hidden="true"> / </span>
      <a href={projectHref}>{selectedWorkLabel}</a>
      <span aria-hidden="true"> / </span>
      <span aria-current="page">{title}</span>
    </nav>
    <MetadataChips value={metadata} className="eyebrow case-study-meta" />
    <h1>{title}</h1>
    <p className="case-study-intro">{intro}</p>
    {sections.map((section) => <section className="case-study-section" key={section.title}>
      <h2>{section.title}</h2>
      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </section>)}
    {caseStudy.relatedPlatformExperience && <section className="case-study-section">
      <h2>{ui[locale].related}</h2>
      <p>{translated?.related ?? caseStudy.relatedPlatformExperience}</p>
    </section>}
    {relatedArticles.length > 0 && <section className="case-study-section">
      <h2>{es ? "Artículos técnicos relacionados" : "Related technical writing"}</h2>
      <p>{es ? "Profundizaciones técnicas sobre decisiones de arquitectura e implementación usadas en este proyecto." : "Technical deep dives into architecture and implementation decisions used in this project."}</p>
      <ul>
        {relatedArticles.map((article) => <li key={article.slug}><a href={`${es ? "/es" : ""}/articles/${article.slug}`}>{es ? article.es.title : article.en.title}</a></li>)}
      </ul>
    </section>}
    {caseStudy.technologies && <section className="case-study-section">
      <h2>{ui[locale].technologies}</h2>
      <MetadataChips value={caseStudy.technologies} className="technology" />
    </section>}
    {caseStudy.liveProject && <section className="case-study-section">
      <h2>{ui[locale].liveProject}</h2>
      <p><a href={caseStudy.liveProject.url} target="_blank" rel="noopener noreferrer">{translated?.liveProjectLabel ?? caseStudy.liveProject.label} <span aria-hidden="true">↗</span></a></p>
    </section>}
    {caseStudy.liveExample && <section className="case-study-section">
      <h2>{ui[locale].liveExample}</h2>
      <p>{translated?.liveExampleDescription ?? caseStudy.liveExample.description}</p>
      <p><a href={caseStudy.liveExample.url} target="_blank" rel="noopener noreferrer">{translated?.liveExampleLabel ?? caseStudy.liveExample.label} <span aria-hidden="true">↗</span></a></p>
    </section>}
    <p className="case-study-back"><a href={projectHref}>{ui[locale].back}</a></p>
  </article>;
}
