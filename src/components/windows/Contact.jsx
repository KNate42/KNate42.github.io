import { useRef, useState } from 'react'
import { links } from '../../data/content.js'
import { CONTACT_ENDPOINT } from '../../config.js'
import { LIMITS, sendContact } from '../../lib/contact.js'

export default function Contact({ t, lang }) {
  const c = t.contact
  const form = useRef(null)
  const [status, setStatus] = useState('idle')
  const [invalid, setInvalid] = useState(false)

  async function submit(e) {
    e.preventDefault()
    const el = form.current
    if (!el.checkValidity()) {
      setInvalid(true)
      el.querySelector(':invalid')?.focus()
      return
    }
    setInvalid(false)
    setStatus('sending')
    const data = new FormData(el)
    const result = await sendContact(
      { name: data.get('name'), contact: data.get('contact'), message: data.get('message'), company: data.get('company') || '', lang },
      { endpoint: CONTACT_ENDPOINT },
    )
    setStatus(result.ok ? 'sent' : 'error')
  }

  return (
    <>
      {status === 'sent' ? (
        <div className="sent" role="status">
          <b>{c.sentTitle}</b>
          <span>{c.sentBody}</span>
        </div>
      ) : (
        <>
          <form id="contact-form" ref={form} className={invalid ? 'mail invalid' : 'mail'} noValidate onSubmit={submit}>
            <div className="mrow">
              <span>{c.to}</span>
              <span className="to-chip">{c.recipient}</span>
            </div>
            <label className="mrow">
              <span>{c.from}</span>
              <input name="name" required maxLength={LIMITS.name} autoComplete="name" placeholder={c.namePlaceholder} />
            </label>
            <label className="mrow">
              <span>{c.replyTo}</span>
              <input name="contact" required minLength={3} maxLength={LIMITS.contact} autoComplete="email" placeholder={c.contactPlaceholder} />
            </label>
            <textarea name="message" required maxLength={LIMITS.message} rows={5} aria-label={c.messageLabel} placeholder={c.messagePlaceholder} />
            <div className="hp" aria-hidden="true">
              <input name="company" tabIndex={-1} autoComplete="off" />
            </div>
          </form>
          <div className="mfoot">
            <p className="mnote">{c.note}</p>
            <button className="btn primary" type="submit" form="contact-form" disabled={status === 'sending'}>
              {status === 'sending' ? c.sending : c.send}
            </button>
          </div>
          {status === 'error' && (
            <p className="send-error" role="alert">
              {c.error}
            </p>
          )}
        </>
      )}
      <h3 className="grp">{c.direct}</h3>
      <ul className="list">
        <li>
          <a href={`mailto:${links.email}`}>
            <span>{c.email}</span>
            <span className="val">{links.email}</span>
          </a>
        </li>
        <li>
          <a href={links.telegram.href} target="_blank" rel="noopener noreferrer">
            <span>Telegram</span>
            <span className="val">{links.telegram.handle} ↗</span>
          </a>
        </li>
        <li>
          <a href={links.linkedin.href} target="_blank" rel="noopener noreferrer">
            <span>LinkedIn</span>
            <span className="val">{links.linkedin.handle} ↗</span>
          </a>
        </li>
        <li>
          <a href={links.github.href} target="_blank" rel="noopener noreferrer">
            <span>GitHub</span>
            <span className="val">{links.github.handle} ↗</span>
          </a>
        </li>
      </ul>
    </>
  )
}
