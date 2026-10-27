import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TechnicalArticlePage } from "@/components/technical-article-page";
import { getTechnicalArticle } from "@/data/articles";
import { createPageMetadata } from "@/data/seo";

const slug = "production-mcp-server-oauth-tool-boundaries";
const article = getTechnicalArticle(slug);

export const dynamic = "force-static";
export const metadata = createPageMetadata({
  title: "Cómo Construir un Servidor MCP de Producción: OAuth, Límites de Tools y Estado",
  description: "Qué cambia cuando un servidor MCP deja de ser una demo local: OAuth, contratos de tools acotados, aislamiento de identidades, consultas limitadas, persistencia y fronteras de falla.",
  path: "/es/articles/" + slug,
  locale: "es-AR",
  englishPath: "/articles/" + slug,
});

export default function ProductionMcpServerArticleEs() {
  if (!article) notFound();
  return <><a className="skip-link" href="#main-content">Saltar al contenido</a><Header pagePath={"/articles/" + slug} /><main id="main-content" className="container"><TechnicalArticlePage article={article} locale="es" /></main><Footer /></>;
}
