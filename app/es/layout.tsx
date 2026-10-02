import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { socialImage } from "@/data/seo";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

const title = "Andrés Hernández — Desarrollador web senior | WordPress y tecnología para cannabis";
const description = "Desarrollador web senior con más de 15 años de experiencia en WordPress, e-commerce, integraciones con APIs y tecnología para la industria del cannabis. Trabajo de forma remota con equipos de Estados Unidos y de otros países.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.productionUrl),
  title: { default: title, template: "%s — Andrés Hernández" },
  description,
  openGraph: { title, description, type: "website", url: `${profile.productionUrl}/es`, locale: "es_AR", alternateLocale: ["en_US"], images: [{ ...socialImage, url: new URL(socialImage.url, profile.productionUrl).toString() }] },
  twitter: { card: "summary", title, description, images: [new URL(socialImage.url, profile.productionUrl).toString()] },
  robots: { index: true, follow: true },
};

export default function SpanishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body className={font.className}>{children}</body></html>;
}
