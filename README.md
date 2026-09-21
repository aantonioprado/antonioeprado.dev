# antonioeprado.dev

Personal portfolio built with React 19, TypeScript and [Rsbuild](https://rsbuild.rs).

The site ships as static HTML. Every page is rendered at build time and hydrated in
the browser, so crawlers get the real content instead of an empty `<div id="root">`.

## Scripts

```bash
npm run dev      # dev server
npm run build    # bundle + prerender into dist/
npm run preview  # serve the production build
npm run lint     # eslint
npm test         # vitest
```

## How the build works

`rsbuild build` produces two web entries: `index` (the app) and `error` (the error pages).
Right after that, `scripts/prerender.tsx` renders each page with `react-dom/server` and
writes the final HTML:

| File | Content |
| --- | --- |
| `dist/index.html` | home, rendered at `/` |
| `dist/404.html` | not found |
| `dist/403.html` | forbidden |
| `dist/500.html` | server error |

The error pages are served by Apache through `ErrorDocument` (see `public/.htaccess`), so a
missing URL answers with a real `404` status instead of a soft 404.

**Adding a route**: every route needs its own HTML file, because there is no SPA fallback
rewrite. Add the route to `src/App.tsx` and to the render list in `scripts/prerender.tsx`.

The prerendered HTML is in Portuguese. The language toggle switches to English on the client.

## Deploy

Pushing to `main` triggers `.github/workflows/cd.yml`, which builds and syncs `dist/` to the
server over SSH. The sync runs with `--delete`, so `dist/` is the single source of truth for
what lives on the server.
