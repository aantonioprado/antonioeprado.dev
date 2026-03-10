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

const cursorRing = `<div class="cursor-ring" aria-hidden="true" id="ep-ring"></div>`

const controls = `<div class="controls">
  <button class="theme-toggle" id="ep-theme-btn" aria-label="Toggle theme">
    <svg id="ep-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
    <svg id="ep-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>
</div>`

const inlineScript = `<script>(function(){
  var ring=document.getElementById('ep-ring'),RADIUS=250;
  window.addEventListener('mousemove',function(e){
    ring.style.transform='translate('+(e.clientX-RADIUS)+'px,'+(e.clientY-RADIUS)+'px)';
    ring.classList.add('cursor-ring--visible');
  },{passive:true});
  var btn=document.getElementById('ep-theme-btn');
  var sun=document.getElementById('ep-sun');
  var moon=document.getElementById('ep-moon');
  function sync(dark){sun.style.display=dark?'block':'none';moon.style.display=dark?'none':'block';}
  var dark=document.documentElement.classList.contains('dark');
  sync(dark);
  btn.addEventListener('click',function(){
    dark=!dark;
    document.documentElement.classList.toggle('dark',dark);
    localStorage.setItem('theme',dark?'dark':'light');
    sync(dark);
  });
})();</script>`

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
  const fullBody = `${cursorRing}${controls}${body}${inlineScript}`
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
