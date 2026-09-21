import type { SkillCategory } from '../../../config/skills'
import type { TFunc } from '../../../types'

interface StackProps {
  t: TFunc
  categories: SkillCategory[]
}

export function Stack({ t, categories }: StackProps) {
  return (
    <section id="stack" className="section">
      <p className="eyebrow">{t('stack.eyebrow')}</p>
      <h2 className="heading">{t('stack.title')}</h2>
      <div className="accent-rule" />

      <div className="stack-grid">
        {categories.map((category) => (
          <div key={category.id} className="card stack-card">
            <h3 className="stack-category">{category.label}</h3>
            <div className="chip-row">
              {category.items.map((item) => (
                <span key={item} className="chip">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
