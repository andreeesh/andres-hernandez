import { navigation, profile } from "@/data/profile";

export function Header() {
  return <header className="site-header"><div className="container header-inner"><a className="name-link" href="/">{profile.name}</a><nav aria-label="Primary navigation"><ul>{navigation.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></nav></div></header>;
}
