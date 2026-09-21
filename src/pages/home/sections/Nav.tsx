import { site } from '../../../config/site'
import type { TFunc } from '../../../types'

interface NavProps {
  t: TFunc
}

const links: Array<{ href: string; labelKey: 'about' | 'experience' | 'stack' | 'projects' | 'certifications' | 'contact' }> = [
  { href: '#about', labelKey: 'about' },
  { href: '#experience', labelKey: 'experience' },
  { href: '#stack', labelKey: 'stack' },
  { href: '#projects', labelKey: 'projects' },
  { href: '#certifications', labelKey: 'certifications' },
  { href: '#contact', labelKey: 'contact' },
]

const [domainName, domainTld] = (() => {
  const parts = site.domain.split('.')
  return [parts[0], `.${parts.slice(1).join('.')}`]
})()

export function Nav({ t }: NavProps) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="wordmark">
          {domainName}
          <span className="wordmark-tld">{domainTld}</span>
        </a>
        <div className="nav-links">
          {links.map(({ href, labelKey }) => (
            <a key={href} href={href} className="nav-link anchor">
              {t(`nav.${labelKey}`)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
