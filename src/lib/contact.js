// Sends the contact form to the Worker in worker/. LIMITS must match
// worker/src/index.js — test/unit/limits.test.js checks it.
export const LIMITS = { name: 100, contact: 120, message: 2000 }
export const TIMEOUT_MS = 10000

export async function sendContact(fields, { endpoint, fetchImpl = globalThis.fetch, timeoutMs = TIMEOUT_MS } = {}) {
  if (!endpoint) return { ok: false, reason: 'no-endpoint' }
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
      signal: controller.signal,
    })
    if (!res.ok) return { ok: false, reason: `http-${res.status}` }
    const data = await res.json().catch(() => null)
    return data && data.ok === true ? { ok: true } : { ok: false, reason: 'bad-response' }
  } catch (err) {
    return { ok: false, reason: err && err.name === 'AbortError' ? 'timeout' : 'network' }
  } finally {
    clearTimeout(timer)
  }
}
