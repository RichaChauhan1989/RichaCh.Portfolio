import { useEffect, useRef, useState } from 'react'

function Thumbnail({ type }) {
  if (type === 'sphara') {
    return (
      <div className="card-thumbnail card-thumb--sphara" aria-hidden="true">
        <div className="sphara-dot" />
      </div>
    )
  }
  if (type === 'deloitte') {
    return (
      <div className="card-thumbnail card-thumb--deloitte" aria-hidden="true">
        <div className="deloitte-dots" />
        <div className="deloitte-label">3CD</div>
        <div className="deloitte-bar" />
      </div>
    )
  }
  return (
    <div className="card-thumbnail card-thumb--techdts" aria-hidden="true">
      <div className="techdts-pattern" />
      <div className="coming-soon-badge">Coming Soon</div>
    </div>
  )
}

export default function CaseCard({ project, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const isLive = project.status === 'live'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 90)
          obs.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <article
      ref={ref}
      className={[
        'case-card',
        isLive ? 'case-card--live' : 'case-card--placeholder',
        visible ? 'visible' : '',
      ].join(' ').trim()}
      aria-label={`${project.title}${isLive ? ' case study' : ' — coming soon'}`}
    >
      <Thumbnail type={project.thumbType} />

      <div className="card-body">
        <div className="card-meta">
          {project.tags.map(tag => (
            <span key={tag} className="card-tag">{tag}</span>
          ))}
        </div>

        <h2 className="card-title">{project.title}</h2>
        <p className="card-desc">{project.description}</p>

        {isLive && (
          <a
            href={project.href}
            className="card-link"
            aria-label={`View ${project.title} case study`}
          >
            View Case Study{' '}
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </article>
  )
}
