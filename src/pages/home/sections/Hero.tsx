import type { ReactElement } from 'react'
import { SocialButton } from '../../../components/SocialButton'
import { socials } from '../../../config/socials'
import { site } from '../../../config/site'
import { LinkedIn, GitHub } from '../../../components/icons'
import { useDecryptText } from '../../../hooks/useDecryptText'
import type { TFunc } from '../../../types'

interface HeroProps {
  t: TFunc
}

const icons: Record<string, ReactElement> = {
  linkedin: <LinkedIn />,
  github: <GitHub />,
}

export function Hero({ t }: HeroProps) {
  return (
    <section id="top" className="hero no-rule">
      <div className="hero-heading-wrap">
        <p className="eyebrow hero-eyebrow">{t('hero.eyebrow')}</p>
        <h1 className="hero-title" aria-label={site.author}>{useDecryptText(site.author, 55, 15000)}</h1>
        <div className="hero-underline" />
      </div>

      <p className="hero-byline animate-fade-in">{t('page.title')}</p>

      <p className="hero-subtitle animate-fade-in animate-fade-in--delay">{t('hero.subtitle')}</p>

      <div className="hero-ctas">
        <a href="#projects" className="btn btn-fill">{t('hero.cta_projects')}</a>
        <a href="#contact" className="btn btn-out">{t('hero.cta_contact')}</a>
      </div>

      <div className="hero-socials">
        {socials.map(({ id, href, labelKey }) => (
          <SocialButton
            key={id}
            href={href}
            label={t(`social.${labelKey}`)}
            icon={icons[id]}
          />
        ))}
      </div>
    </section>
  )
}
