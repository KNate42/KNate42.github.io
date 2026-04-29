import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// shared easing — same curve every section uses for consistency
const ease = [0.22, 1, 0.36, 1]

// hero / "section I".
// three columns on desktop:
//   left  — meta sidebar (subject / role / status)
//   mid   — display title + bio + CTAs
//   right — duotone photo with stat ledger underneath
// on mobile this collapses to a single column and the meta sidebar
// is hidden (it's just visual flavor).
export default function Hero({ t, lang }) {
  // scroll-driven parallax. tied to the section itself so the
  // effect ends when you scroll past it instead of continuing forever.
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const photoY       = useTransform(scrollYProgress, [0, 1],    ['0%', '14%'])
  const photoOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3])
  const titleY       = useTransform(scrollYProgress, [0, 1],    ['0%', '-25%'])

  // little stat ledger under the photo. lat/long point at NKU
  // (Pushkin 86B, Petropavlovsk, KZ). status flips with the lang toggle.
  const stats = [
    ['LANG',     lang === 'ru' ? 'EN/RU' : 'EN/RU'],
    ['STACK',    'PY · JS · SQL'],
    ['LAT',      '54.87°N'],
    ['LONG',     '69.15°E'],
    ['STATUS',   lang === 'ru' ? 'СВОБОДЕН' : 'AVAILABLE'],
  ]

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative px-4 md:px-8 pt-8 pb-14 md:pt-10 md:pb-20 overflow-hidden scanlines"
    >
      {/* tiny editorial header strip — section number + sheet count.
          on mobile the descriptive sub-labels ("— INTRODUCTION", "SHEET")
          collide with the right side because of the 0.18em tracking;
          they're hidden until sm: so the strip stays single-line. */}
      <div className="max-w-[1500px] mx-auto mb-8 md:mb-14">
        <div className="flex items-center justify-between text-[10px] tracking-[0.12em] sm:tracking-[0.18em] whitespace-nowrap"
             style={{ color: 'var(--ink-mute)', fontFamily: 'var(--font-mono)' }}>
          <span className="flex items-center gap-3">
            <span style={{ color: 'var(--signal)' }}>◆</span>
            <span>{lang === 'ru' ? 'РАЗДЕЛ I' : 'SECTION I'}</span>
            <span className="hidden sm:inline" style={{ opacity: 0.4 }}>—</span>
            <span className="hidden sm:inline">{lang === 'ru' ? 'ВВОДНАЯ' : 'INTRODUCTION'}</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="hidden sm:inline">{lang === 'ru' ? 'ЛИСТ' : 'SHEET'}</span>
            <span className="num-tabular fg">001 / 005</span>
          </span>
        </div>
        {/* double rule under the strip */}
        <div className="rule-h mt-3" />
        <div className="rule-h mt-1" style={{ height: '0.5px' }} />
      </div>

      {/* dot grid behind the content. mask makes it fade out away
          from the top-right corner so it doesn't fight the text */}
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

        {/* LEFT — meta sidebar. md+ only. */}
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

        {/* CENTER — display title + role rotator + bio + CTAs */}
        <motion.div
          className="col-span-12 md:col-span-7"
          style={{ y: titleY }}
        >
          {/* eyebrow line above the name */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="block text-[10px] md:text-[11px] tracking-[0.16em] md:tracking-[0.22em] mb-6 md:mb-10"
            style={{ color: 'var(--signal)', fontFamily: 'var(--font-mono)' }}
          >
            ✦ {t.hero.eyebrow.toUpperCase()}
          </motion.span>

          {/* the big name. opsz 144 = display optical size,
              SOFT/WONK turn on the more decorative glyph variants */}
          <h1
            className="display fg"
            style={{
              fontSize: 'clamp(2.1rem, 12vw, 9.2rem)',
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
              {/* italic + WONK on the surname for visual contrast */}
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

          {/* role rotator — see .role-stack in index.css.
              the third span is a copy of the first so the wraparound
              isn't visible (otherwise you'd see a flash). */}
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
                fontSize: 'clamp(1.35rem, 4.5vw, 2.2rem)',
                color: 'var(--ink)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              {/* color set explicitly on each child instead of relying
                  on inheritance — framer-motion + flex-wrap + vertical-
                  align combo on mobile was occasionally rendering the
                  first role in light-mode --ink (near-black) on a dark
                  background, leaving it invisible. */}
              <span className="role-stack">
                <span style={{ color: 'var(--ink)' }}>{t.hero.roles[0]}</span>
                <span style={{ color: 'var(--signal)' }}>{t.hero.roles[1]}</span>
                {/* duplicate of [0] so the loop wraps cleanly */}
                <span style={{ color: 'var(--ink)' }}>{t.hero.roles[0]}</span>
              </span>
            </span>
          </motion.div>

          {/* abstract / bio. .dropcap pulls the first letter into a
              big floated cap — has to be on a block element to work */}
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

          {/* primary CTA: solid block that swipes signal red on hover.
              the absolute span is the swipe; z-10 keeps the label on top */}
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

        {/* RIGHT — photo + stats. parallax tied to scroll progress.
            on mobile we narrow the photo to 8/12 and center it so the
            3:4 portrait doesn't dominate the screen. */}
        <div className="col-span-8 col-start-3 md:col-span-3 md:col-start-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.4 }}
            style={{ y: photoY, opacity: photoOpacity }}
            className="relative"
          >
            {/* duotone + halftone classes do the print-photo treatment;
                see index.css for what those actually stack up */}
            <div
              className="relative duotone halftone overflow-hidden"
              style={{
                aspectRatio: '3/4',
                background: 'var(--bg-lo)',
              }}
            >
              <img
                // BASE_URL respects vite's `base` config; needed for
                // sub-path deploys but currently just '/'
                src={`${import.meta.env.BASE_URL}image/me.png`}
                alt="Nikita Anfinogentov"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'top center' }}
              />
            </div>

            {/* fake figure caption */}
            <div className="mt-2 flex items-baseline justify-between text-[10px] tracking-[0.16em] fg-mute"
                 style={{ fontFamily: 'var(--font-mono)' }}>
              <span>{lang === 'ru' ? 'РИС.' : 'FIG.'} 01 — N.A. / {lang === 'ru' ? 'ПОРТРЕТ' : 'PORTRAIT'}</span>
              <span style={{ color: 'var(--signal)' }}>2026</span>
            </div>

            {/* stats grid — the hairline borders are doubled
                (border-l + per-cell border-right) to get the
                exterior frame without an extra wrapper */}
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

      {/* scroll cue — animated dash + pointer */}
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

// helper: text masked under an inline-block, then translated into view.
// gives the "type rises into the line" effect on the name. used twice
// in the h1 above; not exported because nothing else needs it.
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
