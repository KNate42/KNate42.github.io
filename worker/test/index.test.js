import { test } from 'node:test'
import assert from 'node:assert/strict'
import { LIMITS, MAX_BODY_BYTES, cors, formatMessage, handle, validate } from '../src/index.js'

const ORIGIN = 'https://knate42.github.io'
const env = { ALLOWED_ORIGINS: 'https://knate42.github.io, http://localhost:5173, http://localhost:4173', BOT_TOKEN: 'TEST_TOKEN', CHAT_ID: '42' }
const good = { name: '  Ann  ', contact: 'ann@example.com', message: 'Hello!', company: '', lang: 'en' }

function post(body, origin = ORIGIN) {
  const headers = { 'Content-Type': 'application/json' }
  if (origin) headers.Origin = origin
  return new Request('https://relay.test/', { method: 'POST', headers, body: typeof body === 'string' ? body : JSON.stringify(body) })
}

function telegram(status = 200) {
  const calls = []
  const fetchImpl = async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body) })
    return new Response(JSON.stringify({ ok: status === 200 }), { status })
  }
  return { calls, fetchImpl }
}

test('limits match the spec', () => {
  assert.deepEqual(LIMITS, { name: [1, 100], contact: [3, 120], message: [1, 2000] })
  assert.equal(MAX_BODY_BYTES, 8192)
})

test('validate trims fields and keeps the language', () => {
  assert.deepEqual(validate(good), { ok: true, data: { name: 'Ann', contact: 'ann@example.com', message: 'Hello!', lang: 'en' }, trap: false })
})

test('validate rejects missing, short, long and odd input', () => {
  const bad = [
    null, [], 'text',
    { ...good, name: '   ' },
    { ...good, name: 'x'.repeat(101) },
    { ...good, contact: 'ab' },
    { ...good, message: '' },
    { ...good, message: 'x'.repeat(2001) },
    { ...good, lang: 'de' },
    { ...good, name: 42 },
  ]
  for (const payload of bad) assert.equal(validate(payload).ok, false, JSON.stringify(payload))
})

test('a filled trap field is flagged', () => {
  assert.equal(validate({ ...good, company: 'Acme' }).trap, true)
})

test('telegram message format', () => {
  assert.equal(formatMessage({ name: 'Анна', contact: '@anna', message: 'Привет', lang: 'ru' }), 'Заявка с сайта (RU)\nИмя: Анна\nКонтакт: @anna\n\nПривет')
})

test('cors allows only listed origins', () => {
  assert.equal(cors(ORIGIN, [ORIGIN])['Access-Control-Allow-Origin'], ORIGIN)
  assert.deepEqual(cors('https://evil.test', [ORIGIN]), { Vary: 'Origin' })
  assert.deepEqual(cors(null, [ORIGIN]), { Vary: 'Origin' })
})

test('preflight: 204 for the site, 403 for others', async () => {
  const ok = await handle(new Request('https://relay.test/', { method: 'OPTIONS', headers: { Origin: ORIGIN } }), env)
  assert.equal(ok.status, 204)
  assert.equal(ok.headers.get('Access-Control-Allow-Origin'), ORIGIN)
  const bad = await handle(new Request('https://relay.test/', { method: 'OPTIONS', headers: { Origin: 'https://evil.test' } }), env)
  assert.equal(bad.status, 403)
})

test('other methods get 405', async () => {
  const res = await handle(new Request('https://relay.test/', { method: 'GET', headers: { Origin: ORIGIN } }), env)
  assert.equal(res.status, 405)
  assert.deepEqual(await res.json(), { ok: false, error: 'method' })
})

test('posts from other origins or without Origin get 403 and nothing is sent', async () => {
  const tg = telegram()
  assert.equal((await handle(post(good, 'https://evil.test'), env, tg.fetchImpl)).status, 403)
  assert.equal((await handle(post(good, null), env, tg.fetchImpl)).status, 403)
  assert.equal(tg.calls.length, 0)
})

test('broken JSON, invalid fields and oversized bodies get 400', async () => {
  const tg = telegram()
  for (const body of ['{not json', { ...good, message: '' }, { ...good, message: 'x'.repeat(9000) }]) {
    const res = await handle(post(body), env, tg.fetchImpl)
    assert.equal(res.status, 400)
    assert.deepEqual(await res.json(), { ok: false, error: 'invalid' })
  }
  assert.equal(tg.calls.length, 0)
})

test('the trap answers ok but sends nothing', async () => {
  const tg = telegram()
  const res = await handle(post({ ...good, company: 'Acme' }), env, tg.fetchImpl)
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { ok: true })
  assert.equal(tg.calls.length, 0)
})

test('a valid submission goes to Telegram', async () => {
  const tg = telegram()
  const res = await handle(post(good), env, tg.fetchImpl)
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { ok: true })
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), ORIGIN)
  assert.equal(tg.calls.length, 1)
  assert.equal(tg.calls[0].url, 'https://api.telegram.org/botTEST_TOKEN/sendMessage')
  assert.deepEqual(tg.calls[0].body, {
    chat_id: '42',
    text: 'Заявка с сайта (EN)\nИмя: Ann\nКонтакт: ann@example.com\n\nHello!',
    link_preview_options: { is_disabled: true },
  })
})

test('a max-length Russian message fits the byte limit', async () => {
  const tg = telegram()
  const res = await handle(post({ name: 'я'.repeat(100), contact: 'я'.repeat(120), message: 'я'.repeat(2000), company: '', lang: 'ru' }), env, tg.fetchImpl)
  assert.equal(res.status, 200)
  assert.equal(tg.calls.length, 1)
})

test('Telegram errors and network failures become 502', async () => {
  assert.equal((await handle(post(good), env, telegram(400).fetchImpl)).status, 502)
  const res = await handle(post(good), env, async () => { throw new Error('network') })
  assert.equal(res.status, 502)
  assert.deepEqual(await res.json(), { ok: false, error: 'telegram' })
})
