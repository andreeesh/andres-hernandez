import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseStudyPage } from "@/components/case-study-page";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/data/seo";

const project = projects.find((item) => item.slug === "native-dispensary-menus");

export const dynamic = "force-static";

export const metadata = createPageMetadata({ title: "Native Cannabis Menus", description: "How I built reusable WordPress integrations for native cannabis dispensary menus using the Dispense API, with additional experience working with Dutchie Pro SDK.", path: "/work/native-cannabis-menus" });

export default function NativeCannabisMenusCaseStudy() {
  if (!project?.caseStudy) notFound();

  const { caseStudy } = project;

  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" className="container"><CaseStudyPage caseStudy={caseStudy} /></main><Footer /></>;
}
