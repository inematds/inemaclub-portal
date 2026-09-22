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
  { id: 277, kind: 'curso', locale: 'en', title: 'OSWork — AI as a work system', description: '4 tracks, 8 modules and 48 topics: Codex, files, instructions, skills, Git, Telegram and VPS. Includes progress, notes and hands-on labs.', url: 'https://inematds.github.io/oswork/en/', icon: '⚙️' },
  { id: 277, kind: 'curso', locale: 'es', title: 'OSWork — IA como sistema de trabajo', description: '4 rutas, 8 módulos y 48 temas: Codex, archivos, instrucciones, skills, Git, Telegram y VPS. Incluye progreso, notas y laboratorios prácticos.', url: 'https://inematds.github.io/oswork/es/', icon: '⚙️' },
  { id: 273, kind: 'curso', locale: 'en', title: 'Claude → Codex — Migrate or stay model-agnostic', description: 'Separate the brain from the model: 3 tracks and 18 modules on portable context, skills, handoffs and a real migration kit.', url: 'https://inematds.github.io/curso-claude-codex/en/', icon: '🧠' },
  { id: 273, kind: 'curso', locale: 'es', title: 'Claude → Codex — Migra o quédate agnóstico', description: 'Separa el cerebro del modelo: 3 rutas y 18 módulos sobre contexto portátil, skills, handoffs y un kit real de migración.', url: 'https://inematds.github.io/curso-claude-codex/es/', icon: '🧠' },
  { id: 280, kind: 'curso', locale: 'en', title: 'OSWork Quick — Organize your AI environment in 77 minutes', description: 'The direct edition: seven lessons of 10 to 13 minutes, 65 diagrams doing the teaching. Folders per work area, an orientation sheet, a reusable request template and a checking routine. No programming.', url: 'https://inematds.github.io/oswork-quick/en/', icon: '📐' },
  { id: 279, kind: 'curso', locale: 'en', title: 'OSWork v5 — Organize your AI environment', description: 'The OSWork edition for people who do not code: seven lessons of 20 to 25 minutes that build folders per work area, an orientation sheet, a reusable request template and a checking routine. Management and classroom examples, no terminal and no code.', url: 'https://inematds.github.io/oswork-v5/en/', icon: '🗂️' },
  { id: 279, kind: 'curso', locale: 'es', title: 'OSWork v5 — Organiza tu entorno de IA', description: 'La edición de OSWork para quien no programa: siete lecciones de 20 a 25 minutos que arman carpetas por frente de trabajo, una ficha de orientación, una plantilla de pedido reutilizable y una rutina de verificación. Ejemplos de gestión y de aula, sin terminal y sin código.', url: 'https://inematds.github.io/oswork-v5/es/', icon: '🗂️' },
  { id: 280, kind: 'curso', locale: 'es', title: 'OSWork Quick — Organiza tu entorno de IA en 77 minutos', description: 'La edición directa: siete lecciones de 10 a 13 minutos, con 65 diagramas que enseñan. Carpetas por frente de trabajo, una ficha de orientación, una plantilla de pedido reutilizable y una rutina de verificación. Sin programar.', url: 'https://inematds.github.io/oswork-quick/es/', icon: '📐' },
]

export function translatedFor(locale: Locale): TranslatedItem[] {
  if (locale === 'pt') return []
  return translatedCatalog.filter((item) => item.locale === locale)
}
