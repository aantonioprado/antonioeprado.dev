import { Layout } from '../components/Layout'
import { errorPages, type ErrorKind } from './errors'

interface ErrorPageProps {
  kind: ErrorKind
}

export function ErrorPage({ kind }: ErrorPageProps) {
  const { Component, documentTitle } = errorPages[kind]

  return (
    <Layout documentTitle={documentTitle}>
      {(t) => <Component t={t} />}
    </Layout>
  )
}
