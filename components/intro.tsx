import { profile } from "@/data/profile";

export function Intro() {
  return <section className="hero" aria-labelledby="page-title"><p className="eyebrow">{profile.eyebrow}</p><h1 id="page-title">{profile.headline}</h1><div className="hero-copy"><p>{profile.intro}</p><p>{profile.cannabisIntro}</p></div><p className="location">{profile.location}</p><p className="link-row"><a href={profile.emailHref}>Email</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></p></section>;
}
