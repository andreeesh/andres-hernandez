# Andrés Hernández — professional CV site

A static Next.js App Router website and print-friendly CV for Andrés Hernández, Senior Web Developer.

## Local development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm run typecheck
npm run build
```

Professional content lives in `data/profile.ts`, `data/experience.ts`, `data/projects.ts`, and `data/skills.ts`. The homepage and `/resume` consume the shared experience and skills data.

`/resume` includes a `Print / Save as PDF` button that opens the browser print dialog. Use the browser's “Save as PDF” destination.

## Production URL

The production origin is centralized in `profile.productionUrl` in `data/profile.ts` and is used by metadata, sitemap, robots, and JSON-LD.
