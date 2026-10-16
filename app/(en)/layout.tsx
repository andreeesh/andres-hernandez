import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { profile } from "@/data/profile";
import { socialImage } from "@/data/seo";
import "../globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const title = "Andrés Hernández — Senior Software Engineer | Backend & Infrastructure";
const description = "Senior Software Engineer with 15+ years of experience building production systems, backend services, APIs, integrations and web platforms for international teams.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.productionUrl),
  title: { default: title, template: "%s — Andrés Hernández" },
  description,
  alternates: { canonical: "/", languages: { en: "/", "es-AR": "/es", "x-default": "/" } },
  openGraph: { title, description, type: "website", url: profile.productionUrl, locale: "en_US", alternateLocale: ["es_AR"], images: [{ ...socialImage, url: new URL(socialImage.url, profile.productionUrl).toString() }] },
  twitter: { card: "summary", title, description, images: [new URL(socialImage.url, profile.productionUrl).toString()] },
  robots: { index: true, follow: true },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={font.className}>{children}</body></html>; }
