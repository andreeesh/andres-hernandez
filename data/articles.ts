export type TechnicalArticleSection = {
  title: string;
  paragraphs: string[];
  code?: string;
};

export type LocalizedTechnicalArticle = {
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  dateLabel: string;
  sections: TechnicalArticleSection[];
  relatedCaseStudyLabel: string;
};

export type TechnicalArticle = {
  slug: string;
  publishedAt: string;
  en: LocalizedTechnicalArticle;
  es: LocalizedTechnicalArticle;
  relatedCaseStudy: {
    href: string;
    label: string;
  };
};

export const technicalArticles: TechnicalArticle[] = [
  {
    slug: "postgresql-advisory-locks-scheduled-jobs",
    publishedAt: "2026-10-16",
    relatedCaseStudy: {
      href: "/work/vienor-saas-platform",
      label: "Vienor — multi-tenant weather SaaS",
    },
    en: {
      title: "PostgreSQL Advisory Locks for Scheduled Jobs",
      description:
        "How to prevent duplicate scheduled work across multiple application instances with PostgreSQL advisory locks, non-blocking acquisition, freshness checks and idempotent job design.",
      eyebrow: "Backend · PostgreSQL · Reliability",
      intro:
        "A cron expression tells a job when to run. It does not guarantee that only one application instance will run it. PostgreSQL advisory locks are a small, useful coordination primitive when scheduled work already depends on PostgreSQL and duplicate execution would be expensive or unsafe.",
      dateLabel: "October 16, 2026",
      sections: [
        {
          title: "The problem: cron is not a distributed lock",
          paragraphs: [
            "A scheduled job may look safe in local development because only one process exists. In production, the same application can run on multiple instances, replicas or workers. If every instance receives the same schedule, they can all start the same job at nearly the same time.",
            "For a weather-data pipeline, that can mean duplicate upstream API calls, duplicate database writes, repeated alert evaluation and unnecessary pressure on rate-limited providers. The schedule is correct, but the execution is not coordinated.",
          ],
        },
        {
          title: "Use PostgreSQL as the coordination point",
          paragraphs: [
            "PostgreSQL advisory locks let an application associate an integer key with a logical piece of work. Unlike a row lock, the key does not need to correspond to a table row. That makes advisory locks useful for jobs such as refresh-forecasts, generate-daily-summaries or reconcile-subscriptions.",
            "For scheduled work I prefer non-blocking acquisition. One instance obtains the lock and runs the job; the others see that the lock is already held and exit instead of waiting. A delayed duplicate execution is usually not useful for cron-style work.",
          ],
          code: `SELECT pg_try_advisory_lock($1) AS acquired;`,
        },
        {
          title: "The lock must stay on the same database connection",
          paragraphs: [
            "Session-level advisory locks belong to the PostgreSQL connection that acquired them. This is easy to get wrong when the application uses a connection pool: acquiring a lock with one pooled query and releasing it with another does not guarantee that both queries use the same backend connection.",
            "Keep acquisition, the protected work and release tied to the same database client or transactional connection. Release in a finally block so an application-level failure does not leave the lock held for the rest of that session.",
          ],
          code: `const acquired = await db.$queryRaw<boolean[]>\`
  SELECT pg_try_advisory_lock(\${jobLockId}) AS acquired
\`;

if (!acquired[0]?.acquired) return;

try {
  await refreshForecasts();
} finally {
  await db.$queryRaw\`
    SELECT pg_advisory_unlock(\${jobLockId})
  \`;
}`,
        },
        {
          title: "Choose lock keys around the work you actually want to serialize",
          paragraphs: [
            "A single global key is simple, but it can serialize unrelated work. The right key depends on the job. A global forecast-refresh job may need one key for the entire process, while tenant-scoped or field-scoped work can derive a stable key from the job type plus the tenant or resource identifier.",
            "The important property is determinism: every competing instance must calculate the same key for the same logical job, and different jobs should not collide accidentally.",
          ],
        },
        {
          title: "Advisory locks are not the whole reliability strategy",
          paragraphs: [
            "A lock prevents concurrent execution while it is held. It does not make the job idempotent, decide whether the data is already fresh, recover an upstream provider or prevent repeated writes after a retry.",
            "In Vienor I combine coordination with freshness policies, deduplication, retries and circuit breakers. Fresh forecast data can be reused instead of fetched again, unchanged snapshots do not need to be rewritten, and rate-limit responses can temporarily open a circuit instead of causing every scheduled run to keep calling an already constrained provider.",
          ],
        },
        {
          title: "Transaction-level locks are another option",
          paragraphs: [
            "PostgreSQL also provides transaction-level advisory locks such as pg_try_advisory_xact_lock. They are automatically released when the transaction ends, which removes the need for an explicit unlock.",
            "That can be useful when the protected operation naturally fits inside a short transaction. It is less attractive when a job performs long-running network calls, because holding a database transaction open around external work can create a different set of operational problems.",
          ],
          code: `SELECT pg_try_advisory_xact_lock($1) AS acquired;`,
        },
        {
          title: "When this pattern is a good fit",
          paragraphs: [
            "Advisory locks work well when PostgreSQL is already a required dependency, only a small amount of distributed coordination is needed and skipping a duplicate invocation is acceptable. They avoid introducing a separate queue or lock service just to solve one narrow scheduling problem.",
            "They are not a replacement for a job queue when work needs durable delivery, retries per item, priorities, backpressure or horizontal worker orchestration. The goal is not to turn PostgreSQL into a queue; it is to use an existing system primitive for a problem it solves cleanly.",
          ],
        },
        {
          title: "The production rule",
          paragraphs: [
            "Treat a scheduled job as a distributed-systems boundary as soon as more than one process can execute it. Make ownership explicit, acquire coordination non-blockingly, keep connection semantics correct, and design the work so retries and duplicates are safe even when the lock is not the only failure boundary.",
            "That combination is more important than the cron syntax itself. The schedule starts the work; the reliability controls determine whether the system behaves correctly in production.",
          ],
        },
      ],
      relatedCaseStudyLabel: "See how this fits into the Vienor production architecture",
    },
    es: {
      title: "Advisory Locks de PostgreSQL para Jobs Programados",
      description:
        "Cómo evitar trabajo programado duplicado entre múltiples instancias usando advisory locks de PostgreSQL, adquisición no bloqueante, controles de vigencia e idempotencia.",
      eyebrow: "Backend · PostgreSQL · Confiabilidad",
      intro:
        "Una expresión cron indica cuándo ejecutar un job. No garantiza que una sola instancia de la aplicación vaya a ejecutarlo. Los advisory locks de PostgreSQL son una herramienta pequeña y útil para coordinar trabajo programado cuando el sistema ya depende de PostgreSQL y una ejecución duplicada sería costosa o insegura.",
      dateLabel: "16 de octubre de 2026",
      sections: [
        {
          title: "El problema: cron no es un lock distribuido",
          paragraphs: [
            "Un job programado puede parecer seguro en desarrollo porque existe un solo proceso. En producción, la misma aplicación puede correr en varias instancias, réplicas o workers. Si todas reciben el mismo cron, pueden iniciar el mismo trabajo prácticamente al mismo tiempo.",
            "En un pipeline meteorológico eso puede generar requests duplicados a proveedores externos, escrituras repetidas en la base, evaluaciones de alertas duplicadas y presión innecesaria sobre APIs con límites de uso. El horario es correcto, pero la ejecución no está coordinada.",
          ],
        },
        {
          title: "Usar PostgreSQL como punto de coordinación",
          paragraphs: [
            "Los advisory locks de PostgreSQL permiten asociar una clave entera a una unidad lógica de trabajo. A diferencia de un lock sobre una fila, esa clave no tiene que corresponder a un registro de una tabla. Por eso sirven bien para jobs como refrescar pronósticos, generar resúmenes diarios o reconciliar suscripciones.",
            "Para trabajo programado prefiero la adquisición no bloqueante. Una instancia obtiene el lock y ejecuta; las demás detectan que ya está ocupado y terminan en lugar de esperar. En un cron, ejecutar la misma tarea más tarde por haber quedado esperando normalmente no aporta valor.",
          ],
          code: `SELECT pg_try_advisory_lock($1) AS acquired;`,
        },
        {
          title: "El lock debe mantenerse en la misma conexión",
          paragraphs: [
            "Los advisory locks de sesión pertenecen a la conexión PostgreSQL que los adquirió. Es un detalle fácil de romper cuando la aplicación usa un pool: adquirir el lock con una consulta y liberarlo con otra no garantiza que ambas usen la misma conexión del backend.",
            "La adquisición, el trabajo protegido y la liberación tienen que quedar ligados al mismo cliente o conexión transaccional. La liberación debe ocurrir en un bloque finally para que una falla de la aplicación no deje el lock retenido durante el resto de esa sesión.",
          ],
          code: `const acquired = await db.$queryRaw<boolean[]>\`
  SELECT pg_try_advisory_lock(\${jobLockId}) AS acquired
\`;

if (!acquired[0]?.acquired) return;

try {
  await refreshForecasts();
} finally {
  await db.$queryRaw\`
    SELECT pg_advisory_unlock(\${jobLockId})
  \`;
}`,
        },
        {
          title: "Elegir la clave según el trabajo que realmente queremos serializar",
          paragraphs: [
            "Una única clave global es simple, pero puede serializar trabajos que no tienen relación entre sí. La granularidad depende del job. Un refresco global de pronósticos puede usar una sola clave, mientras que un proceso por empresa o por campo puede derivarla de forma estable a partir del tipo de job y el identificador del tenant o recurso.",
            "Lo importante es que sea determinística: todas las instancias que compiten por el mismo trabajo tienen que calcular la misma clave, y jobs distintos no deberían colisionar accidentalmente.",
          ],
        },
        {
          title: "El advisory lock no resuelve toda la confiabilidad",
          paragraphs: [
            "El lock evita ejecuciones concurrentes mientras está retenido. No vuelve idempotente al job, no decide si los datos todavía están vigentes, no recupera un proveedor externo ni evita escrituras repetidas después de un reintento.",
            "En Vienor combino la coordinación con políticas de vigencia, deduplicación, reintentos y circuit breakers. Los pronósticos recientes pueden reutilizarse, los snapshots sin cambios no necesitan reescribirse y una respuesta de rate limit puede abrir temporalmente un circuito en lugar de hacer que cada ejecución siga llamando a un proveedor que ya está limitado.",
          ],
        },
        {
          title: "Los locks por transacción son otra alternativa",
          paragraphs: [
            "PostgreSQL también ofrece advisory locks ligados a la transacción, como pg_try_advisory_xact_lock. Se liberan automáticamente cuando termina la transacción y eliminan la necesidad de hacer un unlock explícito.",
            "Son útiles cuando la operación protegida entra naturalmente dentro de una transacción corta. Son menos atractivos si el job realiza requests de red largos, porque mantener una transacción abierta mientras se espera a servicios externos puede generar otros problemas operativos.",
          ],
          code: `SELECT pg_try_advisory_xact_lock($1) AS acquired;`,
        },
        {
          title: "Cuándo conviene este patrón",
          paragraphs: [
            "Los advisory locks funcionan bien cuando PostgreSQL ya es una dependencia obligatoria, se necesita poca coordinación distribuida y es aceptable saltear una invocación duplicada. Evitan sumar una cola o un servicio de locks únicamente para resolver un problema acotado de scheduling.",
            "No reemplazan una cola de jobs cuando se necesita entrega durable, reintentos por elemento, prioridades, backpressure u orquestación horizontal de workers. La idea no es convertir PostgreSQL en una cola, sino aprovechar una primitiva existente para un problema que resuelve de manera limpia.",
          ],
        },
        {
          title: "La regla para producción",
          paragraphs: [
            "Un job programado pasa a ser un límite de sistemas distribuidos desde el momento en que más de un proceso puede ejecutarlo. Hay que hacer explícita la propiedad del trabajo, coordinar sin bloquear, respetar la semántica de las conexiones y diseñar el proceso para que reintentos y duplicados sean seguros incluso cuando el lock no sea la única frontera de falla.",
            "Esa combinación importa más que la sintaxis del cron. El schedule inicia el trabajo; los controles de confiabilidad determinan si el sistema se comporta correctamente en producción.",
          ],
        },
      ],
      relatedCaseStudyLabel: "Ver cómo encaja este patrón en la arquitectura de producción de Vienor",
    },
  },
];

export const getTechnicalArticle = (slug: string): TechnicalArticle | undefined =>
  technicalArticles.find((article) => article.slug === slug);
