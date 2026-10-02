import type { Metadata } from "next";
import { profile } from "@/data/profile";
import type { Locale } from "@/data/locales";

type PageMetadataInput = { title: string; description: string; path: string; locale?: Locale; englishPath?: string };

export const socialImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name} — ${profile.title}` };

export function createPageMetadata({ title, description, path, locale = "en", englishPath }: PageMetadataInput): Metadata {
  const pageTitle = `${title} — ${profile.name}`;
  const url = new URL(path, profile.productionUrl).toString();

  return {
    title,
    description,
    alternates: { canonical: path, languages: { en: englishPath ?? (path.startsWith("/es") ? path.slice(3) || "/" : path), "es-AR": path.startsWith("/es") ? path : `/es${path === "/" ? "" : path}`, "x-default": englishPath ?? (path.startsWith("/es") ? path.slice(3) || "/" : path) } },
    openGraph: { title: pageTitle, description, type: "website", url, locale: locale === "es-AR" ? "es_AR" : "en_US", alternateLocale: locale === "es-AR" ? ["en_US"] : ["es_AR"], images: [{ ...socialImage, url: new URL(socialImage.url, profile.productionUrl).toString() }] },
    twitter: { card: "summary", title: pageTitle, description, images: [new URL(socialImage.url, profile.productionUrl).toString()] },
  };
}
