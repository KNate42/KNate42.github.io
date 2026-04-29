import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

// proficiency words → number of filled cells (out of 10).
// keys cover both EN and RU labels so I can keep the data file
// in whichever language without a switch here. lowercase only —
// the lookup normalises before reading.
const LEVEL_VALUES = {
  intermediate: 6, средний: 6,
  junior: 4,       джуниор: 4,
  learning: 2,     изучаю: 2,
  familiar: 3,     знаком: 3,
}

function levelToCells(level) {
  const k = level.toLowerCase()
  // 3 is a safe-ish default for anything not mapped; better than NaN
  return LEVEL_VALUES[k] ?? 3
}

// "specification" section — grouped skills with little terminal-style
// proficiency bars. three columns on desktop, stacked on mobile.
export default function Skills({ t, lang }) {
  const { skills } = t

  return (
    <section
      id="skills"
      className="px-4 md:px-8 pt-24 pb-28 relative scanlines"
      style={{ background: 'var(--bg-lo)' }}
    >
      <div className="max-w-[1500px] mx-auto">

        <SectionMasthead
          label={lang === 'ru' ? 'РАЗДЕЛ III' : 'SECTION III'}
          sub={lang === 'ru' ? 'СПЕЦИФИКАЦИЯ' : 'SPECIFICATION'}
          sheet="003 / 005"
          lang={lang}
        />

        {/* title + caveat. the caveat is the small print on the
            right reminding people the levels are self-assessed */}
        <motion.div
          className="grid grid-cols-12 gap-x-4 gap-y-6 items-end mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <h2
            className="display col-span-12 md:col-span-9 fg"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 0.95,
              fontVariationSettings: '"opsz" 144, "SOFT" 60, "WONK" 0',
            }}
          >
            {skills.title}<span style={{ color: 'var(--signal)' }}>.</span>
          </h2>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <p
              className="text-[10px] tracking-[0.2em] fg-mute leading-relaxed"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {lang === 'ru'
                ? 'УРОВЕНЬ ОТРАЖАЕТ ТЕКУЩИЙ ОПЫТ. ПРИБЛИЖАЕТСЯ ПОСТОЯННО.'
                : 'LEVEL REFLECTS CURRENT EXPERIENCE. APPROXIMATED CONTINUOUSLY.'}
            </p>
          </div>
        </motion.div>

        {/* three category blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-14">
          {skills.categories.map((cat, ci) => (
            <SpecBlock key={cat.name} category={cat} ci={ci} />
          ))}
        </div>

        {/* legend strip below the grid — shows what each cell
            count means since the bars themselves are unlabelled */}
        <div className="double-rule mt-20" />
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] tracking-[0.2em] fg-mute"
             style={{ fontFamily: 'var(--font-mono)' }}>
          <span>{lang === 'ru' ? 'УСЛОВНЫЕ' : 'KEY'}:</span>
          <Legend label={lang === 'ru' ? 'СРЕДНИЙ' : 'INTERMEDIATE'} cells={6} />
          <Legend label={lang === 'ru' ? 'ДЖУНИОР' : 'JUNIOR'}       cells={4} />
          <Legend label={lang === 'ru' ? 'ЗНАКОМ'  : 'FAMILIAR'}     cells={3} />
          <Legend label={lang === 'ru' ? 'ИЗУЧАЮ'  : 'LEARNING'}     cells={2} />
          <span className="ml-auto">{lang === 'ru' ? 'ОБНОВЛЕНО ' : 'UPDATED '} 2026.04</span>
        </div>
      </div>
    </section>
  )
}

