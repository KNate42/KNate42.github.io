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
import ColleaguePage from './pages/ColleaguePage'

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()
  const [lang, setLang] = useState('en')
  const [page, setPage] = useState('main')
  const t = content[lang]
  const toggleLang = () => setLang(l => (l === 'en' ? 'ru' : 'en'))

  if (page === 'colleague') {
    return (
      <>
        <Cursor />
        <div className="grain-overlay" aria-hidden="true" />
        <ColleaguePage onBack={() => setPage('main')} theme={theme} toggleTheme={toggleTheme} />
      </>
    )
  }

  return (
    <>
      <Cursor />
      <div className="grain-overlay" aria-hidden="true" />

      <Masthead lang={lang} />
      <Nav
        t={t}
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        toggleLang={toggleLang}
        onViewColleague={() => setPage('colleague')}
      />

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
