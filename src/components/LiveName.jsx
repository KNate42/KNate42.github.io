import { Fragment } from 'react'
import { NAMES } from '../data/content.js'

export default function LiveName({ lang }) {
  const text = NAMES[lang]
  return (
    <h1 className="name" aria-label={text}>
      {text.split(' ').map((word, wi) => (
        <Fragment key={wi}>
          {wi > 0 && ' '}
          <span className="w" aria-hidden="true">
            {[...word].map((ch, ci) => (
              <span className="ch" key={ci}>
                {ch}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </h1>
  )
}
