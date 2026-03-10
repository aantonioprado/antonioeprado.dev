import { useState, useCallback } from 'react'
import type { Theme } from '../types'

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light'
      if (next === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('theme', next)
      return next
    })
  }, [])

  return [theme, toggleTheme]
}
