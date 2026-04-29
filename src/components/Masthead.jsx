import { useEffect, useState } from 'react'

export default function Masthead({ lang }) {
  const [stamp, setStamp] = useState(stampNow())

  useEffect(() => {
    const id = setInterval(() => setStamp(stampNow()), 1000)
    return () => clearInterval(id)
  }, [])

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
            {i < items.length - 1 && (
              <span style={{ opacity: 0.3 }} className="ml-4 hidden md:inline">│</span>
            )}
          </span>
        ))}

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

// Kazakhstan has been on UTC+5 year-round since March 2024, no DST
function stampNow() {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Almaty',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }) + ' +05'
}
