import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
})

export default function Hero({ t }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const photoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-16 pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.5,
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── Left: Text ── */}
          <div className="lg:col-span-7 xl:col-span-7">

            <motion.span
              {...fadeUp(0.05)}
              className="block text-xs font-mono tracking-widest uppercase mb-8"
              style={{ color: 'var(--accent)', letterSpacing: '0.18em' }}
            >
              — {t.hero.eyebrow}
            </motion.span>

            <motion.h1
              {...fadeUp(0.15)}
              className="font-display font-extrabold leading-none tracking-tighter mb-8"
              style={{
                fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
                color: 'var(--text)',
                letterSpacing: '-0.05em',
                lineHeight: 0.95,
              }}
            >
              Nikita<br />
              Anfinogentov
              <span style={{ color: 'var(--accent)' }}>.</span>
            </motion.h1>

            <motion.div
              {...fadeUp(0.25)}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {t.hero.roles.map(role => (
                <span
                  key={role}
                  className="text-sm font-semibold px-3.5 py-1.5 rounded-full"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {role}
                </span>
              ))}
              <span
                className="flex items-center gap-1.5 text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ background: 'var(--accent)' }}
                />
                {t.hero.location}
              </span>
            </motion.div>

            <motion.p
              {...fadeUp(0.32)}
              className="text-lg leading-relaxed max-w-lg mb-12"
              style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}
            >
              {t.hero.bio}
            </motion.p>

            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-md transition-opacity duration-200 hover:opacity-85"
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                {t.hero.cta}
              </a>
              <a
                href="https://github.com/KNate42"
                target="_blank"
                rel="noopener noreferrer"
                className="link-line inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: 'var(--text-muted)', fontFamily: 'Manrope, sans-serif' }}
              >
                {t.hero.ctaSecondary}
                <span style={{ color: 'var(--accent)' }}>→</span>
              </a>
            </motion.div>
          </div>

          {/* ── Right: Photo ── */}
          <motion.div
            className="lg:col-span-5 xl:col-span-5 hidden lg:block"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
          >
            <motion.div
              style={{ y: photoY, opacity: photoOpacity }}
              className="relative"
            >
              {/* Decorative amber shard */}
              <div
                className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl opacity-15 rotate-12"
                style={{ background: 'var(--accent)' }}
              />

              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: '4/5',
                  background: 'var(--bg-lo)',
                  boxShadow: '0 32px 64px -16px rgba(0,0,0,0.18)',
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}image/me.png`}
                  alt="Nikita Anfinogentov"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'top center' }}
                />
                {/* Subtle inner vignette */}
                <div
                  className="absolute inset-0"
                  style={{
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
                    borderRadius: 'inherit',
                  }}
                />
              </div>

              {/* Decorative corner accent */}
              <div
                className="absolute -bottom-5 -right-5 w-20 h-20 rounded-xl opacity-20"
                style={{ background: 'var(--accent)', transform: 'rotate(-6deg)' }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <motion.div
          className="w-px h-10"
          style={{ background: `linear-gradient(to bottom, transparent, var(--accent))` }}
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
