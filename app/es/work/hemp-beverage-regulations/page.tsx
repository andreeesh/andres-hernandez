import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { CaseStudyPage } from "@/components/case-study-page";
import { Footer } from "@/components/footer";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/data/seo";

const project = projects.find((item) => item.slug === "hemp-beverage-news-regulations");
export const dynamic = "force-static";
export const metadata = createPageMetadata({ title: "Regulaciones para bebidas de cáñamo", description: "Experiencia interactiva de regulaciones para bebidas de cannabis y cáñamo de Hemp Beverage News, con información de distintos estados de Estados Unidos.", path: "/es/work/hemp-beverage-regulations", locale: "es-AR", englishPath: "/work/hemp-beverage-regulations" });

export default function HempBeverageRegulationsCaseStudyEs() { if (!project?.caseStudy) notFound(); return <><a className="skip-link" href="#main-content">Ir al contenido</a><Header locale="es-AR" pagePath="/work/hemp-beverage-regulations" /><main id="main-content" className="container"><CaseStudyPage caseStudy={project.caseStudy} slug={project.slug} locale="es-AR" /></main><Footer locale="es-AR" /></>; }
