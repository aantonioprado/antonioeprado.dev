import type { Certification } from '../../../config/certifications'
import type { TFunc } from '../../../types'

interface CertificationsProps {
  t: TFunc
  certifications: Certification[]
}

export function Certifications({ t, certifications }: CertificationsProps) {
  return (
    <section id="certifications" className="section">
      <p className="eyebrow">{t('certifications.eyebrow')}</p>
      <h2 className="heading">{t('certifications.title')}</h2>
      <div className="accent-rule" />

      <div className="certs-grid">
        {certifications.map((cert) => (
          <div key={cert.id} className="card cert-card">
            <div>
              <h3 className="cert-name">{cert.name}</h3>
              <p className="cert-institution">{cert.institution}</p>
            </div>
            <p className="cert-period">
              {cert.period}
              {cert.inProgress && <span className="chip cert-in-progress">{t('certifications.in_progress')}</span>}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
