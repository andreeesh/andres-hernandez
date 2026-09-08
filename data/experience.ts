export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  description: string;
  highlights?: string[];
  technologies?: string;
};

export const experience: Experience[] = [
  {
    company: "PufCreativ",
    role: "Senior WordPress Developer",
    location: "Denver, USA · Remote",
    start: "Jun 2024",
    end: "Present",
    description: "I work on production websites and e-commerce systems for cannabis brands and dispensaries, with a focus on custom WordPress development, third-party integrations and technically complex requirements.",
    highlights: [
      "Built a native Dispense API integration that replaced reverse-proxy-based dispensary menus with native WordPress shopping experiences",
      "Built WordPress themes and integrations with the Dutchie Pro SDK",
      "Built production pages and reusable sections for Prismic-based websites using HTML and CSS, and developed dynamic experiences backed by custom Cloudflare Workers exposing data and functionality to front-end components.",
      "For Current Cannabis, built the dynamic Featured In experience and its supporting Cloudflare Worker, with article data reused across the homepage and About Us page.",
      "Built custom store locator plugins using Hoodie and Weedmaps as external data sources",
      "Implemented Salesforce, WooCommerce, Authorize.net and Klaviyo integrations",
      "Troubleshot critical issues on live WordPress sites, including production failures, compromised installations, malware cleanup and post-incident hardening.",
      "Worked on the interactive Hemp Beverage News cannabis beverage regulations map",
      "Built and maintained custom themes, plugins, Gutenberg/ACF functionality and multi-location WordPress platforms",
      "Worked with GitHub Actions and Cloudflare as part of deployment and delivery workflows",
    ],
    technologies: "WordPress · WooCommerce · PHP · JavaScript · Gutenberg · ACF · Prismic · Dispense · Dutchie Pro · Hoodie · Weedmaps · Salesforce · Klaviyo · REST APIs · Cloudflare · Cloudflare Workers · GitHub Actions",
  },
  {
    company: "Kadabra IT",
    role: "Senior WordPress Developer",
    location: "Montevideo, Uruguay · Remote",
    start: "Aug 2022",
    end: "May 2023",
    description: "Led WordPress development for financial and asset management clients including MidCap Financial, Orofino and Fiduciary Trust International.",
    highlights: ["Built custom themes, plugins and Elementor components", "Owned complex API integrations and migration processes", "Improved platform load times by up to 40% through caching, query and asset delivery optimizations", "Built multilingual WooCommerce platforms and automated migration workflows"],
    technologies: "WordPress · WooCommerce · Elementor · PHP · REST APIs · Multilingual",
  },
  {
    company: "Moka",
    role: "Senior WordPress Developer",
    location: "Santa Fe, Argentina · Remote",
    start: "Aug 2021",
    end: "Jul 2022",
    description: "Built international WordPress platforms for clients including Compass Fairs Norway/Denmark, Jenji and Lunaphore.",
    highlights: ["Built custom REST API endpoints and third-party integrations", "Worked on multilingual WordPress implementations", "Improved deployment workflows for international delivery teams"],
    technologies: "WordPress · PHP · REST APIs · Multilingual · Elementor",
  },
  {
    company: "Specialized Bicycle Components",
    role: "PHP Developer",
    location: "San Francisco, USA · Remote",
    start: "Apr 2020",
    end: "Jul 2021",
    description: "Worked on an enterprise Contentserv PIM containing more than 200,000 products.",
    highlights: ["Built custom import/export pipelines", "Implemented product data validation and quality rules", "Worked on large-scale product migration with zero data loss"],
    technologies: "PHP · MySQL · REST APIs · Data Migration · Enterprise PIM",
  },
];

export const earlierExperience = {
  title: "Earlier experience",
  dates: "2010 — 2020",
  companies: "Preminens · Done! · Sawubona",
  description: "Ten years building production web applications across agency and product environments, covering backend development, relational databases, CMS integrations and client delivery.",
  additional: "Projects included a high-traffic B2B platform for Philip Morris, government lottery systems with strict reliability requirements, and custom MVC applications built with Laravel and Yii.",
};
