import { useEffect, useRef, useState } from 'react'
import { content } from './data/content.js'
import { toggleTheme } from './lib/theme.js'
import { useClock } from './hooks/useClock.js'
import MenuBar from './components/MenuBar.jsx'
import Menu from './components/Menu.jsx'
import Desktop from './components/Desktop.jsx'

export default function App() {
  const [lang, setLang] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const clock = useClock(lang)
  const t = content[lang]
  const live = useRef({})
  live.current = { menuOpen }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape' || !live.current.menuOpen) return
      setMenuOpen(false)
      document.querySelector('[data-menu-button]')?.focus()
    }
    const onDown = (e) => {
      if (!e.target.closest('#na-menu, [data-menu-button]')) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [])

  function toggleMenu(e) {
    const opening = !menuOpen
    setMenuOpen(opening)
    if (opening && e.detail === 0) requestAnimationFrame(() => document.querySelector('#na-menu .mi')?.focus())
  }

  return (
    <div className="os">
      <MenuBar
        t={t}
        lang={lang}
        appTitle={t.desktop}
        clock={clock}
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
        onToggleLang={() => setLang((l) => (l === 'en' ? 'ru' : 'en'))}
        onToggleTheme={toggleTheme}
      />
      <Menu t={t} open={menuOpen} onAbout={() => setMenuOpen(false)} onClose={() => setMenuOpen(false)} />
      <main className="desk">
        <Desktop t={t} lang={lang} />
      </main>
    </div>
  )
}
