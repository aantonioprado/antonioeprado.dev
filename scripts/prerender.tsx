import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { minify } from 'html-minifier-terser'
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
const robotsPlaceholder = '<!-- robots:noindex -->'
const preloaderBlockPattern = /<!-- preloader:start -->[\s\S]*?<!-- preloader:end -->/g
const seoBlockPattern = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/

const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  minifyCSS: true,
  minifyJS: true,
}

const t = makeTFunc(DEFAULT_LOCALE)

// index.html is shared by both web entries. The home page keeps the preloader
// and the SEO tags; error pages drop both and get a noindex meta instead,
// since a 404/403/500 has nothing to preload and should never be indexed.
function stripForErrorPage(template: string): string {
  if (!preloaderBlockPattern.test(template) || !seoBlockPattern.test(template)) {
    throw new Error('Could not find preloader/seo markers to strip from the error template')
  }

  return template
    .replace(preloaderBlockPattern, '')
    .replace(seoBlockPattern, '')
    .replace(robotsPlaceholder, '<meta name="robots" content="noindex" />')
}

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

async function writePage(path: string, html: string) {
  const minified = await minify(html, minifyOptions)
  writeFileSync(path, minified, 'utf8')
  console.log(path.replace(`${projectRoot}/`, ''))
}

const indexTemplate = readFileSync(resolve(distDir, 'index.html'), 'utf8').replace(robotsPlaceholder, '')
const errorTemplate = stripForErrorPage(readFileSync(resolve(distDir, 'error.html'), 'utf8'))

const home = buildHtml(
  indexTemplate,
  renderToString(
    <StaticRouter location="/">
      <App />
    </StaticRouter>,
  ),
  `${t('page.title')} | ${site.author}`,
)

await writePage(resolve(distDir, 'index.html'), home)

for (const kind of ERROR_KINDS) {
  const html = buildHtml(
    errorTemplate,
    renderToString(<ErrorPage kind={kind} />),
    `${errorPages[kind].documentTitle(t)} | ${site.author}`,
    ` data-error="${kind}"`,
  )

  await writePage(resolve(distDir, `${kind}.html`), html)
}

rmSync(resolve(distDir, 'error.html'))
