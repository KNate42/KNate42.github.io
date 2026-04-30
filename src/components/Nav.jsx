import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Nav({ t, theme, toggleTheme, lang, toggleLang, onViewColleague }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-[border-color,background] duration-300"
        style={{
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(1.2)' : 'none',
          borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 h-14 grid grid-cols-[auto_1fr_auto] items-center gap-6">

          <a href="#" className="flex items-baseline gap-2 group">
            <span
              className="display text-[22px] leading-none"
              style={{
                fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1',
                fontWeight: 700,
                color: 'var(--ink)',
              }}
            >
              Anfinogentov
            </span>
            <span
              className="text-[10px] num-tabular hidden sm:inline"
              style={{
                color: 'var(--signal)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.1em',
              }}
            >
              N°04
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 justify-center" aria-label="Primary">
            {t.nav.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="link-line text-[12px] fg-mute hover:fg transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, letterSpacing: '0.02em' }}
              >
                <span
                  className="num-tabular mr-3"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--signal)', fontSize: '10px' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 justify-end">
            <button
              onClick={onViewColleague}
              className="hidden md:flex items-center h-7 px-2.5 text-[10px] font-medium tracking-[0.18em] fg-mute hover:fg transition-colors"
              style={{ border: '1px solid var(--rule)', fontFamily: 'var(--font-mono)' }}
              aria-label="View colleague profile"
            >
              <span style={{ color: 'var(--signal)', marginRight: '5px' }}>◆</span>
              {lang === 'en' ? 'КОЛЛЕГА' : 'КОЛЛЕГА'}
            </button>

            <button
              onClick={toggleLang}
              className="hidden md:flex items-center h-7 px-2.5 text-[10px] font-medium tracking-[0.18em] fg-mute hover:fg transition-colors"
              style={{ border: '1px solid var(--rule)', fontFamily: 'var(--font-mono)' }}
              aria-label="Switch language"
            >
              {lang === 'en' ? 'EN/RU' : 'RU/EN'}
            </button>

            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center fg-mute hover:fg transition-colors"
              aria-label="Toggle theme"
              style={{ border: '1px solid var(--rule)' }}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1 fg"
              style={{ border: '1px solid var(--rule)' }}
              aria-label="Menu"
              aria-expanded={open}
            >
              <span className="block h-px w-4" style={{ background: 'var(--ink)', transform: open ? 'translateY(3px) rotate(45deg)' : 'none', transition: 'transform 0.25s' }} />
              <span className="block h-px w-4" style={{ background: 'var(--ink)', opacity: open ? 0 : 1, transition: 'opacity 0.2s' }} />
              <span className="block h-px w-4" style={{ background: 'var(--ink)', transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none', transition: 'transform 0.25s' }} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-[84px] bottom-0 z-40 md:hidden flex flex-col"
            style={{ background: 'var(--bg)' }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{    clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col px-6 pt-10">
              {t.nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="display flex items-baseline gap-3 py-5 fg"
                  style={{
                    fontSize: 'clamp(2.5rem, 12vw, 4.5rem)',
                    fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                    fontWeight: 600,
                    borderBottom: '1px solid var(--rule)',
                  }}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0,  opacity: 1 }}
                  transition={{ delay: i * 0.07 + 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--signal)', fontSize: '14px', fontWeight: 400, letterSpacing: '0.1em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto px-6 pb-10 flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="h-10 px-4 text-xs tracking-widest fg"
                style={{ border: '1px solid var(--rule)', fontFamily: 'var(--font-mono)' }}
              >
                {lang === 'en' ? 'EN / RU' : 'RU / EN'}
              </button>
              <button
                onClick={() => { close(); onViewColleague() }}
                className="h-10 px-4 text-xs tracking-widest flex items-center gap-2"
                style={{ border: '1px solid var(--rule)', fontFamily: 'var(--font-mono)', color: 'var(--signal)' }}
              >
                <span>◆</span>
                <span className="fg">КОЛЛЕГА</span>
              </button>
              <span className="text-[10px] tracking-[0.18em] fg-mute ml-auto" style={{ fontFamily: 'var(--font-mono)' }}>
                BUREAU OF DATA × WEB
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="3.5"/>
      <line x1="12" y1="2" x2="12" y2="4"/>
      <line x1="12" y1="20" x2="12" y2="22"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="2" y1="12" x2="4" y2="12"/>
      <line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}
