import type { Experience } from "@/data/experience";
import type { Locale } from "@/data/locales";
import { ui } from "@/data/locales";

export function ExperienceEntry({ entry, localized, locale = "en" }: { entry: Experience; localized?: { role: string; location: string; end?: string; description: string; highlights?: readonly string[]; printHighlights?: readonly string[] }; locale?: Locale }) {
  const text = localized ?? entry;
  return <article className="experience-entry"><div className="entry-meta"><time>{entry.start} — {text.end ?? entry.end}</time><strong>{entry.company}</strong><span>{text.location}</span></div><div className="entry-content"><h3>{text.role}</h3><p>{text.description}</p>{text.highlights && <><p className="sub-label">{ui[locale].highlights}</p><ul className={text.printHighlights ? "screen-highlights" : undefined}>{text.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>{text.printHighlights && <ul className="print-highlights">{text.printHighlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}</>}{entry.technologies && <p className="technology">{entry.technologies}</p>}</div></article>;
}
