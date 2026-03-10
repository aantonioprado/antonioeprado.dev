import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

import { NotFound } from '../src/pages/404/NotFound.tsx'
import { Forbidden } from '../src/pages/403/Forbidden.tsx'
import { ServerError } from '../src/pages/500/ServerError.tsx'
import { StaticCursorRing } from '../src/components/StaticCursorRing.tsx'
import { StaticControls } from '../src/components/StaticControls.tsx'
import enUs from '../src/locales/en-us.json' assert {
  type: 'json'
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../dist')
const indexHtmlPath = resolve(distDir, 'index.html')

const indexHtml = readFileSync(indexHtmlPath, 'utf8')

const scriptBuild = await build({
  entryPoints: [resolve(__dirname, 'staticPageScript.ts')],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  minify: true,
  entryNames: '[name]-[hash]',
  outdir: resolve(distDir, 'assets'),
  metafile: true,
})

const scriptFilename = basename(Object.keys(scriptBuild.metafile.outputs)[0])
const scriptTag = `<script src="/assets/${scriptFilename}" defer></script>`

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

  const cursorRing = renderToStaticMarkup(createElement(StaticCursorRing))
  const controls = renderToStaticMarkup(createElement(StaticControls))
  const fullBody = `${cursorRing}${controls}${body}${scriptTag}`

  const withBody = withoutAppScript.replace(/<div id="root"><\/div>/, `<div id="root">${fullBody}</div>`)

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
