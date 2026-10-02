import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseStudyPage } from "@/components/case-study-page";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/data/seo";

const project = projects.find((item) => item.slug === "cannabis-store-locators");
export const dynamic = "force-static";
export const metadata = createPageMetadata({ title: "Integraciones de buscadores de locales", description: "Cómo desarrollé buscadores de locales nativos en WordPress con datos externos de cannabis, Hoodie y Weedmaps Public API.", path: "/es/work/store-locator-integrations", locale: "es-AR", englishPath: "/work/store-locator-integrations" });

export default function StoreLocatorIntegrationsCaseStudyEs() { if (!project?.caseStudy) notFound(); return <><a className="skip-link" href="#main-content">Ir al contenido</a><Header locale="es-AR" pagePath="/work/store-locator-integrations" /><main id="main-content" className="container"><CaseStudyPage caseStudy={project.caseStudy} slug={project.slug} locale="es-AR" /></main><Footer locale="es-AR" /></>; }
