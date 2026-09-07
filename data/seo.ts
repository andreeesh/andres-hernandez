import type { Metadata } from "next";
import { profile } from "@/data/profile";

type PageMetadataInput = { title: string; description: string; path: string };

export const socialImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name} — ${profile.title}` };

export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const pageTitle = `${title} — ${profile.name}`;
  const url = new URL(path, profile.productionUrl).toString();

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: pageTitle, description, type: "website", url, images: [socialImage] },
    twitter: { card: "summary", title: pageTitle, description, images: [socialImage.url] },
  };
}
