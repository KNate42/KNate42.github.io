// Contact-form relay: checks a submission from the site and forwards it to
// Telegram. BOT_TOKEN and CHAT_ID live only in Cloudflare secrets.
export const LIMITS = { name: [1, 100], contact: [3, 120], message: [1, 2000] }
export const MAX_BODY_BYTES = 8192

export function cors(origin, allowed) {
  const headers = { Vary: 'Origin' }
  if (origin && allowed.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Content-Type'
    headers['Access-Control-Max-Age'] = '86400'
  }
  return headers
}

export function validate(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return { ok: false }
  const data = {}
  for (const [key, [min, max]] of Object.entries(LIMITS)) {
    const value = typeof payload[key] === 'string' ? payload[key].trim() : ''
    if (value.length < min || value.length > max) return { ok: false }
    data[key] = value
  }
  if (payload.lang !== 'en' && payload.lang !== 'ru') return { ok: false }
  data.lang = payload.lang
  const trap = typeof payload.company === 'string' && payload.company.trim() !== ''
  return { ok: true, data, trap }
}

export function formatMessage({ name, contact, message, lang }) {
  return `Заявка с сайта (${lang.toUpperCase()})\nИмя: ${name}\nКонтакт: ${contact}\n\n${message}`
}

function json(status, body, headers) {
  return new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' } })
}

export async function handle(request, env, fetchImpl = fetch) {
  const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean)
  const origin = request.headers.get('Origin')
  const headers = cors(origin, allowed)
  const originOk = Boolean(origin) && allowed.includes(origin)

  if (request.method === 'OPTIONS') return new Response(null, { status: originOk ? 204 : 403, headers })
  if (request.method !== 'POST') return json(405, { ok: false, error: 'method' }, { ...headers, Allow: 'POST, OPTIONS' })
  if (!originOk) return json(403, { ok: false, error: 'origin' }, headers)
  if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY_BYTES) return json(400, { ok: false, error: 'invalid' }, headers)

  const raw = await request.text()
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return json(400, { ok: false, error: 'invalid' }, headers)
  let payload
  try {
    payload = JSON.parse(raw)
  } catch {
    return json(400, { ok: false, error: 'invalid' }, headers)
  }
  const result = validate(payload)
  if (!result.ok) return json(400, { ok: false, error: 'invalid' }, headers)
  if (result.trap) return json(200, { ok: true }, headers)

  const tg = await fetchImpl(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.CHAT_ID, text: formatMessage(result.data), link_preview_options: { is_disabled: true } }),
  }).catch(() => null)
  if (!tg || !tg.ok) return json(502, { ok: false, error: 'telegram' }, headers)
  return json(200, { ok: true }, headers)
}

export default {
  fetch: (request, env) => handle(request, env),
}
