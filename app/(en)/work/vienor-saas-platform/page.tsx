import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseStudyPage } from "@/components/case-study-page";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/data/seo";

const project = projects.find((item) => item.slug === "vienor-saas-platform");
export const dynamic = "force-static";
export const metadata = createPageMetadata({ title: "Building a Multi-Tenant Weather SaaS Platform", description: "How I designed and operate Vienor, a production weather SaaS platform: multi-tenant RBAC, multi-provider weather ingestion, PostgreSQL advisory locks, circuit breakers, notifications and infrastructure.", path: "/work/vienor-saas-platform", englishPath: "/work/vienor-saas-platform" });

export default function VienorCaseStudy() { if (!project?.caseStudy) notFound(); return <><a className="skip-link" href="#main-content">Skip to content</a><Header pagePath="/work/vienor-saas-platform" /><main id="main-content" className="container"><CaseStudyPage caseStudy={project.caseStudy} slug={project.slug} /></main><Footer /></>; }
