import type { Locale } from './locales'

/**
 * Banners que têm versão traduzida em `public/doc/<locale>/<arquivo>` (mesmo nome,
 * mesmo formato e tamanho do original em `public/doc/`). Gerados com o Codex
 * (image generation) a partir do PT. Fora desta lista, a home usa o PT.
 */
export const LOCALIZED_IMAGES = new Set([
  'oswork.webp',
  'jev.webp',
  'claude-opus55.webp',
  'agi-chegou.webp',
  'capa-musicavideo-v2.webp',
  'claude-codex-agnostico.webp',
  'content2video.webp',
  'conviteinemap.webp',
  'gestao-agentes-2027.webp',
  'ia-cultivada.webp',
  'ia-cultivada.webp',
  'inemaagenteshubv.webp',
  'inemac2.jpg',
  'inemaclubee.jpg',
  'inema-hero-aprenda-pratique-evolua.webp',
  'inema-pro-badge.webp',
  'inema-pro-banner-completo.webp',
  'inema-pro-banner-jornada.webp',
  'perfis-ia-empreendedor.webp',
  'perfis-ia-gestor.webp',
  'perfis-ia-liberal.webp',
  'perfis-ia-operacional.webp',
  'perfis-ia-topo.webp',
  'vczero.webp',
  'webmcp2.webp',
])

/** `/doc/x.png` → `/doc/en/x.png` quando existe versão no idioma; senão devolve o original. */
export function localizedSrc(src: string, locale: Locale): string {
  if (locale === 'pt' || !src.startsWith('/doc/')) return src
  const file = src.slice('/doc/'.length)
  return LOCALIZED_IMAGES.has(file) ? `/doc/${locale}/${file}` : src
}
