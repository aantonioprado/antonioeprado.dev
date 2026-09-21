import type { ExperienceEntry } from '../../../config/experience'
import type { TFunc } from '../../../types'

interface ExperienceProps {
  t: TFunc
  entries: ExperienceEntry[]
}

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function formatDate(value: string): string {
  const [year, month] = value.split('-')
  return `${MONTHS[Number(month) - 1]}/${year}`
}

export function Experience({ t, entries }: ExperienceProps) {
  return (
    <section id="experience" className="section">
      <p className="eyebrow">{t('experience.eyebrow')}</p>
      <h2 className="heading">{t('experience.title')}</h2>
      <div className="accent-rule" />

      <div className="experience-list">
        {entries.map((entry) => (
          <article key={entry.id} className="card experience-card">
            <div className="experience-card-header">
              <div>
                <h3 className="experience-role">{entry.role}</h3>
                <p className="experience-company">{entry.company}</p>
              </div>
              <p className="experience-period">
                {formatDate(entry.startDate)} – {entry.endDate ? formatDate(entry.endDate) : t('experience.present')}
              </p>
            </div>

            <ul className="experience-bullets">
              {entry.bullets.map((bullet) => (
                <li key={bullet.slice(0, 24)}>{bullet}</li>
              ))}
            </ul>

            <div className="chip-row">
              {entry.technologies.map((tech) => (
                <span key={tech} className="chip">{tech}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
