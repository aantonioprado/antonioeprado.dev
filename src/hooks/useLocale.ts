import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'
import type { Locale, Translations, TFunc } from '../types'
import enUs from '../locales/en-us.json'
import ptBr from '../locales/pt-br.json'

export const DEFAULT_LOCALE: Locale = 'pt-br'

const translations: Record<Locale, Translations> = {
  'en-us': enUs as Translations,
  'pt-br': ptBr as Translations,
}

const htmlLang: Record<Locale, string> = {
  'en-us': 'en',
  'pt-br': 'pt-BR',
}

const listeners = new Set<() => void>()
let current: Locale | null = null

function detectLocale(): Locale {
  const saved = localStorage.getItem('locale') as Locale | null
  if (saved === 'en-us' || saved === 'pt-br') return saved
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt-br' : 'en-us'
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => {
    listeners.delete(onChange)
  }
}

function getSnapshot(): Locale {
  if (current === null) current = detectLocale()
  return current
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE
}

function resolve(obj: Record<string, unknown>, path: string): string {
  return path
    .split('.')
    .reduce<unknown>((cur, key) => (cur as Record<string, unknown>)[key], obj) as string
}

export function makeTFunc(locale: Locale): TFunc {
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
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale]
  }, [locale])

  const t = useMemo(() => makeTFunc(locale), [locale])

  const changeLocale = useCallback((next: Locale) => {
    current = next
    localStorage.setItem('locale', next)
    listeners.forEach((onChange) => onChange())
  }, [])

  return [locale, t, changeLocale]
}
