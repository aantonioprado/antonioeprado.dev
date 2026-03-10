import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { NotFound } from '../src/pages/404/NotFound.tsx'
import { Forbidden } from '../src/pages/403/Forbidden.tsx'
import { ServerError } from '../src/pages/500/ServerError.tsx'
import enUs from '../src/locales/en-us.json' assert {
  type: 'json'
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../dist')

function t(key: string, ...args: (string | number)[]): string {
  const resolved = key.split('.').reduce<unknown>((obj, k) => {
    if (!obj || typeof obj !== 'object' || !(k in obj)) {
      throw new Error(`Missing translation key: ${key}`)
    }

    return (obj as Record<string, unknown>)[k]
  }, enUs as Record<string, unknown>)

  let value = String(resolved)

  args.forEach((arg, i) => {
    value = value.replace(`{{${i + 1}}}`, String(arg))
  })

  return value
}

const cssFile = readdirSync(`${distDir}/assets`).find((f) => f.endsWith('.css'))
if (!cssFile) throw new Error('No CSS file found in dist/assets. Run vite build first.')
const css = readFileSync(`${distDir}/assets/${cssFile}`, 'utf8')

const themeScript = `(function(){var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s===null&&d)){document.documentElement.classList.add('dark');}})();`

function buildHtml(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" />
    <title>${title} | Antônio Prado</title>
    <script>${themeScript}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
    <style>${css}</style>
  </head>
  <body>
    <div id="root">${body}</div>
  </body>
</html>`
}

const pages = [
  {
    component: NotFound,
    title: `${t('not_found.code')} – ${t('not_found.title')}`,
    output: '404.shtml',
  },
  {
    component: Forbidden,
    title: `${t('forbidden.code')} – ${t('forbidden.title')}`,
    output: '403.shtml',
  },
  {
    component: ServerError,
    title: `${t('server_error.code')} – ${t('server_error.title')}`,
    output: '500.shtml',
  },
]

for (const { component, title, output } of pages) {
  const body = renderToStaticMarkup(createElement(component, { t }))
  const html = buildHtml(title, body)
  writeFileSync(`${distDir}/${output}`, html, 'utf8')
  console.log(`dist/${output}`)
}
