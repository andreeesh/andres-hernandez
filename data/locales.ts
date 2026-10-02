export type Locale = "en" | "es-AR";

export const ui = {
  en: {
    navigation: "Primary navigation", language: "Language",
    navigationItems: { Experience: "Experience", Work: "Work", Skills: "Skills", Resume: "Resume", Contact: "Contact" },
    skip: "Skip to content", print: "Print / Save as PDF", backWork: "← Selected work", back: "← Back to selected work",
    highlights: "Selected highlights", related: "Related platform experience", technologies: "Technologies", liveProject: "Live project", liveExample: "Live example",
  },
  "es-AR": {
    navigation: "Navegación principal", language: "Idioma",
    navigationItems: { Experience: "Experiencia", Work: "Proyectos", Skills: "Habilidades", Resume: "CV", Contact: "Contacto" },
    skip: "Ir al contenido", print: "Imprimir / Guardar como PDF", backWork: "← Proyectos destacados", back: "← Volver a proyectos destacados",
    highlights: "Aspectos destacados", related: "Experiencia relacionada con plataformas", technologies: "Tecnologías", liveProject: "Proyecto en línea", liveExample: "Ejemplo en línea",
  },
} as const;

/** The pathname (without /es) identifies the equivalent page in either language. */
export function languageLinks(pagePath: string, locale: Locale): string {
  const path = pagePath === "/" ? "" : pagePath;
  return locale === "es-AR" ? `/es${path}` || "/es" : path || "/";
}

export const profileEs = {
  title: "Desarrollador web senior",
  eyebrow: "Desarrollador web senior · Córdoba, Argentina",
  headline: "Desarrollo soluciones con WordPress, e-commerce y tecnología para la industria del cannabis.",
  intro: "Soy desarrollador web senior y tengo más de 15 años de experiencia creando sitios en producción, sistemas a medida e integraciones complejas para equipos internacionales.",
  cannabisIntro: "Desde hace más de dos años trabajo principalmente con marcas y dispensarios de cannabis de Estados Unidos. Desarrollo experiencias de e-commerce a medida, integraciones de menús, buscadores de locales e integraciones con servicios de terceros.",
  location: "Córdoba, Argentina · Remoto · Equipos de Estados Unidos e internacionales",
  summary: "Desarrollador web senior con más de 15 años de experiencia creando y manteniendo sitios en producción, sistemas WordPress a medida, plataformas de e-commerce e integraciones con servicios de terceros. Tengo experiencia trabajando con autonomía en sistemas de alto tráfico y plataformas heredadas, incluidos temas y plugins a medida, PHP y optimización de rendimiento. Desde hace más de dos años me enfoco principalmente en la industria del cannabis de Estados Unidos, donde desarrollo tecnología para marcas y dispensarios.",
} as const;

