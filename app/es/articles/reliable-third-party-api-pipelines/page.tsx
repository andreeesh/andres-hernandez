import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TechnicalArticlePage } from "@/components/technical-article-page";
import { getTechnicalArticle } from "@/data/articles";
import { createPageMetadata } from "@/data/seo";

const slug = "reliable-third-party-api-pipelines";
const article = getTechnicalArticle(slug);

export const dynamic = "force-static";
export const metadata = createPageMetadata({
  title: "Cómo Construir Pipelines Confiables sobre APIs de Terceros",
  description: "Cómo diseñar pipelines resilientes sobre APIs externas con timeouts, reintentos, políticas de vigencia, circuit breakers, deduplicación, fallbacks y persistencia idempotente.",
  path: `/es/articles/${slug}`,
  locale: "es-AR",
  englishPath: `/articles/${slug}`,
});

export default function ReliableThirdPartyApiPipelinesArticleEs() {
  if (!article) notFound();
  return <><a className="skip-link" href="#main-content">Saltar al contenido</a><Header pagePath={`/es/articles/${slug}`} /><main id="main-content" className="container"><TechnicalArticlePage article={article} locale="es" /></main><Footer /></>;
}
