export interface Certification {
  id: string
  name: string
  institution: string
  period: string
  kind: 'degree' | 'course'
  inProgress?: boolean
}

export const certifications: Certification[] = [
  {
    id: 'unicesumar-ciberseguranca',
    name: 'Tecnólogo em Cibersegurança',
    institution: 'Unicesumar',
    period: 'Abril/2023 – Agosto/2026',
    kind: 'degree',
    inProgress: true,
  },
  {
    id: 'alura-go',
    name: 'Go: a linguagem do Google',
    institution: 'Alura',
    period: '2026',
    kind: 'course',
  },
  {
    id: 'anthropic-claude-academy',
    name: 'Claude Academy: Claude Code in Action',
    institution: 'Anthropic',
    period: '2026',
    kind: 'course',
  },
  {
    id: 'rocketseat-go',
    name: 'Go',
    institution: 'Rocketseat',
    period: '2025',
    kind: 'course',
  },
  {
    id: 'rocketseat-angular',
    name: 'Angular - Curso Introdutório',
    institution: 'Rocketseat',
    period: '2025',
    kind: 'course',
  },
  {
    id: 'vip-web-design',
    name: 'Web Design',
    institution: 'VIP Treinamento Profissional',
    period: '2018',
    kind: 'course',
  },
  {
    id: 'vip-informatica-basica',
    name: 'Informática Básica',
    institution: 'VIP Treinamento Profissional',
    period: '2015',
    kind: 'course',
  },
]
