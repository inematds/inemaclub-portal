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
  // Exemplo do formato (remover quando entrar o primeiro real):
  // { id: 1, kind: 'curso', locale: 'en', title: 'FEP — Prompt Engineering Fundamentals', description: 'The base course, in English.', url: 'https://inematds.github.io/FEP/en/', icon: '📝' },
]

export function translatedFor(locale: Locale): TranslatedItem[] {
  if (locale === 'pt') return []
  return translatedCatalog.filter((item) => item.locale === locale)
}
