// status ticker — sits on the dark strip between hero and projects.
// each chip is a fake market quote: SYMBOL · ARROW · LEVEL · DELTA.
// no real meaning — it's atmosphere, the same way an airport board
// is atmosphere even if you're not flying anywhere.

// hand-tuned levels per stack item. order has to match the stack
// array in content.js, otherwise React/Pandas ends up tagged "FAM"
// or whatever. modulo handles the wraparound.
const LEVELS = ['JR', 'JR', 'INT', 'INT', 'LRN', 'JR', 'INT', 'INT', 'JR', 'INT', 'FAM', 'JR']
const DELTAS = ['+0.40', '+1.20', '+0.62', '+0.18', '+0.05', '+0.83', '+0.95', '+1.05', '+0.30', '+0.42', '+0.10', '+0.55']

export default function MarqueeSection({ items, lang }) {
  // glue stack labels to their fake stats. doubled below so the
  // CSS marquee can translate -50% and have content under the seam.
  const enriched = items.map((item, i) => ({
    label: item.toUpperCase(),
    level: LEVELS[i % LEVELS.length],
    delta: DELTAS[i % DELTAS.length],
    // every 5th chip points down, just to break the pattern
    arrow: i % 5 === 4 ? '▼' : '▲',
  }))
  const doubled = [...enriched, ...enriched]

  return (
    <section
      className="overflow-hidden"
      style={{
        background: 'var(--strip-bg)',
        color: 'var(--strip-fg)',
        borderTop: '1px solid var(--ink)',
        borderBottom: '1px solid var(--ink)',
      }}
      aria-label="Skills ticker"
    >
      {/* tiny header row — labels the strip */}
      <div className="px-4 md:px-8 py-2 flex items-center justify-between text-[10px] tracking-[0.18em]"
           style={{
             fontFamily: 'var(--font-mono)',
             borderBottom: '1px solid rgba(255,255,255,0.12)',
             color: 'rgba(255,255,255,0.6)',
           }}>
        <span className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full blink"
            style={{ background: 'var(--signal)' }}
          />
          <span style={{ color: 'var(--signal)' }}>{lang === 'ru' ? 'ЛЕНТА · СТЕК' : 'TICKER · STACK'}</span>
        </span>
        <span className="hidden sm:inline">{lang === 'ru' ? 'ОБНОВЛЕНО ПОСТОЯННО' : 'AUTO-REFRESH'}</span>
      </div>

      {/* row 1 — left → right at 48s. animation lives in CSS
          (.marquee-track) so it doesn't pause when JS is busy */}
      <div className="flex overflow-hidden py-3"
           style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="marquee-track flex gap-x-10 items-center whitespace-nowrap select-none">
          {doubled.map((item, i) => (
            <TickerItem key={`a-${i}`} {...item} />
          ))}
        </div>
      </div>

      {/* row 2 — right → left, slower (60s) and dimmer.
          opposite direction makes the scroll feel less mechanical */}
      <div className="flex overflow-hidden py-3">
        <div className="marquee-track-rev flex gap-x-10 items-center whitespace-nowrap select-none">
          {[...doubled].reverse().map((item, i) => (
            <TickerItem key={`b-${i}`} {...item} dim />
          ))}
        </div>
      </div>
    </section>
  )
}

// one chip in the ticker. green for ▲, red for ▼ — mirrors the
// universal up/down convention so it reads at a glance.
function TickerItem({ label, level, delta, arrow, dim }) {
  const positive = arrow === '▲'
  return (
    <span
      className="flex items-center gap-3 text-[12px]"
      style={{
        fontFamily: 'var(--font-mono)',
        // dim variant for the second row — same chips, half opacity
        color: dim ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.92)',
        letterSpacing: '0.04em',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.5)' }}>│</span>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <span style={{ color: 'var(--signal)', fontWeight: 600 }}>·</span>
      <span style={{ color: positive ? 'var(--indicator)' : 'var(--signal)' }}>
        {arrow}
      </span>
      <span className="num-tabular" style={{ color: 'rgba(255,255,255,0.85)' }}>
        {level}
      </span>
      <span
        className="num-tabular"
        style={{ color: positive ? 'var(--indicator)' : 'var(--signal)' }}
      >
        {delta}
      </span>
    </span>
  )
}
