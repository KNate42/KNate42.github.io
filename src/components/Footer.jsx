import { useState, useEffect } from 'react'

function TucsonClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/Phoenix',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
      Tucson, AZ &nbsp;{time}
    </span>
  )
}

export default function Footer({ t }) {
  return (
    <footer
      className="px-6 md:px-10 lg:px-16 py-10"
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <span
          className="font-display font-extrabold tracking-tighter"
          style={{ color: 'var(--text)', fontSize: '1rem', letterSpacing: '-0.04em' }}
        >
          Nikita Anfinogentov
        </span>

        <TucsonClock />

        <div className="flex items-center gap-1">
          <p className="text-xs mr-4" style={{ color: 'var(--text-muted)' }}>
            {t.footer.copy}
          </p>
          <div className="flex items-center gap-5">
            {t.footer.links.map(link => (
              <a
                key={link.href}
                href={link.href}
                target={!link.href.startsWith('mailto') ? '_blank' : undefined}
                rel={!link.href.startsWith('mailto') ? 'noopener noreferrer' : undefined}
                className="link-line text-xs font-medium"
                style={{ color: 'var(--text-muted)', fontFamily: 'Manrope, sans-serif' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
