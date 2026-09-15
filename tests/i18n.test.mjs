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

test('translated-courses.ts: ids únicos por locale e url github.io ou inema', () => {
  const src = readFileSync(path.join(ROOT, 'src', 'data', 'translated-courses.ts'), 'utf8')
  const entries = [...src.matchAll(/\{\s*id:\s*(\d+),\s*kind:\s*'(curso|projeto)',\s*locale:\s*'(en|es)'[^}]*url:\s*'([^']+)'/g)]
  const seen = new Set()
  for (const [, id, , locale, url] of entries) {
    const key = `${locale}:${id}`
    assert.ok(!seen.has(key), `duplicado ${key}`)
    seen.add(key)
    assert.match(url, /^https:\/\/(inematds\.github\.io|[a-z.]*inema\.(pro|club))\//, `url fora do padrão: ${url}`)
  }
})
