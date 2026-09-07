import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { CaseStudyPage } from "@/components/case-study-page";
import { Footer } from "@/components/footer";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/data/seo";

const project = projects.find((item) => item.slug === "hemp-beverage-news-regulations");

export const dynamic = "force-static";

export const metadata = createPageMetadata({ title: "Hemp Beverage Regulations", description: "Interactive cannabis and hemp beverage regulations experience for Hemp Beverage News, helping users explore regulatory information across US states.", path: "/work/hemp-beverage-regulations" });

export default function HempBeverageRegulationsCaseStudy() {
  if (!project?.caseStudy) notFound();

  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" className="container"><CaseStudyPage caseStudy={project.caseStudy} /></main><Footer /></>;
}
