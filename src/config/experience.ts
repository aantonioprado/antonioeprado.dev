export interface ExperienceEntry {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string | null
  bullets: string[]
  technologies: string[]
}

export const experience: ExperienceEntry[] = [
  {
    id: 'grupomax-senior',
    company: 'Grupomax Tecnologia',
    role: 'Desenvolvedor Full Stack Sênior',
    startDate: '2024-01',
    endDate: null,
    bullets: [
      'Lidero o desenvolvimento de soluções escaláveis, de alta disponibilidade e mission-critical, orientando arquitetura e boas práticas de engenharia.',
      'Projetei e implementei um sistema completo de backup automatizado em Python com compressão, criptografia e validação de integridade, aumentando significativamente a segurança e a confiabilidade dos dados corporativos.',
      'Reduzi em aproximadamente 30% o tempo de identificação e diagnóstico de incidentes por meio da implementação de soluções de observabilidade com Prometheus e Grafana, utilizando métricas, logs, distributed tracing, dashboards e alertas para monitoramento de aplicações e infraestrutura.',
      'Atuo como responsável técnico na construção de APIs REST e microsserviços em Go, além do desenvolvimento de aplicações web em React, Angular e Node.js (Express), garantindo qualidade, segurança e performance.',
      'Otimizo bancos de dados com foco em alta performance, reduzindo latência e garantindo estabilidade em ambientes de alto volume de dados.',
      'Defini e implementei arquiteturas distribuídas com RabbitMQ e Redis, utilizando filas, workers e cache para processamento assíncrono, desacoplamento de serviços e aumento da resiliência em sistemas críticos.',
      'Gerencio infraestrutura baseada em Docker, realizando deploys, monitoramento e manutenção dos ambientes.',
      'Atuo no planejamento técnico e na organização das entregas, contribuindo para a evolução dos processos de desenvolvimento.',
      'Implemento e mantenho pipelines de CI/CD, garantindo releases estáveis e ambientes de desenvolvimento padronizados.',
      'Desenvolvo e mantenho testes unitários e testes E2E com Playwright, contribuindo para a qualidade e confiabilidade das aplicações.',
    ],
    technologies: ['Go', 'Python', 'React', 'Angular', 'Docker', 'Nginx', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'GitHub', 'RabbitMQ', 'Prometheus', 'Grafana'],
  },
  {
    id: 'grupomax-pleno',
    company: 'Grupomax Tecnologia',
    role: 'Desenvolvedor Full Stack Pleno',
    startDate: '2021-06',
    endDate: '2024-01',
    bullets: [
      'Desenvolvi e mantive sistemas web e aplicações internas de médio porte, com foco em automação, performance e confiabilidade.',
      'Modelei e otimizei bancos MySQL e PostgreSQL, aplicando normalização, tuning e boas práticas de arquitetura de dados.',
      'Desenvolvi APIs REST e serviços backend utilizando Go (Gin e Chi), Node.js (Express) e Python, seguindo princípios de Clean Architecture e abordagem API-First.',
      'Participei do desenvolvimento e evolução de aplicações baseadas em microsserviços, contribuindo para a modularidade e escalabilidade dos sistemas.',
      'Realizei deploys e manutenção de ambientes utilizando Docker, contribuindo para a padronização e estabilidade dos ambientes de desenvolvimento e produção.',
      'Apoiei a resolução de problemas técnicos e integrações críticas, colaborando com times internos e clientes na implementação de soluções.',
      'Atuei no processo ágil, participando de refinamentos, estimativas e planejamento de sprints.',
      'Colaborei com práticas de versionamento, code review e integração contínua utilizando GitHub.',
    ],
    technologies: ['Go', 'Python', 'PHP', 'JavaScript', 'TypeScript', 'Docker', 'MySQL', 'PostgreSQL', 'GitHub', 'MongoDB', 'Redis'],
  },
  {
    id: 'grupomax-junior',
    company: 'Grupomax Tecnologia',
    role: 'Desenvolvedor Full Stack Júnior',
    startDate: '2018-06',
    endDate: '2021-06',
    bullets: [
      'Desenvolvi e mantive aplicações web internas, realizando correções, ajustes e implementações de novas funcionalidades.',
      'Criei landing pages utilizando WordPress e PHP, realizando customizações e adaptações conforme os requisitos dos projetos.',
      'Desenvolvi funcionalidades utilizando JavaScript, TypeScript, PHP e Angular, seguindo padrões de desenvolvimento e boas práticas definidos pela equipe.',
      'Apoiei a modelagem inicial e a manutenção de bancos de dados MySQL e PostgreSQL.',
      'Realizei integrações com APIs internas e externas, seguindo padrões de desenvolvimento e orientações técnicas da equipe.',
      'Contribuí com testes, code review e documentação técnica, apoiando a qualidade e a manutenção das aplicações.',
      'Prestei suporte a clientes em configurações de hospedagem, gerenciamento de e-mails e outras atividades relacionadas à infraestrutura.',
      'Utilizei Git para versionamento de código e atuei em um ambiente de desenvolvimento baseado em metodologias Scrum.',
    ],
    technologies: ['JavaScript', 'TypeScript', 'PHP', 'HTML', 'CSS', 'Angular', 'MySQL', 'PostgreSQL', 'Git'],
  },
]
