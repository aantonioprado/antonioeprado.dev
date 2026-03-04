import { memo } from 'react'
import type { ReactNode } from 'react'

interface SocialButtonProps {
  href: string
  icon: ReactNode
  label: string
}

export const SocialButton = memo(({ href, icon, label }: SocialButtonProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn"
    aria-label={label}
    data-tooltip={label}
  >
    {icon}
  </a>
))

SocialButton.displayName = 'SocialButton'
