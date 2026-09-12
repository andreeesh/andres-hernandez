import { Header } from "@/components/header";
import { ExperienceEntry } from "@/components/experience-entry";
import { PrintButton } from "@/components/print-button";
import { experience, earlierExperience } from "@/data/experience";
import { education, skillGroups } from "@/data/skills";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/data/seo";

export const metadata = createPageMetadata({ title: "Resume", description: "Senior Web Developer with 15+ years of experience in WordPress, e-commerce, API integrations and cannabis technology, working remotely with US and international teams.", path: "/resume" });

export default function Resume() { return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" className="container resume"><div className="resume-top"><div><h1>{profile.name}</h1><p className="resume-title">{profile.title}</p><p className="resume-contact"><a href={profile.emailHref}>{profile.email}</a> · Córdoba, Argentina · <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p></div><PrintButton /></div><section className="resume-section"><h2>Professional summary</h2><p>{profile.summary}</p></section><section className="resume-section"><h2>Experience</h2><div className="resume-experience">{experience.map((entry) => <ExperienceEntry entry={entry} key={entry.company} />)}<article className="experience-entry earlier-entry"><div className="entry-meta"><time>{earlierExperience.dates}</time><strong>{earlierExperience.title}</strong><span>{earlierExperience.companies}</span></div><div className="entry-content"><p>{earlierExperience.description}</p><p>{earlierExperience.additional}</p></div></article></div></section><section className="resume-section"><h2>Selected technical skills</h2><div className="resume-skills">{skillGroups.map((group) => <p key={group.name}><strong>{group.name}</strong><br />{group.items}</p>)}</div></section><section className="resume-section"><h2>Education</h2><ul className="education-list">{education.map((item) => <li key={item}>{item}</li>)}</ul></section></main></>; }
