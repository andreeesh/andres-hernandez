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
  title: "Building Reliable Pipelines Around Third-Party APIs",
  description: "How to design resilient third-party API pipelines with timeouts, retries, freshness policies, circuit breakers, deduplication, fallbacks and idempotent persistence.",
  path: `/articles/${slug}`,
  englishPath: `/articles/${slug}`,
});

export default function ReliableThirdPartyApiPipelinesArticle() {
  if (!article) notFound();
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header pagePath={`/articles/${slug}`} /><main id="main-content" className="container"><TechnicalArticlePage article={article} /></main><Footer /></>;
}
