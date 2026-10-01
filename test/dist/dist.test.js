import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const html = await readFile(new URL('../../dist/index.html', import.meta.url), 'utf8')
const TITLE = 'Nikita Anfinogentov — Data Science student &amp; web developer'
const DESCRIPTION = 'Data Science student at the University of Arizona and web developer in Petropavlovsk, Kazakhstan. Open to internships — projects, skills, contacts.'

test('the page is prerendered', () => {
  assert.ok(!html.includes('<!--app-html-->'), 'placeholder replaced')
  assert.match(html, /<h1 class="name" aria-label="Nikita Anfinogentov"/)
  assert.ok(html.includes('Data Science student &amp; web developer'))
  assert.ok(html.includes('Open to internships'))
})

test('title and meta description', () => {
  assert.ok(html.includes(`<title>${TITLE}</title>`))
  assert.ok(html.includes(`<meta name="description" content="${DESCRIPTION}"`))
  assert.ok(DESCRIPTION.length <= 155)
})

test('link preview tags', () => {
  const tags = [
    '<link rel="canonical" href="https://knate42.github.io/"',
    '<meta property="og:type" content="website"',
    '<meta property="og:url" content="https://knate42.github.io/"',
    `<meta property="og:title" content="${TITLE}"`,
    `<meta property="og:description" content="${DESCRIPTION}"`,
    '<meta property="og:image" content="https://knate42.github.io/image/og.jpg"',
    '<meta property="og:image:width" content="1200"',
    '<meta property="og:image:height" content="630"',
    '<meta name="twitter:card" content="summary_large_image"',
  ]
  for (const tag of tags) assert.ok(html.includes(tag), tag)
})

test('no third-party fonts or leftovers of the old site', () => {
  for (const banned of ['fonts.googleapis.com', 'fonts.gstatic.com', 'Fraunces', 'framer', 'Colleague', 'Arseny', 'grain-overlay']) {
    assert.ok(!html.includes(banned), banned)
  }
})

test('font preload and the boot script', () => {
  assert.ok(html.includes('<link rel="preload" href="/fonts/inter-latin-opsz.woff2" as="font" type="font/woff2" crossorigin'))
  assert.ok(html.includes("localStorage.getItem('na-theme')"))
  assert.ok(html.includes('data-boot'))
})

test('all four windows and the dock are prerendered', () => {
  for (const id of ['about', 'projects', 'skills', 'contact']) {
    assert.ok(html.includes(`data-win="${id}"`), id)
    assert.ok(html.includes(`id="${id}-title"`), `${id} title`)
    assert.ok(html.includes(`href="#${id}"`), `${id} dock link`)
  }
  assert.ok(html.includes('<nav class="dock"'))
  assert.ok(html.includes('/image/me-320.avif'))
})

test('window texts are prerendered for search engines', () => {
  for (const text of ['I work at the intersection of data and the web', 'University of Arizona — Data Science', 'English, Russian', 'Organoid Intelligence — report', 'Levels are my own assessment', 'NumPy &amp; Scikit-learn']) {
    assert.ok(html.includes(text), text)
  }
})

test('contact window is prerendered', () => {
  assert.ok(html.includes('id="contact-form"'))
  assert.ok(html.includes('Goes straight to my Telegram'))
  assert.ok(html.includes('mailto:anfinogentov@arizona.edu'))
  assert.ok(!html.includes('24 hours'))
})
