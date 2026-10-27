import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseStudyPage } from "@/components/case-study-page";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/data/seo";

const project = projects.find((item) => item.slug === "search-console-insights-mcp");
export const dynamic = "force-static";
export const metadata = createPageMetadata({
  title: "Desarrollo de un Servidor MCP para Google Search Console",
  description: "Cómo desarrollé un servicio MCP en producción para Google Search Console con OAuth, herramientas de AI acotadas, inspección de URLs, análisis de rendimiento y estado SEO aislado en PostgreSQL.",
  path: "/es/work/search-console-insights-mcp",
  locale: "es-AR",
  englishPath: "/work/search-console-insights-mcp"
});

export default function SearchConsoleInsightsMcpCaseStudyEs() {
  if (!project?.caseStudy) notFound();
  return <><a className="skip-link" href="#main-content">Ir al contenido</a><Header locale="es-AR" pagePath="/work/search-console-insights-mcp" /><main id="main-content" className="container"><CaseStudyPage caseStudy={project.caseStudy} slug={project.slug} locale="es-AR" /></main><Footer locale="es-AR" /></>;
}