// one category block (e.g. "Core Stack"). header has the title
// + a 02/03-style index. body is a list of SpecRow items.
function SpecBlock({ category, ci }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      // each block staggers by 0.1s so they cascade in
      transition={{ duration: 0.7, ease, delay: ci * 0.1 }}
    >
      <header
        className="flex items-baseline justify-between mb-5 pb-2"
        style={{ borderBottom: '1px solid var(--ink)' }}
      >
        <h3
          className="display-sm italic fg"
          style={{
            fontSize: '1.3rem',
            fontWeight: 500,
            // WONK on for the category headings — they're small
            // enough that the swashes don't fight the layout
            fontVariationSettings: '"opsz" 24, "SOFT" 50, "WONK" 1',
          }}
        >
          {category.name}
        </h3>
        <span
          className="text-[10px] num-tabular tracking-[0.16em] fg-mute"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {String(ci + 1).padStart(2, '0')} / 03
        </span>
      </header>

      <ul>
        {category.items.map((item, ii) => (
          <SpecRow
            key={item.name}
            item={item}
            // stagger inside the block too — block delay + row delay
            delay={ci * 0.08 + ii * 0.06}
          />
        ))}
      </ul>
    </motion.div>
  )
}

// single skill row: name on the left, level + bar on the right.
// the bar animates cell-by-cell when the row scrolls into view.
function SpecRow({ item, delay }) {
  const ref = useRef(null)
  // useInView gates the cell animation — without it the bars
  // would fire immediately even if you've scrolled past
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const cells = levelToCells(item.level)

  // anything 5+ uses the signal color so the strongest skills
  // pop. nothing in the data hits this currently — kept as a
  // hook for when I'm honest about what I'm "intermediate" in.
  const isSignal = cells >= 5

  return (
    <motion.li
      ref={ref}
      className="grid grid-cols-[1fr_auto] items-center gap-x-4 py-3"
      style={{ borderBottom: '1px solid var(--rule)' }}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      {/* left: skill name. truncate so weirdly long names don't
          push the bar off the row */}
      <div className="flex items-baseline gap-3 min-w-0">
        <span
          className="text-[15px] fg truncate"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontVariationSettings: '"opsz" 18, "SOFT" 30, "WONK" 0',
            letterSpacing: '-0.005em',
          }}
        >
          {item.name}
        </span>
      </div>

      {/* right: level word + 10-cell bar */}
      <div className="flex items-center gap-3">
        <span
          className="text-[10px] num-tabular tracking-[0.14em] fg-mute hidden sm:inline"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {item.level.toUpperCase()}
        </span>
        <span className="bar-cells" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              // .on for filled, .signal for signal-coloured (none today)
              className={`bar-cell ${i < cells ? (isSignal ? 'signal' : 'on') : ''}`}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              // 25ms between each cell — fast enough to feel like
              // a single motion, slow enough to read as cells
              transition={{ duration: 0.35, ease, delay: delay + i * 0.025 }}
              style={{ transformOrigin: 'bottom' }}
            />
          ))}
        </span>
      </div>
    </motion.li>
  )
}

// little static bar shown in the legend. same .bar-cells styles
// as above but no animation — purely a colour reference.
function Legend({ label, cells }) {
  return (
    <span className="flex items-center gap-2">
      <span className="bar-cells" style={{ width: '50px' }} aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className={`bar-cell ${i < cells ? 'on' : ''}`} />
        ))}
      </span>
      <span>{label}</span>
    </span>
  )
}

// section masthead — same broadsheet strip as the other sections
function SectionMasthead({ label, sub, sheet, lang }) {
  return (
    <div className="mb-16 md:mb-20">
      <div className="flex items-center justify-between text-[10px] tracking-[0.12em] sm:tracking-[0.18em] fg-mute mb-3 whitespace-nowrap"
           style={{ fontFamily: 'var(--font-mono)' }}>
        <span className="flex items-center gap-3">
          <span style={{ color: 'var(--signal)' }}>◆</span>
          <span>{label}</span>
          <span className="hidden sm:inline" style={{ opacity: 0.4 }}>—</span>
          <span className="hidden sm:inline">{sub}</span>
        </span>
        <span className="flex items-center gap-3">
          <span className="hidden sm:inline">{lang === 'ru' ? 'ЛИСТ' : 'SHEET'}</span>
          <span className="num-tabular fg">{sheet}</span>
        </span>
      </div>
      <div className="rule-h" />
      <div className="rule-h mt-1" style={{ height: '0.5px' }} />
    </div>
  )
}
