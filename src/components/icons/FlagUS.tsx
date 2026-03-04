import { memo } from 'react'

export const FlagUS = memo(() => (
  <svg viewBox="0 0 28 20" width="28" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="28" height="20" fill="#B22234" />
    <rect y="1.54" width="28" height="1.53" fill="white" />
    <rect y="4.61" width="28" height="1.54" fill="white" />
    <rect y="7.69" width="28" height="1.54" fill="white" />
    <rect y="10.77" width="28" height="1.54" fill="white" />
    <rect y="13.84" width="28" height="1.54" fill="white" />
    <rect y="16.92" width="28" height="1.54" fill="white" />
    <rect width="11.2" height="10.77" fill="#3C3B6E" />
    {[1.08, 3.23, 5.38, 7.54, 9.69].map((y, row) =>
      [1.4, 3.73, 6.07, 8.4].map((x, col) => {
        const offset = row % 2 === 0 ? 0 : 1.17
        return col < (row % 2 === 0 ? 4 : 3) ? (
          <circle key={`${row}-${col}`} cx={x + offset} cy={y} r="0.5" fill="white" />
        ) : null
      })
    )}
  </svg>
))

FlagUS.displayName = 'FlagUS'
