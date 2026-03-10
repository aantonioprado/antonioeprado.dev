import { Home } from '../../components/icons'
import type { TFunc } from '../../types'

interface NotFoundProps {
  t: TFunc
}

export function NotFound({ t }: NotFoundProps) {
  return (
    <div className="page">
      <main className="page__main">
        <div className="not-found">
          <span className="not-found__code">{t('not_found.code')}</span>
          <h1 className="not-found__title">{t('not_found.title')}</h1>
          <p className="not-found__subtitle">{t('not_found.subtitle')}</p>
          <a href="/" className="not-found__back">
            <Home />
            {t('not_found.back')}
          </a>
        </div>
      </main>
    </div>
  )
}
