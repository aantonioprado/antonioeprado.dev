import { Home } from '../../components/icons'
import type { TFunc } from '../../types'

interface ServerErrorProps {
  t: TFunc
}

export function ServerError({ t }: ServerErrorProps) {
  return (
    <div className="page">
      <main className="page-main">
        <div className="not-found">
          <span className="not-found-code">{t('server_error.code')}</span>
          <h1 className="not-found-title">{t('server_error.title')}</h1>
          <p className="not-found-titlesubtitle">{t('server_error.subtitle')}</p>
          <a href="/" className="not-found-titleback">
            <Home />
            {t('server_error.back')}
          </a>
        </div>
      </main>
    </div>
  )
}
