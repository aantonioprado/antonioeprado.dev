import type { ReactElement } from 'react'
import { SocialButton } from './SocialButton'
import { socials } from '../config/socials'
import { site } from '../config/site'
import { LinkedIn, GitHub } from './icons'
import type { TFunc } from '../types'

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
      <main className="page__main">
        <div className="coming-soon">
          <div className="coming-soon__heading-wrap">
            <h1 className="coming-soon__title animate-text-reveal">{t('page.title')}</h1>
            <div className="coming-soon__underline" />
          </div>

          <p className="coming-soon__byline animate-fade-in">{site.author}, {t('page.role')}</p>

          <p className="coming-soon__subtitle animate-fade-in animate-fade-in--delay">{t('page.subtitle')}</p>

          <div className="coming-soon__socials">
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

      <footer className="page__footer">
        <p>{t('page.footer', site.year, site.author)}</p>
      </footer>
    </div>
  )
}
