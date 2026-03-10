import { useState, useCallback, useEffect } from 'react'
import type { Theme } from '../types'

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light'
      next === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', next)
      return next
    })
  }, [])

  return [theme, toggleTheme]
}
