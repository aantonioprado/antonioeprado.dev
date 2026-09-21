import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import App from '../src/App'
import { ErrorPage } from '../src/pages/ErrorPage'
import { ERROR_KINDS, errorPages } from '../src/pages/errors'
import { makeTFunc, DEFAULT_LOCALE } from '../src/hooks/useLocale'
import { site } from '../src/config/site'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = resolve(projectRoot, 'dist')
const rootMarker = '<div id="root"></div>'
const titlePattern = /<title>.*?<\/title>/s

const t = makeTFunc(DEFAULT_LOCALE)

function buildHtml(template: string, markup: string, title: string, rootAttrs = ''): string {
  if (!titlePattern.test(template)) {
    throw new Error(`Could not find <title> for "${title}"`)
  }

  const withTitle = template.replace(titlePattern, `<title>${title}</title>`)

  if (!withTitle.includes(rootMarker)) {
    throw new Error(`Could not find an empty ${rootMarker} for "${title}"`)
  }

  return withTitle.replace(rootMarker, `<div id="root"${rootAttrs}>${markup}</div>`)
}

const indexTemplate = readFileSync(resolve(distDir, 'index.html'), 'utf8')
const errorTemplate = readFileSync(resolve(distDir, 'error.html'), 'utf8')

const home = buildHtml(
  indexTemplate,
  renderToString(
    <StaticRouter location="/">
      <App />
    </StaticRouter>,
  ),
  `${t('page.title')} | ${site.author}`,
)

writeFileSync(resolve(distDir, 'index.html'), home, 'utf8')
console.log('dist/index.html')

for (const kind of ERROR_KINDS) {
  const html = buildHtml(
    errorTemplate,
    renderToString(<ErrorPage kind={kind} />),
    `${errorPages[kind].documentTitle(t)} | ${site.author}`,
    ` data-error="${kind}"`,
  )

  writeFileSync(resolve(distDir, `${kind}.html`), html, 'utf8')
  console.log(`dist/${kind}.html`)
}

rmSync(resolve(distDir, 'error.html'))
