import { useEffect, type ReactNode } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useLocale } from '../hooks/useLocale'
import { useCursorRing } from '../hooks/useCursorRing'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSelector } from './LanguageSelector'
import { site } from '../config/site'
import type { TFunc } from '../types'

interface LayoutProps {
  documentTitle: (t: TFunc) => string
  children: (t: TFunc) => ReactNode
}

export function Layout({ documentTitle, children }: LayoutProps) {
  const [theme, toggleTheme] = useTheme()
  const [locale, t, changeLocale] = useLocale()
  const ringRef = useCursorRing()

  useEffect(() => {
    document.title = `${documentTitle(t)} | ${site.author}`
  }, [documentTitle, t])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div className="controls">
        <LanguageSelector locale={locale} onChange={changeLocale} />
        <ThemeToggle
          toggleTheme={toggleTheme}
          tooltip={theme === 'dark' ? t('controls.tooltip_to_light') : t('controls.tooltip_to_dark')}
        />
      </div>
      {children(t)}
    </>
  )
}
