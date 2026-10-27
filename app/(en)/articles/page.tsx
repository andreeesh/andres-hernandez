import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TechnicalWriting } from "@/components/technical-writing";
import { createPageMetadata } from "@/data/seo";

export const dynamic = "force-static";
export const metadata = createPageMetadata({
  title: "Technical Writing — AI, MCP, Backend & Production Systems",
  description: "Technical articles by Andrés Hernández about AI engineering, MCP servers, backend architecture, PostgreSQL, multi-tenant SaaS, APIs, reliability and production systems.",
  path: "/articles",
  englishPath: "/articles",
});

export default function ArticlesPage() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header pagePath="/articles" /><main id="main-content" className="container"><TechnicalWriting standalone /></main><Footer /></>;
}
