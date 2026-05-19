import { useReveal } from '../hooks/useReveal'
import { projects } from '../data/projects'
import CaseCard from './CaseCard'

export default function Work() {
  const { ref, visible } = useReveal()

  return (
    <section id="work" className="work-section" aria-labelledby="work-heading">
      <div className="wrap">
        <div
          ref={ref}
          className={`chapter-header reveal${visible ? ' visible' : ''}`}
        >
          <span className="chapter-num" id="work-heading">Selected Work</span>
          <div className="chapter-line" />
        </div>

        <div className="work-cards">
          {projects.map((project, i) => (
            <CaseCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
