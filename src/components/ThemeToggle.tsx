import { memo } from 'react'
import type { Theme } from '../types'
import { Sun, Moon } from './icons'

interface ThemeToggleProps {
  theme: Theme
  tooltip: string
  toggleTheme: () => void
}

export const ThemeToggle = memo(({ theme, tooltip, toggleTheme }: ThemeToggleProps) => (
  <button
    className="theme-toggle"
    onClick={toggleTheme}
    aria-label={tooltip}
    data-tooltip={tooltip}
  >
    {theme === 'dark' ? <Sun /> : <Moon />}
  </button>
))

ThemeToggle.displayName = 'ThemeToggle'
