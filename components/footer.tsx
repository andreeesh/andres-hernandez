import { profile } from "@/data/profile";

export function Footer() { return <footer className="site-footer"><div className="container footer-inner"><p><strong>{profile.name}</strong><span>{profile.title}</span><span>Córdoba, Argentina</span></p><p>© {new Date().getFullYear()}</p></div></footer>; }
