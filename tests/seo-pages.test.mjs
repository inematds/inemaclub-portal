import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIR = path.join(ROOT, 'src', 'content', 'ia')
const files = readdirSync(DIR).filter((f) => f.endsWith('.ts') && !['index.ts', 'types.ts'].includes(f))
const index = readFileSync(path.join(DIR, 'index.ts'), 'utf8')
const tools = readFileSync(path.join(ROOT, 'supabase', 'functions', '_shared', 'tools.ts'), 'utf8')

test('toda página /ia/ está registrada, com slug = nome do arquivo e rota no chat', () => {
  const slugs = new Set()
  for (const file of files) {
    const src = readFileSync(path.join(DIR, file), 'utf8')
    const slug = src.match(/slug: '([^']+)'/)?.[1]
    assert.equal(`${slug}.ts`, file, `${file}: slug diferente do nome do arquivo`)
    assert.ok(!slugs.has(slug), `slug duplicado: ${slug}`)
    slugs.add(slug)
    assert.ok(index.includes(`'./${slug}'`), `${file} não está em src/content/ia/index.ts`)
    assert.ok(tools.includes(`'/ia/${slug}/'`), `${slug} não está no PORTAL_ANCHORS do chat`)
  }
})

test('metadados dentro dos limites de SERP', () => {
  for (const file of files) {
    const src = readFileSync(path.join(DIR, file), 'utf8')
    const metaTitle = src.match(/metaTitle: '([^']+)'/)?.[1] ?? ''
    const description = src.match(/description:\s*'([^']+)'/)?.[1] ?? ''
    assert.ok(metaTitle.length > 0 && metaTitle.length <= 60, `${file}: metaTitle com ${metaTitle.length} caracteres`)
    assert.ok(description.length >= 110 && description.length <= 160, `${file}: description com ${description.length} caracteres`)
  }
})
