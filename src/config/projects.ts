export interface Project {
  id: string
  name: string
  description: string
  repoUrl: string
}

export const projects: Project[] = [
  {
    id: 'go-architecture',
    name: 'go-architecture',
    description: 'Comparação lado a lado de 9 padrões de arquitetura de software em Go, todos implementando a mesma API CRUD de usuário.',
    repoUrl: 'https://github.com/aantonioprado/go-architecture',
  },
]
