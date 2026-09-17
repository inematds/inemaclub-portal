import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

const source = readFileSync(new URL('../src/i18n/eventos.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022 } })
const { localizedEventUrl } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)

const root = 'https://eventos.inema.pro'
test('menu e áreas mantêm idioma, inclusive arquivos HTML e subáreas', () => {
  for (const [path, en, es] of [
    ['', '/en/', '/es/'],
    ['/gestao-ia/', '/gestao-ia/en/', '/gestao-ia/es/'],
    ['/content2video.html', '/en/content2video.html', '/es/content2video.html'],
    ['/agb2030/diagnostico/', '/agb2030/diagnostico/en/', '/agb2030/diagnostico/es/'],
    ['/agb2030/index2.html', '/agb2030/en/index2.html', '/agb2030/es/index2.html'],
  ]) {
    assert.equal(localizedEventUrl(root + path, 'en'), root + en)
    assert.equal(localizedEventUrl(root + path, 'es'), root + es)
    assert.equal(localizedEventUrl(root + en, 'es'), root + es)
    assert.equal(localizedEventUrl(root + es, 'pt'), root + (path || '/'))
  }
})
test('não perde âncora nem parâmetros e reconhece index.html e caminho sem barra', () => {
  assert.equal(localizedEventUrl(root + '/claude-codex/en/index.html?utm_source=portal#curso', 'es'), root + '/claude-codex/es/?utm_source=portal#curso')
  assert.equal(localizedEventUrl(root + '/ia-cultivada', 'en'), root + '/ia-cultivada/en/')
})
test('não inventa tradução para endereço externo ou desconhecido', () => {
  for (const url of ['#trilhas', 'https://inema.pro', root + '/nao-publicado/', 'javascript:alert(1)']) {
    assert.equal(localizedEventUrl(url, 'en'), url)
  }
})
