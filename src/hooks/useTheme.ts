import { useCallback, useSyncExternalStore } from 'react'
import type { Theme } from '../types'

const listeners = new Set<() => void>()

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => {
    listeners.delete(onChange)
  }
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function getServerSnapshot(): Theme {
  return 'light'
}

export function useTheme(): [Theme, () => void] {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = useCallback(() => {
    const next: Theme = document.documentElement.classList.toggle('dark') ? 'dark' : 'light'
    localStorage.setItem('theme', next)
    listeners.forEach((onChange) => onChange())
  }, [])

  return [theme, toggleTheme]
}
