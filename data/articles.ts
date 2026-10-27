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
  {
    slug: "multi-tenant-rbac-saas",
    publishedAt: "2026-10-08",
    relatedCaseStudy: {
      href: "/work/vienor-saas-platform",
      label: "Vienor — multi-tenant weather SaaS",
    },
    en: {
      title: "Designing Multi-Tenant RBAC for a SaaS",
      description:
        "How to model users, memberships, roles, active tenant context and authorization boundaries in a multi-company SaaS without leaking data across tenants.",
      eyebrow: "Backend · SaaS · Authorization",
      intro:
        "Multi-tenant authorization becomes much easier to reason about when identity, company membership, role and active tenant are treated as separate concepts. The mistake is usually not in the role names; it is in collapsing too many authorization decisions into the user record itself.",
      dateLabel: "October 8, 2026",
      sections: [
        {
          title: "Start by separating identity from membership",
          paragraphs: [
            "A user answers who someone is. A tenant membership answers which company that person belongs to and what they can do there. Keeping those concepts separate makes multi-company access possible without duplicating users or overloading a single user.role field.",
            "In practice, that means a user can have one identity and many memberships. Each membership belongs to one tenant and carries the role and company-specific preferences that apply only in that context.",
          ],
          code: `User
  id
  email

TenantMembership
  userId
  tenantId
  role
  notificationsEnabled

UNIQUE(userId, tenantId)`,
        },
        {
          title: "Roles belong to the tenant context",
          paragraphs: [
            "A role such as OWNER, ADMIN, AGRONOMIST, OPERATOR or VIEWER is meaningful only inside a company. The same person may be an owner in one tenant and a viewer in another.",
            "That is why tenant-scoped roles should live on the membership, not on the user. A global role can still exist for platform-level concerns such as SUPERADMIN, but it should not be used as a shortcut for ordinary tenant authorization.",
          ],
        },
        {
          title: "Resolve the active tenant explicitly",
          paragraphs: [
            "Every tenant-scoped request needs an active tenant. The backend should resolve it from a trusted session context and then verify that the user still has a valid membership for that tenant.",
            "A useful fallback order is: requested tenant if the membership is valid, then the user's default company if still valid, then another valid membership. If no valid membership exists, the session should enter a no-tenant or onboarding state instead of silently reusing stale tenant data.",
          ],
          code: `requested tenant
  ↓ valid membership?
default tenant
  ↓ valid membership?
first valid membership
  ↓
NO_TENANT / onboarding`,
        },
        {
          title: "Put tenant context in the session, not in every client request",
          paragraphs: [
            "Once the active tenant is resolved, the server can issue a session or token carrying tenantId and the tenant-specific memberRole alongside any global platform role.",
            "The client may request a tenant switch, but it should not be trusted to declare arbitrary tenant ownership on every API call. Authorization still comes from the server-side membership lookup and the session derived from it.",
          ],
        },
        {
          title: "Use capabilities instead of scattering role checks",
          paragraphs: [
            "Direct checks such as if role === ADMIN quickly spread through controllers and become difficult to reason about. A capability matrix gives the application one place to define what each tenant role may do.",
            "Controllers can then protect operations such as fields.write, team.invite, billing.manage or analytics.view without duplicating role semantics. This also makes exceptions explicit: for example, an ADMIN may manage fields and users but not billing, while an OWNER can manage both.",
          ],
          code: `OWNER  -> fields.*, team.*, billing.manage
ADMIN  -> fields.*, team.*, billing.view
AGRONOMIST -> fields.read, alerts.*, analytics.*
OPERATOR -> fields.read, notes.write
VIEWER -> *.read`,
        },
        {
          title: "Enforce both membership and capability",
          paragraphs: [
            "Authorization needs two checks: does the user belong to this tenant, and does the role for that membership allow the requested action? A capability check without tenant validation can authorize the right action in the wrong company.",
            "I prefer centralized guards for tenant membership and member role or capability evaluation. That keeps controllers focused on application behavior while the authorization boundary stays consistent across fields, alerts, analytics, notifications, team management and billing.",
          ],
        },
        {
          title: "Tenant switching is also a frontend state problem",
          paragraphs: [
            "Changing the active company is not complete when the backend returns a new tenantId. The client may still contain cached queries, selected filters, open forms or in-flight requests from the previous company.",
            "When the tenant changes, tenant-scoped requests should be cancelled, caches invalidated or keyed by tenantId, and tenant-specific UI state reset. Otherwise a correct backend can still be paired with a frontend that briefly renders stale data from another tenant.",
          ],
          code: `queryKey: ["fields", tenantId]
queryKey: ["alerts", tenantId]
queryKey: ["analytics", tenantId]`,
        },
        {
          title: "Invitations must create membership, not alternate identity",
          paragraphs: [
            "Inviting someone to a company should converge on the same membership model whether the email already belongs to an existing user or to someone who still needs to register.",
            "For an existing verified user, accepting the invitation can create the membership directly. For a new user, registration and email verification happen first, then the invitation creates the tenant membership. The invitation is temporary; the membership is the durable authorization record.",
          ],
        },
        {
          title: "Removal and role changes must take effect immediately",
          paragraphs: [
            "Membership is dynamic. A user can be removed from a company or have a role downgraded while still holding an old session or an open browser tab.",
            "Sensitive requests should therefore validate the current membership rather than trusting a long-lived client view of the role. The frontend should also refresh company and user context after team mutations so navigation and permissions do not remain stale.",
          ],
        },
        {
          title: "No-tenant onboarding is a valid application state",
          paragraphs: [
            "A SaaS often needs to support a logged-in user who does not yet belong to a company. Treating this as an authentication failure makes onboarding awkward and encourages special cases.",
            "A better design keeps the user authenticated but marks the session as having no active tenant. Only onboarding and company-creation routes are available until a tenant exists, after which the new membership becomes the active context.",
          ],
        },
        {
          title: "The boundary to protect",
          paragraphs: [
            "The most important rule in multi-tenant RBAC is that every tenant-scoped read and write must derive its tenant from trusted authorization context. Filtering by tenantId is not merely a query concern; it is part of the security boundary.",
            "A good model makes the correct path easier than the dangerous one: membership is explicit, roles are contextual, capabilities are centralized, sessions carry resolved tenant context and client caches are tenant-aware. The result is easier to extend and much harder to misuse accidentally.",
          ],
        },
      ],
      relatedCaseStudyLabel: "See the multi-company authorization model in the Vienor case study",
    },
    es: {
      title: "Diseño de RBAC Multiempresa para un SaaS",
      description:
        "Cómo modelar usuarios, membresías, roles, tenant activo y límites de autorización en un SaaS multiempresa sin filtrar datos entre empresas.",
      eyebrow: "Backend · SaaS · Autorización",
      intro:
        "La autorización multiempresa se vuelve mucho más clara cuando identidad, membresía, rol y tenant activo se tratan como conceptos separados. El problema normalmente no está en los nombres de los roles, sino en concentrar demasiadas decisiones de autorización dentro del registro de usuario.",
      dateLabel: "8 de octubre de 2026",
      sections: [
        {
          title: "Separar identidad de membresía",
          paragraphs: [
            "Un usuario responde quién es una persona. Una membresía responde a qué empresa pertenece y qué puede hacer allí. Mantener esos conceptos separados permite que una misma identidad participe en varias empresas sin duplicar usuarios ni sobrecargar un único user.role.",
            "En la práctica, un usuario puede tener una identidad y varias membresías. Cada membresía pertenece a un tenant y contiene el rol y las preferencias específicas de esa empresa.",
          ],
          code: `User
  id
  email

TenantMembership
  userId
  tenantId
  role
  notificationsEnabled

UNIQUE(userId, tenantId)`,
        },
        {
          title: "Los roles pertenecen al contexto de la empresa",
          paragraphs: [
            "Un rol como OWNER, ADMIN, AGRONOMO, OPERADOR o VIEWER sólo tiene sentido dentro de una empresa. La misma persona puede ser propietaria en un tenant y visualizadora en otro.",
            "Por eso los roles de empresa deben vivir en la membresía y no en el usuario. Puede existir un rol global para funciones de plataforma como SUPERADMIN, pero no debería usarse como atajo para la autorización normal de cada tenant.",
          ],
        },
        {
          title: "Resolver el tenant activo de forma explícita",
          paragraphs: [
            "Cada request asociado a una empresa necesita un tenant activo. El backend debe resolverlo desde un contexto de sesión confiable y verificar que el usuario todavía tenga una membresía válida para ese tenant.",
            "Un orden de fallback útil es: tenant solicitado si la membresía es válida, luego la empresa por defecto si sigue siendo válida y finalmente otra membresía vigente. Si no existe ninguna, la sesión debe quedar en estado sin tenant u onboarding en lugar de reutilizar silenciosamente contexto viejo.",
          ],
          code: `tenant solicitado
  ↓ ¿membresía válida?
tenant por defecto
  ↓ ¿membresía válida?
primera membresía válida
  ↓
NO_TENANT / onboarding`,
        },
        {
          title: "Guardar el contexto de tenant en la sesión",
          paragraphs: [
            "Una vez resuelto el tenant activo, el servidor puede emitir una sesión o token con tenantId y memberRole junto con cualquier rol global de plataforma.",
            "El cliente puede pedir un cambio de empresa, pero no debería ser confiable para declarar libremente el tenant en cada llamada. La autorización sigue derivando de la membresía validada por el backend y de la sesión generada a partir de ella.",
          ],
        },
        {
          title: "Usar capacidades en lugar de repartir checks de roles",
          paragraphs: [
            "Condiciones directas como if role === ADMIN se multiplican rápido por los controladores y vuelven difícil entender la política completa. Una matriz de capacidades permite definir en un único lugar qué puede hacer cada rol.",
            "Los controladores pueden proteger operaciones como fields.write, team.invite, billing.manage o analytics.view sin duplicar la semántica de roles. También permite expresar excepciones: por ejemplo, un ADMIN puede gestionar campos y equipo pero no facturación, mientras que un OWNER puede hacer ambas cosas.",
          ],
          code: `OWNER  -> fields.*, team.*, billing.manage
ADMIN  -> fields.*, team.*, billing.view
AGRONOMO -> fields.read, alerts.*, analytics.*
OPERADOR -> fields.read, notes.write
VIEWER -> *.read`,
        },
        {
          title: "Validar membresía y capacidad",
          paragraphs: [
            "La autorización necesita dos comprobaciones: si el usuario pertenece al tenant y si el rol de esa membresía permite la acción solicitada. Validar sólo la capacidad puede autorizar la acción correcta dentro de la empresa equivocada.",
            "Prefiero guardias centralizados para membresía y evaluación de rol o capacidades. Así los controladores se concentran en el comportamiento de la aplicación mientras el límite de autorización permanece consistente en campos, alertas, analítica, notificaciones, equipo y facturación.",
          ],
        },
        {
          title: "Cambiar de empresa también es un problema de estado del frontend",
          paragraphs: [
            "El cambio de tenant no termina cuando el backend devuelve un nuevo tenantId. El cliente todavía puede tener queries cacheadas, filtros seleccionados, formularios abiertos o requests en vuelo de la empresa anterior.",
            "Al cambiar de empresa hay que cancelar requests tenant-scoped, invalidar caches o incluir tenantId en sus keys y resetear el estado específico de empresa. De lo contrario, un backend correcto puede convivir con un frontend que durante un momento muestre datos viejos de otro tenant.",
          ],
          code: `queryKey: ["fields", tenantId]
queryKey: ["alerts", tenantId]
queryKey: ["analytics", tenantId]`,
        },
        {
          title: "Las invitaciones deben crear membresía, no otra identidad",
          paragraphs: [
            "Invitar a alguien a una empresa debería converger al mismo modelo de membresía tanto si el email ya pertenece a un usuario como si esa persona todavía necesita registrarse.",
            "Para un usuario existente y verificado, aceptar la invitación puede crear directamente la membresía. Para uno nuevo, primero ocurren registro y verificación, y luego la invitación crea la membresía. La invitación es temporal; la membresía es el registro durable de autorización.",
          ],
        },
        {
          title: "Los cambios de rol y bajas deben aplicarse inmediatamente",
          paragraphs: [
            "La membresía es dinámica. Un usuario puede ser eliminado de una empresa o perder permisos mientras todavía conserva una sesión vieja o una pestaña abierta.",
            "Los requests sensibles deberían validar la membresía actual en lugar de confiar en una vista antigua del rol. El frontend también debe refrescar el contexto de empresas y usuario después de modificar el equipo para que navegación y permisos no queden desactualizados.",
          ],
        },
        {
          title: "El onboarding sin tenant es un estado válido",
          paragraphs: [
            "Un SaaS puede tener un usuario autenticado que todavía no pertenece a ninguna empresa. Tratarlo como un error de autenticación vuelve incómodo el onboarding y genera excepciones por todos lados.",
            "Un diseño más limpio mantiene al usuario autenticado pero sin tenant activo. Sólo se habilitan onboarding y creación de empresa hasta que exista un tenant; entonces la nueva membresía pasa a ser el contexto activo.",
          ],
        },
        {
          title: "El límite que hay que proteger",
          paragraphs: [
            "La regla más importante de un RBAC multiempresa es que toda lectura y escritura tenant-scoped derive su tenant de un contexto de autorización confiable. Filtrar por tenantId no es sólo un detalle de consulta; forma parte del límite de seguridad.",
            "Un buen modelo hace que el camino correcto sea más fácil que el peligroso: membresías explícitas, roles contextuales, capacidades centralizadas, sesiones con tenant resuelto y caches conscientes del tenant. El resultado es más simple de extender y mucho más difícil de usar mal por accidente.",
          ],
        },
      ],
      relatedCaseStudyLabel: "Ver el modelo de autorización multiempresa en el caso de estudio de Vienor",
    },
  },
  {
    slug: "reliable-third-party-api-pipelines",
    publishedAt: "2026-09-29",
    relatedCaseStudy: {
      href: "/work/vienor-saas-platform",
      label: "Vienor — multi-tenant weather SaaS",
    },
    en: {
      title: "Building Reliable Pipelines Around Third-Party APIs",
      description:
        "How to design resilient third-party API pipelines with timeouts, retries, freshness policies, circuit breakers, deduplication, fallbacks and idempotent persistence.",
      eyebrow: "Backend · APIs · Reliability",
      intro:
        "Third-party APIs are part of your system whether you control them or not. They can slow down, rate-limit, return stale data or fail completely. A reliable integration is not just an HTTP request that succeeds most of the time; it is a boundary that absorbs external failure without letting it spread through the rest of the application.",
      dateLabel: "September 29, 2026",
      sections: [
        {
          title: "Treat the provider as an unreliable dependency",
          paragraphs: [
            "The first useful assumption is that every external API will eventually fail in a way your happy-path code did not expect. That does not mean the provider is bad. Networks fail, quotas are exhausted, maintenance happens and response times change.",
            "The integration boundary should therefore define what happens when the provider is slow, unavailable, partially wrong or temporarily rate-limited. Reliability starts when those cases are explicit instead of being handled as generic exceptions.",
          ],
        },
        {
          title: "Separate provider adapters from application behavior",
          paragraphs: [
            "Application code should not need to know the response shape, authentication quirks or error vocabulary of every upstream service. I prefer a provider adapter that translates each external API into an internal contract.",
            "That makes it possible to change providers, combine multiple sources or disable one temporarily without rewriting the rest of the application. Forecast evaluation, alerts and persistence can consume one normalized model while provider-specific behavior stays at the boundary.",
          ],
          code: `interface WeatherProvider {
  getForecast(input: ForecastRequest): Promise<NormalizedForecast>;
}`,
        },
        {
          title: "Use timeouts before retries",
          paragraphs: [
            "A request that never fails but takes too long can be more damaging than a fast error. Every external call should have a bounded amount of time in which it is allowed to consume a worker or scheduled-job slot.",
            "Retries only make sense after the first attempt has a clear timeout. Otherwise multiple slow calls can overlap and amplify the original problem.",
          ],
          code: `const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 8_000);

try {
  return await fetch(url, { signal: controller.signal });
} finally {
  clearTimeout(timeout);
}`,
        },
        {
          title: "Retry only failures that can improve with time",
          paragraphs: [
            "Not every error deserves a retry. A temporary network failure or a 5xx response may succeed on a later attempt. Invalid credentials, malformed input or a hard quota limit usually will not.",
            "Retries should be bounded and delayed, preferably with exponential backoff and jitter so multiple instances do not retry at exactly the same time. The goal is recovery, not persistence at any cost.",
          ],
          code: `delay = min(base * 2 ** attempt + jitter, maxDelay)`,
        },
        {
          title: "Circuit breakers stop repeated failure",
          paragraphs: [
            "When a provider is already failing or rate-limiting, repeatedly calling it on every scheduled run creates more load and wastes capacity. A circuit breaker records that recent failures have crossed a threshold and temporarily stops new attempts.",
            "The open period should reflect the failure. A short cooldown can be enough for transient 429 responses, while an explicit daily quota error may justify staying open much longer. After the cooldown, a limited probe can decide whether normal traffic should resume.",
          ],
          code: `CLOSED -> failures exceed threshold -> OPEN
OPEN -> cooldown expires -> HALF_OPEN
HALF_OPEN -> success -> CLOSED
HALF_OPEN -> failure -> OPEN`,
        },
        {
          title: "Freshness can be more valuable than a new request",
          paragraphs: [
            "A reliable pipeline should know how old its existing data is before calling an upstream service again. If a forecast is still fresh enough for the product behavior, reusing it may be better than making another external request.",
            "Freshness is a business decision, not only a cache TTL. Different consumers may tolerate different ages: an interactive forecast, an alert evaluation and a daily summary can each have their own acceptable window.",
          ],
        },
        {
          title: "Reuse one provider response across multiple consumers",
          paragraphs: [
            "Duplicate upstream calls often appear because different parts of the application independently ask for the same data. A scheduled forecast refresh may fetch data, then an alert process or comparison job fetches the same provider again minutes later.",
            "Where possible, fetch once, normalize once and persist or share the result so forecasts, comparisons, alerts and summaries can reuse it. This reduces quota usage and also makes those features reason about the same snapshot.",
          ],
        },
        {
          title: "Make persistence idempotent",
          paragraphs: [
            "Retries and duplicate invocations are unavoidable at some layer, so writing the same result twice should be safe. Idempotency can be enforced with unique keys, upserts, deduplication tokens or by comparing the new normalized snapshot with the current one before writing.",
            "In data pipelines I prefer not to create a new event or snapshot when nothing meaningful changed. That reduces database growth and makes downstream activity easier to interpret.",
          ],
          code: `if (sameMeaningfulData(previous, incoming)) {
  return previous;
}

return persist(incoming);`,
        },
        {
          title: "Fallbacks need explicit semantics",
          paragraphs: [
            "Multiple providers can improve availability, but only if the system knows what a fallback means. Provider B may have a different resolution, update cadence or field set from Provider A.",
            "Normalize what can be normalized, preserve source metadata and avoid pretending that all providers are interchangeable. The application should know whether it is serving primary data, fallback data or the last known good value.",
          ],
        },
        {
          title: "Scheduled pipelines need coordination too",
          paragraphs: [
            "Retries, circuit breakers and freshness checks do not prevent two application instances from starting the same scheduled job simultaneously. That is a separate coordination problem.",
            "For Vienor I use PostgreSQL advisory locks to make scheduled work non-blockingly single-owner across instances. The lock protects concurrent execution, while the pipeline-level controls handle external failures and duplicate effects.",
          ],
        },
        {
          title: "Observe the boundary, not just the final error",
          paragraphs: [
            "A single error count does not explain why an integration is unhealthy. Useful signals include request latency, timeout rate, response status, retry count, circuit state, provider freshness, skipped duplicate work and how often fallback data is used.",
            "Those signals make it possible to distinguish an application regression from an upstream incident and to tune retry or freshness policies based on real production behavior instead of guesses.",
          ],
        },
        {
          title: "The design principle",
          paragraphs: [
            "An external API should be treated as a source of uncertain data and uncertain availability, not as a local function call. The integration layer owns that uncertainty.",
            "Bound the calls, retry selectively, stop calling when failure is already known, reuse fresh results, make writes idempotent and keep provider-specific details out of the rest of the system. That turns an API integration from a fragile dependency into a controlled boundary.",
          ],
        },
      ],
      relatedCaseStudyLabel: "See how these reliability controls are used in the Vienor weather pipeline",
    },
    es: {
      title: "Cómo Construir Pipelines Confiables sobre APIs de Terceros",
      description:
        "Cómo diseñar pipelines resilientes sobre APIs externas con timeouts, reintentos, políticas de vigencia, circuit breakers, deduplicación, fallbacks y persistencia idempotente.",
      eyebrow: "Backend · APIs · Confiabilidad",
      intro:
        "Las APIs de terceros forman parte de tu sistema aunque no las controles. Pueden volverse lentas, aplicar rate limits, entregar datos viejos o dejar de responder. Una integración confiable no es solamente un request HTTP que casi siempre funciona: es un límite que absorbe fallas externas sin propagarlas al resto de la aplicación.",
      dateLabel: "29 de septiembre de 2026",
      sections: [
        {
          title: "Tratar al proveedor como una dependencia no confiable",
          paragraphs: [
            "La primera suposición útil es que toda API externa eventualmente va a fallar de una forma que el happy path no contemplaba. Eso no significa que el proveedor sea malo. Fallan las redes, se agotan cuotas, hay mantenimiento y cambian los tiempos de respuesta.",
            "El límite de integración debería definir qué ocurre cuando el proveedor está lento, no disponible, devuelve datos parcialmente incorrectos o aplica un rate limit temporal. La confiabilidad empieza cuando esos casos son explícitos y no simples excepciones genéricas.",
          ],
        },
        {
          title: "Separar adaptadores de proveedor del comportamiento de la aplicación",
          paragraphs: [
            "El código de negocio no debería conocer el formato de respuesta, las particularidades de autenticación o el vocabulario de errores de cada servicio externo. Prefiero un adaptador por proveedor que traduzca cada API a un contrato interno.",
            "Eso permite cambiar proveedores, combinar varias fuentes o desactivar una temporalmente sin reescribir el resto de la aplicación. La evaluación de pronósticos, alertas y persistencia puede trabajar con un modelo normalizado mientras lo específico de cada proveedor queda en el borde.",
          ],
          code: `interface WeatherProvider {
  getForecast(input: ForecastRequest): Promise<NormalizedForecast>;
}`,
        },
        {
          title: "Usar timeouts antes de pensar en reintentos",
          paragraphs: [
            "Un request que no falla pero tarda demasiado puede ser más dañino que un error rápido. Toda llamada externa debería tener un tiempo máximo durante el cual puede ocupar un worker o un slot de un job programado.",
            "Los reintentos sólo tienen sentido cuando el primer intento tiene un timeout claro. De lo contrario, varias llamadas lentas pueden superponerse y amplificar el problema original.",
          ],
          code: `const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 8_000);

try {
  return await fetch(url, { signal: controller.signal });
} finally {
  clearTimeout(timeout);
}`,
        },
        {
          title: "Reintentar sólo fallas que pueden mejorar con el tiempo",
          paragraphs: [
            "No todos los errores merecen un retry. Una falla temporal de red o una respuesta 5xx puede funcionar en un intento posterior. Credenciales inválidas, input incorrecto o una cuota agotada normalmente no.",
            "Los reintentos deben ser limitados y espaciados, preferentemente con exponential backoff y jitter para evitar que varias instancias vuelvan a intentar exactamente al mismo tiempo. El objetivo es recuperarse, no insistir a cualquier costo.",
          ],
          code: `delay = min(base * 2 ** attempt + jitter, maxDelay)`,
        },
        {
          title: "Los circuit breakers detienen fallas repetidas",
          paragraphs: [
            "Cuando un proveedor ya está fallando o limitando tráfico, llamarlo nuevamente en cada ejecución programada genera más carga y desperdicia capacidad. Un circuit breaker registra que las fallas recientes superaron un umbral y detiene temporalmente nuevos intentos.",
            "El tiempo de apertura debería reflejar el tipo de falla. Un cooldown corto puede alcanzar para respuestas 429 transitorias, mientras que un error explícito de cuota diaria puede justificar mantener el circuito abierto mucho más tiempo. Después del cooldown, una prueba limitada puede decidir si vuelve el tráfico normal.",
          ],
          code: `CLOSED -> demasiadas fallas -> OPEN
OPEN -> termina cooldown -> HALF_OPEN
HALF_OPEN -> éxito -> CLOSED
HALF_OPEN -> falla -> OPEN`,
        },
        {
          title: "La vigencia puede valer más que un request nuevo",
          paragraphs: [
            "Un pipeline confiable debería saber qué tan viejos son sus datos actuales antes de volver a consultar un proveedor. Si un pronóstico todavía es suficientemente reciente para el comportamiento del producto, reutilizarlo puede ser mejor que hacer otro request externo.",
            "La vigencia es una decisión de producto, no solamente un TTL de cache. Distintos consumidores pueden tolerar edades diferentes: un pronóstico interactivo, la evaluación de alertas y un resumen diario pueden tener ventanas distintas.",
          ],
        },
        {
          title: "Reutilizar una respuesta entre varios consumidores",
          paragraphs: [
            "Los requests duplicados suelen aparecer porque distintas partes de la aplicación piden de forma independiente los mismos datos. Un refresh programado puede consultar un proveedor y minutos después un proceso de alertas o comparación vuelve a pedir exactamente lo mismo.",
            "Cuando sea posible, conviene consultar una vez, normalizar una vez y persistir o compartir el resultado para que pronósticos, comparaciones, alertas y resúmenes reutilicen el mismo snapshot. Eso reduce consumo de cuota y hace que esas funciones razonen sobre los mismos datos.",
          ],
        },
        {
          title: "Hacer idempotente la persistencia",
          paragraphs: [
            "Los reintentos y las invocaciones duplicadas son inevitables en alguna capa, por lo que escribir dos veces el mismo resultado debería ser seguro. La idempotencia puede lograrse con claves únicas, upserts, tokens de deduplicación o comparando el snapshot normalizado nuevo con el actual antes de escribir.",
            "En pipelines de datos prefiero no generar un nuevo evento o snapshot cuando nada relevante cambió. Eso reduce crecimiento de la base y hace más fácil interpretar la actividad posterior.",
          ],
          code: `if (sameMeaningfulData(previous, incoming)) {
  return previous;
}

return persist(incoming);`,
        },
        {
          title: "Los fallbacks necesitan semántica explícita",
          paragraphs: [
            "Tener varios proveedores puede mejorar la disponibilidad, pero sólo si el sistema sabe qué significa usar un fallback. El proveedor B puede tener otra resolución, frecuencia de actualización o conjunto de campos que el proveedor A.",
            "Hay que normalizar lo que realmente es comparable, conservar metadata de la fuente y evitar fingir que todos los proveedores son intercambiables. La aplicación debería saber si está sirviendo datos primarios, datos de fallback o el último valor válido conocido.",
          ],
        },
        {
          title: "Los pipelines programados también necesitan coordinación",
          paragraphs: [
            "Los reintentos, circuit breakers y controles de vigencia no impiden que dos instancias de la aplicación comiencen el mismo job programado al mismo tiempo. Ese es otro problema de coordinación.",
            "En Vienor uso advisory locks de PostgreSQL para que el trabajo programado tenga un único dueño entre instancias sin bloquear. El lock protege la ejecución concurrente, mientras que los controles del pipeline manejan fallas externas y efectos duplicados.",
          ],
        },
        {
          title: "Observar el límite, no sólo el error final",
          paragraphs: [
            "Un contador de errores no explica por qué una integración está degradada. Señales útiles son latencia, tasa de timeouts, status HTTP, cantidad de reintentos, estado del circuito, vigencia de datos, trabajo duplicado evitado y frecuencia de uso de fallbacks.",
            "Esas métricas permiten distinguir una regresión propia de un incidente del proveedor y ajustar políticas de retry o vigencia usando comportamiento real de producción en lugar de suposiciones.",
          ],
        },
        {
          title: "El principio de diseño",
          paragraphs: [
            "Una API externa debe tratarse como una fuente de datos y disponibilidad inciertos, no como una función local. La capa de integración es la responsable de absorber esa incertidumbre.",
            "Limitá la duración de las llamadas, reintentá selectivamente, dejá de llamar cuando la falla ya es conocida, reutilizá resultados vigentes, hacé idempotentes las escrituras y mantené los detalles de cada proveedor fuera del resto del sistema. Así una integración deja de ser una dependencia frágil y pasa a ser un límite controlado.",
          ],
        },
      ],
      relatedCaseStudyLabel: "Ver cómo se usan estos controles de confiabilidad en el pipeline meteorológico de Vienor",
    },
  },
  {
    slug: "taking-ownership-unfamiliar-production-codebase",
    publishedAt: "2026-09-21",
    relatedCaseStudy: {
      href: "/#cbd-pros-usa",
      label: "CBD Pros USA — production platform handoff",
    },
    en: {
      title: "Taking Ownership of an Unfamiliar Production Codebase",
      description:
        "A practical approach to taking over an existing production system: mapping architecture, restoring deployability, identifying risk, validating dependencies and earning confidence before making large changes.",
      eyebrow: "Engineering · Production · Legacy Systems",
      intro:
        "Taking over an existing production system is different from starting a new project. The first job is not to improve the architecture. It is to understand what already exists well enough to operate it safely, recover deployability and make changes without breaking assumptions you have not discovered yet.",
      dateLabel: "September 21, 2026",
      sections: [
        {
          title: "The first deliverable is a system map",
          paragraphs: [
            "Before changing code, I want to know what actually makes the product run: repositories, runtime services, databases, CMS, queues, payment providers, DNS, storage, scheduled jobs, third-party APIs and deployment paths.",
            "That map does not need to be perfect. It needs to be accurate enough to answer a basic question: if this component fails or changes, what else depends on it?",
          ],
          code: `browser
  -> frontend
  -> API
  -> database

API
  -> CMS
  -> commerce
  -> payments
  -> email / marketing

deploy
  -> hosting
  -> environment variables
  -> DNS`,
        },
        {
          title: "Make the system deployable before making it elegant",
          paragraphs: [
            "A codebase that cannot be reproduced or deployed safely is already carrying operational risk. I prioritize getting the current version running in a known environment before attempting structural improvements.",
            "That means identifying build commands, runtime versions, environment variables, external credentials, database connectivity and the actual production deployment path. The goal is to make the existing system observable and repeatable before changing its behavior.",
          ],
        },
        {
          title: "Separate facts from assumptions",
          paragraphs: [
            "Handoffs often include incomplete documentation and tribal knowledge. I treat every assumption as something to verify: which repository is authoritative, which environment is production, which service owns a database, whether a webhook is still active, or whether an integration is actually used.",
            "Reading code is only one source of truth. Deployment configuration, DNS, logs, provider dashboards, database schemas and network behavior often reveal relationships that are missing from documentation.",
          ],
        },
        {
          title: "Trace one real request end to end",
          paragraphs: [
            "A useful way to learn an unfamiliar system is to pick one important user flow and follow it through every layer. For an e-commerce platform that might be product page to cart to checkout to payment confirmation to order persistence and customer notification.",
            "This exposes boundaries quickly: where state lives, which service is authoritative, what runs synchronously, what depends on webhooks and where errors can leave the system partially updated.",
          ],
        },
        {
          title: "Find the irreversible operations",
          paragraphs: [
            "Not every part of a system has the same risk. Sending an email twice is annoying; charging a card twice is much worse. Deleting data, changing authentication, modifying production schemas and triggering external side effects deserve a higher level of caution.",
            "I identify those operations early and look for idempotency, unique constraints, audit records, rollback paths and environment separation before touching the code around them.",
          ],
        },
        {
          title: "Restore observability before debugging from intuition",
          paragraphs: [
            "If a system is difficult to understand, adding more guesses makes it worse. Logs, request IDs, provider response metadata and clear error boundaries reduce the amount of reasoning that has to happen from incomplete evidence.",
            "I want to know whether a failure comes from application code, infrastructure, a database, DNS or a third-party service. The faster those layers can be distinguished, the safer subsequent changes become.",
          ],
        },
        {
          title: "Change one boundary at a time",
          paragraphs: [
            "Large rewrites are especially dangerous during a handoff because the undocumented behavior is exactly what you do not know yet. I prefer small changes that isolate one boundary and produce evidence.",
            "For example: first reproduce the frontend, then establish API connectivity, then validate the database, then reconnect the CMS, commerce, payments and marketing integrations. Each successful boundary reduces uncertainty for the next one.",
          ],
        },
        {
          title: "Infrastructure is part of the application",
          paragraphs: [
            "In one production handoff I received existing frontend and backend repositories and had to establish the environment required to operate them under a new team. That work crossed Vercel, DigitalOcean, Supabase, Contentful, Medusa, Authorize.net and Klaviyo.",
            "The important lesson is that ownership did not stop at application code. DNS, hosting, environment configuration, data services, payment flows and external integrations were all part of the system that had to be understood and made operational.",
          ],
        },
        {
          title: "Document decisions while the context is fresh",
          paragraphs: [
            "The best time to improve documentation is while you are discovering the system. I record service ownership, deployment paths, required environment variables, integration purpose, known failure modes and decisions that would otherwise become tribal knowledge again.",
            "Documentation should help the next person answer operational questions, not simply describe the directory structure.",
          ],
        },
        {
          title: "Earn the right to refactor",
          paragraphs: [
            "Once the system can be built, deployed, observed and recovered, architecture changes become much safer. At that point refactoring is based on evidence: recurring incidents, duplicated logic, fragile integrations or operational bottlenecks.",
            "The goal of a handoff is not to prove that the previous architecture was wrong. It is to become responsible for the software quickly enough that improvements can be made without turning production into the test environment.",
          ],
        },
        {
          title: "The ownership mindset",
          paragraphs: [
            "Taking ownership means being able to explain how the system behaves, deploy it intentionally, diagnose failures across boundaries and make changes with a known blast radius.",
            "That skill transfers across languages and frameworks. The code matters, but the deeper engineering work is reducing uncertainty until the system becomes something you can safely operate rather than something you are afraid to touch.",
          ],
        },
      ],
      relatedCaseStudyLabel: "See the production platform handoff work on CBD Pros USA",
    },
    es: {
      title: "Cómo Hacerse Cargo de un Código de Producción Desconocido",
      description:
        "Un enfoque práctico para tomar control de un sistema existente en producción: mapear arquitectura, recuperar despliegues, identificar riesgo, validar dependencias y ganar confianza antes de hacer cambios grandes.",
      eyebrow: "Ingeniería · Producción · Sistemas Legacy",
      intro:
        "Hacerse cargo de un sistema existente en producción es distinto de empezar un proyecto nuevo. El primer trabajo no es mejorar la arquitectura. Es entender lo que ya existe lo suficiente como para operarlo con seguridad, recuperar la capacidad de desplegar y hacer cambios sin romper supuestos que todavía no descubriste.",
      dateLabel: "21 de septiembre de 2026",
      sections: [
        {
          title: "El primer entregable es un mapa del sistema",
          paragraphs: [
            "Antes de cambiar código quiero saber qué hace funcionar realmente al producto: repositorios, runtimes, bases de datos, CMS, colas, proveedores de pago, DNS, storage, jobs programados, APIs externas y caminos de despliegue.",
            "Ese mapa no tiene que ser perfecto. Tiene que ser suficientemente preciso para responder una pregunta básica: si este componente falla o cambia, ¿qué más depende de él?",
          ],
          code: `browser
  -> frontend
  -> API
  -> database

API
  -> CMS
  -> commerce
  -> payments
  -> email / marketing

deploy
  -> hosting
  -> environment variables
  -> DNS`,
        },
        {
          title: "Lograr que el sistema sea desplegable antes de hacerlo elegante",
          paragraphs: [
            "Un código que no puede reproducirse o desplegarse de forma segura ya tiene riesgo operativo. Priorizo lograr que la versión actual corra en un entorno conocido antes de intentar mejoras estructurales.",
            "Eso implica identificar comandos de build, versiones de runtime, variables de entorno, credenciales externas, conectividad de base de datos y el camino real de despliegue a producción. El objetivo es volver observable y repetible al sistema existente antes de modificar su comportamiento.",
          ],
        },
        {
          title: "Separar hechos de supuestos",
          paragraphs: [
            "Los handoffs suelen venir con documentación incompleta y conocimiento informal. Trato cada supuesto como algo a verificar: qué repositorio es el autoritativo, cuál entorno es producción, qué servicio es dueño de la base, si un webhook sigue activo o si una integración realmente se usa.",
            "Leer código es sólo una fuente de verdad. La configuración de despliegue, DNS, logs, paneles de proveedores, esquemas de base y comportamiento de red suelen mostrar relaciones que no aparecen en la documentación.",
          ],
        },
        {
          title: "Seguir un request real de punta a punta",
          paragraphs: [
            "Una forma útil de aprender un sistema desconocido es elegir un flujo importante y seguirlo a través de todas las capas. En una plataforma de e-commerce puede ser página de producto, carrito, checkout, confirmación de pago, persistencia de la orden y notificación al cliente.",
            "Eso revela rápidamente los límites: dónde vive el estado, qué servicio es autoritativo, qué ocurre de forma síncrona, qué depende de webhooks y dónde un error puede dejar el sistema parcialmente actualizado.",
          ],
        },
        {
          title: "Encontrar las operaciones irreversibles",
          paragraphs: [
            "No todas las partes de un sistema tienen el mismo riesgo. Enviar un email dos veces es molesto; cobrar una tarjeta dos veces es mucho peor. Borrar datos, cambiar autenticación, modificar esquemas de producción y disparar efectos externos requieren más cuidado.",
            "Identifico esas operaciones temprano y busco idempotencia, restricciones únicas, registros de auditoría, caminos de rollback y separación de ambientes antes de tocar el código que las rodea.",
          ],
        },
        {
          title: "Recuperar observabilidad antes de depurar por intuición",
          paragraphs: [
            "Si un sistema es difícil de entender, sumar más suposiciones lo empeora. Logs, request IDs, metadata de respuestas externas y límites claros de error reducen la cantidad de razonamiento que depende de evidencia incompleta.",
            "Quiero poder distinguir si una falla viene del código, de infraestructura, de la base, de DNS o de un servicio externo. Cuanto más rápido se separan esas capas, más seguros son los cambios posteriores.",
          ],
        },
        {
          title: "Cambiar un límite por vez",
          paragraphs: [
            "Los rewrites grandes son especialmente peligrosos durante un handoff porque el comportamiento no documentado es justamente lo que todavía no conocés. Prefiero cambios pequeños que aíslen un límite y produzcan evidencia.",
            "Por ejemplo: primero reproducir el frontend, luego establecer conectividad con la API, validar la base y después reconectar CMS, comercio, pagos e integraciones de marketing. Cada límite confirmado reduce la incertidumbre del siguiente.",
          ],
        },
        {
          title: "La infraestructura también es parte de la aplicación",
          paragraphs: [
            "En un handoff de producción recibí repositorios existentes de frontend y backend y tuve que establecer el entorno necesario para operarlos bajo un nuevo equipo. Ese trabajo atravesó Vercel, DigitalOcean, Supabase, Contentful, Medusa, Authorize.net y Klaviyo.",
            "La lección importante es que hacerse cargo no terminó en el código. DNS, hosting, configuración de entorno, servicios de datos, flujos de pago e integraciones externas eran parte del sistema que había que entender y dejar operativo.",
          ],
        },
        {
          title: "Documentar decisiones mientras el contexto está fresco",
          paragraphs: [
            "El mejor momento para mejorar documentación es mientras estás descubriendo el sistema. Registro ownership de servicios, caminos de deploy, variables necesarias, propósito de cada integración, modos de falla conocidos y decisiones que de otro modo volverían a convertirse en conocimiento informal.",
            "La documentación debería ayudar a la próxima persona a responder preguntas operativas, no solamente describir la estructura de carpetas.",
          ],
        },
        {
          title: "Ganarse el derecho a refactorizar",
          paragraphs: [
            "Cuando el sistema puede construirse, desplegarse, observarse y recuperarse, los cambios de arquitectura se vuelven mucho más seguros. Recién entonces el refactor se apoya en evidencia: incidentes repetidos, lógica duplicada, integraciones frágiles o cuellos de botella operativos.",
            "El objetivo de un handoff no es demostrar que la arquitectura anterior estaba equivocada. Es hacerse responsable del software suficientemente rápido como para poder mejorarlo sin convertir producción en el ambiente de prueba.",
          ],
        },
        {
          title: "La mentalidad de ownership",
          paragraphs: [
            "Hacerse cargo significa poder explicar cómo se comporta el sistema, desplegarlo de forma intencional, diagnosticar fallas entre distintas capas y hacer cambios con un radio de impacto conocido.",
            "Esa habilidad se transfiere entre lenguajes y frameworks. El código importa, pero el trabajo de ingeniería más profundo es reducir incertidumbre hasta que el sistema se convierte en algo que podés operar con seguridad y no en algo que da miedo tocar.",
          ],
        },
      ],
      relatedCaseStudyLabel: "Ver el trabajo de handoff de plataforma en CBD Pros USA",
    },
  },
  {
    slug: "production-mcp-server-oauth-tool-boundaries",
    publishedAt: "2026-09-13",
    relatedCaseStudy: {
      href: "/work/search-console-insights-mcp",
      label: "Search Console Insights — MCP server",
    },
    en: {
      title: "Building a Production MCP Server: OAuth, Tool Boundaries and State",
      description:
        "What changes when an MCP server moves beyond a local demo: OAuth, constrained tool contracts, identity isolation, bounded queries, persistence and production failure boundaries.",
      eyebrow: "AI Engineering · MCP · Backend",
      intro:
        "A local MCP demo can be little more than a transport plus a few functions. A production MCP service is a different system: it has identities, credentials, authorization boundaries, persistent state, upstream APIs and failure modes that an AI client can trigger repeatedly. The protocol is only one layer of the design.",
      dateLabel: "September 13, 2026",
      sections: [
        {
          title: "Treat the MCP server as an application boundary",
          paragraphs: [
            "The easiest way to build an MCP integration is to expose an existing API almost directly. That is also an easy way to give an AI client more authority than it needs. In production, I prefer to treat the MCP server as its own application boundary with an intentionally small contract.",
            "For Search Console Insights, the useful operations are specific: discover connected properties, query search performance, compare periods, inspect URL indexing and read sitemap status. The server exposes those workflows instead of becoming a generic proxy for every Google API operation.",
          ],
        },
        {
          title: "Design tools around user intent, not upstream endpoints",
          paragraphs: [
            "A good tool should represent a task the assistant can reason about. That usually means fewer parameters, narrower result shapes and stronger defaults than the upstream API provides.",
            "For example, a search-performance tool can constrain dimensions, date ranges and row counts. The model still has enough flexibility to analyze traffic, but it cannot accidentally request unbounded data or invoke unrelated Search Console operations.",
          ],
          code: `const SearchPerformanceInput = z.object({
  siteUrl: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  dimensions: z.array(
    z.enum(["date", "query", "page", "country", "device"])
  ).max(3),
  rowLimit: z.number().int().min(1).max(25000),
});`,
        },
        {
          title: "OAuth is part of the architecture, not a login screen",
          paragraphs: [
            "A remote MCP service needs to know which user is calling it and which upstream account that identity is allowed to use. That makes OAuth part of the service architecture rather than a thin authentication step in front of the tools.",
            "In this project the MCP client authenticates to the service, while Google refresh tokens remain server-side. The client receives the capabilities exposed by the MCP server, not the upstream Google credentials themselves. That separation reduces credential exposure and gives the service a stable place to enforce authorization.",
          ],
        },
        {
          title: "Separate external data from workflow state",
          paragraphs: [
            "Not every piece of data that passes through an MCP server belongs in its database. Search Console performance data can be read from Google and cached briefly without becoming application-owned data.",
            "Persistent storage is more appropriate for state the user creates inside the workflow: planned SEO actions, implementation notes and change history. Keeping those categories separate reduces unnecessary data retention and makes it clearer which system is authoritative for each record.",
          ],
        },
        {
          title: "Isolation needs more than a user ID",
          paragraphs: [
            "Once persistent state exists, every record needs an explicit ownership boundary. In Search Console Insights, workflow records are isolated by the authenticated Google subject and the Search Console property they belong to.",
            "That matters because one person can access multiple properties, and the service can support multiple connected identities. Authorization therefore needs to answer both who is making the request and which property the requested state belongs to.",
          ],
        },
        {
          title: "Bound the operations an agent can repeat",
          paragraphs: [
            "AI clients are excellent at composing tools, but they can also retry, broaden a query or call the same operation many times while exploring a problem. Production tools should assume that behavior is normal.",
            "I put explicit bounds around date ranges, result sizes and supported dimensions, validate every input and avoid arbitrary outbound URL fetching. These are not model-specific restrictions; they are ordinary backend controls applied to a client that happens to be an AI system.",
          ],
        },
        {
          title: "Failure behavior is part of the tool contract",
          paragraphs: [
            "An MCP tool should fail in a way the client can understand without exposing secrets or implementation details. Upstream API errors, expired authorization and database failures need useful boundaries, but raw credentials, connection strings and internal stack information should stay on the server.",
            "This also improves agent behavior. A clear, bounded error gives the assistant enough information to choose another action. An opaque crash encourages retries, while an overly detailed infrastructure error can leak information the client never needed.",
          ],
        },
        {
          title: "Test the protocol and the application separately",
          paragraphs: [
            "There are at least two things to verify: the backend logic behind each operation and the MCP transport that exposes it. Type checking and unit tests cover input validation and service behavior, while protocol smoke tests verify that a real MCP client can initialize the server, discover tools and call them successfully.",
            "That separation makes debugging much faster. If the service logic passes but tool discovery fails, the problem is in the protocol layer. If transport works but a Search Console query fails, the investigation moves to authentication, validation or the upstream API.",
          ],
        },
        {
          title: "Production MCP is backend engineering with a new client",
          paragraphs: [
            "The interesting part of an MCP server is not the novelty of tool calling. The difficult parts are familiar backend concerns: authentication, authorization, contracts, rate and size limits, state ownership, persistence, observability and safe failure behavior.",
            "The AI client changes how those capabilities are discovered and composed, but it does not remove the need for disciplined service design. My rule is simple: give the agent useful powers, then make the boundaries around those powers explicit enough that the system remains understandable when it is running unattended.",
          ],
        },
      ],
      relatedCaseStudyLabel: "See the production architecture behind Search Console Insights",
    },
    es: {
      title: "Cómo Construir un Servidor MCP de Producción: OAuth, Límites de Tools y Estado",
      description:
        "Qué cambia cuando un servidor MCP deja de ser una demo local: OAuth, contratos de tools acotados, aislamiento de identidades, consultas limitadas, persistencia y fronteras de falla.",
      eyebrow: "Ingeniería de AI · MCP · Backend",
      intro:
        "Una demo local de MCP puede ser poco más que un transporte y algunas funciones. Un servicio MCP de producción es otro tipo de sistema: tiene identidades, credenciales, límites de autorización, estado persistente, APIs externas y modos de falla que un cliente de AI puede disparar repetidamente. El protocolo es sólo una capa del diseño.",
      dateLabel: "13 de septiembre de 2026",
      sections: [
        {
          title: "Tratar al servidor MCP como un límite de aplicación",
          paragraphs: [
            "La forma más fácil de construir una integración MCP es exponer una API existente casi directamente. También es una forma fácil de darle a un cliente de AI más autoridad de la que necesita. En producción prefiero tratar al servidor MCP como un límite de aplicación propio, con un contrato deliberadamente pequeño.",
            "En Search Console Insights las operaciones útiles son específicas: descubrir propiedades conectadas, consultar rendimiento de búsqueda, comparar períodos, inspeccionar indexación de URLs y leer el estado de sitemaps. El servidor expone esos flujos en lugar de convertirse en un proxy genérico para cualquier operación de Google.",
          ],
        },
        {
          title: "Diseñar tools alrededor de la intención, no de los endpoints externos",
          paragraphs: [
            "Una buena tool debería representar una tarea sobre la que el asistente pueda razonar. Normalmente eso significa menos parámetros, resultados más acotados y defaults más fuertes que los que ofrece la API externa.",
            "Por ejemplo, una tool de rendimiento puede limitar dimensiones, rangos de fechas y cantidad de filas. El modelo conserva suficiente flexibilidad para analizar tráfico, pero no puede pedir datos sin límite ni invocar operaciones de Search Console que no forman parte del producto.",
          ],
          code: `const SearchPerformanceInput = z.object({
  siteUrl: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  dimensions: z.array(
    z.enum(["date", "query", "page", "country", "device"])
  ).max(3),
  rowLimit: z.number().int().min(1).max(25000),
});`,
        },
        {
          title: "OAuth es parte de la arquitectura, no una pantalla de login",
          paragraphs: [
            "Un servicio MCP remoto necesita saber quién lo está llamando y qué cuenta externa puede usar esa identidad. Eso convierte a OAuth en parte de la arquitectura del servicio, no en una capa superficial de autenticación delante de las tools.",
            "En este proyecto el cliente MCP se autentica contra el servicio mientras los refresh tokens de Google permanecen del lado del servidor. El cliente recibe las capacidades que expone MCP, no las credenciales de Google. Esa separación reduce exposición y crea un lugar estable para aplicar autorización.",
          ],
        },
        {
          title: "Separar datos externos del estado del workflow",
          paragraphs: [
            "No todo dato que pasa por un servidor MCP debería terminar en su base. Los datos de rendimiento de Search Console pueden leerse desde Google y cachearse brevemente sin convertirse en datos propios de la aplicación.",
            "La persistencia tiene más sentido para el estado que el usuario crea dentro del flujo: acciones SEO planificadas, notas de implementación e historial de cambios. Separar esas categorías reduce retención innecesaria y deja claro qué sistema es autoritativo para cada registro.",
          ],
        },
        {
          title: "El aislamiento necesita algo más que un user ID",
          paragraphs: [
            "Cuando existe estado persistente, cada registro necesita un límite de ownership explícito. En Search Console Insights, los registros del workflow quedan aislados por el subject autenticado de Google y por la propiedad de Search Console a la que pertenecen.",
            "Esto importa porque una persona puede acceder a varias propiedades y el servicio puede soportar múltiples identidades conectadas. La autorización tiene que responder tanto quién hace el request como a qué propiedad pertenece el estado solicitado.",
          ],
        },
        {
          title: "Limitar las operaciones que un agente puede repetir",
          paragraphs: [
            "Los clientes de AI son muy buenos componiendo tools, pero también pueden reintentar, ampliar una consulta o repetir una operación muchas veces mientras exploran un problema. Las tools de producción deberían asumir que ese comportamiento es normal.",
            "Por eso establezco límites explícitos sobre rangos de fechas, tamaños de resultados y dimensiones soportadas, valido cada input y evito fetch arbitrario de URLs externas. No son restricciones especiales para modelos; son controles normales de backend aplicados a un cliente que en este caso es un sistema de AI.",
          ],
        },
        {
          title: "El comportamiento ante fallas es parte del contrato",
          paragraphs: [
            "Una tool MCP debería fallar de una forma que el cliente pueda entender sin exponer secretos ni detalles internos. Los errores de APIs externas, autorizaciones vencidas y fallas de base necesitan límites útiles, mientras que credenciales, strings de conexión y stacks internos deben quedar en el servidor.",
            "Esto también mejora el comportamiento del agente. Un error claro y acotado le da información suficiente para elegir otra acción. Un crash opaco incentiva reintentos; un error de infraestructura demasiado detallado puede filtrar información que el cliente nunca necesitó.",
          ],
        },
        {
          title: "Probar por separado el protocolo y la aplicación",
          paragraphs: [
            "Hay al menos dos cosas distintas para verificar: la lógica de backend detrás de cada operación y el transporte MCP que la expone. Type checking y tests unitarios cubren validación y comportamiento del servicio; los smoke tests del protocolo verifican que un cliente MCP real pueda inicializar el servidor, descubrir tools e invocarlas.",
            "Esa separación acelera mucho el diagnóstico. Si la lógica del servicio pasa pero falla el descubrimiento de tools, el problema está en la capa de protocolo. Si el transporte funciona pero falla una consulta de Search Console, la investigación pasa a autenticación, validación o la API externa.",
          ],
        },
        {
          title: "MCP en producción es backend engineering con un cliente nuevo",
          paragraphs: [
            "La parte interesante de un servidor MCP no es la novedad del tool calling. Las partes difíciles son problemas conocidos de backend: autenticación, autorización, contratos, límites de uso y tamaño, ownership del estado, persistencia, observabilidad y fallas seguras.",
            "El cliente de AI cambia cómo se descubren y combinan esas capacidades, pero no elimina la necesidad de diseñar el servicio con disciplina. Mi regla es simple: darle al agente capacidades útiles y hacer los límites alrededor de esas capacidades suficientemente explícitos para que el sistema siga siendo entendible cuando opera sin supervisión constante.",
          ],
        },
      ],
      relatedCaseStudyLabel: "Ver la arquitectura de producción detrás de Search Console Insights",
    },
  },

];

export const getTechnicalArticle = (slug: string): TechnicalArticle | undefined =>
  technicalArticles.find((article) => article.slug === slug);
