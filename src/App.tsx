import { Routes, Route } from 'react-router'
import { Layout } from './components/Layout'
import { ComingSoon } from './pages/home/ComingSoon'
import { NotFound } from './pages/404/NotFound'
import type { TFunc } from './types'

const documentTitle = (t: TFunc) => t('page.title')

export default function App() {
  return (
    <Layout documentTitle={documentTitle}>
      {(t) => (
        <Routes>
          <Route path="/" element={<ComingSoon t={t} />} />
          <Route path="*" element={<NotFound t={t} />} />
        </Routes>
      )}
    </Layout>
  )
}
