import { useState, useEffect } from 'react'

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>?/\\|{}[]'

function randomChar(): string {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
}

function buildFrame(target: string, lockedCount: number): string {
  return target
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' '
      if (i < lockedCount) return char
      return randomChar()
    })
    .join('')
}

export function useDecryptText(
  targetText: string,
  resolveInterval = 40,
  repeatDelay: number | null = null,
): string {
  const [displayText, setDisplayText] = useState(() => buildFrame(targetText, 0))
  const [prevTarget, setPrevTarget] = useState(targetText)

  if (prevTarget !== targetText) {
    setPrevTarget(targetText)
    setDisplayText(buildFrame(targetText, 0))
  }

  useEffect(() => {
    let decryptInterval: ReturnType<typeof setInterval>
    let repeatTimeout: ReturnType<typeof setTimeout>

    function runAnimation() {
      let count = 0

      decryptInterval = setInterval(() => {
        count += 1

        if (count >= targetText.length) {
          setDisplayText(targetText)
          clearInterval(decryptInterval)
          if (repeatDelay === null) return
          repeatTimeout = setTimeout(() => {
            setDisplayText(buildFrame(targetText, 0))
            runAnimation()
          }, repeatDelay)
          return
        }

        setDisplayText(buildFrame(targetText, count))
      }, resolveInterval)
    }

    runAnimation()

    return () => {
      clearInterval(decryptInterval)
      clearTimeout(repeatTimeout)
    }
  }, [targetText, resolveInterval, repeatDelay])

  return displayText
}
