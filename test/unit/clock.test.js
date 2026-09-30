import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CLOCK_TIME_ZONE, formatClock, msToNextMinute } from '../../src/lib/clock.js'

test('uses Petropavlovsk time (UTC+5, filed under Asia/Almaty)', () => {
  assert.equal(CLOCK_TIME_ZONE, 'Asia/Almaty')
})

test('English full and short formats', () => {
  assert.deepEqual(formatClock(new Date('2026-09-30T03:02:00Z'), 'en'), { full: 'Wed 30 Sep 08:02', short: '08:02' })
})

test('Russian format', () => {
  assert.deepEqual(formatClock(new Date('2026-09-30T03:02:00Z'), 'ru'), { full: 'Ср 30 сент. 08:02', short: '08:02' })
})

test('just after midnight shows 00, not 24', () => {
  assert.deepEqual(formatClock(new Date('2026-09-30T19:05:00Z'), 'en'), { full: 'Thu 1 Oct 00:05', short: '00:05' })
})

test('msToNextMinute counts down to the next full minute', () => {
  assert.equal(msToNextMinute(new Date('2026-09-30T03:02:15.500Z')), 44500)
  assert.equal(msToNextMinute(new Date('2026-09-30T03:02:00.000Z')), 60000)
})
