import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Stack } from './sections/Stack'
import { Projects } from './sections/Projects'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { experience } from '../../config/experience'
import { skillCategories } from '../../config/skills'
import { projects } from '../../config/projects'
import { certifications } from '../../config/certifications'
import { site } from '../../config/site'
import type { TFunc } from '../../types'

interface HomeProps {
  t: TFunc
}

export function Home({ t }: HomeProps) {
  return (
    <div className="page">
      <Nav t={t} />

      <main className="page-main page-main--home">
        <Hero t={t} />
        <About t={t} />
        <Experience t={t} entries={experience} />
        <Stack t={t} categories={skillCategories} />
        <Projects t={t} projects={projects} />
        <Certifications t={t} certifications={certifications} />
        <Contact t={t} />
      </main>

      <footer className="page-footer">
        <p suppressHydrationWarning>{t('page.footer', site.year, site.author)}</p>
      </footer>
    </div>
  )
}
