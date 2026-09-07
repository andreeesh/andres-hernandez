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
    description: "I work on production websites and e-commerce systems for cannabis brands, dispensaries and other US clients, with a focus on custom WordPress development, third-party integrations and technically complex requirements.",
    highlights: [
      "Built a native Dispense API integration that replaced iframe-based dispensary menus across 5+ production sites",
      "Built WordPress themes and integrations with the Dutchie Pro SDK",
      "Built custom store locator plugins using Hoodie and Weedmaps as external data sources",
      "Implemented Salesforce, WooCommerce, Authorize.net and Klaviyo integrations",
      "Worked on the interactive Hemp Beverage News cannabis beverage regulations map",
      "Built and maintained custom themes, plugins, Gutenberg/ACF functionality and multi-location WordPress platforms",
      "Worked with GitHub Actions and Cloudflare as part of deployment and delivery workflows",
    ],
    technologies: "WordPress · WooCommerce · PHP · JavaScript · Gutenberg · ACF · Dispense · Dutchie Pro · Hoodie · Weedmaps · Salesforce · Klaviyo · REST APIs · GitHub Actions · Cloudflare",
  },
  {
    company: "Kadabra IT",
    role: "Senior WordPress Developer",
    location: "Montevideo, Uruguay · Remote",
    start: "Aug 2022",
    end: "May 2023",
    description: "Led WordPress development for financial and asset management clients including MidCap Financial, Orifino and Fiduciary Trust International.",
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
