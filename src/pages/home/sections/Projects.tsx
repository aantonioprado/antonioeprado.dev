import type { Project } from '../../../config/projects'
import type { TFunc } from '../../../types'

interface ProjectsProps {
  t: TFunc
  projects: Project[]
}

export function Projects({ t, projects }: ProjectsProps) {
  return (
    <section id="projects" className="section">
      <p className="eyebrow">{t('projects.eyebrow')}</p>
      <h2 className="heading">{t('projects.title')}</h2>
      <div className="accent-rule" />

      <div className="proj-grid">
        {projects.map((project) => (
          <article key={project.id} className="card project-card hoverable">
            <h3 className="project-name">{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-out">
              {t('projects.view_repo')}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
