import type { Experience } from "@/data/experience";

export function ExperienceEntry({ entry }: { entry: Experience }) {
  return <article className="experience-entry"><div className="entry-meta"><time>{entry.start} — {entry.end}</time><strong>{entry.company}</strong><span>{entry.location}</span></div><div className="entry-content"><h3>{entry.role}</h3><p>{entry.description}</p>{entry.highlights && <><p className="sub-label">Selected highlights</p><ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></>}{entry.technologies && <p className="technology">{entry.technologies}</p>}</div></article>;
}
