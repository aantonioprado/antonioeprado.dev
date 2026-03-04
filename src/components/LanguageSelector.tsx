import { memo } from 'react'
import type { Locale } from '../types'
import { FlagBR, FlagUS } from './icons'

const next: Record<Locale, Locale> = { 'en-us': 'pt-br', 'pt-br': 'en-us' }
const label: Record<Locale, string> = { 'en-us': 'Switch to Português', 'pt-br': 'Mudar para English' }
const Flag: Record<Locale, typeof FlagBR> = { 'en-us': FlagUS, 'pt-br': FlagBR }

interface LanguageSelectorProps {
  locale: Locale
  onChange: (locale: Locale) => void
}

export const LanguageSelector = memo(({ locale, onChange }: LanguageSelectorProps) => {
  const CurrentFlag = Flag[locale]
  return (
    <button
      className="lang-btn"
      onClick={() => onChange(next[locale])}
      aria-label={label[locale]}
      data-tooltip={label[locale]}
    >
      <CurrentFlag />
    </button>
  )
})

LanguageSelector.displayName = 'LanguageSelector'
