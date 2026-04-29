import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { content } from './data/content'
import Cursor from './components/Cursor'
import Masthead from './components/Masthead'
import Nav from './components/Nav'
import Hero from './components/sections/Hero'
import MarqueeSection from './components/sections/Marquee'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'

// top-level shell. holds the two pieces of cross-section state we
// actually need (theme + language) and threads them down. everything
// else is local to its own component on purpose — saves a context
// provider and the resume just isn't deep enough for that to matter.
export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()

  // language: 'en' | 'ru'. starts in english; intentionally not
  // persisted — user is here for ~30s, doesn't need a sticky pref.
  const [lang, setLang] = useState('en')
  const t = content[lang]
  const toggleLang = () => setLang(l => (l === 'en' ? 'ru' : 'en'))

  return (
    <>
      {/* custom cursor first so it sits behind everything but the
          grain layer; also no-ops on touch devices */}
      <Cursor />
      <div className="grain-overlay" aria-hidden="true" />

      <Masthead lang={lang} />
      <Nav t={t} theme={theme} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} />

      <main>
        <Hero t={t} lang={lang} />
        <MarqueeSection items={t.stack} lang={lang} />
        <Projects t={t} lang={lang} />
        <Skills t={t} lang={lang} />
        <Contact t={t} lang={lang} />
      </main>

      <Footer t={t} lang={lang} />
    </>
  )
}
