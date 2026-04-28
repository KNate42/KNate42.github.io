import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Nav({ t, theme, toggleTheme, lang, toggleLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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
        className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
        style={{
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">

          {/* Brand */}
          <a
            href="#"
            className="font-display font-extrabold text-lg tracking-tighter fg transition-opacity hover:opacity-70"
            style={{ letterSpacing: '-0.05em' }}
          >
            N.A.
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {t.nav.links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="link-line text-sm font-medium fg-muted hover:fg transition-colors duration-200"
                style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600 }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Lang toggle */}
            <button
              onClick={toggleLang}
              className="hidden md:flex items-center h-8 px-3 rounded-md text-xs font-bold tracking-widest fg-muted hover:fg transition-colors duration-200 b-ui"
              style={{
                border: '1px solid var(--border)',
                fontFamily: 'Manrope, sans-serif',
              }}
              aria-label="Switch language"
            >
              {lang === 'en' ? 'RU' : 'EN'}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-md flex items-center justify-center fg-muted hover:fg transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 fg"
              aria-label="Menu"
              aria-expanded={open}
            >
              <span
                className="block h-px w-5 transition-transform duration-300 origin-center"
                style={{
                  background: 'var(--text)',
                  transform: open ? 'translateY(4px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block h-px transition-opacity duration-300"
                style={{
                  background: 'var(--text)',
                  width: open ? '20px' : '12px',
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                className="block h-px w-5 transition-transform duration-300 origin-center"
                style={{
                  background: 'var(--text)',
                  transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'var(--bg)', opacity: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              className="fixed inset-x-0 top-16 bottom-0 z-40 md:hidden flex flex-col p-8 gap-8"
              style={{ background: 'var(--bg)' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav className="flex flex-col gap-6">
                {t.nav.links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="font-display text-3xl font-extrabold tracking-tighter fg"
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="flex items-center gap-3 mt-auto">
                <button
                  onClick={() => { toggleLang(); }}
                  className="h-10 px-4 rounded-md text-sm font-bold tracking-widest fg-muted b-ui"
                  style={{ border: '1px solid var(--border)', fontFamily: 'Manrope, sans-serif' }}
                >
                  {lang === 'en' ? 'RU' : 'EN'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}
