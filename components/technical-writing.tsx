import { technicalArticles } from "@/data/articles";
import type { Locale } from "@/data/locales";

export function TechnicalWriting({ locale = "en", standalone = false }: { locale?: Locale; standalone?: boolean }) {
  const es = locale === "es-AR";
  const base = es ? "/es" : "";
  const articles = [...technicalArticles].reverse();

  return <section id={standalone ? undefined : "articles"} className="section" aria-labelledby="articles-title">
    <div className="section-heading">
      <p className="section-label">{es ? "Artículos técnicos" : "Technical writing"}</p>
      <h2 id="articles-title">{es ? "Backend, infraestructura y sistemas en producción." : "Backend, infrastructure and production systems."}</h2>
      <p>{es ? "Notas basadas en problemas reales de arquitectura, integraciones, confiabilidad y operación de software." : "Notes based on real architecture, integration, reliability and software operations problems."}</p>
    </div>
    <div className="projects-list">
      {articles.map((article) => {
        const content = es ? article.es : article.en;
        return <article className="project-entry" key={article.slug}>
          <div className="project-category">
            <span>{content.eyebrow}</span><br />
            <time dateTime={article.publishedAt}>{content.dateLabel}</time>
          </div>
          <div className="project-content">
            <h3><a href={`${base}/articles/${article.slug}`}>{content.title}</a></h3>
            <p>{content.description}</p>
          </div>
        </article>;
      })}
    </div>
  </section>;
}
