import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ease = [0.22, 1, 0.36, 1]

function stampNow() {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Almaty',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }) + ' +05'
}

export default function ColleaguePage({ onBack, theme, toggleTheme }) {
  const [stamp, setStamp] = useState(stampNow())

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const id = setInterval(() => setStamp(stampNow()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* top strip — dark masthead bar */}
      <div
        className="w-full overflow-hidden"
        style={{ background: 'var(--strip-bg)', color: 'var(--strip-fg)', borderBottom: '1px solid var(--ink)' }}
      >
        <div
          className="max-w-[1500px] mx-auto px-4 md:px-8 h-7 flex items-center gap-x-6 overflow-x-auto whitespace-nowrap text-[10px] tracking-[0.18em]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {[
            ['ФАЙЛ', 'КОЛЛЕГА'],
            ['СТАТУС', 'АКТИВЕН'],
            ['ПРОФИЛЬ', 'БИО-ИССЛЕДОВАТЕЛЬ'],
            ['ВРЕМЯ', stamp],
          ].map(([k, v], i, arr) => (
            <span key={k} className="flex items-center gap-2 shrink-0">
              <span style={{ opacity: 0.5 }}>{k}</span>
              <span style={{ color: 'var(--signal)' }}>·</span>
              <span className="num-tabular">{v}</span>
              {i < arr.length - 1 && <span style={{ opacity: 0.3 }} className="ml-4 hidden md:inline">│</span>}
            </span>
          ))}
          <span className="ml-auto hidden lg:flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full blink" style={{ background: 'var(--signal)' }} aria-hidden="true" />
            <span style={{ color: 'var(--signal)' }}>В ЭФИРЕ</span>
          </span>
        </div>
      </div>

      {/* nav bar */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(14px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.2)',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 h-14 grid grid-cols-[auto_1fr_auto] items-center gap-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 fg-mute hover:fg transition-colors text-[12px] tracking-[0.16em]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span style={{ color: 'var(--signal)' }}>←</span>
            <span>НАЗАД</span>
          </button>

          <div className="flex justify-center">
            <span
              className="display text-[18px] leading-none fg"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1', fontWeight: 700 }}
            >
              Коллега
            </span>
          </div>

          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center fg-mute hover:fg transition-colors justify-self-end"
            aria-label="Toggle theme"
            style={{ border: '1px solid var(--rule)' }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <main className="px-4 md:px-8 pt-10 pb-24">
        <div className="max-w-[1500px] mx-auto">

          {/* section strip */}
          <div className="mb-10 md:mb-14">
            <div
              className="flex items-center justify-between text-[10px] tracking-[0.12em] sm:tracking-[0.18em] fg-mute whitespace-nowrap"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="flex items-center gap-3">
                <span style={{ color: 'var(--signal)' }}>◆</span>
                <span>ЗАПИСЬ</span>
                <span className="hidden sm:inline" style={{ opacity: 0.4 }}>—</span>
                <span className="hidden sm:inline">ПРОФИЛЬ КОЛЛЕГИ</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="hidden sm:inline">ЛИСТ</span>
                <span className="num-tabular fg">001 / 001</span>
              </span>
            </div>
            <div className="rule-h mt-3" />
            <div className="rule-h mt-1" style={{ height: '0.5px' }} />
          </div>

          {/* main content grid */}
          <div className="grid grid-cols-12 gap-x-4 gap-y-10 relative">

            {/* sidebar — desktop */}
            <aside className="hidden md:block col-span-2 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
                className="space-y-5"
              >
                <div className="text-[10px] tracking-[0.16em] fg-mute" style={{ fontFamily: 'var(--font-mono)' }}>
                  <div style={{ color: 'var(--signal)' }} className="mb-1">СУБЪЕКТ</div>
                  <div className="fg">А. ГОЛУБЕВ</div>
                </div>
                <div className="rule-h" />
                <div className="text-[10px] tracking-[0.16em] fg-mute leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
                  <div style={{ color: 'var(--signal)' }} className="mb-1">РОЛЬ</div>
                  <div className="fg">БИОТЕХНОЛОГ</div>
                  <div className="fg-mute">(ПОЧТИ)</div>
                </div>
                <div className="rule-h" />
                <div className="text-[10px] tracking-[0.16em] fg-mute leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
                  <div style={{ color: 'var(--signal)' }} className="mb-1">СТАТУС</div>
                  <div className="fg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full blink" style={{ background: 'var(--indicator)' }} />
                    АКТИВЕН
                  </div>
                </div>
              </motion.div>
            </aside>

            {/* name + info */}
            <motion.div
              className="col-span-12 md:col-span-7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
            >
              {/* eyebrow */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="block text-[10px] md:text-[11px] tracking-[0.16em] md:tracking-[0.22em] mb-6 md:mb-10"
                style={{ color: 'var(--signal)', fontFamily: 'var(--font-mono)' }}
              >
                ✦ КОЛЛЕГА — ЗАРЕГИСТРИРОВАН
              </motion.span>

              {/* big name */}
              <h1
                className="display fg"
                style={{
                  fontSize: 'clamp(1.9rem, 8vw, 7rem)',
                  lineHeight: 0.93,
                  fontWeight: 500,
                  letterSpacing: '-0.04em',
                  fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 0',
                }}
              >
                <RevealLine delay={0.15}>
                  <span style={{ color: 'var(--ink)' }}>Арсений</span>
                </RevealLine>
                <RevealLine delay={0.25}>
                  <span style={{ color: 'var(--ink)' }}>Голубев</span>
                  <span style={{ color: 'var(--signal)' }}>.</span>
                </RevealLine>
                <RevealLine delay={0.32}>
                  <span
                    style={{
                      color: 'var(--ink-mute)',
                      fontVariationSettings: '"opsz" 144, "SOFT" 60, "WONK" 0',
                      fontSize: '0.52em',
                    }}
                  >
                    Анатольевич
                  </span>
                </RevealLine>
              </h1>

              {/* designation */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.5 }}
                className="mt-6 md:mt-10 flex items-baseline flex-wrap gap-x-3 gap-y-2"
              >
                <span className="text-[11px] tracking-[0.2em] fg-mute" style={{ fontFamily: 'var(--font-mono)' }}>
                  ДОЛЖНОСТЬ →
                </span>
                <span
                  className="display-md italic"
                  style={{
                    fontSize: 'clamp(1.2rem, 3.5vw, 1.9rem)',
                    color: 'var(--ink)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Биотехнолог{' '}
                  <span
                    style={{
                      color: 'var(--signal)',
                      fontStyle: 'normal',
                      fontSize: '0.65em',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.04em',
                      fontWeight: 400,
                    }}
                  >
                    (почти)
                  </span>
                </span>
              </motion.div>

              {/* current projects */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.65 }}
                className="mt-10 md:mt-14 max-w-xl"
              >
                <div
                  className="text-[11px] tracking-[0.18em] mb-3"
                  style={{ color: 'var(--signal)', fontFamily: 'var(--font-mono)' }}
                >
                  ¶ ТЕКУЩИЕ ПРОЕКТЫ
                </div>
                <div style={{ borderTop: '1px solid var(--rule)' }}>
                  <div
                    className="py-4 flex items-baseline justify-between"
                    style={{ borderBottom: '1px solid var(--rule)' }}
                  >
                    <span
                      className="text-[22px] md:text-[26px] fg"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                        fontVariationSettings: '"opsz" 18, "SOFT" 30, "WONK" 0',
                        letterSpacing: '-0.015em',
                      }}
                    >
                      Иммуноглобулины
                    </span>
                    <span
                      className="text-[10px] tracking-[0.16em] fg-mute ml-4 shrink-0"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      01 / 01
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* tags */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.8 }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {['Биохимия', 'Антитела', 'Lab Work'].map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.14em] px-3 py-1.5 fg-mute"
                    style={{ border: '1px solid var(--rule)', fontFamily: 'var(--font-mono)' }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* photo */}
            <div className="col-span-8 col-start-3 md:col-span-3 md:col-start-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 0.35 }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: '3/4', background: 'var(--bg-lo)', borderRadius: '10px' }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}image/arseny.jpg`}
                    alt="Арсений Голубев"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>

                <div
                  className="mt-2 flex items-baseline justify-between text-[10px] tracking-[0.16em] fg-mute"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <span>РИС. 01 — А.Г. / ПОРТРЕТ</span>
                  <span style={{ color: 'var(--signal)' }}>2026</span>
                </div>

                {/* stat ledger */}
                <dl className="mt-8 border-t border-l" style={{ borderColor: 'var(--rule)' }}>
                  {[
                    ['ПРОФИЛЬ', 'БИО-ТЕХ'],
                    ['ПРОЕКТ',  'ИММУНОГЛОБ.'],
                    ['СТАТУС',  'АКТИВЕН'],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="grid grid-cols-2 text-[10px] tracking-[0.16em]"
                      style={{ fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--rule)', borderRight: '1px solid var(--rule)' }}
                    >
                      <dt className="px-2 py-2 fg-mute" style={{ borderRight: '1px solid var(--rule)' }}>{k}</dt>
                      <dd className="px-2 py-2 fg num-tabular">{v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </div>

          {/* bottom scroll cue */}
          <motion.div
            className="mt-16 md:mt-24 flex items-center gap-4 text-[10px] tracking-[0.2em] fg-mute"
            style={{ fontFamily: 'var(--font-mono)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            <button
              onClick={onBack}
              className="flex items-center gap-3 hover:fg transition-colors fg-mute"
            >
              <motion.span
                className="block w-6 h-px"
                style={{ background: 'var(--signal)', transformOrigin: 'left' }}
                animate={{ scaleX: [0.4, 1, 0.4] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span style={{ color: 'var(--signal)' }}>←</span>
              <span>ВЕРНУТЬСЯ К ОСНОВНОМУ ПРОФИЛЮ</span>
            </button>
          </motion.div>

        </div>
      </main>

      {/* minimal footer */}
      <footer
        className="px-4 md:px-8 py-6"
        style={{ borderTop: '1px solid var(--ink)', background: 'var(--bg)' }}
      >
        <div className="max-w-[1500px] mx-auto flex items-center justify-between text-[10px] tracking-[0.16em] fg-mute" style={{ fontFamily: 'var(--font-mono)' }}>
          <span>— КОНЕЦ ЗАПИСИ —</span>
          <span className="display italic fg-faint" style={{ fontSize: '1.2rem', fontWeight: 400, fontVariationSettings: '"opsz" 36, "SOFT" 100, "WONK" 1' }}>
            №&nbsp;04 · 2026
          </span>
        </div>
      </footer>
    </div>
  )
}

function RevealLine({ children, delay = 0 }) {
  return (
    <span className="block overflow-hidden" style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
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
