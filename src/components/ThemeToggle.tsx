import { memo } from 'react'
import { Sun, Moon } from './icons'

interface ThemeToggleProps {
  tooltip: string
  toggleTheme: () => void
}

export const ThemeToggle = memo(({ tooltip, toggleTheme }: ThemeToggleProps) => (
  <button
    className="theme-toggle"
    onClick={toggleTheme}
    aria-label={tooltip}
    data-tooltip={tooltip}
  >
    <span className="theme-icon theme-icon--sun">
      <Sun />
    </span>
    <span className="theme-icon theme-icon--moon">
      <Moon />
    </span>
  </button>
))

ThemeToggle.displayName = 'ThemeToggle'
