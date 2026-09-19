import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const root = new URL('../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')

test('manifest lists the actual declared WebMCP tools without claiming execution', () => {
  const manifest = JSON.parse(read('public/inema.json'))
  const tools = [...read('src/components/InemaWebMCP.tsx').matchAll(/name: '([^']+)'/g)].map(m => m[1])
  assert.deepEqual(manifest.webmcp.tools.sort(), tools.sort())
  assert.equal(manifest.webmcp.runtime_verified, false)
  assert.deepEqual(manifest.languages, ['pt-BR', 'en', 'es'])
})

test('legacy knowledge snapshot is unique and does not collide with local articles', () => {
  const pages = JSON.parse(read('src/data/knowledge-sitemap.json'))
  assert.equal(new Set(pages.map(p => p.url)).size, pages.length)
  const local = [...read('src/data/webmcp-knowledge.ts').matchAll(/slug: '([^']+)'/g)].map(m => m[1])
  for (const page of pages) {
    assert.ok(page.url.startsWith('https://www.inema.club/conhecimento/'))
    assert.ok(!local.some(slug => page.url.endsWith(`/${slug}/`)))
    if (page.lastModified) assert.match(page.lastModified, /^\d{4}-\d{2}-\d{2}$/)
  }
  assert.equal(existsSync(new URL('public/sitemap.xml', root)), false, 'static sitemap would conflict with the generated route')
})
