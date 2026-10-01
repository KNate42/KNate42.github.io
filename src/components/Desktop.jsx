import LiveName from './LiveName.jsx'

export default function Desktop({ t, lang }) {
  return (
    <div className="hero">
      <p className="st">
        <span className="dot" aria-hidden="true" />
        {t.status}
      </p>
      <LiveName lang={lang} />
      <p className="role">{t.role}</p>
    </div>
  )
}
