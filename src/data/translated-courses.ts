import type { Locale } from '@/i18n/locales'

/**
 * Cursos e guias de projeto que JÁ TÊM versão em outro idioma.
 * `id` = id do curso em platformsData (courses.ts) ou, para projetos, o índice
 * não importa: use o id do guia se houver, senão 0.
 * Fase 1: lista vazia — a seção mostra o aviso "estamos traduzindo".
 * Fases seguintes: cada tradução publicada entra aqui (uma linha por idioma).
 */
export type TranslatedItem = {
  id: number
  kind: 'curso' | 'projeto'
  locale: Exclude<Locale, 'pt'>
  title: string
  description: string
  url: string
  icon: string
}

export const translatedCatalog: TranslatedItem[] = [
  { id: 273, kind: 'curso', locale: 'en', title: 'Claude → Codex — Migrate or stay model-agnostic', description: 'Separate the brain from the model: 3 tracks and 18 modules on portable context, skills, handoffs and a real migration kit.', url: 'https://inematds.github.io/curso-claude-codex/en/', icon: '🧠' },
  { id: 273, kind: 'curso', locale: 'es', title: 'Claude → Codex — Migra o quédate agnóstico', description: 'Separa el cerebro del modelo: 3 rutas y 18 módulos sobre contexto portátil, skills, handoffs y un kit real de migración.', url: 'https://inematds.github.io/curso-claude-codex/es/', icon: '🧠' },
]

export function translatedFor(locale: Locale): TranslatedItem[] {
  if (locale === 'pt') return []
  return translatedCatalog.filter((item) => item.locale === locale)
}
