import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseStudyPage } from "@/components/case-study-page";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/data/seo";

const project = projects.find((item) => item.slug === "native-dispensary-menus");
export const dynamic = "force-static";
export const metadata = createPageMetadata({ title: "Menús nativos para dispensarios", description: "Cómo desarrollé integraciones WordPress reutilizables para menús nativos de dispensarios con Dispense API y Dutchie Pro SDK.", path: "/es/work/native-cannabis-menus", locale: "es-AR", englishPath: "/work/native-cannabis-menus" });

export default function NativeCannabisMenusCaseStudyEs() { if (!project?.caseStudy) notFound(); return <><a className="skip-link" href="#main-content">Ir al contenido</a><Header locale="es-AR" pagePath="/work/native-cannabis-menus" /><main id="main-content" className="container"><CaseStudyPage caseStudy={project.caseStudy} slug={project.slug} locale="es-AR" /></main><Footer locale="es-AR" /></>; }
