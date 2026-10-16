import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TechnicalArticlePage } from "@/components/technical-article-page";
import { getTechnicalArticle } from "@/data/articles";
import { createPageMetadata } from "@/data/seo";

const slug = "multi-tenant-rbac-saas";
const article = getTechnicalArticle(slug);

export const dynamic = "force-static";
export const metadata = createPageMetadata({
  title: "Designing Multi-Tenant RBAC for a SaaS",
  description: "How to model users, memberships, roles, active tenant context and authorization boundaries in a multi-company SaaS without leaking data across tenants.",
  path: `/articles/${slug}`,
  englishPath: `/articles/${slug}`,
});

export default function MultiTenantRbacArticle() {
  if (!article) notFound();
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header pagePath={`/articles/${slug}`} /><main id="main-content" className="container"><TechnicalArticlePage article={article} /></main><Footer /></>;
}
