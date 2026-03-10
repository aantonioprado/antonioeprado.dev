export type Theme = 'light' | 'dark'

export type TFunc = (key: string, ...args: (string | number)[]) => string

export type Locale = 'en-us' | 'pt-br'

export interface Translations {
  loading: string
  page: {
    title: string
    role: string
    subtitle: string
    footer: string
  }
  controls: {
    tooltip_to_dark: string
    tooltip_to_light: string
  }
  social: {
    linkedin: string
    github: string
  }
  not_found: {
    code: string
    title: string
    subtitle: string
    back: string
  }
  forbidden: {
    code: string
    title: string
    subtitle: string
    back: string
  }
  server_error: {
    code: string
    title: string
    subtitle: string
    back: string
  }
}
