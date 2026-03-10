import { Home } from '../../components/icons'
import type { TFunc } from '../../types'

interface ForbiddenProps {
  t: TFunc
}

export function Forbidden({ t }: ForbiddenProps) {
  return (
    <div className="page">
      <main className="page__main">
        <div className="not-found">
          <span className="not-found__code">{t('forbidden.code')}</span>
          <h1 className="not-found__title">{t('forbidden.title')}</h1>
          <p className="not-found__subtitle">{t('forbidden.subtitle')}</p>
          <a href="/" className="not-found__back">
            <Home />
            {t('forbidden.back')}
          </a>
        </div>
      </main>
    </div>
  )
}
