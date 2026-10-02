import { profile } from "@/data/profile";
import type { Locale } from "@/data/locales";
import { profileEs } from "@/data/locales";

export function Footer({ locale = "en" }: { locale?: Locale }) { const es = locale === "es-AR"; return <footer className="site-footer"><div className="container footer-inner"><p><strong>{profile.name}</strong><span>{es ? profileEs.title : profile.title}</span><span>Córdoba, Argentina</span></p><p>© {new Date().getFullYear()}</p></div></footer>; }
