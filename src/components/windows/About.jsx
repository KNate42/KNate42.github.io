import { links } from '../../data/content.js'
import Photo from '../Photo.jsx'

export default function About({ t, onContact }) {
  const a = t.about
  return (
    <>
      <div className="banner" aria-hidden="true" />
      <div className="about-top">
        <Photo className="avatar" alt={t.name} />
        <div>
          <h3 className="a-name">{t.name}</h3>
          <p className="a-role">{t.role}</p>
          <p className="a-status">
            <span className="dot" aria-hidden="true" />
            {t.status}
          </p>
        </div>
      </div>
      <div className="actions">
        <a
          className="btn primary"
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            onContact()
          }}
        >
          {a.contactMe}
        </a>
        <a className="btn" href={links.github.href} target="_blank" rel="noopener noreferrer">
          {a.github}
        </a>
      </div>
      <p className="a-bio">{a.bio}</p>
      <dl className="specs">
        {a.specs.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>
              {s.value}
              {s.sub && <span className="sub">{s.sub}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </>
  )
}
