import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseStudyPage } from "@/components/case-study-page";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/data/seo";

const project = projects.find((item) => item.slug === "vienor-saas-platform");
export const dynamic = "force-static";
export const metadata = createPageMetadata({ title: "Desarrollo de una Plataforma SaaS Meteorológica Multiempresa", description: "Cómo diseñé y opero Vienor, una plataforma SaaS meteorológica en producción: RBAC multiempresa, ingesta desde múltiples proveedores, advisory locks de PostgreSQL, circuit breakers, notificaciones e infraestructura.", path: "/es/work/vienor-saas-platform", locale: "es-AR", englishPath: "/work/vienor-saas-platform" });

export default function VienorCaseStudyEs() { if (!project?.caseStudy) notFound(); return <><a className="skip-link" href="#main-content">Ir al contenido</a><Header locale="es-AR" pagePath="/work/vienor-saas-platform" /><main id="main-content" className="container"><CaseStudyPage caseStudy={project.caseStudy} slug={project.slug} locale="es-AR" /></main><Footer locale="es-AR" /></>; }
