import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

// Set your Formspree form ID here (e.g. 'xpzgkqra') to enable in-page submission.
// Leave empty to use the mailto fallback.
const FORMSPREE_ID = ''

const INITIAL_FIELDS  = { name: '', email: '', message: '' }
const INITIAL_ERRORS  = { name: false, email: false, message: false }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const [fields, setFields]   = useState(INITIAL_FIELDS)
  const [errors, setErrors]   = useState(INITIAL_ERRORS)
  const [status, setStatus]   = useState('idle') // idle | loading | success | error

  const chapterReveal = useReveal()
  const headingReveal = useReveal()
  const subReveal     = useReveal()

  function validate() {
    const e = {
      name:    !fields.name.trim(),
      email:   !fields.email.trim() || !EMAIL_RE.test(fields.email.trim()),
      message: !fields.message.trim(),
    }
    setErrors(e)
    return !e.name && !e.email && !e.message
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    setErrors(er => ({ ...er, [name]: false }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')

    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(e.target),
        })
        setStatus(res.ok ? 'success' : 'error')
      } catch {
        setStatus('error')
      }
    } else {
      const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name}`)
      const body = encodeURIComponent(
        `Name: ${fields.name}\nEmail: ${fields.email}\n\nMessage:\n${fields.message}`
      )
      window.location.href =
        `mailto:richasain1989@gmail.com?subject=${subject}&body=${body}`
      setTimeout(() => setStatus('success'), 600)
    }
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="wrap">

        <div
          ref={chapterReveal.ref}
          className={`chapter-header reveal${chapterReveal.visible ? ' visible' : ''}`}
        >
          <span className="chapter-num">Get in Touch</span>
          <div className="chapter-line" />
        </div>

        <h2
          ref={headingReveal.ref}
          className={`contact-heading reveal${headingReveal.visible ? ' visible' : ''}`}
          id="contact-heading"
        >
          Let's work together
        </h2>

        <p
          ref={subReveal.ref}
          className={`contact-subhead reveal${subReveal.visible ? ' visible' : ''}`}
        >
          Open to new opportunities in New Zealand and remote.
        </p>

        <div className="contact-inner">

          {status === 'success' ? (
            <div className="form-feedback success" role="alert">
              ✓ Thanks! I'll be in touch soon.
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  aria-required="true"
                  value={fields.name}
                  onChange={handleChange}
                  className={errors.name ? 'field-invalid' : ''}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <span className="field-error show" id="name-error" role="alert">
                    Please enter your name.
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  aria-required="true"
                  value={fields.email}
                  onChange={handleChange}
                  className={errors.email ? 'field-invalid' : ''}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <span className="field-error show" id="email-error" role="alert">
                    Please enter a valid email address.
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the opportunity..."
                  aria-required="true"
                  value={fields.message}
                  onChange={handleChange}
                  className={errors.message ? 'field-invalid' : ''}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <span className="field-error show" id="message-error" role="alert">
                    Please enter a message.
                  </span>
                )}
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading'
                    ? <span className="btn-loader" aria-hidden="true" />
                    : 'Send Message'}
                </button>
              </div>

              {status === 'error' && (
                <div className="form-feedback is-error" role="alert">
                  Something went wrong. Please email{' '}
                  <a href="mailto:richasain1989@gmail.com">
                    richasain1989@gmail.com
                  </a>{' '}
                  directly.
                </div>
              )}
            </form>
          )}

          <a
            href="/RichaChauhan-CV.pdf"
            download
            className="btn btn-outline contact-cv"
            aria-label="Download Richa Chauhan CV PDF"
          >
            Download CV
          </a>

        </div>
      </div>
    </section>
  )
}
