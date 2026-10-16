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
  title: "PostgreSQL Advisory Locks for Scheduled Jobs",
  description: "How to prevent duplicate scheduled work across multiple application instances with PostgreSQL advisory locks, non-blocking acquisition, freshness checks and idempotent job design.",
  path: `/articles/${slug}`,
  englishPath: `/articles/${slug}`,
});

export default function AdvisoryLocksArticle() {
  if (!article) notFound();
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header pagePath={`/articles/${slug}`} /><main id="main-content" className="container"><TechnicalArticlePage article={article} /></main><Footer /></>;
}
