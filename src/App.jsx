import { useEffect, useRef, useState } from 'react'
import { content } from './data/content.js'
import { WINDOW_IDS } from './lib/windows.js'
import { toggleTheme } from './lib/theme.js'
import { useClock } from './hooks/useClock.js'
import { useWindows } from './hooks/useWindows.js'
import IconDefs from './components/IconDefs.jsx'
import MenuBar from './components/MenuBar.jsx'
import Menu from './components/Menu.jsx'
import Desktop from './components/Desktop.jsx'
import Window from './components/Window.jsx'
import Dock from './components/Dock.jsx'
import About from './components/windows/About.jsx'
import Projects from './components/windows/Projects.jsx'
import Skills from './components/windows/Skills.jsx'

export default function App() {
  const [lang, setLang] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const deskRef = useRef(null)
  const wm = useWindows(deskRef)
  const clock = useClock(lang)
  const t = content[lang]
  const live = useRef({})
  live.current = { menuOpen, front: wm.front, close: wm.close }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      const { menuOpen, front, close } = live.current
      if (menuOpen) {
        setMenuOpen(false)
        document.querySelector('[data-menu-button]')?.focus()
      } else if (front) close(front)
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

  const bodies = {
    about: <About t={t} onContact={() => wm.open('contact')} />,
    projects: <Projects t={t} />,
    skills: <Skills t={t} />,
    contact: null,
  }

  return (
    <div className="os">
      <IconDefs />
      <MenuBar
        t={t}
        lang={lang}
        appTitle={wm.front ? t.titles[wm.front] : t.desktop}
        clock={clock}
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
        onToggleLang={() => setLang((l) => (l === 'en' ? 'ru' : 'en'))}
        onToggleTheme={toggleTheme}
      />
      <Menu
        t={t}
        open={menuOpen}
        onAbout={() => {
          setMenuOpen(false)
          wm.open('about')
        }}
        onClose={() => setMenuOpen(false)}
      />
      <main className="desk" ref={deskRef}>
        <Desktop t={t} lang={lang} />
        {WINDOW_IDS.map((id) => (
          <Window key={id} id={id} title={t.titles[id]} ui={t.ui} win={wm.state.wins[id]} z={wm.z(id)} front={wm.front === id} pos={wm.pos[id]} phone={wm.phone} wm={wm}>
            {bodies[id]}
          </Window>
        ))}
      </main>
      <Dock t={t} wins={wm.state.wins} onItem={wm.dock} />
    </div>
  )
}
