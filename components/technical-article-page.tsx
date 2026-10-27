import { technicalArticles, type TechnicalArticle } from "@/data/articles";
import { profile } from "@/data/profile";

export function TechnicalArticlePage({ article, locale = "en" }: { article: TechnicalArticle; locale?: "en" | "es" }) {
  const content = locale === "es" ? article.es : article.en;
  const es = locale === "es";
  const relatedHref = es ? `/es${article.relatedCaseStudy.href}` : article.relatedCaseStudy.href;
  const relatedArticles = article.relatedArticleSlugs
    .map((slug) => technicalArticles.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is TechnicalArticle => Boolean(candidate));

  const articlePath = `${es ? "/es" : ""}/articles/${article.slug}`;
  const articleUrl = new URL(articlePath, profile.productionUrl).toString();
  const articlesPath = `${es ? "/es" : ""}/articles`;
  const articlesUrl = new URL(articlesPath, profile.productionUrl).toString();
  const homePath = es ? "/es" : "/";
  const homeUrl = new URL(homePath, profile.productionUrl).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: content.title,
        description: content.description,
        datePublished: article.publishedAt,
        dateModified: article.publishedAt,
        author: { "@type": "Person", name: profile.name, url: profile.productionUrl },
        mainEntityOfPage: articleUrl,
        inLanguage: es ? "es-AR" : "en",
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
            name: es ? "Artículos" : "Articles",
            item: articlesUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: content.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return <article className="detail-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <nav aria-label={es ? "Ruta de navegación" : "Breadcrumb"} style={{ marginBottom: "32px" }}>
      <a href={homePath}>{es ? "Inicio" : "Home"}</a>
      <span aria-hidden="true"> / </span>
      <a href={articlesPath}>{es ? "Artículos" : "Articles"}</a>
      <span aria-hidden="true"> / </span>
      <span aria-current="page">{content.title}</span>
    </nav>
    <p className="eyebrow case-study-meta">{content.eyebrow}</p>
    <h1>{content.title}</h1>
    <p className="case-study-intro">{content.intro}</p>
    <p><time dateTime={article.publishedAt}>{content.dateLabel}</time></p>
    {content.sections.map((section) => <section className="case-study-section" key={section.title}>
      <h2>{section.title}</h2>
      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.code && <pre style={{ overflowX: "auto", padding: "1rem", borderRadius: "0.5rem" }}><code>{section.code}</code></pre>}
    </section>)}
    <section className="case-study-section">
      <h2>{es ? "Trabajo relacionado" : "Related work"}</h2>
      <p><a href={relatedHref}>{content.relatedCaseStudyLabel}</a></p>
      {relatedArticles.length > 0 && <>
        <h3>{es ? "Artículos técnicos relacionados" : "Related technical articles"}</h3>
        <ul>
          {relatedArticles.map((candidate) => {
            const candidateContent = es ? candidate.es : candidate.en;
            const href = `${es ? "/es" : ""}/articles/${candidate.slug}`;
            return <li key={candidate.slug}><a href={href}>{candidateContent.title}</a></li>;
          })}
        </ul>
      </>}
    </section>
  </article>;
}
