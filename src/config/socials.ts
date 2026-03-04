import type { Translations } from '../types'

export interface Social {
  id: string
  href: string
  labelKey: keyof Translations['social']
}

export const socials: Social[] = [
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/antonioeprado/',
    labelKey: 'linkedin',
  },
  {
    id: 'github',
    href: 'https://github.com/aantonioprado',
    labelKey: 'github',
  },
]
