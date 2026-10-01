export default function Projects({ t }) {
  return t.projects.map((p) => (
    <article className="entry" key={p.title}>
      <p className="meta">{p.meta}</p>
      <h3 className="etitle">{p.title}</h3>
      <p className="ebody">{p.body}</p>
      <div className="tags">
        {p.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      {p.link && (
        <a className="btn" href={p.link.href} target="_blank" rel="noopener noreferrer">
          {p.link.label}
        </a>
      )}
    </article>
  ))
}
