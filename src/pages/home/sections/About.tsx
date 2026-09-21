import { about } from '../../../config/about'
import { site } from '../../../config/site'
import type { TFunc } from '../../../types'

interface AboutProps {
  t: TFunc
}

export function About({ t }: AboutProps) {
  return (
    <section id="about" className="section">
      <p className="eyebrow">{t('about.eyebrow')}</p>
      <h2 className="heading">{t('about.title')}</h2>
      <div className="accent-rule" />

      <div className="about-body">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        <p className="about-location">{site.location}</p>
      </div>
    </section>
  )
}
