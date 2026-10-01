import { links } from '../data/content.js'

export default function Menu({ t, open, onAbout, onClose }) {
  return (
    <div className={open ? 'menu open' : 'menu'} id="na-menu" role="menu" aria-label={t.ui.menu}>
      <button className="mi" type="button" role="menuitem" onClick={onAbout}>
        {t.menu.about}
      </button>
      <hr />
      <a className="mi" role="menuitem" href={links.source} target="_blank" rel="noopener noreferrer" onClick={onClose}>
        <span>{t.menu.source}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}
