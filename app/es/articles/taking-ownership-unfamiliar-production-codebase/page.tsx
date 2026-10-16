import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TechnicalArticlePage } from "@/components/technical-article-page";
import { getTechnicalArticle } from "@/data/articles";
import { createPageMetadata } from "@/data/seo";

const slug = "taking-ownership-unfamiliar-production-codebase";
const article = getTechnicalArticle(slug);

export const dynamic = "force-static";
export const metadata = createPageMetadata({
  title: "Cómo Hacerse Cargo de un Código de Producción Desconocido",
  description: "Un enfoque práctico para tomar control de un sistema existente en producción: mapear arquitectura, recuperar despliegues, identificar riesgo, validar dependencias y ganar confianza antes de hacer cambios grandes.",
  path: `/es/articles/${slug}`,
  locale: "es-AR",
  englishPath: `/articles/${slug}`,
});

export default function ProductionCodebaseOwnershipArticleEs() {
  if (!article) notFound();
  return <><a className="skip-link" href="#main-content">Saltar al contenido</a><Header pagePath={`/articles/${slug}`} /><main id="main-content" className="container"><TechnicalArticlePage article={article} locale="es" /></main><Footer /></>;
}
