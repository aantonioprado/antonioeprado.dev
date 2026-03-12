import { Home } from '../../components/icons'
import type { TFunc } from '../../types'

interface ForbiddenProps {
  t: TFunc
}

export function Forbidden({ t }: ForbiddenProps) {
  return (
    <div className="page">
      <main className="page-main">
        <div className="not-found">
          <span className="not-found-code">{t('forbidden.code')}</span>
          <h1 className="not-found-title">{t('forbidden.title')}</h1>
          <p className="not-found-titlesubtitle">{t('forbidden.subtitle')}</p>
          <a href="/" className="not-found-titleback">
            <Home />
            {t('forbidden.back')}
          </a>
        </div>
      </main>
    </div>
  )
}
