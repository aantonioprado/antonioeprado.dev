export interface SkillCategory {
  id: string
  label: string
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    label: 'Backend',
    items: ['Go (Gin e Chi)', 'Python', 'Node.js (Express)', 'PHP', 'APIs REST'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['Angular 2+', 'React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap', 'Angular Material', 'PrimeNG'],
  },
  {
    id: 'arquitetura',
    label: 'Arquitetura',
    items: ['DDD', 'Clean Architecture', 'Design Patterns', 'SOLID', 'Microsserviços', 'Sistemas Distribuídos'],
  },
  {
    id: 'bancos-de-dados',
    label: 'Bancos de Dados',
    items: ['MySQL', 'PostgreSQL', 'SQL Server', 'MongoDB', 'Redis'],
  },
  {
    id: 'mensageria',
    label: 'Mensageria & Processamento',
    items: ['RabbitMQ', 'Redis', 'Filas assíncronas', 'Workers', 'Processamento distribuído'],
  },
  {
    id: 'infra-devops',
    label: 'Infraestrutura & DevOps',
    items: ['Docker', 'Nginx', 'AWS S3', 'AWS IAM', 'GitHub', 'GitLab', 'Bitbucket', 'Azure DevOps'],
  },
  {
    id: 'observabilidade',
    label: 'Observabilidade',
    items: ['Prometheus', 'Grafana', 'Métricas', 'Dashboards', 'Monitoramento de aplicações e infraestrutura'],
  },
  {
    id: 'testes',
    label: 'Testes',
    items: ['Testes unitários', 'Testes E2E com Playwright'],
  },
  {
    id: 'seguranca',
    label: 'Segurança & Integrações',
    items: ['Autenticação segura', 'Integração com APIs', 'Gestão de ambientes', 'Automação de rotinas'],
  },
  {
    id: 'metodologias',
    label: 'Metodologias & Processos',
    items: ['Scrum', 'Versionamento', 'Code Review', 'CI/CD', 'Práticas ágeis'],
  },
  {
    id: 'modelagem',
    label: 'Modelagem & Performance',
    items: ['Modelagem de dados', 'Análise de processos', 'Otimização de queries', 'Performance de bancos de dados'],
  },
]
