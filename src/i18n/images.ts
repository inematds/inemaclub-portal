import type { Locale } from './locales'

/**
 * Banners que têm versão traduzida em `public/doc/<locale>/<arquivo>` (mesmo nome,
 * mesmo formato e tamanho do original em `public/doc/`). Gerados com o Codex
 * (image generation) a partir do PT. Fora desta lista, a home usa o PT.
 */
export const LOCALIZED_IMAGES = new Set([
  'oswork.png',
  'jev.png',
  'agi-chegou.png',
  'capa-musicavideo-v2.jpg',
  'claude-codex-agnostico.png',
  'content2video.png',
  'conviteinemap.png',
  'gestao-agentes-2027.png',
  'ia-cultivada.png',
  'ia-cultivada.png',
  'inemaagenteshubv.jpg',
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
  'vczero.png',
  'webmcp2.png',
])

/** `/doc/x.png` → `/doc/en/x.png` quando existe versão no idioma; senão devolve o original. */
export function localizedSrc(src: string, locale: Locale): string {
  if (locale === 'pt' || !src.startsWith('/doc/')) return src
  const file = src.slice('/doc/'.length)
  return LOCALIZED_IMAGES.has(file) ? `/doc/${locale}/${file}` : src
}
