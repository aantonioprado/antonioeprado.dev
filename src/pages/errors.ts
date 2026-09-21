import type { ReactElement } from 'react'
import { NotFound } from './404/NotFound'
import { Forbidden } from './403/Forbidden'
import { ServerError } from './500/ServerError'
import type { TFunc } from '../types'

export const ERROR_KINDS = ['404', '403', '500'] as const

export type ErrorKind = (typeof ERROR_KINDS)[number]

interface ErrorPageDefinition {
  Component: (props: { t: TFunc }) => ReactElement
  documentTitle: (t: TFunc) => string
}

export const errorPages: Record<ErrorKind, ErrorPageDefinition> = {
  '404': {
    Component: NotFound,
    documentTitle: (t) => `${t('not_found.code')} · ${t('not_found.title')}`,
  },
  '403': {
    Component: Forbidden,
    documentTitle: (t) => `${t('forbidden.code')} · ${t('forbidden.title')}`,
  },
  '500': {
    Component: ServerError,
    documentTitle: (t) => `${t('server_error.code')} · ${t('server_error.title')}`,
  },
}

export function isErrorKind(value: string | undefined): value is ErrorKind {
  return ERROR_KINDS.includes(value as ErrorKind)
}
