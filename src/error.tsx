import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { ErrorPage } from './pages/ErrorPage'
import { isErrorKind } from './pages/errors'

if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {}
}

const container = document.getElementById('root')!
const kind = container.dataset.error

hydrateRoot(
  container,
  <StrictMode>
    <ErrorPage kind={isErrorKind(kind) ? kind : '404'} />
  </StrictMode>,
)
