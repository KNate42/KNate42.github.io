import { test } from 'node:test'
import assert from 'node:assert/strict'
import { LIMITS as SITE } from '../../src/lib/contact.js'
import { LIMITS as WORKER } from '../../worker/src/index.js'

test('form limits on the site match the Worker', () => {
  assert.deepEqual(Object.keys(SITE).sort(), Object.keys(WORKER).sort())
  for (const key of Object.keys(WORKER)) assert.equal(SITE[key], WORKER[key][1], key)
})
