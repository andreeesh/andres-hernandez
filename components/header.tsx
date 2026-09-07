"use client";

import { useEffect, useRef, useState } from "react";
import { navigation, profile } from "@/data/profile";

export function Header() {
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

  return <header className={`site-header${isCompact ? " is-compact" : ""}`}><div className="container header-inner"><a className="name-link" href="/">{profile.name}</a><nav aria-label="Primary navigation"><ul>{navigation.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></nav></div></header>;
}
