import { Fragment } from 'react'

const TONE = { intermediate: 'lvl hi', junior: 'lvl', learning: 'lvl lo', familiar: 'lvl lo' }

export default function Skills({ t }) {
  const s = t.skills
  return (
    <>
      <p className="note">{s.note}</p>
      {s.groups.map((group) => (
        <Fragment key={group.name}>
          <h3 className="grp">{group.name}</h3>
          <ul className="list">
            {group.items.map(([name, level]) => (
              <li key={name}>
                <span>{name}</span>
                <span className={TONE[level]}>{s.levels[level]}</span>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
      <h3 className="grp">{s.learningTitle}</h3>
      <div className="chips">
        {s.learning.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </>
  )
}
