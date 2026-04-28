import { useRef } from 'react'
import { motion, animate } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

function MagneticLink({ href, children, target, className, style }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.18
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.18
    animate(ref.current, { x: dx, y: dy }, { type: 'spring', stiffness: 180, damping: 18, mass: 0.4 })
  }

  const onLeave = () => {
    animate(ref.current, { x: 0, y: 0 }, { type: 'spring', stiffness: 180, damping: 18 })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${className || ''}`}
      style={style}
    >
      {children}
    </motion.a>
  )
}

export default function Contact({ t, lang }) {
  const { contact } = t

  return (
    <section
      id="contact"
      className="px-4 md:px-8 pt-24 pb-24 relative scanlines"
      style={{ background: 'var(--bg-ink)', color: 'var(--bg)' }}
    >
      <div className="max-w-[1500px] mx-auto">

        {/* Section masthead */}
        <SectionMasthead
          label={lang === 'ru' ? 'РАЗДЕЛ IV' : 'SECTION IV'}
          sub={lang === 'ru' ? 'СВЯЗЬ' : 'DISPATCH'}
          sheet="004 / 005"
          lang={lang}
          inverted
        />

        {/* Display heading */}
        <motion.h2
          className="display mb-16 md:mb-20"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 6.2rem)',
            fontWeight: 500,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            color: 'var(--bg)',
            fontVariationSettings: '"opsz" 144, "SOFT" 70, "WONK" 0',
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease }}
        >
          <span>{contact.heading[0]} </span>
          <span
            className="italic"
            style={{
              color: 'var(--signal)',
              fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
            }}
          >
            {contact.heading[1]}
          </span>
          <span> {contact.heading[2]}</span>
        </motion.h2>

        {/* Dispatch card grid */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">

          {/* LEFT — dispatch slip */}
          <motion.div
            className="col-span-12 lg:col-span-7 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <div
              className="p-6 md:p-10 relative"
              style={{
                border: '1px solid rgba(255,255,255,0.18)',
                background: 'rgba(255,255,255,0.025)',
              }}
            >
              {/* Slip header — DISPATCH FORM */}
              <div
                className="flex items-baseline justify-between mb-8 pb-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.18)' }}
              >
                <span
                  className="text-[10px] tracking-[0.22em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--signal)' }}
                >
                  ✦ {lang === 'ru' ? 'БЛАНК ОТПРАВКИ' : 'DISPATCH FORM'}
                </span>
                <span
                  className="text-[10px] tracking-[0.16em] num-tabular"
                  style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.55)' }}
                >
                  N°{String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')} / 2026
                </span>
              </div>

              {/* Slip rows */}
              <dl className="space-y-4 text-[12px]"
                  style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                <SlipRow k={lang === 'ru' ? 'ОТ' : 'FROM'} v="N. ANFINOGENTOV · TUCSON, AZ" />
                <SlipRow k={lang === 'ru' ? 'КОМУ' : 'TO'} v={lang === 'ru' ? 'ВАМ — ЧИТАТЕЛЬ ЭТОГО ЛИСТА' : 'YOU — READER OF THIS SHEET'} />
                <SlipRow k={lang === 'ru' ? 'ТЕМА' : 'RE'} v={lang === 'ru' ? 'СОТРУДНИЧЕСТВО / СТАЖИРОВКА' : 'COLLABORATION / INTERNSHIP'} />
                <SlipRow k={lang === 'ru' ? 'ДАТА' : 'DATE'} v="2026.04 — ONGOING" mono />
                <SlipRow k={lang === 'ru' ? 'ЯЗЫК' : 'LANG'} v="EN / RU" />
              </dl>

              <div
                className="my-8 h-px"
                style={{ background: 'rgba(255,255,255,0.18)' }}
              />

              {/* Body */}
              <p
                className="text-[16px] leading-[1.65] mb-10"
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 14, "SOFT" 0, "WONK" 0',
                }}
              >
                {contact.sub}
              </p>

              {/* The big email */}
              <MagneticLink href="mailto:anfinogentov@arizona.edu" className="block">
                <span
                  className="display-md block"
                  style={{
                    fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                    fontWeight: 500,
                    color: 'var(--signal)',
                    letterSpacing: '-0.02em',
                    fontVariationSettings: '"opsz" 60, "SOFT" 60, "WONK" 0',
                    textDecoration: 'underline',
                    textDecorationThickness: '1px',
                    textUnderlineOffset: '6px',
                    textDecorationColor: 'rgba(255, 90, 44, 0.5)',
                  }}
                >
                  anfinogentov@arizona.edu
                </span>
              </MagneticLink>

              {/* Sign-off / fake signature */}
              <div className="mt-10 flex items-end justify-between">
                <div>
                  <div
                    className="text-[10px] tracking-[0.2em] mb-2"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.5)' }}
                  >
                    {lang === 'ru' ? 'ПОДПИСЬ' : 'SIGNED'}
                  </div>
                  <div
                    className="display-sm italic"
                    style={{
                      fontSize: '1.5rem',
                      color: 'var(--bg)',
                      fontWeight: 400,
                      fontVariationSettings: '"opsz" 36, "SOFT" 100, "WONK" 1',
                    }}
                  >
                    Никита А.
                  </div>
                </div>
                {/* Stamp */}
                <div
                  className="hidden sm:flex flex-col items-center justify-center px-4 py-3 rotate-[-6deg]"
                  style={{
                    border: '2px solid var(--signal)',
                    color: 'var(--signal)',
                  }}
                >
                  <div className="text-[8px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)' }}>
                    {lang === 'ru' ? 'ПОДЛИННО' : 'AUTHENTIC'}
                  </div>
                  <div className="text-[10px] tracking-[0.2em] num-tabular" style={{ fontFamily: 'var(--font-mono)' }}>
                    MMXXVI
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — channels list */}
          <motion.div
            className="col-span-12 lg:col-span-5 lg:pl-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
          >
            <div
              className="text-[10px] tracking-[0.22em] mb-5 pb-2"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'rgba(255,255,255,0.55)',
                borderBottom: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              <span style={{ color: 'var(--signal)' }}>◆</span> {lang === 'ru' ? 'КАНАЛЫ СВЯЗИ' : 'CHANNELS'} · 04
            </div>

            <ul>
              {contact.links.map((link, i) => (
                <ChannelRow key={link.href} link={link} index={i} />
              ))}
            </ul>

            {/* Spec footer */}
            <div className="mt-10 grid grid-cols-2 gap-6 text-[10px] tracking-[0.18em]"
                 style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.55)' }}>
              <div>
                <div className="mb-1" style={{ color: 'var(--signal)' }}>{lang === 'ru' ? 'ОТВЕТ В' : 'REPLY IN'}</div>
                <div style={{ color: 'rgba(255,255,255,0.85)' }}>≤ 24h</div>
              </div>
              <div>
                <div className="mb-1" style={{ color: 'var(--signal)' }}>{lang === 'ru' ? 'ЧАСОВОЙ ПОЯС' : 'TIMEZONE'}</div>
                <div style={{ color: 'rgba(255,255,255,0.85)' }}>MST · UTC-7</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SlipRow({ k, v, mono }) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 items-baseline">
      <dt style={{ color: 'rgba(255,255,255,0.5)' }}>{k}</dt>
      <dd
        className="num-tabular pb-1"
        style={{
          color: 'rgba(255,255,255,0.92)',
          borderBottom: '1px dotted rgba(255,255,255,0.25)',
          letterSpacing: mono ? '0.06em' : '0.02em',
        }}
      >
        {v}
      </dd>
    </div>
  )
}

function ChannelRow({ link, index }) {
  const codes = { email: 'EML', github: 'GIT', telegram: 'TGM', linkedin: 'LIN' }

  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 * index }}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
      className="group"
    >
      <a
        href={link.href}
        target={link.kind !== 'email' ? '_blank' : undefined}
        rel={link.kind !== 'email' ? 'noopener noreferrer' : undefined}
        className="grid grid-cols-[44px_60px_1fr_24px] items-center gap-3 py-4"
      >
        <span
          className="text-[10px] tracking-[0.18em] num-tabular"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.45)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="text-[10px] tracking-[0.18em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--signal)' }}
        >
          {codes[link.kind]}
        </span>
        <span
          className="link-line text-[14px] truncate"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontVariationSettings: '"opsz" 14, "SOFT" 30, "WONK" 0',
            color: 'rgba(255,255,255,0.92)',
          }}
        >
          {link.label}
        </span>
        <span
          className="text-right transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: 'var(--signal)', fontFamily: 'var(--font-mono)' }}
        >
          ↗
        </span>
      </a>
    </motion.li>
  )
}

function SectionMasthead({ label, sub, sheet, lang, inverted }) {
  const muted = inverted ? 'rgba(255,255,255,0.55)' : 'var(--ink-mute)'
  const fg = inverted ? 'var(--bg)' : 'var(--ink)'
  const rule = inverted ? 'rgba(255,255,255,0.18)' : 'var(--rule)'
  return (
    <div className="mb-14">
      <div className="flex items-center justify-between text-[10px] tracking-[0.18em] mb-3"
           style={{ fontFamily: 'var(--font-mono)', color: muted }}>
        <span className="flex items-center gap-3">
          <span style={{ color: 'var(--signal)' }}>◆</span>
          <span>{label}</span>
          <span style={{ opacity: 0.4 }}>—</span>
          <span>{sub}</span>
        </span>
        <span className="flex items-center gap-3">
          <span>{lang === 'ru' ? 'ЛИСТ' : 'SHEET'}</span>
          <span className="num-tabular" style={{ color: fg }}>{sheet}</span>
        </span>
      </div>
      <div style={{ height: '1px', background: rule }} />
      <div style={{ height: '0.5px', marginTop: '4px', background: rule }} />
    </div>
  )
}
