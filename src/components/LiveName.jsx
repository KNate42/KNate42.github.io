import { Fragment, useEffect, useRef, useState } from 'react'
import { NAMES } from '../data/content.js'

// noise comes from the target script, so an English visit never pulls the Cyrillic font
const NOISE = {
  en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  ru: 'БГДЖЗИЛПФЦЧШЩЫЭЮЯбгджзилпфцчшщыэюя0123456789',
}
const STAGGER = 30
const LETTER_MS = 360
const TICK_MS = 45

function scramble(el, pool) {
  const letters = [...el.querySelectorAll('.ch')]
  const t0 = performance.now()
  let last = 0
  let raf = 0
  const step = (now) => {
    const t = now - t0
    const tick = now - last > TICK_MS
    if (tick) last = now
    let done = true
    letters.forEach((s, i) => {
      const start = i * STAGGER
      if (t < start + LETTER_MS) {
        done = false
        if (t >= start && tick) {
          s.dataset.n = pool[(Math.random() * pool.length) | 0]
          s.classList.add('scr')
        }
      } else if (s.classList.contains('scr')) s.classList.remove('scr')
    })
    if (!done) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
  return () => {
    cancelAnimationFrame(raf)
    letters.forEach((s) => s.classList.remove('scr'))
  }
}

export default function LiveName({ lang }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(lang)
  const other = lang === 'en' ? 'ru' : 'en'

  useEffect(() => {
    setShown(lang)
  }, [lang])

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    return scramble(ref.current, NOISE[shown])
  }, [shown])

  const text = NAMES[shown]
  return (
    <h1
      className="name"
      aria-label={NAMES[lang]}
      ref={ref}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setShown(other)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setShown(lang)
      }}
      onClick={() => setShown((s) => (s === lang ? other : lang))}
    >
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
