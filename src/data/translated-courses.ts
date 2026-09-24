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
  { id: 282, kind: 'curso', locale: 'en', title: 'AI Agent Management — the 7 Principles', description: '4 tracks, 8 modules and 48 topics to delegate work to AI with clear intent, context, reliable data, success criteria, autonomy with limits (N0–N4), observation and supervision. With the Agent Sheet, a gallery of 10 cases and a final project.', url: 'https://inematds.github.io/curso-7pa/en/', icon: '🧭' },
  { id: 282, kind: 'curso', locale: 'es', title: 'Gestión de Agentes de IA — los 7 Principios', description: '4 rutas, 8 módulos y 48 temas para delegar trabajo a la IA con intención clara, contexto, datos confiables, criterio de éxito, autonomía con límites (N0–N4), observación y supervisión. Con la Ficha del Agente, una galería de 10 casos y un proyecto final.', url: 'https://inematds.github.io/curso-7pa/es/', icon: '🧭' },
  { id: 10003, kind: 'projeto', locale: 'en', title: '7PA — Agent Sheet: the 7 principles of AI agent management', description: 'Answer 7 simple questions and get your AI agent ready: the instruction to paste, the autonomy level calculated (N0–N4), 3 tests and a supervision checklist. Plus a guide that explains it all, a gallery of 10 ready sheets and the /ficha-agente skill for Claude Code.', url: 'https://inematds.github.io/7pa/guia/en/', icon: '🧑‍✈️' },
  { id: 10003, kind: 'projeto', locale: 'es', title: '7PA — Ficha del Agente: los 7 principios de la gestión de agentes de IA', description: 'Responde 7 preguntas sencillas y recibe tu agente de IA listo: la instrucción para pegar, el nivel de autonomía calculado (N0–N4), 3 pruebas y un checklist de supervisión. Con una guía que lo explica todo, una galería de 10 fichas listas y la skill /ficha-agente para Claude Code.', url: 'https://inematds.github.io/7pa/guia/es/', icon: '🧑‍✈️' },
  { id: 10004, kind: 'projeto', locale: 'en', title: 'The Secret of the 7 Principles — what these texts really are', description: '5 revelations about AI agent management: it is people management under another name, and it is what developers already do every day with coding agents.', url: 'https://inematds.github.io/7pa-segredo/en/', icon: '🔓' },
  { id: 10004, kind: 'projeto', locale: 'es', title: 'El Secreto de los 7 Principios — lo que estos textos realmente son', description: '5 revelaciones sobre la gestión de agentes de IA: es gestión de personas con otro nombre, y es lo que quienes programan con agentes de código ya hacen todos los días.', url: 'https://inematds.github.io/7pa-segredo/es/', icon: '🔓' },
  { id: 10001, kind: 'projeto', locale: 'en', title: 'Claude Opus 5.5 — Research and upgrade plan', description: 'Launch research with pricing, benchmark and effort × cost charts, the API changes and the upgrade plan for INEMA systems.', url: 'https://inematds.github.io/claude-opus55/guia/en/', icon: '🧠' },
  { id: 10001, kind: 'projeto', locale: 'es', title: 'Claude Opus 5.5 — Investigación y plan de actualización', description: 'Investigación del lanzamiento con gráficos de precios, benchmarks y effort × costo, los cambios de la API y el plan de actualización de los sistemas de INEMA.', url: 'https://inematds.github.io/claude-opus55/guia/es/', icon: '🧠' },
  { id: 10002, kind: 'projeto', locale: 'en', title: 'Which AI Model to Use — The right model for each task', description: 'The new models explained simply, the current stack (Claude Opus 5.5, GPT-6 Astra, Sol and Luna), rules for choosing, plan→execute and second-opinion prompts, a test battery and a draft skill.', url: 'https://inematds.github.io/modelos/guia/en/', icon: '🧭' },
  { id: 10002, kind: 'projeto', locale: 'es', title: 'Qué Modelo de IA Usar — El modelo correcto para cada tarea', description: 'Los nuevos modelos explicados de forma simple, el stack actual (Claude Opus 5.5, GPT-6 Astra, Sol y Luna), reglas para elegir, prompts de planificar→ejecutar y segunda opinión, y una batería de pruebas.', url: 'https://inematds.github.io/modelos/guia/es/', icon: '🧭' },
  { id: 281, kind: 'curso', locale: 'en', title: 'Agent Skills — Build verifiable skills in Codex', description: '4 tracks, 8 modules, 48 topics and 53 diagrams on reverse engineering, triggers, autonomy, verification and continuous improvement. Includes progress, notes and a hands-on lab.', url: 'https://inematds.github.io/agent-skills/en/', icon: '🧩' },
  { id: 281, kind: 'curso', locale: 'es', title: 'Agent Skills — Crea skills verificables en Codex', description: '4 itinerarios, 8 módulos, 48 temas y 53 diagramas sobre ingeniería inversa, activación, autonomía, verificación y mejora continua. Incluye progreso, notas y un laboratorio práctico.', url: 'https://inematds.github.io/agent-skills/es/', icon: '🧩' },
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
