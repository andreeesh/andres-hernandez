import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/resume", ...projects.filter((project) => project.caseStudy && project.caseStudySlug).map((project) => `/work/${project.caseStudySlug}`)];
  return paths.flatMap((path) => {
    const en = path === "/" ? profile.productionUrl : `${profile.productionUrl}${path}`;
    const esPath = path === "/" ? "/es" : `/es${path}`;
    return [
      { url: en, lastModified: new Date(), alternates: { languages: { en, "es-AR": `${profile.productionUrl}${esPath}`, "x-default": en } } },
      { url: `${profile.productionUrl}${esPath}`, lastModified: new Date(), alternates: { languages: { en, "es-AR": `${profile.productionUrl}${esPath}`, "x-default": en } } },
    ];
  });
}
