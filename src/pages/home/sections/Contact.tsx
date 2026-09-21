import type { ReactElement } from 'react'
import { SocialButton } from '../../../components/SocialButton'
import { socials } from '../../../config/socials'
import { site } from '../../../config/site'
import { LinkedIn, GitHub } from '../../../components/icons'
import type { TFunc } from '../../../types'

interface ContactProps {
  t: TFunc
}

const icons: Record<string, ReactElement> = {
  linkedin: <LinkedIn />,
  github: <GitHub />,
}

export function Contact({ t }: ContactProps) {
  return (
    <section id="contact" className="section no-rule contact-section">
      <p className="eyebrow">{t('contact.eyebrow')}</p>
      <h2 className="heading">{t('contact.title')}</h2>
      <div className="accent-rule" />

      <p className="contact-subtitle">{t('contact.subtitle')}</p>

      <a href={`mailto:${site.email}`} className="btn btn-fill contact-email">
        {t('contact.cta_email')}
      </a>

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
