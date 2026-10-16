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
  title: "Taking Ownership of an Unfamiliar Production Codebase",
  description: "A practical approach to taking over an existing production system: mapping architecture, restoring deployability, identifying risk, validating dependencies and earning confidence before making large changes.",
  path: `/articles/${slug}`,
  englishPath: `/articles/${slug}`,
});

export default function ProductionCodebaseOwnershipArticle() {
  if (!article) notFound();
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header pagePath={`/articles/${slug}`} /><main id="main-content" className="container"><TechnicalArticlePage article={article} /></main><Footer /></>;
}
