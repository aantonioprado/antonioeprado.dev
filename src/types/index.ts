export type Theme = 'light' | 'dark'

export type TFunc = (key: string, ...args: (string | number)[]) => string

export type Locale = 'en-us' | 'pt-br'

export interface Translations {
  loading: string
  page: {
    title: string
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
  nav: {
    about: string
    experience: string
    stack: string
    projects: string
    certifications: string
    contact: string
  }
  hero: {
    eyebrow: string
    subtitle: string
    cta_projects: string
    cta_contact: string
  }
  about: {
    eyebrow: string
    title: string
  }
  experience: {
    eyebrow: string
    title: string
    present: string
  }
  stack: {
    eyebrow: string
    title: string
  }
  projects: {
    eyebrow: string
    title: string
    view_repo: string
  }
  certifications: {
    eyebrow: string
    title: string
    in_progress: string
  }
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    cta_email: string
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
