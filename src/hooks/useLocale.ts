import { useState, useCallback, useEffect, useMemo } from 'react'
import type { Locale, Translations, TFunc } from '../types'
import { site } from '../config/site'
import enUs from '../locales/en-us.json'
import ptBr from '../locales/pt-br.json'

const translations: Record<Locale, Translations> = {
  'en-us': enUs as Translations,
  'pt-br': ptBr as Translations,
}

function detectLocale(): Locale {
  const saved = localStorage.getItem('locale') as Locale | null
  if (saved === 'en-us' || saved === 'pt-br') return saved
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt-br' : 'en-us'
}

function resolve(obj: Record<string, unknown>, path: string): string {
  return path
    .split('.')
    .reduce<unknown>((cur, key) => (cur as Record<string, unknown>)[key], obj) as string
}

function makeTFunc(locale: Locale): TFunc {
  const raw = translations[locale] as unknown as Record<string, unknown>
  return (key: string, ...args: (string | number)[]): string => {
    const template = resolve(raw, key)
    if (args.length === 0) return template
    return args.reduce<string>(
      (str, arg, i) => str.replaceAll(`{{${i + 1}}}`, String(arg)),
      template,
    )
  }
}

export function useLocale(): [Locale, TFunc, (locale: Locale) => void] {
  const [locale, setLocale] = useState<Locale>(detectLocale)

  useEffect(() => {
    document.title = `${translations[locale].page.title} | ${site.author}`
  }, [locale])

  const t = useMemo(() => makeTFunc(locale), [locale])

  const changeLocale = useCallback((next: Locale) => {
    setLocale(next)
    localStorage.setItem('locale', next)
  }, [])

  return [locale, t, changeLocale]
}
