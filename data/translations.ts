import { projects } from "@/data/projects";

export const homeEs = {
  cannabisLabel: "Experiencia en cannabis",
  cannabisTitle: "Desarrollo tecnología para la industria del cannabis desde adentro.",
  cannabisIntro: "En PufCreativ llevo más de dos años trabajando en sitios en producción y sistemas de e-commerce para marcas y dispensarios de cannabis de Estados Unidos. Gran parte de ese trabajo consiste en conectar WordPress con las plataformas especializadas que usa la industria.",
  capabilities: [
    { title: "Menús nativos para dispensarios", copy: "Desarrollé una integración WordPress a medida con la API de Dispense para reemplazar menús de dispensario basados en reverse proxy por experiencias de compra nativas y alineadas con la marca. La implementación admite productos, carruseles, navegación y diseños configurables directamente en WordPress, y está pensada para reutilizarse en sitios en producción.", tech: "Dispense API · WordPress · WooCommerce · PHP · JavaScript" },
    { title: "Dutchie Pro", copy: "Desarrollé temas e integraciones WordPress con Dutchie Pro SDK, incluida la colaboración directa con el equipo de ingeniería de Dutchie para resolver requisitos de implementación.", tech: "Dutchie Pro SDK · WordPress · PHP · JavaScript", liveLabel: "Ver The Fire Station" },
    { title: "Buscadores de locales", copy: "Desarrollé integraciones WordPress a medida para buscar locales usando datos externos de comercios de cannabis. Una implementación usa Hoodie y otra utiliza Weedmaps Public API como fuente de datos.", tech: "Hoodie API · Weedmaps API · WordPress · REST APIs" },
    { title: "Integraciones de comercio y CRM", copy: "Desarrollé y mantuve integraciones entre WordPress y WooCommerce y sistemas externos de negocio, como Salesforce, Authorize.net y Klaviyo.", tech: "Salesforce · WooCommerce · Authorize.net · Klaviyo · REST APIs" },
    { title: "Datos regulatorios del cannabis", copy: "Trabajé en el mapa interactivo de regulaciones de Hemp Beverage News, que permite consultar las regulaciones sobre bebidas de cannabis y cáñamo en distintos estados de Estados Unidos.", liveLabel: "Ver mapa de regulaciones" },
  ],
  experienceLabel: "Experiencia", experienceTitle: "Más de 15 años desarrollando para la web.",
  workLabel: "Proyectos destacados", workTitle: "Algunos proyectos que desarrollé.",
  skillsLabel: "Habilidades", skillsTitle: "Herramientas que uso para hacer el trabajo.",
  aiNote: "El desarrollo asistido por IA forma parte de mi trabajo diario de ingeniería para implementar, depurar, probar y revisar código. La uso como herramienta de ingeniería, sin dejar de entender los sistemas en los que trabajo.",
  education: "Formación", contactTitle: "¿Buscás un desarrollador web con experiencia para tu equipo?", contactCopy: "Vivo en Córdoba, Argentina, y trabajo de forma remota con equipos de Estados Unidos y de otros países.",
};

