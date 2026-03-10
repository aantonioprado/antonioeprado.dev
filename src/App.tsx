import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { useLocale } from './hooks/useLocale'
import { ThemeToggle } from './components/ThemeToggle'
import { LanguageSelector } from './components/LanguageSelector'
import { LoadingScreen } from './components/LoadingScreen'
import { ComingSoon } from './pages/home/ComingSoon'
import { NotFound } from './pages/404/NotFound'
import './App.css'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [locale, t, changeLocale] = useLocale()
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrameId: number
    let lastTimestamp: number

    const updateProgress = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const deltaTime = timestamp - lastTimestamp

      if (deltaTime > 50) {
        lastTimestamp = timestamp
        setProgress((prev) => {
          const next = prev + (100 - prev) / 10
          if (next >= 99.5) {
            setTimeout(() => setLoading(false), 500)
            return 100
          }
          return next
        })
      }

      animationFrameId = requestAnimationFrame(updateProgress)
    }

    animationFrameId = requestAnimationFrame(updateProgress)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    const RADIUS = 250

    const onMove = (e: MouseEvent) => {
      ring.style.transform = `translate(${e.clientX - RADIUS}px, ${e.clientY - RADIUS}px)`
      ring.classList.add('cursor-ring--visible')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const controls = (
    <div className="controls">
      <LanguageSelector locale={locale} onChange={changeLocale} />
      <ThemeToggle
        theme={theme}
        toggleTheme={toggleTheme}
        tooltip={theme === 'dark' ? t('controls.tooltip_to_light') : t('controls.tooltip_to_dark')}
      />
    </div>
  )

  if (loading) {
    return (
      <>
        <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
        <LoadingScreen progress={progress} label={t('loading')} />
      </>
    )
  }

  return (
    <BrowserRouter>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <Routes>
        <Route path="/" element={<>{controls}<ComingSoon t={t} /></>} />
        <Route path="*" element={<NotFound t={t} />} />
      </Routes>
    </BrowserRouter>
  )
}
