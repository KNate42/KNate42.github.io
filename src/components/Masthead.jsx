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
        ['ГОД',    'MMXXVI'],
        ['БЮРО',   'ДАННЫЕ × ВЕБ'],
        ['МЕСТО',  '32.22°N · 110.97°W'],
        ['ВРЕМЯ',  stamp],
      ]
    : [
        ['EDITION',  'N° 04'],
        ['YEAR',     'MMXXVI'],
        ['BUREAU',   'DATA × WEB'],
        ['LOCATION', '32.22°N · 110.97°W'],
        ['TIME',     stamp],
      ]

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: 'var(--bg-ink)',
        color: 'var(--bg)',
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

function stampNow() {
  const d = new Date()
  const t = d.toLocaleTimeString('en-US', {
    timeZone: 'America/Phoenix',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  return `${t} MST`
}
