import { useState, useEffect } from 'react'

// live local clock pinned to Petropavlovsk (Asia/Almaty, no DST).
// runs at 1 Hz which is overkill for seconds, but the second hand
// is half the charm so I left it.
function LocalClock({ lang }) {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Almaty',
          hour:   '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="num-tabular" style={{ fontFamily: 'var(--font-mono)' }}>
      {lang === 'ru' ? 'ПЕТРОПАВЛОВСК, СКО' : 'PETROPAVLOVSK, KZ'} &nbsp;·&nbsp; {time} +05
    </span>
  )
}

// page footer. doubles as the colophon for the whole "broadsheet"
// metaphor — typeset in / built with / published / correspond.
// the giant wordmark is just for visual closure; remove it and the
// page ends abruptly.
export default function Footer({ t, lang }) {
  return (
    <footer
      className="px-4 md:px-8 pt-16 pb-10 relative"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--ink)',
      }}
    >
      <div className="max-w-[1500px] mx-auto">

        {/* same masthead-strip pattern as the other sections, but
            inline here because this is the only footer */}
        <div className="flex items-center justify-between text-[10px] tracking-[0.18em] fg-mute mb-3"
             style={{ fontFamily: 'var(--font-mono)' }}>
          <span className="flex items-center gap-3">
            <span style={{ color: 'var(--signal)' }}>◆</span>
            <span>{lang === 'ru' ? 'РАЗДЕЛ V' : 'SECTION V'}</span>
            <span style={{ opacity: 0.4 }}>—</span>
            <span>{lang === 'ru' ? 'КОЛОФОН' : 'COLOPHON'}</span>
          </span>
          <span className="flex items-center gap-3">
            <span>{lang === 'ru' ? 'ЛИСТ' : 'SHEET'}</span>
            <span className="num-tabular fg">005 / 005</span>
          </span>
        </div>
        <div className="rule-h" />
        <div className="rule-h mt-1" style={{ height: '0.5px' }} />

        {/* oversized wordmark. clamp() handles mobile — anything
            smaller than 3rem and the period sits awkwardly */}
        <div
          className="display fg my-12 md:my-16"
          style={{
            fontSize: 'clamp(3rem, 14vw, 11rem)',
            fontWeight: 500,
            letterSpacing: '-0.045em',
            lineHeight: 0.88,
            fontVariationSettings: '"opsz" 144, "SOFT" 70, "WONK" 0',
          }}
        >
          <span>Anfinogentov</span>
          <span style={{ color: 'var(--signal)' }}>.</span>
        </div>

        {/* four-column colophon block.
            on mobile it collapses to 2 cols (4 was unreadable). */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-12 pt-6"
             style={{ borderTop: '1px solid var(--rule)' }}>
          <ColophonCol
            heading={lang === 'ru' ? 'НАБОР' : 'TYPESET IN'}
            lines={['Fraunces · Display', 'Inter Tight · Sans', 'JetBrains Mono · Data']}
          />
          <ColophonCol
            heading={lang === 'ru' ? 'ПОСТРОЕНО' : 'BUILT WITH'}
            lines={['React 19', 'Vite 8 · Tailwind 4', 'Framer Motion 12']}
          />
          <ColophonCol
            heading={lang === 'ru' ? 'ОПУБЛИКОВАНО' : 'PUBLISHED'}
            lines={['knate42.github.io', 'GitHub Pages', 'Edition · MMXXVI']}
          />
          <ColophonCol
            heading={lang === 'ru' ? 'СВЯЗАТЬСЯ' : 'CORRESPOND'}
            lines={t.footer.links.map(l => l.label)}
            hrefs={t.footer.links.map(l => l.href)}
          />
        </div>

        {/* bottom strip: copy, clock, status dot */}
        <div className="rule-h mb-4" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[10px] tracking-[0.16em] fg-mute"
             style={{ fontFamily: 'var(--font-mono)' }}>
          <span>{t.footer.copy.toUpperCase()}</span>
          <LocalClock lang={lang} />
          <span className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full blink"
              style={{ background: 'var(--indicator)' }}
            />
            <span>{lang === 'ru' ? 'СИСТЕМЫ В НОРМЕ' : 'ALL SYSTEMS NOMINAL'}</span>
          </span>
        </div>

        {/* end mark — closes the document like a real publication */}
        <div className="mt-8 flex items-baseline justify-between">
          <span
            className="text-[10px] tracking-[0.2em] fg-faint"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            — {lang === 'ru' ? 'КОНЕЦ ДОКУМЕНТА' : 'END OF DOCUMENT'} —
          </span>
          <span
            className="display italic fg-faint"
            style={{
              fontSize: '1.5rem',
              fontWeight: 400,
              fontVariationSettings: '"opsz" 36, "SOFT" 100, "WONK" 1',
            }}
          >
            №&nbsp;04 · MMXXVI
          </span>
        </div>
      </div>
    </footer>
  )
}

// one column of the colophon. lines can be plain strings, or links
// when an `hrefs[i]` is provided (only used for the contact column).
function ColophonCol({ heading, lines, hrefs }) {
  return (
    <div>
      <h4
        className="text-[10px] tracking-[0.22em] mb-3"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--signal)' }}
      >
        {heading}
      </h4>
      <ul className="space-y-1.5">
        {lines.map((line, i) => (
          <li
            key={i}
            className="text-[12px] fg-soft"
            style={{
              fontFamily: 'var(--font-display)',
              fontVariationSettings: '"opsz" 14, "SOFT" 30, "WONK" 0',
              fontWeight: 500,
            }}
          >
            {hrefs && hrefs[i] ? (
              <a
                href={hrefs[i]}
                className="link-line"
                // mailto links shouldn't open in a new tab
                target={hrefs[i].startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                {line}
              </a>
            ) : line}
          </li>
        ))}
      </ul>
    </div>
  )
}
