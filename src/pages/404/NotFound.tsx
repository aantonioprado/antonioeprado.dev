import { Home } from '../../components/icons'
import type { TFunc } from '../../types'

interface NotFoundProps {
  t: TFunc
}

export function NotFound({ t }: NotFoundProps) {
  return (
    <div className="page">
      <main className="page-main">
        <div className="not-found">
          <span className="not-found-code">{t('not_found.code')}</span>
          <h1 className="not-found-title">{t('not_found.title')}</h1>
          <p className="not-found-titlesubtitle">{t('not_found.subtitle')}</p>
          <a href="/" className="not-found-titleback">
            <Home />
            {t('not_found.back')}
          </a>
        </div>
      </main>
    </div>
  )
}
