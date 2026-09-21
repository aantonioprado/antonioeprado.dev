import { useEffect, useRef } from 'react'

const RADIUS = 250

export function useCursorRing() {
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    const onMove = (e: MouseEvent) => {
      ring.style.transform = `translate(${e.clientX - RADIUS}px, ${e.clientY - RADIUS}px)`
      ring.classList.add('cursor-ring--visible')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return ringRef
}
