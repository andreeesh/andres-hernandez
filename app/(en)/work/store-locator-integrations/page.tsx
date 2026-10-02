import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseStudyPage } from "@/components/case-study-page";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/data/seo";

const project = projects.find((item) => item.slug === "cannabis-store-locators");
export const dynamic = "force-static";
export const metadata = createPageMetadata({ title: "Store Locator Integrations", description: "How I built native WordPress store locator integrations using external cannabis retail data from Hoodie and the Weedmaps Public API.", path: "/work/store-locator-integrations", englishPath: "/work/store-locator-integrations" });
export default function StoreLocatorIntegrationsCaseStudy() { if (!project?.caseStudy) notFound(); return <><a className="skip-link" href="#main-content">Skip to content</a><Header pagePath="/work/store-locator-integrations" /><main id="main-content" className="container"><CaseStudyPage caseStudy={project.caseStudy} slug={project.slug} /></main><Footer /></>; }
