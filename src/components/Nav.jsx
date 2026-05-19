import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About',      href: '#about',   section: 'about'   },
  { label: 'Work',       href: '#work',    section: 'work'    },
  { label: 'Contact Me', href: '#contact', section: 'contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('about')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const close = () => setOpen(false)

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    close()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="nav-inner">
        <a
          className="nav-name"
          href="#about"
          onClick={e => handleLinkClick(e, '#about')}
        >
          Richa Chauhan
        </a>

        <div className="nav-links">
          {NAV_LINKS.map(({ label, href, section }) => (
            <a
              key={section}
              href={href}
              className={`nav-link${active === section ? ' active' : ''}`}
              onClick={e => handleLinkClick(e, href)}
            >
              {label}
            </a>
          ))}
        </div>

        <a href="/RichaChauhan-CV.pdf" download className="btn btn-outline nav-cv">
          Download CV
        </a>

        <button
          className={`hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobileNav"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`nav-mobile${open ? ' open' : ''}`}
        id="mobileNav"
        role="menu"
      >
        {NAV_LINKS.map(({ label, href, section }) => (
          <a
            key={section}
            href={href}
            className="nav-link"
            role="menuitem"
            onClick={e => handleLinkClick(e, href)}
          >
            {label}
          </a>
        ))}
        <a
          href="/RichaChauhan-CV.pdf"
          download
          className="btn btn-outline"
          role="menuitem"
        >
          Download CV
        </a>
      </div>
    </nav>
  )
}
