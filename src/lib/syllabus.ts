import syllabusData from '@/data/courses.syllabus.json'

/**
 * Ementa real dos cursos prioritários, extraída da página de cada curso por
 * scripts/extrai-syllabus.mjs (extrativo + validado). Chave = URL da aplicação.
 */
export type Syllabus = {
  structure: { title: string; detail: string }[]
  learn: string[]
  audience: string[]
  build: string[]
  prerequisites: string[]
  workload: string | null
  level: string | null
  enriched: boolean
  enrichedAt: string
}

const data = syllabusData as Record<string, Syllabus>

const key = (url: string) => url.trim().toLowerCase().replace(/\/+$/, '')
const byUrl = new Map(Object.entries(data).map(([url, value]) => [key(url), value]))

const words = (text: string) => text.trim().split(/\s+/).length

/** Tira fragmentos de cabeçalho ("…para você se"), itens curtos demais e repetidos/contidos em outro. */
function clean(items: string[], minWords: number) {
  const kept = items
    .map((item) => item.trim())
    .filter((item) => words(item) >= minWords && !/(\bse|:)$/i.test(item))
  return kept.filter(
    (item, index) => !kept.some((other, j) => j !== index && other.length > item.length && other.toLowerCase().startsWith(item.toLowerCase())),
  )
}

export function getSyllabus(url: string): Syllabus | null {
  const found = byUrl.get(key(url))
  if (!found?.enriched) return null
  return {
    ...found,
    learn: clean(found.learn, 2),
    audience: clean(found.audience, 3),
    build: clean(found.build, 3),
    prerequisites: clean(found.prerequisites, 2),
  }
}

export function isEnriched(url: string) {
  return Boolean(byUrl.get(key(url))?.enriched)
}
