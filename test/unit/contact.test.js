import { test } from 'node:test'
import assert from 'node:assert/strict'
import { LIMITS, TIMEOUT_MS, sendContact } from '../../src/lib/contact.js'

const fields = { name: 'Ann', contact: 'ann@example.com', message: 'Hi', company: '', lang: 'en' }
const reply = (status, body) => async () => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

test('limits and timeout match the spec', () => {
  assert.deepEqual(LIMITS, { name: 100, contact: 120, message: 2000 })
  assert.equal(TIMEOUT_MS, 10000)
})

test('without an endpoint nothing is sent', async () => {
  let called = false
  const res = await sendContact(fields, { endpoint: '', fetchImpl: async () => { called = true } })
  assert.deepEqual(res, { ok: false, reason: 'no-endpoint' })
  assert.equal(called, false)
})

test('posts JSON and reports success', async () => {
  let seen
  const fetchImpl = async (url, init) => {
    seen = { url, init }
    return new Response('{"ok":true}', { status: 200 })
  }
  assert.deepEqual(await sendContact(fields, { endpoint: 'https://relay.test/', fetchImpl }), { ok: true })
  assert.equal(seen.url, 'https://relay.test/')
  assert.equal(seen.init.method, 'POST')
  assert.equal(seen.init.headers['Content-Type'], 'application/json')
  assert.deepEqual(JSON.parse(seen.init.body), fields)
})

test('HTTP errors are reported with the status', async () => {
  assert.deepEqual(await sendContact(fields, { endpoint: 'x', fetchImpl: reply(502, { ok: false, error: 'telegram' }) }), { ok: false, reason: 'http-502' })
})

test('a 200 without ok:true is not a success', async () => {
  assert.deepEqual(await sendContact(fields, { endpoint: 'x', fetchImpl: reply(200, { ok: false }) }), { ok: false, reason: 'bad-response' })
  assert.deepEqual(await sendContact(fields, { endpoint: 'x', fetchImpl: async () => new Response('not json', { status: 200 }) }), { ok: false, reason: 'bad-response' })
})

test('network failures are caught', async () => {
  const fetchImpl = async () => { throw new TypeError('Failed to fetch') }
  assert.deepEqual(await sendContact(fields, { endpoint: 'x', fetchImpl }), { ok: false, reason: 'network' })
})

test('slow requests time out', async () => {
  const hang = (url, init) => new Promise((resolve, reject) => {
    init.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
  })
  assert.deepEqual(await sendContact(fields, { endpoint: 'x', fetchImpl: hang, timeoutMs: 20 }), { ok: false, reason: 'timeout' })
})
