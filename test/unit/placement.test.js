import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CASCADE_SLOTS, CASCADE_STEP, DOCK_SPACE, WINDOW_WIDTHS, placeWindow } from '../../src/lib/placement.js'

test('constants match the approved mockup', () => {
  assert.deepEqual(WINDOW_WIDTHS, { about: 600, projects: 580, skills: 560, contact: 600 })
  assert.equal(CASCADE_STEP, 26)
  assert.equal(CASCADE_SLOTS, 5)
  assert.equal(DOCK_SPACE, 126)
})

test('slot 0 on a 1440×860 desk sits 44px from the right edge', () => {
  assert.deepEqual(placeWindow({ deskWidth: 1440, deskHeight: 860, width: 600, slot: 0 }), { left: 796, top: 22, width: 600, maxHeight: 712 })
})

test('each next slot cascades 26px left and down', () => {
  assert.deepEqual(placeWindow({ deskWidth: 1440, deskHeight: 860, width: 580, slot: 2 }), { left: 764, top: 74, width: 580, maxHeight: 660 })
})

test('mid-size desks use the middle of the desk, capped 24px from the edge', () => {
  assert.equal(placeWindow({ deskWidth: 1200, deskHeight: 760, width: 600, slot: 0 }).left, 576)
  assert.equal(placeWindow({ deskWidth: 1280, deskHeight: 760, width: 600, slot: 0 }).left, 640)
})

test('narrow desks shrink the window and keep a 24px margin', () => {
  assert.deepEqual(placeWindow({ deskWidth: 560, deskHeight: 700, width: 600, slot: 3 }), { left: 24, top: 100, width: 512, maxHeight: 474 })
})
