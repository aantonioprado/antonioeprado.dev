;(function () {
  const ring = document.getElementById('ep-ring') as HTMLElement
  const RADIUS = 250

  window.addEventListener(
    'mousemove',
    (e) => {
      ring.style.transform = `translate(${e.clientX - RADIUS}px,${e.clientY - RADIUS}px)`
      ring.classList.add('cursor-ring--visible')
    },
    { passive: true },
  )

  const btn = document.getElementById('ep-theme-btn') as HTMLElement
  const sun = document.getElementById('ep-sun') as HTMLElement
  const moon = document.getElementById('ep-moon') as HTMLElement

  function syncTheme(dark: boolean) {
    sun.style.display = dark ? 'block' : 'none'
    moon.style.display = dark ? 'none' : 'block'
  }

  let dark = document.documentElement.classList.contains('dark')
  syncTheme(dark)

  btn.addEventListener('click', () => {
    dark = !dark
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    syncTheme(dark)
  })

  const langBtn = document.getElementById('ep-lang-btn') as HTMLElement
  const flagUs = document.getElementById('ep-flag-us') as HTMLElement
  const flagBr = document.getElementById('ep-flag-br') as HTMLElement

  function detectLocale(): string {
    const s = localStorage.getItem('locale')
    if (s === 'en-us' || s === 'pt-br') return s
    return navigator.language.toLowerCase().startsWith('pt') ? 'pt-br' : 'en-us'
  }

  function syncLang(locale: string) {
    const isEn = locale === 'en-us'
    flagUs.style.display = isEn ? 'inline' : 'none'
    flagBr.style.display = isEn ? 'none' : 'inline'
    langBtn.setAttribute('aria-label', isEn ? 'Switch to Português' : 'Mudar para English')
    langBtn.setAttribute('data-tooltip', isEn ? 'Switch to Português' : 'Mudar para English')
  }

  let locale = detectLocale()
  syncLang(locale)

  langBtn.addEventListener('click', () => {
    locale = locale === 'en-us' ? 'pt-br' : 'en-us'
    localStorage.setItem('locale', locale)
    syncLang(locale)
  })
})()
