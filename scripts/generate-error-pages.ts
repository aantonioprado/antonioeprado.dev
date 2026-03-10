import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { readFileSync, writeFileSync } from 'node:fs'
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
const indexHtmlPath = resolve(distDir, 'index.html')

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

const indexHtml = readFileSync(indexHtmlPath, 'utf8')

function buildHtml(title: string, body: string): string {
  const withTitle = indexHtml.replace(/<title>.*?<\/title>/s, `<title>${title} | Antonio Prado</title>`)

  if (withTitle === indexHtml) {
    throw new Error('Could not find <title> in dist/index.html')
  }

  const withBase = withTitle.replace('<head>', '<head>\n    <base href="/" />')

  if (withBase === withTitle) {
    throw new Error('Could not inject <base> into dist/index.html')
  }

  const withoutAppPreloads = withBase.replace(/<link[^>]+rel="modulepreload"[^>]*>/g, '')
  const withoutAppScript = withoutAppPreloads.replace(/<script[^>]+type="module"[^>]+src="[^"]+"[^>]*><\/script>/g, '')
  const withBody = withoutAppScript.replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`)

  if (withBody === withoutAppScript) {
    throw new Error('Could not find an empty <div id="root"></div> in dist/index.html')
  }

  return withBody
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
