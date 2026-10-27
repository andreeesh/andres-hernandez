import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseStudyPage } from "@/components/case-study-page";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/data/seo";

const project = projects.find((item) => item.slug === "search-console-insights-mcp");
export const dynamic = "force-static";
export const metadata = createPageMetadata({
  title: "Building a Google Search Console MCP Server",
  description: "How I built a production MCP service for Google Search Console with OAuth, constrained AI tools, URL inspection, search performance analysis and isolated PostgreSQL workflow state.",
  path: "/work/search-console-insights-mcp",
  englishPath: "/work/search-console-insights-mcp"
});

export default function SearchConsoleInsightsMcpCaseStudy() {
  if (!project?.caseStudy) notFound();
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header pagePath="/work/search-console-insights-mcp" /><main id="main-content" className="container"><CaseStudyPage caseStudy={project.caseStudy} slug={project.slug} /></main><Footer /></>;
}
