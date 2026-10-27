import { technicalArticles, type TechnicalArticle } from "@/data/articles";
import { profile } from "@/data/profile";

export function TechnicalArticlePage({ article, locale = "en" }: { article: TechnicalArticle; locale?: "en" | "es" }) {
  const content = locale === "es" ? article.es : article.en;
  const relatedHref = locale === "es" ? `/es${article.relatedCaseStudy.href}` : article.relatedCaseStudy.href;
  const relatedArticles = technicalArticles.filter((candidate) => candidate.slug !== article.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: content.title,
    description: content.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Person", name: profile.name, url: profile.productionUrl },
    mainEntityOfPage: `${profile.productionUrl}${locale === "es" ? "/es" : ""}/articles/${article.slug}`,
    inLanguage: locale === "es" ? "es-AR" : "en",
  };

  return <article className="detail-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
      <h2>{locale === "es" ? "Trabajo relacionado" : "Related work"}</h2>
      <p><a href={relatedHref}>{content.relatedCaseStudyLabel}</a></p>
      <h3>{locale === "es" ? "Artículos técnicos relacionados" : "Related technical articles"}</h3>
      <ul>
        {relatedArticles.map((candidate) => {
          const candidateContent = locale === "es" ? candidate.es : candidate.en;
          const href = `${locale === "es" ? "/es" : ""}/articles/${candidate.slug}`;
          return <li key={candidate.slug}><a href={href}>{candidateContent.title}</a></li>;
        })}
      </ul>
    </section>
  </article>;
}
