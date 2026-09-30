// Petropavlovsk time: Kazakhstan has been on UTC+5 since March 2024, and tzdata files it under Asia/Almaty.
export const CLOCK_TIME_ZONE = 'Asia/Almaty'

export function formatClock(date, lang) {
  const format = new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {
    timeZone: CLOCK_TIME_ZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
  const parts = {}
  for (const part of format.formatToParts(date)) parts[part.type] = part.value
  const weekday = parts.weekday.charAt(0).toUpperCase() + parts.weekday.slice(1)
  const time = `${parts.hour}:${parts.minute}`
  return { full: `${weekday} ${parts.day} ${parts.month} ${time}`, short: time }
}

export function msToNextMinute(date) {
  return 60000 - (date.getTime() % 60000)
}
