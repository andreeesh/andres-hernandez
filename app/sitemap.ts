import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { technicalArticles } from "@/data/articles";

const latestSiteUpdate = "2026-10-27";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/resume", "/articles", ...projects.filter((project) => project.caseStudy && project.caseStudySlug).map((project) => `/work/${project.caseStudySlug}`), ...technicalArticles.map((article) => `/articles/${article.slug}`)];
  const updatedToday = new Set([
    "/",
    "/resume",
    "/articles",
    "/work/search-console-insights-mcp",
    "/work/vienor-saas-platform",
    ...technicalArticles.map((article) => `/articles/${article.slug}`),
  ]);

  return paths.flatMap((path) => {
    const en = path === "/" ? profile.productionUrl : `${profile.productionUrl}${path}`;
    const esPath = path === "/" ? "/es" : `/es${path}`;
    const lastModified = updatedToday.has(path) ? latestSiteUpdate : undefined;

    return [
      { url: en, ...(lastModified ? { lastModified } : {}), alternates: { languages: { en, "es-AR": `${profile.productionUrl}${esPath}`, "x-default": en } } },
      { url: `${profile.productionUrl}${esPath}`, ...(lastModified ? { lastModified } : {}), alternates: { languages: { en, "es-AR": `${profile.productionUrl}${esPath}`, "x-default": en } } },
    ];
  });
}
