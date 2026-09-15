import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIR = path.join(ROOT, 'src', 'i18n', 'messages')
const LOCALES = ['pt', 'en', 'es']

function load(locale) {
  return JSON.parse(readFileSync(path.join(DIR, `${locale}.json`), 'utf8'))
}

function flatten(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]]
  )
}

test('os três dicionários têm exatamente as mesmas chaves', () => {
  const keys = Object.fromEntries(LOCALES.map((l) => [l, flatten(load(l)).map(([k]) => k).sort()]))
  assert.deepEqual(keys.en, keys.pt, 'en.json diverge de pt.json')
  assert.deepEqual(keys.es, keys.pt, 'es.json diverge de pt.json')
})

test('nenhum valor vazio ou não-string', () => {
  for (const locale of LOCALES) {
    for (const [key, value] of flatten(load(locale))) {
      assert.equal(typeof value, 'string', `${locale}:${key} não é string`)
      assert.ok(value.trim().length > 0, `${locale}:${key} está vazio`)
    }
  }
})

test('pt.json tem as chaves usadas pelo Portal', () => {
  const pt = flatten(load('pt')).map(([k]) => k)
  for (const required of ['header.tagline', 'nav.trails', 'beginners.title', 'translated.empty', 'footer.copyright']) {
    assert.ok(pt.includes(required), `falta ${required}`)
  }
})
