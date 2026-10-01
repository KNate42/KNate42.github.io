import { useRef } from 'react'
import { links } from '../data/content.js'
import { WINDOW_IDS } from '../lib/windows.js'
import Photo from './Photo.jsx'

const ICONS = {
  projects: (
    <svg className="dimg" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M7 17a5 5 0 0 1 5-5h12.5l5 5H52a5 5 0 0 1 5 5v4H7z" fill="url(#g-folder-back)" />
      <rect x="5" y="21" width="54" height="34" rx="6" fill="url(#g-folder)" />
      <path d="M27 32.5l-5 5 5 5M37 32.5l5 5-5 5" stroke="#1d5fb8" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".6" />
    </svg>
  ),
  skills: (
    <svg className="dimg" viewBox="0 0 64 64" aria-hidden="true">
      <rect x="3" y="3" width="58" height="58" rx="14" fill="url(#g-dark)" />
      <rect x="3.5" y="3.5" width="57" height="57" rx="13.5" fill="none" stroke="rgba(255,255,255,.14)" />
      <rect x="14" y="35" width="9" height="16" rx="2.5" fill="url(#g-bar1)" opacity=".75" />
      <rect x="27.5" y="26" width="9" height="25" rx="2.5" fill="url(#g-bar1)" />
      <rect x="41" y="16" width="9" height="35" rx="2.5" fill="url(#g-bar1)" opacity=".9" />
      <path d="M13 30l14.5-9 13.5 3 11-10" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  contact: (
    <svg className="dimg" viewBox="0 0 64 64" aria-hidden="true">
      <rect x="3" y="3" width="58" height="58" rx="14" fill="url(#g-blue)" />
      <rect x="13" y="19" width="38" height="27" rx="4.5" fill="#fff" />
      <path d="M14.8 21.8L32 34.2l17.2-12.4" stroke="#1d74e4" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

const GITHUB_ICON = (
  <svg className="dimg" viewBox="0 0 64 64" aria-hidden="true">
    <rect x="3" y="3" width="58" height="58" rx="14" fill="#0d1117" />
    <rect x="3.5" y="3.5" width="57" height="57" rx="13.5" fill="none" stroke="rgba(255,255,255,.16)" />
    <path
      transform="translate(14 14) scale(2.25)"
      fill="#fff"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
)

const MAGNIFY = '(hover: hover) and (pointer: fine) and (min-width: 701px) and (prefers-reduced-motion: no-preference)'

export default function Dock({ t, wins, onItem }) {
  const nav = useRef(null)
  const centers = useRef([])
  const items = () => [...nav.current.querySelectorAll('.ditem')]

  function onEnter() {
    centers.current = items().map((it) => {
      const r = it.getBoundingClientRect()
      return r.left + r.width / 2
    })
  }

  function onMove(e) {
    if (e.pointerType !== 'mouse' || !matchMedia(MAGNIFY).matches) return
    items().forEach((it, i) => {
      const d = e.clientX - centers.current[i]
      it.style.setProperty('--s', (1 + 0.38 * Math.exp(-(d * d) / (2 * 62 * 62))).toFixed(3))
    })
  }

  function onLeave() {
    items().forEach((it) => it.style.setProperty('--s', '1'))
  }

  return (
    <nav className="dock" aria-label={t.ui.sections} ref={nav} onPointerEnter={onEnter} onPointerMove={onMove} onPointerLeave={onLeave}>
      {WINDOW_IDS.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={wins[id].status !== 'closed' ? 'ditem open' : 'ditem'}
          data-dock={id}
          onClick={(e) => {
            e.preventDefault()
            onItem(id)
          }}
        >
          {id === 'about' ? <Photo className="dimg" /> : ICONS[id]}
          <span className="dlabel">{t.dock[id]}</span>
          <span className="run" aria-hidden="true" />
        </a>
      ))}
      <span className="dsep" aria-hidden="true" />
      <a className="ditem d-ext" href={links.github.href} target="_blank" rel="noopener noreferrer">
        {GITHUB_ICON}
        <span className="dlabel">{t.dock.github}</span>
        <span className="run" aria-hidden="true" />
      </a>
    </nav>
  )
}
