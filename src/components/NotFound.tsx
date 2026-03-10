import { Link } from 'react-router-dom'
import type { TFunc } from '../types'

interface NotFoundProps {
  t: TFunc
}

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

export function NotFound({ t }: NotFoundProps) {
  return (
    <div className="page">
      <main className="page__main">
        <div className="not-found">
          <span className="not-found__code">{t('not_found.code')}</span>
          <h1 className="not-found__title">{t('not_found.title')}</h1>
          <p className="not-found__subtitle">{t('not_found.subtitle')}</p>
          <Link to="/" className="not-found__back">
            <HomeIcon />
            {t('not_found.back')}
          </Link>
        </div>
      </main>
    </div>
  )
}
