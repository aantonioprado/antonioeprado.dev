import type { ReactElement } from 'react'
import { SocialButton } from '../../components/SocialButton'
import { socials } from '../../config/socials'
import { site } from '../../config/site'
import { LinkedIn, GitHub } from '../../components/icons'
import type { TFunc } from '../../types'
import { useDecryptText } from '../../hooks/useDecryptText'

interface ComingSoonProps {
  t: TFunc
}

const icons: Record<string, ReactElement> = {
  linkedin: <LinkedIn />,
  github: <GitHub />,
}

export function ComingSoon({ t }: ComingSoonProps) {
  return (
    <div className="page">
      <main className="page-main">
        <div className="coming-soon">
          <div className="coming-soon-heading-wrap">
            <h1 className="coming-soon-title" aria-label={t('page.title')}>{useDecryptText(t('page.title'), 55, 15000)}</h1>
            <div className="coming-soon-underline" />
          </div>

          <p className="coming-soon-byline animate-fade-in">{site.author}, {t('page.role')}</p>

          <p className="coming-soon-subtitle animate-fade-in animate-fade-in--delay">{t('page.subtitle')}</p>

          <div className="coming-soon-socials">
            {socials.map(({ id, href, labelKey }) => (
              <SocialButton
                key={id}
                href={href}
                label={t(`social.${labelKey}`)}
                icon={icons[id]}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="page-footer">
        <p>{t('page.footer', site.year, site.author)}</p>
      </footer>
    </div>
  )
}
