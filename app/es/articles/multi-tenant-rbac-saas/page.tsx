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
  title: "Diseño de RBAC Multiempresa para un SaaS",
  description: "Cómo modelar usuarios, membresías, roles, tenant activo y límites de autorización en un SaaS multiempresa sin filtrar datos entre empresas.",
  path: `/es/articles/${slug}`,
  locale: "es-AR",
  englishPath: `/articles/${slug}`,
});

export default function MultiTenantRbacArticleEs() {
  if (!article) notFound();
  return <><a className="skip-link" href="#main-content">Saltar al contenido</a><Header pagePath={`/es/articles/${slug}`} /><main id="main-content" className="container"><TechnicalArticlePage article={article} locale="es" /></main><Footer /></>;
}
