import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {}
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
