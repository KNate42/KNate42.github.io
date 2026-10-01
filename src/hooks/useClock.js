import { useEffect, useState } from 'react'
import { formatClock, msToNextMinute } from '../lib/clock.js'

const EMPTY = { full: '', short: '' }

export function useClock(lang) {
  const [clock, setClock] = useState(EMPTY)
  useEffect(() => {
    let timer
    const tick = () => {
      const now = new Date()
      setClock(formatClock(now, lang))
      timer = setTimeout(tick, msToNextMinute(now))
    }
    tick()
    return () => clearTimeout(timer)
  }, [lang])
  return clock
}