export const experienceEs = [
  { role: "Desarrollador WordPress senior", location: "Denver, Estados Unidos · Remoto", end: "Actualidad", description: "Trabajo en sitios en producción y sistemas de e-commerce para marcas y dispensarios de cannabis. Me enfoco en desarrollo WordPress a medida, integraciones con servicios de terceros y requisitos técnicos complejos.", highlights: [
    "Desarrollé una integración nativa con la API de Dispense que reemplazó menús de dispensario basados en reverse proxy por experiencias de compra nativas en WordPress",
    "Desarrollé temas e integraciones de WordPress con Dutchie Pro SDK",
    "Desarrollé páginas en producción y secciones reutilizables para sitios basados en Prismic con HTML y CSS, además de experiencias dinámicas respaldadas por Cloudflare Workers a medida que exponen datos y funcionalidades a componentes del frontend.",
    "Para Current Cannabis, desarrollé la experiencia dinámica Featured In y su Cloudflare Worker, con datos de artículos reutilizados en la página de inicio y la página About Us.",
    "Lideré la transferencia técnica de CBD Pros USA desde otra agencia: tomé los repositorios existentes de frontend y backend y armé el entorno cloud necesario para implementar y operar la plataforma con Vercel, DigitalOcean, Supabase, Contentful, Medusa, Authorize.net y Klaviyo.",
    "Desarrollé plugins de búsqueda de locales a medida para WordPress con Hoodie y Weedmaps como fuentes externas de datos",
    "Implementé integraciones con Salesforce, WooCommerce, Authorize.net y Klaviyo",
    "Resolví problemas críticos en sitios WordPress activos, incluidas fallas en producción, instalaciones comprometidas, limpieza de malware y medidas de seguridad posteriores a incidentes.",
    "Trabajé en el mapa interactivo de regulaciones para bebidas de cannabis de Hemp Beverage News",
    "Desarrollé y mantuve temas y plugins WordPress a medida con hooks, filters, custom post types, taxonomías, Gutenberg y ACF en sitios de producción con múltiples sucursales.",
    "Trabajé con GitHub Actions y Cloudflare en flujos de implementación y entrega",
  ], printHighlights: [
    "Desarrollé una integración nativa con la API de Dispense que reemplazó menús de dispensario basados en reverse proxy por experiencias de compra nativas en WordPress",
    "Desarrollé páginas en producción y secciones reutilizables para sitios basados en Prismic con HTML y CSS, además de experiencias dinámicas con Cloudflare Workers, incluida la experiencia Featured In de Current Cannabis",
    "Lideré la transferencia técnica de CBD Pros USA, tomé los repositorios existentes de frontend y backend y armé el entorno cloud para operar la plataforma con Vercel, DigitalOcean, Supabase, Contentful, Medusa, Authorize.net y Klaviyo",
    "Desarrollé plugins de búsqueda de locales para WordPress con Hoodie y Weedmaps como fuentes externas de datos",
    "Implementé integraciones con Salesforce, WooCommerce, Authorize.net y Klaviyo, y desarrollé temas e integraciones WordPress con Dutchie Pro SDK",
    "Resolví problemas críticos en sitios WordPress activos, incluidas fallas en producción, instalaciones comprometidas, limpieza de malware y medidas de seguridad posteriores a incidentes",
    "Desarrollé y mantuve temas y plugins WordPress a medida con hooks, filters, custom post types, taxonomías, Gutenberg y ACF para sitios de producción con múltiples sucursales",
  ] },
  { role: "Desarrollador WordPress senior", location: "Montevideo, Uruguay · Remoto", description: "Lideré el desarrollo WordPress para clientes de finanzas y gestión de activos, entre ellos MidCap Financial, Orofino y Fiduciary Trust International.", highlights: ["Desarrollé temas, plugins y componentes de Elementor a medida", "Me hice cargo de integraciones complejas con APIs y procesos de migración", "Mejoré hasta un 40% los tiempos de carga de las plataformas mediante optimizaciones de caché, consultas y entrega de recursos", "Desarrollé plataformas WooCommerce multilingües y flujos automatizados de migración"] },
  { role: "Desarrollador WordPress senior", location: "Santa Fe, Argentina · Remoto", description: "Desarrollé plataformas WordPress internacionales para clientes como Compass Fairs Norway/Denmark, Jenji y Lunaphore.", highlights: ["Desarrollé endpoints REST e integraciones con servicios de terceros", "Trabajé en implementaciones WordPress multilingües", "Mejoré flujos de implementación para equipos de entrega internacionales"] },
  { role: "Desarrollador PHP", location: "San Francisco, Estados Unidos · Remoto", description: "Trabajé en un PIM empresarial de Contentserv con 200,000+ productos.", highlights: ["Desarrollé procesos a medida de importación y exportación", "Implementé validaciones y reglas de calidad para datos de productos", "Participé en una migración de productos a gran escala sin pérdida de datos"] },
] as const;

export const earlierExperienceEs = { title: "Experiencia anterior", dates: "2010 — 2020", description: "Diez años desarrollando aplicaciones web en producción en agencias y empresas de producto, con trabajo de backend, bases de datos relacionales, integraciones con CMS y entregas para clientes.", additional: "Entre los proyectos hubo una plataforma B2B de alto tráfico para Philip Morris, sistemas de lotería gubernamentales con requisitos estrictos de confiabilidad y aplicaciones MVC a medida desarrolladas con Laravel y Yii." } as const;

export const educationEs = ["Desarrollo Web — Image Campus, 2011", "Redes y servidores Linux — IT Education, 2015"] as const;

export const skillNamesEs: Record<string, string> = {
  "Performance & technical SEO": "Rendimiento y SEO técnico", "Cannabis & commerce": "Cannabis y e-commerce", "Web development": "Desarrollo web", "Infrastructure & workflow": "Infraestructura y flujos de trabajo",
};

export const skillLeadEs: Record<string, string> = { "WordPress": "WordPress", "Performance & technical SEO": "Optimización de rendimiento · Caché · Optimización de consultas · Optimización de recursos · SEO técnico · Marcado Schema · Sitemaps · Redirecciones · Canonicals", "Cannabis & commerce": "Dispense · Dutchie Pro SDK · Hoodie API · Weedmaps API · Medusa · WooCommerce · Salesforce · Klaviyo · Authorize.net", "Web development": "HTML5 · CSS3 · Flexbox · CSS Grid · Desarrollo adaptable · PHP · JavaScript · TypeScript · React · Next.js · Node.js · REST APIs · MySQL · PostgreSQL", Shopify: "Shopify · Liquid · Desarrollo de temas Shopify · E-commerce en producción", "Infrastructure & workflow": "Git · GitHub Actions · Docker · Cloudflare · Cloudflare Workers · Vercel · DigitalOcean · Supabase · Render · Codex · Claude Code · MCP · Flujos de desarrollo con agentes" };

export const skillItemsEs: Record<string, string> = {
  WordPress: "WordPress internals · Temas a medida · Child themes · Plugins a medida · Hooks y filters · Custom post types · Taxonomías · Gutenberg · ACF · WooCommerce · WP-CLI · WPML · Elementor · Headless WordPress · Migraciones · Resolución de problemas en producción · Limpieza de malware · Refuerzo de seguridad",
};
