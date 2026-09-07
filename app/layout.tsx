import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { profile } from "@/data/profile";
import { socialImage } from "@/data/seo";
import "./globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.productionUrl),
  title: { default: "Andrés Hernández — Senior Web Developer | WordPress & Cannabis Technology", template: "%s — Andrés Hernández" },
  description: "Senior Web Developer with 15+ years of experience in WordPress, e-commerce, API integrations and cannabis technology, working remotely with US and international teams.",
  alternates: { canonical: "/" },
  openGraph: { title: "Andrés Hernández — Senior Web Developer | WordPress & Cannabis Technology", description: "Senior Web Developer with 15+ years of experience in WordPress, e-commerce, API integrations and cannabis technology, working remotely with US and international teams.", type: "website", url: profile.productionUrl, images: [socialImage] },
  twitter: { card: "summary", title: "Andrés Hernández — Senior Web Developer | WordPress & Cannabis Technology", description: "Senior Web Developer with 15+ years of experience in WordPress, e-commerce, API integrations and cannabis technology, working remotely with US and international teams.", images: [socialImage.url] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={font.className}>{children}</body></html>; }
