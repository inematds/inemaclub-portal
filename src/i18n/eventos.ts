import type { Locale } from './locales'

/** Rotas publicadas em PT/EN/ES no repo inemaeventos. */
const PAGES = [
  '/', '/oswork/', '/jev/', '/ia-cultivada/', '/claude-codex/', '/gestao-ia/', '/agi-ready/', '/webmcp/',
  '/content2video.html', '/musicavideo.html', '/inemaccbot.html', '/agentes-hub-v.html',
  '/vibe-code-do-zero.html', '/arquitetura-de-intencao.html',
  '/meridiano-foto/', '/meridiano-video/', '/meridiano-voo/',
  '/agb2030/', '/agb2030/index2.html', '/agb2030/conversao/', '/agb2030/criativa/',
  '/agb2030/diagnostico/', '/agb2030/incompany/', '/agb2030/inema/',
]

function translatedPath(path: string, locale: Locale): string {
  if (locale === 'pt') return path
  if (path.endsWith('/')) return `${path}${locale}/`
  const slash = path.lastIndexOf('/')
  return `${path.slice(0, slash + 1)}${locale}/${path.slice(slash + 1)}`
}

const canonicalPaths = new Map<string, string>()
for (const page of PAGES) {
  for (const locale of ['pt', 'en', 'es'] as const) {
    const path = translatedPath(page, locale)
    canonicalPaths.set(path, page)
    if (path.endsWith('/')) {
      canonicalPaths.set(`${path}index.html`, page)
      if (path !== '/') canonicalPaths.set(path.slice(0, -1), page)
    }
  }
}

/** Mantém query/hash, troca inclusive URLs já traduzidas e não inventa destinos. */
export function localizedEventUrl(value: string, locale: Locale): string {
  let url: URL
  try { url = new URL(value) } catch { return value }
  if (url.protocol !== 'https:' || url.hostname !== 'eventos.inema.pro') return value
  const canonical = canonicalPaths.get(url.pathname)
  if (!canonical) return value
  url.pathname = translatedPath(canonical, locale)
  return url.href
}