export const projectEs: Record<string, { category?: string; description: string; linkText?: string; caseTitle?: string; caseIntro?: string; sections?: { title: string; paragraphs: string[] }[]; related?: string; liveProjectLabel?: string; liveExampleDescription?: string; liveExampleLabel?: string }> = {
  "elevation-cannabis": { category: "Cannabis · E-commerce", description: "Experiencia de e-commerce en WordPress/WooCommerce para un dispensario, con infraestructura de menús de cannabis, verificación de edad, programa de fidelización y flujos de compra para múltiples locales.", linkText: "Visitar sitio" },
  "hemp-beverage-news-regulations": { category: "Cannabis · Datos", description: "Recurso interactivo para consultar las regulaciones sobre bebidas de cannabis y cáñamo en distintos estados de Estados Unidos.", linkText: "Explorar regulaciones", caseTitle: "Regulaciones para bebidas de cáñamo", caseIntro: "Una experiencia interactiva para consultar las regulaciones sobre bebidas de cannabis y cáñamo en Estados Unidos.", sections: [
    { title: "El proyecto", paragraphs: ["Las regulaciones para bebidas de cáñamo varían entre los estados de Estados Unidos. Por eso, las diferencias geográficas son importantes para presentar la información.", "Trabajé en la experiencia interactiva de regulaciones de Hemp Beverage News y convertí esa información estado por estado en una interfaz que se puede recorrer directamente en el sitio."] },
    { title: "La experiencia", paragraphs: ["El recurso ofrece una forma visual de recorrer las regulaciones de los distintos estados, en lugar de presentar toda la información en un único documento extenso.", "Las personas pueden explorar el país por región y consultar la información regulatoria de cada estado."] },
    { title: "El desafío", paragraphs: ["La información regulatoria ya es compleja y las diferencias geográficas suman otra dimensión. El desafío consistió en presentar los datos específicos de cada estado de una manera que facilite recorrerlos y comprenderlos."] },
  ], liveProjectLabel: "Explorar el mapa de regulaciones" },
  "native-dispensary-menus": { category: "Cannabis · Integración", description: "Integraciones WordPress a medida que reemplazan menús de dispensario basados en reverse proxy por interfaces de compra nativas, conectadas a APIs de comercio de cannabis.", caseTitle: "Menús nativos para dispensarios", caseIntro: "Reemplacé menús de dispensario basados en reverse proxy por experiencias de compra nativas en WordPress.", sections: [
    { title: "El problema", paragraphs: ["El comercio de los dispensarios suele depender de plataformas especializadas de terceros. En este caso, la experiencia de compra existente usaba una implementación con reverse proxy, que limitaba la integración natural de los datos de productos y menús con el sitio WordPress.", "Esa separación también dificultaba que el sitio WordPress trabajara directamente con los datos de productos y menús."] },
    { title: "La solución", paragraphs: ["Desarrollé una integración WordPress a medida que se conecta directamente a Dispense API y presenta la experiencia de compra como parte nativa del sitio.", "La integración pone los datos de productos de cannabis a disposición de componentes WordPress nativos. Así, cada implementación puede usar su propio diseño, navegación e identidad visual.", "Admite listados de productos, carruseles y diseños configurables sin que el sitio tenga que replicar la interfaz de terceros."] },
    { title: "Pensado para reutilizarse", paragraphs: ["No se desarrolló como una página aislada.", "La integración está diseñada para reutilizarse en distintos sitios de clientes y reemplazar menús basados en reverse proxy por experiencias de compra nativas en WordPress.", "Cada sitio puede conservar su propio diseño y compartir el enfoque de integración subyacente."] },
  ], related: "También desarrollé temas e integraciones WordPress con Dutchie Pro SDK y trabajé directamente con el equipo de ingeniería de Dutchie cuando fue necesario coordinar respuestas a consultas de implementación." },
  "the-fire-station": { category: "Cannabis · E-commerce", description: "Experiencia de dispensario en WordPress integrada con Dutchie Pro para el sitio de venta minorista de cannabis de The Fire Station, con múltiples locales.", linkText: "Visitar sitio" },
  "current-cannabis": { category: "Cannabis · Prismic", description: "Desarrollo para un sitio de cannabis basado en Prismic: páginas y secciones estáticas, además de una experiencia dinámica Featured In respaldada por un Cloudflare Worker a medida.", linkText: "Visitar sitio" },
  "cbd-pros-usa": { category: "Cannabis · E-commerce · Traspaso de plataforma", description: "Me hice cargo de una base de código existente de frontend y backend durante el traspaso entre agencias. En PufCreativ armé el entorno de producción necesario para operarla, incluida la infraestructura cloud, la base de datos, el CMS, el comercio, los pagos y las integraciones de marketing.", linkText: "Visitar sitio" },
  "cannabis-store-locators": { category: "Cannabis · Integración", description: "Buscadores de locales a medida en WordPress, diseñados para trabajar con datos externos de comercios, con implementaciones que usan Hoodie y Weedmaps Public API.", linkText: "Ver buscador de locales de ProGro", caseTitle: "Integraciones de buscadores de locales", caseIntro: "Desarrollé experiencias de búsqueda de locales nativas en WordPress a partir de datos externos de comercios de cannabis.", sections: [
    { title: "El problema", paragraphs: ["En la industria del cannabis, los datos de comercios y disponibilidad de productos suelen estar en plataformas especializadas de terceros, fuera de WordPress.", "Un buscador de locales necesita consumir esos datos externos y, a la vez, funcionar como parte nativa del sitio.", "El desafío no es solo mostrar locales en un mapa. La integración también debe evitar que el sitio dependa de la estructura de un único proveedor de datos."] },
    { title: "La solución", paragraphs: ["Desarrollé una integración WordPress a medida para buscar locales que usa Hoodie como fuente externa de datos.", "El buscador consume los datos de comercios de la plataforma externa y los presenta dentro de la experiencia WordPress del sitio, en lugar de llevar a las personas a una interfaz de terceros separada."] },
    { title: "Distintas fuentes de datos", paragraphs: ["Más adelante trabajé en una variante del buscador que usa Weedmaps Public API como fuente de datos de comercios.", "El objetivo para quienes usan el sitio era similar, pero cambiaban el proveedor externo y el modelo de datos.", "Hubo que adaptar la integración a otra API externa y mantener la experiencia WordPress del sitio."] },
    { title: "Por qué es importante", paragraphs: ["Al basar el buscador en datos externos en lugar de cargar los comercios manualmente, el sitio se integra mejor con los sistemas que ya usan las marcas y los comercios de cannabis.", "También es un ejemplo de un enfoque de integración que uso con frecuencia: mantener una experiencia nativa en el sitio y usar plataformas de terceros como proveedoras de datos y servicios."] },
  ], liveExampleDescription: "ProGro Cannabis integra este buscador de locales en la experiencia de su sitio.", liveExampleLabel: "Ver buscador de locales de ProGro" },
  "western-dental": { category: "Empresas · Salud", description: "Plataforma WordPress para varias regiones y 260+ locales, con turnos, información de financiación y seguros, y contenido en inglés y español.", linkText: "Visitar sitio" },
  "brident-dental": { category: "Empresas · Salud", description: "Plataforma WordPress para una red odontológica con varios locales en Texas, Colorado y Nuevo México, con búsqueda de locales, reserva de turnos y contenido bilingüe.", linkText: "Visitar sitio" },
  "midcap-financial": { category: "Empresas · Finanzas", description: "Plataforma corporativa WordPress para una compañía de financiación especializada, con contenido estructurado sobre préstamos, equipo, transacciones y filtros.", linkText: "Visitar sitio" },
  "cw-advisors": { category: "Empresas · Finanzas", description: "Desarrollo para el sitio en producción de una firma nacional de gestión patrimonial, con contenido detallado sobre servicios, experiencia en inversiones, equipo y oficinas.", linkText: "Visitar sitio" },
};

export const caseLabelsEs = { problem: "El problema", project: "El proyecto", experience: "La experiencia", challenge: "El desafío", approach: "La solución", reusable: "Pensado para reutilizarse", sources: "Distintas fuentes de datos", why: "Por qué es importante" } as const;

export const categoryLabelsEs: Record<string, string> = {
  "Cannabis · Data": "Cannabis · Datos",
  "Cannabis · Interactive experience": "Cannabis · Experiencia interactiva",
  "Enterprise · Healthcare": "Empresas · Salud",
  "Enterprise · Finance": "Empresas · Finanzas",
};

export const assertTranslationsExist = (): void => {
  const missing = projects.filter((project) => !projectEs[project.slug]);
  if (missing.length) throw new Error(`Missing Spanish project translations: ${missing.map((project) => project.slug).join(", ")}`);
};

assertTranslationsExist();
