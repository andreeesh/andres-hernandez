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
  title: "Building a Production MCP Server: OAuth, Tool Boundaries and State",
  description: "What changes when an MCP server moves beyond a local demo: OAuth, constrained tool contracts, identity isolation, bounded queries, persistence and production failure boundaries.",
  path: "/articles/" + slug,
  englishPath: "/articles/" + slug,
});

export default function ProductionMcpServerArticle() {
  if (!article) notFound();
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header pagePath={"/articles/" + slug} /><main id="main-content" className="container"><TechnicalArticlePage article={article} /></main><Footer /></>;
}
