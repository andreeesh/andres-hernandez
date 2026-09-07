import { education, skillGroups } from "@/data/skills";

export function Skills() {
  return <><section id="skills" className="section" aria-labelledby="skills-title"><div className="section-heading"><p className="section-label">Skills</p><h2 id="skills-title">Tools I use to get the work done.</h2></div><div className="skill-groups">{skillGroups.map((group) => <article className="skill-group" key={group.name}><h3>{group.name}</h3><p>{group.items}</p></article>)}</div><p className="ai-note">AI-assisted development is part of my daily engineering workflow for implementation, debugging, testing and code review. I use it as an engineering tool, not as a substitute for understanding the systems I work on.</p></section><section className="section education-section" aria-labelledby="education-title"><p className="section-label">Education</p><h2 id="education-title">Education</h2><ul className="education-list">{education.map((item) => <li key={item}>{item}</li>)}</ul></section></>;
}
