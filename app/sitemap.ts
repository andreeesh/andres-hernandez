import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap { return [{ url: profile.productionUrl, lastModified: new Date() }, { url: `${profile.productionUrl}/resume`, lastModified: new Date() }, ...projects.filter((project) => project.caseStudy && project.caseStudySlug).map((project) => ({ url: `${profile.productionUrl}/work/${project.caseStudySlug}`, lastModified: new Date() }))]; }
