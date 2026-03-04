import { memo } from 'react'

export const FlagBR = memo(() => (
  <svg viewBox="0 0 28 20" width="28" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="28" height="20" fill="#009C3B" />
    <polygon points="14,2.5 25.5,10 14,17.5 2.5,10" fill="#FFDF00" />
    <circle cx="14" cy="10" r="4.6" fill="#002776" />
    <path d="M9.6 8.6 A5.5 5.5 0 0 1 18.4 8.6" stroke="white" strokeWidth="1" fill="none" />
    <circle cx="11.5" cy="9.2" r="0.55" fill="white" />
    <circle cx="14" cy="8.3" r="0.55" fill="white" />
    <circle cx="16.5" cy="9.2" r="0.55" fill="white" />
  </svg>
))

FlagBR.displayName = 'FlagBR'
