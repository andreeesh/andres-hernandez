"use client";

import { useEffect, useRef, useState } from "react";
import { navigation, profile } from "@/data/profile";
import { languageLinks, type Locale, ui } from "@/data/locales";

export function Header({ locale = "en", pagePath = "/" }: { locale?: Locale; pagePath?: string }) {
  const [isCompact, setIsCompact] = useState(false);
  const compactRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextIsCompact = window.scrollY > 64;
      if (nextIsCompact !== compactRef.current) {
        compactRef.current = nextIsCompact;
        setIsCompact(nextIsCompact);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const labels = ui[locale];
  const base = locale === "es-AR" ? "/es" : "";
  return <header className={`site-header${isCompact ? " is-compact" : ""}`}><div className="container header-inner"><a className="name-link" href={`${base}/`}>{profile.name}</a><nav aria-label={labels.navigation}><ul>{navigation.map((item) => <li key={item.href}><a href={`${base}${item.href}`}>{labels.navigationItems[item.label as keyof typeof labels.navigationItems]}</a></li>)}</ul></nav><div className="language-switch" aria-label={labels.language}><a href={languageLinks(pagePath, "en")} lang="en" aria-label="English" aria-current={locale === "en" ? "page" : undefined}>EN</a><span aria-hidden="true">/</span><a href={languageLinks(pagePath, "es-AR")} lang="es-AR" aria-label="Español (Argentina)" aria-current={locale === "es-AR" ? "page" : undefined}>ES</a></div></div></header>;
}
