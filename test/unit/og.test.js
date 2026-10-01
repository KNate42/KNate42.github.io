import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

function jpegSize(buf) {
  let i = 2
  while (i < buf.length) {
    if (buf[i] !== 0xff) throw new Error('not a JPEG marker')
    const marker = buf[i + 1]
    if (marker >= 0xc0 && marker <= 0xc3) return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) }
    i += 2 + buf.readUInt16BE(i + 2)
  }
  throw new Error('no frame header')
}

test('link preview image is 1200×630 and at most 120 KB', async () => {
  const buf = await readFile(new URL('../../public/image/og.jpg', import.meta.url))
  assert.deepEqual(jpegSize(buf), { width: 1200, height: 630 })
  assert.ok(buf.length <= 120 * 1024, `${buf.length} bytes`)
})
