import { test } from 'node:test'
import assert from 'node:assert/strict'
import { NAMES, content, links } from '../../src/data/content.js'

function shape(value) {
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((k) => [k, shape(value[k])]))
  return typeof value
}

test('English and Russian texts have the same structure', () => {
  assert.deepEqual(shape(content.ru), shape(content.en))
})

test('names in both languages', () => {
  assert.equal(NAMES.en, 'Nikita Anfinogentov')
  assert.equal(NAMES.ru, 'Никита Анфиногентов')
})

test('facts the user confirmed', () => {
  assert.deepEqual(content.en.about.specs.map((s) => s.label), ['Education', 'Based in', 'Languages'])
  assert.equal(content.en.about.specs[0].value, 'University of Arizona — Data Science')
  assert.equal(content.en.about.specs[1].value, 'Petropavlovsk, Kazakhstan · UTC+5')
  assert.equal(content.en.about.specs[2].value, 'English, Russian')
  assert.equal(content.en.skills.note, 'Levels are my own assessment')
})

test('removed promises, dates and the colleague stay removed', () => {
  const all = JSON.stringify(content)
  for (const banned of ['24 hours', 'в течение суток', 'April 2026', 'апреле 2026', 'NKU', 'СКУ', 'Colleague', 'Коллега', 'Arseny', 'Арсений']) {
    assert.ok(!all.includes(banned), `found "${banned}"`)
  }
})

test('contact links', () => {
  assert.equal(links.email, 'anfinogentov@arizona.edu')
  assert.equal(links.github.href, 'https://github.com/KNate42')
  assert.equal(links.telegram.href, 'https://t.me/Ezekiel_XIII')
  assert.equal(links.linkedin.href, 'https://www.linkedin.com/in/nikitaanfinogentov')
  assert.equal(links.source, 'https://github.com/KNate42/KNate42.github.io')
})

test('every skill level has a label', () => {
  for (const lang of ['en', 'ru']) {
    const { levels, groups } = content[lang].skills
    for (const group of groups) for (const [, level] of group.items) assert.ok(levels[level], `${lang}: ${level}`)
  }
})
