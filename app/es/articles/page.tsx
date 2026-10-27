import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TechnicalWriting } from "@/components/technical-writing";
import { createPageMetadata } from "@/data/seo";

export const dynamic = "force-static";
export const metadata = createPageMetadata({
  title: "Artículos Técnicos — AI, MCP, Backend y Sistemas en Producción",
  description: "Artículos técnicos de Andrés Hernández sobre ingeniería de AI, servidores MCP, arquitectura backend, PostgreSQL, SaaS multiempresa, APIs, confiabilidad y sistemas en producción.",
  path: "/es/articles",
  locale: "es-AR",
  englishPath: "/articles",
});

export default function ArticlesPageEs() {
  return <><a className="skip-link" href="#main-content">Ir al contenido</a><Header locale="es-AR" pagePath="/articles" /><main id="main-content" className="container"><TechnicalWriting locale="es-AR" standalone /></main><Footer locale="es-AR" /></>;
}
