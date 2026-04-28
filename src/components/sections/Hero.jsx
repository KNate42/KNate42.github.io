import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function Hero({ t, lang }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const photoOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])

  const stats = [
    ['LANG',     lang === 'ru' ? 'EN/RU' : 'EN/RU'],
    ['STACK',    'PY · JS · SQL'],
    ['LAT',      '32.22°N'],
    ['LONG',     '110.97°W'],
    ['STATUS',   lang === 'ru' ? 'СВОБОДЕН' : 'AVAILABLE'],
  ]

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative px-4 md:px-8 pt-10 pb-20 overflow-hidden scanlines"
    >
      {/* Editorial section header strip */}
      <div className="max-w-[1500px] mx-auto mb-8 md:mb-14">
        <div className="flex items-center justify-between text-[10px] tracking-[0.18em]"
             style={{ color: 'var(--ink-mute)', fontFamily: 'var(--font-mono)' }}>
          <span className="flex items-center gap-3">
            <span style={{ color: 'var(--signal)' }}>◆</span>
            <span>{lang === 'ru' ? 'РАЗДЕЛ I' : 'SECTION I'}</span>
            <span style={{ opacity: 0.4 }}>—</span>
            <span>{lang === 'ru' ? 'ВВОДНАЯ' : 'INTRODUCTION'}</span>
          </span>
          <span className="flex items-center gap-3">
            <span>{lang === 'ru' ? 'ЛИСТ' : 'SHEET'}</span>
            <span className="num-tabular fg">001 / 005</span>
          </span>
        </div>
        <div className="rule-h mt-3" />
        <div className="rule-h mt-1" style={{ height: '0.5px' }} />
      </div>

      {/* Background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--rule) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.55,
          maskImage: 'radial-gradient(ellipse at 70% 30%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 30%, black 0%, transparent 75%)',
        }}
      />

      <div className="max-w-[1500px] mx-auto w-full relative grid grid-cols-12 gap-x-4 gap-y-10">

        {/* LEFT — meta column (visible md+) */}
        <aside className="hidden md:block col-span-2 pt-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="text-[10px] tracking-[0.16em] fg-mute" style={{ fontFamily: 'var(--font-mono)' }}>
              <div style={{ color: 'var(--signal)' }} className="mb-1">{lang === 'ru' ? 'СУБЪЕКТ' : 'SUBJECT'}</div>
              <div className="fg">N. ANFINOGENTOV</div>
            </div>
            <div className="rule-h" />
            <div className="text-[10px] tracking-[0.16em] fg-mute leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
              <div style={{ color: 'var(--signal)' }} className="mb-1">{lang === 'ru' ? 'РОЛЬ' : 'ROLE'}</div>
              <div className="fg">DATA SCIENTIST</div>
              <div className="fg">WEB DEVELOPER</div>
            </div>
            <div className="rule-h" />
            <div className="text-[10px] tracking-[0.16em] fg-mute leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
              <div style={{ color: 'var(--signal)' }} className="mb-1">{lang === 'ru' ? 'СТАТУС' : 'STATUS'}</div>
              <div className="fg flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full blink"
                  style={{ background: 'var(--indicator)' }}
                />
                {lang === 'ru' ? 'ОТКРЫТ' : 'OPEN TO WORK'}
              </div>
            </div>
          </motion.div>
        </aside>

        {/* CENTER — display title */}
        <motion.div
          className="col-span-12 md:col-span-7"
          style={{ y: titleY }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="block text-[11px] tracking-[0.22em] mb-6 md:mb-10"
            style={{ color: 'var(--signal)', fontFamily: 'var(--font-mono)' }}
          >
            ✦ {t.hero.eyebrow.toUpperCase()}
          </motion.span>

          <h1
            className="display fg"
            style={{
              fontSize: 'clamp(3.5rem, 10.5vw, 9.2rem)',
              lineHeight: 0.92,
              fontWeight: 500,
              letterSpacing: '-0.04em',
              fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 0',
            }}
          >
            <RevealLine delay={0.15}>
              <span style={{ color: 'var(--ink)' }}>Nikita</span>
            </RevealLine>
            <RevealLine delay={0.25}>
              <span
                style={{
                  fontStyle: 'italic',
                  fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                  color: 'var(--ink)',
                }}
              >
                Anfinogentov
              </span>
              <span style={{ color: 'var(--signal)' }}>.</span>
            </RevealLine>
          </h1>

          {/* Role rotator */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className="mt-6 md:mt-10 flex items-baseline flex-wrap gap-x-3 gap-y-2"
          >
            <span
              className="text-[11px] tracking-[0.2em] fg-mute"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {lang === 'ru' ? 'ДОЛЖНОСТЬ' : 'DESIGNATION'} →
            </span>
            <span
              className="display-md italic"
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                color: 'var(--ink)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              <span className="role-stack">
                <span>{t.hero.roles[0]}</span>
                <span style={{ color: 'var(--signal)' }}>{t.hero.roles[1]}</span>
                <span>{t.hero.roles[0]}</span>
              </span>
            </span>
          </motion.div>

          {/* Bio */}
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
              ¶ {lang === 'ru' ? 'РЕЗЮМЕ' : 'ABSTRACT'}
            </div>
            <p
              className="text-[17px] md:text-[19px] leading-[1.55] dropcap fg"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontVariationSettings: '"opsz" 14, "SOFT" 0, "WONK" 0' }}
            >
              {t.hero.bio}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 px-6 h-12 text-[12px] tracking-[0.18em] uppercase overflow-hidden"
              style={{
                background: 'var(--ink)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span
                className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0"
                style={{ background: 'var(--signal)' }}
                aria-hidden="true"
              />
              <span className="relative z-10 transition-colors duration-300">{t.hero.cta}</span>
              <span
                className="relative z-10 transition-colors duration-300 group-hover:text-[color:var(--ink)]"
                style={{ color: 'var(--signal)' }}
              >
                →
              </span>
            </a>
            <a
              href="https://github.com/KNate42"
              target="_blank"
              rel="noopener noreferrer"
              className="link-line text-[12px] tracking-[0.18em] uppercase fg-soft"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {t.hero.ctaSecondary} ↗
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — duotone photo + stats */}
        <div className="col-span-12 md:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.4 }}
            style={{ y: photoY, opacity: photoOpacity }}
            className="relative"
          >
            {/* Photo */}
            <div
              className="relative duotone halftone overflow-hidden"
              style={{
                aspectRatio: '3/4',
                background: 'var(--bg-lo)',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}image/me.png`}
                alt="Nikita Anfinogentov"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'top center' }}
              />
            </div>

            {/* Photo caption */}
            <div className="mt-2 flex items-baseline justify-between text-[10px] tracking-[0.16em] fg-mute"
                 style={{ fontFamily: 'var(--font-mono)' }}>
              <span>{lang === 'ru' ? 'РИС.' : 'FIG.'} 01 — N.A. / {lang === 'ru' ? 'ПОРТРЕТ' : 'PORTRAIT'}</span>
              <span style={{ color: 'var(--signal)' }}>2026</span>
            </div>

            {/* Stats grid */}
            <dl className="mt-8 border-t border-l"
                style={{ borderColor: 'var(--rule)' }}>
              {stats.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-2 text-[10px] tracking-[0.16em]"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    borderBottom: '1px solid var(--rule)',
                    borderRight: '1px solid var(--rule)',
                  }}
                >
                  <dt className="px-2 py-2 fg-mute" style={{ borderRight: '1px solid var(--rule)' }}>
                    {k}
                  </dt>
                  <dd className="px-2 py-2 fg num-tabular">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="max-w-[1500px] mx-auto mt-16 md:mt-24 flex items-center gap-4 text-[10px] tracking-[0.2em] fg-mute"
        style={{ fontFamily: 'var(--font-mono)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.span
          className="block w-6 h-px"
          style={{ background: 'var(--signal)', transformOrigin: 'left' }}
          animate={{ scaleX: [0.4, 1, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span style={{ color: 'var(--signal)' }}>↓</span>
        <span>{lang === 'ru' ? 'ПРОДОЛЖЕНИЕ НА ЛИСТЕ 002' : 'CONTINUED ON SHEET 002'}</span>
      </motion.div>
    </section>
  )
}

function RevealLine({ children, delay = 0 }) {
  return (
    <span className="block overflow-hidden">
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
