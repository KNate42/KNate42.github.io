import { useEffect, useState } from 'react'

// the very thin black strip at the top of the page — pretends to be
// the masthead of a printed broadsheet. all metadata, no buttons.
// time updates every second (Asia/Almaty, no DST since 2005,
// so the offset is stable at +05).
export default function Masthead({ lang }) {
  const [stamp, setStamp] = useState(stampNow())

  useEffect(() => {
    const id = setInterval(() => setStamp(stampNow()), 1000)
    return () => clearInterval(id)
  }, [])

  // localized labels. coordinates point at NKU (Pushkin 86Б, Petropavlovsk).
  const items = lang === 'ru'
    ? [
        ['ВЫПУСК', 'N° 04'],
        ['ГОД',    '2026'],
        ['БЮРО',   'ДАННЫЕ × ВЕБ'],
        ['МЕСТО',  '54.87°N · 69.15°E'],
        ['ВРЕМЯ',  stamp],
      ]
    : [
        ['EDITION',  'N° 04'],
        ['YEAR',     '2026'],
        ['BUREAU',   'DATA × WEB'],
        ['LOCATION', '54.87°N · 69.15°E'],
        ['TIME',     stamp],
      ]

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: 'var(--strip-bg)',
        color: 'var(--strip-fg)',
        borderBottom: '1px solid var(--ink)',
      }}
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 h-7 flex items-center gap-x-6 gap-y-0 overflow-x-auto whitespace-nowrap text-[10px] tracking-[0.18em]"
           style={{ fontFamily: 'var(--font-mono)' }}>
        {items.map(([k, v], i) => (
          <span key={k} className="flex items-center gap-2 shrink-0">
            <span style={{ opacity: 0.5 }}>{k}</span>
            <span style={{ color: 'var(--signal)' }}>·</span>
            <span className="num-tabular">{v}</span>
            {/* vertical separator between items, but not after the last */}
            {i < items.length - 1 && (
              <span style={{ opacity: 0.3 }} className="ml-4 hidden md:inline">│</span>
            )}
          </span>
        ))}

        {/* "ON AIR" indicator — only shows on wide screens, where there's room */}
        <span className="ml-auto hidden lg:flex items-center gap-2 shrink-0">
          <span
            className="w-1.5 h-1.5 rounded-full blink"
            style={{ background: 'var(--signal)' }}
            aria-hidden="true"
          />
          <span style={{ color: 'var(--signal)' }}>{lang === 'ru' ? 'В ЭФИРЕ' : 'ON AIR'}</span>
        </span>
      </div>
    </div>
  )
}

// HH:MM:SS in Petropavlovsk time. Kazakhstan unified to UTC+5 in
// March 2024 and doesn't observe DST, so the offset never shifts.
function stampNow() {
  const d = new Date()
  const t = d.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Almaty',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  return `${t} +05`
}
