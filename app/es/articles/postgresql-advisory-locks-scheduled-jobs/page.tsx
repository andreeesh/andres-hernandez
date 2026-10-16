import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TechnicalArticlePage } from "@/components/technical-article-page";
import { getTechnicalArticle } from "@/data/articles";
import { createPageMetadata } from "@/data/seo";

const slug = "postgresql-advisory-locks-scheduled-jobs";
const article = getTechnicalArticle(slug);

export const dynamic = "force-static";
export const metadata = createPageMetadata({
  title: "Advisory Locks de PostgreSQL para Jobs Programados",
  description: "Cómo evitar trabajo programado duplicado entre múltiples instancias usando advisory locks de PostgreSQL, adquisición no bloqueante, controles de vigencia e idempotencia.",
  path: `/es/articles/${slug}`,
  locale: "es-AR",
  englishPath: `/articles/${slug}`,
});

export default function AdvisoryLocksArticleEs() {
  if (!article) notFound();
  return <><a className="skip-link" href="#main-content">Saltar al contenido</a><Header pagePath={`/articles/${slug}`} /><main id="main-content" className="container"><TechnicalArticlePage article={article} locale="es" /></main><Footer /></>;
}
