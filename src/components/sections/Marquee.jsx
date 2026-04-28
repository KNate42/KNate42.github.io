export default function MarqueeSection({ items }) {
  const doubled = [...items, ...items]

  return (
    <section
      className="py-10 overflow-hidden"
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-lo)',
      }}
      aria-hidden="true"
    >
      {/* Row 1: left → right */}
      <div className="flex overflow-hidden mb-4">
        <div className="marquee-track flex gap-10 items-center whitespace-nowrap select-none">
          {doubled.map((item, i) => (
            <MarqueeItem key={`a-${i}`} label={item} />
          ))}
        </div>
      </div>

      {/* Row 2: right → left */}
      <div className="flex overflow-hidden">
        <div className="marquee-track-rev flex gap-10 items-center whitespace-nowrap select-none">
          {[...doubled].reverse().map((item, i) => (
            <MarqueeItem key={`b-${i}`} label={item} accent />
          ))}
        </div>
      </div>
    </section>
  )
}

function MarqueeItem({ label, accent }) {
  return (
    <span className="flex items-center gap-10">
      <span
        className="text-sm font-semibold tracking-wide"
        style={{
          fontFamily: 'Manrope, sans-serif',
          color: accent ? 'var(--accent)' : 'var(--text-muted)',
        }}
      >
        {label}
      </span>
      <span
        className="w-1 h-1 rounded-full flex-shrink-0"
        style={{ background: accent ? 'var(--accent)' : 'var(--border)' }}
      />
    </span>
  )
}
