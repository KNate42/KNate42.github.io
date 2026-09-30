import { test } from 'node:test'
import assert from 'node:assert/strict'
import { WINDOW_IDS, createState, frontId, reduce } from '../../src/lib/windows.js'

const run = (...actions) => actions.reduce(reduce, createState())

test('starts with every window closed', () => {
  const s = createState()
  assert.deepEqual(WINDOW_IDS, ['about', 'projects', 'skills', 'contact'])
  assert.deepEqual(s.order, [])
  assert.equal(frontId(s), null)
  for (const id of WINDOW_IDS) assert.deepEqual(s.wins[id], { status: 'closed', max: false })
})

test('opening puts the window in front', () => {
  const s = run({ type: 'open', id: 'about' }, { type: 'open', id: 'projects' })
  assert.deepEqual(s.order, ['about', 'projects'])
  assert.equal(frontId(s), 'projects')
  assert.equal(s.wins.about.status, 'open')
})

test('focus raises an open window', () => {
  const s = run({ type: 'open', id: 'about' }, { type: 'open', id: 'projects' }, { type: 'focus', id: 'about' })
  assert.equal(frontId(s), 'about')
  assert.deepEqual(s.order, ['projects', 'about'])
})

test('a minimised window keeps its slot but leaves the front', () => {
  const s = run({ type: 'open', id: 'about' }, { type: 'open', id: 'projects' }, { type: 'minimize', id: 'projects' })
  assert.equal(s.wins.projects.status, 'min')
  assert.deepEqual(s.order, ['about', 'projects'])
  assert.equal(frontId(s), 'about')
})

test('close removes the window and resets zoom', () => {
  const s = run({ type: 'open', id: 'about' }, { type: 'toggleMax', id: 'about' }, { type: 'close', id: 'about' })
  assert.deepEqual(s.wins.about, { status: 'closed', max: false })
  assert.deepEqual(s.order, [])
  assert.equal(frontId(s), null)
})

test('toggleMax only works on open windows', () => {
  assert.equal(run({ type: 'toggleMax', id: 'skills' }).wins.skills.max, false)
  const open = run({ type: 'open', id: 'skills' }, { type: 'toggleMax', id: 'skills' })
  assert.equal(open.wins.skills.max, true)
  assert.equal(reduce(open, { type: 'toggleMax', id: 'skills' }).wins.skills.max, false)
})

test('dock click: closed opens, background raises, front minimises, minimised reopens', () => {
  let s = run({ type: 'dock', id: 'about' })
  assert.equal(frontId(s), 'about')
  s = reduce(s, { type: 'open', id: 'skills' })
  s = reduce(s, { type: 'dock', id: 'about' })
  assert.equal(frontId(s), 'about')
  s = reduce(s, { type: 'dock', id: 'about' })
  assert.equal(s.wins.about.status, 'min')
  assert.equal(frontId(s), 'skills')
  s = reduce(s, { type: 'dock', id: 'about' })
  assert.equal(s.wins.about.status, 'open')
  assert.equal(frontId(s), 'about')
})

test('single mode (phone) keeps only one window open', () => {
  const s = run({ type: 'open', id: 'about' }, { type: 'open', id: 'contact', single: true })
  assert.equal(s.wins.about.status, 'closed')
  assert.equal(s.wins.contact.status, 'open')
  assert.deepEqual(s.order, ['contact'])
  const viaDock = reduce(s, { type: 'dock', id: 'skills', single: true })
  assert.equal(viaDock.wins.contact.status, 'closed')
  assert.equal(frontId(viaDock), 'skills')
})

test('unknown ids and no-op actions return the same state object', () => {
  const s = run({ type: 'open', id: 'about' })
  assert.equal(reduce(s, { type: 'open', id: 'colleague' }), s)
  assert.equal(reduce(s, { type: 'close', id: 'skills' }), s)
  assert.equal(reduce(s, { type: 'minimize', id: 'skills' }), s)
  assert.equal(reduce(s, { type: 'focus', id: 'about' }), s)
  assert.equal(reduce(s, { type: 'nonsense', id: 'about' }), s)
})
