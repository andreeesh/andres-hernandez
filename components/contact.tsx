import { profile } from "@/data/profile";

export function Contact() {
  return <section id="contact" className="section contact-section" aria-labelledby="contact-title"><p className="section-label">Contact</p><h2 id="contact-title">Looking for an experienced web developer for your team?</h2><p>I&apos;m based in Córdoba, Argentina and work remotely with teams in the US and internationally.</p><address><a href={profile.emailHref}>{profile.email}</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></address></section>;
}
