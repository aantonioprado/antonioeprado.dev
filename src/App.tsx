import { useState, useEffect } from 'react'
import { useLocale } from './hooks/useLocale'
import { LoadingScreen } from './components/LoadingScreen'
import { ComingSoon } from './components/ComingSoon'
import './App.css'

export default function App() {
  const [, t] = useLocale()
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

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
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      {loading
        ? <LoadingScreen progress={progress} label={t('loading')} />
        : <ComingSoon t={t} />
      }
    </>
  )
}
