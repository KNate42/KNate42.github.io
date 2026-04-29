import { useRef } from 'react'
import { motion, animate } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// "ledger" section — projects + education laid out as a bookkeeping
// ledger: N° / period / entry / ref. each row nudges right on hover
// (animate(), not framer-motion variants — saves a re-render).
export default function Projects({ t, lang }) {
  const { work } = t

  return (
    <section
      id="work"
      className="px-4 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 relative"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-[1500px] mx-auto">

        <SectionMasthead
          number="II"
          label={lang === 'ru' ? 'РАЗДЕЛ II' : 'SECTION II'}
          sub={lang === 'ru' ? 'РЕЕСТР' : 'LEDGER'}
          sheet="002 / 005"
          lang={lang}
        />

        {/* big title + epigraph next to it.
            grid keeps the two baseline-aligned via items-end */}
        <motion.div
          className="grid grid-cols-12 gap-x-4 gap-y-6 items-end mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <h2
            className="display col-span-12 md:col-span-8 fg"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 0.95,
              fontVariationSettings: '"opsz" 144, "SOFT" 60, "WONK" 0',
            }}
          >
            {work.title}<span style={{ color: 'var(--signal)' }}>.</span>
          </h2>

          {/* epigraph — italic Fraunces with WONK on for character */}
          <div
            className="col-span-12 md:col-span-4 md:pl-6 md:border-l md:border-l-rule"
            style={{ borderColor: 'var(--rule)' }}
          >
            <span
              className="block text-[10px] tracking-[0.2em] mb-3"
              style={{ color: 'var(--signal)', fontFamily: 'var(--font-mono)' }}
            >
              ¶ {lang === 'ru' ? 'ЭПИГРАФ' : 'EPIGRAPH'}
            </span>
            <p
              className="display-md italic fg-soft"
              style={{
                fontSize: '1.25rem',
                fontWeight: 400,
                fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1',
                lineHeight: 1.3,
              }}
            >
              {work.quote}
            </p>
          </div>
        </motion.div>

        {/* ledger column header. grid template is shared with each
            row below — keep them in sync if you change widths */}
        <div
          className="grid grid-cols-[60px_140px_1fr_auto] md:grid-cols-[80px_180px_1fr_auto] gap-x-6 pb-3 text-[10px] tracking-[0.2em] fg-mute"
          style={{ fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--ink)' }}
        >
          <span>N°</span>
          <span>{lang === 'ru' ? 'ПЕРИОД' : 'PERIOD'}</span>
          <span>{lang === 'ru' ? 'ЗАПИСЬ' : 'ENTRY'}</span>
          <span className="text-right">{lang === 'ru' ? 'ССЫЛКА' : 'REF.'}</span>
        </div>

        {/* one row per ledger entry */}
        <div>
          {work.items.map((item, i) => (
            <LedgerRow key={i} item={item} index={i} lang={lang} />
          ))}
        </div>

        {/* end-of-ledger marker + total. broadsheet-style closer */}
        <div className="double-rule mt-2" />
        <div className="mt-3 flex items-center justify-between text-[10px] tracking-[0.2em] fg-mute"
             style={{ fontFamily: 'var(--font-mono)' }}>
          <span>{lang === 'ru' ? 'КОНЕЦ РЕЕСТРА' : 'END OF LEDGER'}</span>
          <span className="num-tabular">{lang === 'ru' ? 'ВСЕГО' : 'TOTAL'}: {String(work.items.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  )
}

// one row of the ledger. wraps in <a> when the item has an href,
// otherwise renders the article alone (some entries are just school).
function LedgerRow({ item, index, lang }) {
  const ref = useRef(null)

  // imperative animate() instead of variants because we don't need
  // to track state — just nudge the row 8px on hover, snap back on leave.
  const onEnter = () => {
    if (ref.current) animate(ref.current, { x: 8 }, { type: 'spring', stiffness: 280, damping: 26, mass: 0.5 })
  }
  const onLeave = () => {
    if (ref.current) animate(ref.current, { x: 0 }, { type: 'spring', stiffness: 280, damping: 26, mass: 0.5 })
  }

  const Body = (
    <motion.article
      ref={ref}
      className="group grid grid-cols-[60px_140px_1fr_auto] md:grid-cols-[80px_180px_1fr_auto] gap-x-6 py-7 relative"
      style={{ borderBottom: '1px solid var(--rule)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      // staggered fade — earlier rows arrive first
      transition={{ duration: 0.7, ease, delay: index * 0.06 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* hover background. -mx-2 leaks the fill past the gutter
          a touch so it looks like the row "lights up" */}
      <span
        className="absolute inset-0 -mx-2 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ background: 'var(--bg-hi)' }}
        aria-hidden="true"
      />

      {/* N° — zero-padded so 001/002/003 align */}
      <span
        className="relative num-tabular text-[12px] pt-1"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--signal)',
          letterSpacing: '0.05em',
        }}
      >
        {String(index + 1).padStart(3, '0')}
      </span>

      {/* PERIOD — date string from content.js */}
      <span
        className="relative num-tabular text-[11px] pt-1.5 fg-mute tracking-[0.1em]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {item.date.toUpperCase()}
      </span>

      {/* ENTRY — role label, title, body, tags */}
      <div className="relative">
        <div
          className="text-[10px] tracking-[0.18em] mb-2"
          style={{ color: 'var(--signal)', fontFamily: 'var(--font-mono)' }}
        >
          {item.role.toUpperCase()}
        </div>
        <h3
          className="display-md fg mb-3"
          style={{
            fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            fontVariationSettings: '"opsz" 60, "SOFT" 40, "WONK" 0',
          }}
        >
          {item.title}
        </h3>
        <p
          className="text-[15px] leading-[1.6] mb-4 fg-soft max-w-2xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontVariationSettings: '"opsz" 14, "SOFT" 0, "WONK" 0' }}
        >
          {item.body}
        </p>
        {/* tags — first one is a hairline outline, the rest filled.
            no real reason, just visual rhythm */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, ti) => (
            <span
              key={tag}
              className="text-[10px] tracking-[0.16em] uppercase px-2 py-1"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--ink-soft)',
                border: '1px solid var(--rule)',
                background: ti === 0 ? 'transparent' : 'var(--bg-hi)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* REF arrow — coloured if there's a real link, dim dot otherwise */}
      <span
        className="relative pt-1 text-right text-[18px] transition-colors"
        style={{ color: item.href ? 'var(--signal)' : 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}
      >
        {item.href ? '↗' : '·'}
      </span>
    </motion.article>
  )

  return item.href ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
      {Body}
    </a>
  ) : Body
}

// the section number + sheet count strip used at the top of every
// section. broadsheet pattern — same shape repeats so the page
// reads like a printed publication.
function SectionMasthead({ number, label, sub, sheet, lang }) {
  return (
    <div className="mb-16 md:mb-20">
      <div className="flex items-center justify-between text-[10px] tracking-[0.18em] fg-mute mb-3"
           style={{ fontFamily: 'var(--font-mono)' }}>
        <span className="flex items-center gap-3">
          <span style={{ color: 'var(--signal)' }}>◆</span>
          <span>{label}</span>
          <span style={{ opacity: 0.4 }}>—</span>
          <span>{sub}</span>
        </span>
        <span className="flex items-center gap-3">
          <span>{lang === 'ru' ? 'ЛИСТ' : 'SHEET'}</span>
          <span className="num-tabular fg">{sheet}</span>
        </span>
      </div>
      <div className="rule-h" />
      <div className="rule-h mt-1" style={{ height: '0.5px' }} />
    </div>
  )
}
