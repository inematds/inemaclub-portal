import catalogData from '@/data/courses.data.json'
import { platformsData, projectUpdatesData, updatesData, type Course, type Update } from '@/data/courses'
import { courseCanonicalUrl, coursePath, courseSlug } from '@/lib/site'

export type CatalogCourse = Course & {
  slug: string
  canonicalPath: string
  canonicalUrl: string
  applicationUrl: string
  level: 'iniciante' | 'intermediario' | 'avancado' | null
  lastUpdated: string | null
}

export type CatalogProject = {
  icon: string
  name: string
  desc: string
  url?: string
  badge?: string
}

const LEVELS = ['iniciante', 'intermediario', 'avancado'] as const

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function courseLevel(course: Course): CatalogCourse['level'] {
  const content = normalize(`${course.title} ${course.description} ${course.tags.join(' ')}`)
  return LEVELS.find((level) => content.includes(level)) ?? null
}

export function enrichCourse(course: Course): CatalogCourse {
  const update = updatesData.find((item) => item.url === course.url)
  return {
    ...course,
    slug: courseSlug(course),
    canonicalPath: coursePath(course),
    canonicalUrl: courseCanonicalUrl(course),
    applicationUrl: course.url,
    level: courseLevel(course),
    lastUpdated: update?.date ?? null,
  }
}

export const courses = platformsData.map(enrichCourse)
export const projects = catalogData.communityProjects as CatalogProject[]

const trailDefinitions = [
  ['Trilha Profissional com IA', 'profissional'],
  ['Trilha Vibe Code', 'vibe'],
  ['Trilha Skills', 'skill'],
  ['Arquitetura de IA', 'arquitetura'],
  ['Automação', 'automacao'],
  ['Engenharia de Prompts', 'prompt'],
  ['Design & Visual', 'design'],
  ['Robótica & Humanoides', 'robot'],
  ['Consultoria IA & Negócios', 'consult'],
  ['Dados & IA', 'dados'],
  ['Desenvolvedor IA', 'desenvolv'],
  ['Transformação Digital', 'transformacao digital'],
  ['Vídeos, Filmes e Cinema', 'video'],
  ['Frameworks & Assistentes', 'assistente'],
  ['Claude Code', 'claude code'],
  ['Agentic OS', 'agentic os'],
  ['Formação WebMCP', 'webmcp'],
  ['Codex', 'codex'],
  ['Claude Cowork', 'cowork'],
  ['Neurociência & Futuro', 'neuro'],
  ['Agentes Jarvis', 'jarvis'],
] as const

export const learningTrails = trailDefinitions.map(([name, query]) => ({
  name,
  url: `/cursos/?q=${encodeURIComponent(query)}`,
  courses: courses
    .filter((course) => normalize(`${course.title} ${course.tags.join(' ')}`).includes(query))
    .slice(0, 12),
}))

export const catalogUpdates: Array<Update & { category: 'curso' | 'projeto' }> = [
  ...updatesData.map((update) => ({ ...update, category: 'curso' as const })),
  ...projectUpdatesData.map((update) => ({ ...update, category: 'projeto' as const })),
].sort((a, b) => b.date.localeCompare(a.date))

export function searchCourses(params: {
  query?: string | null
  theme?: string | null
  level?: string | null
  objective?: string | null
}) {
  const termGroups = [params.query, params.theme, params.objective]
    .filter((term): term is string => Boolean(term?.trim()))
    .map((term) => normalize(term).split(/\s+/).filter((token) => token.length > 2))

  return courses.filter((course) => {
    const haystack = normalize(`${course.title} ${course.description} ${course.tags.join(' ')}`)
    const matchesTerms = termGroups.every((tokens) => tokens.some((token) => haystack.includes(token)))
    const matchesLevel = !params.level || course.level === normalize(params.level)
    return matchesTerms && matchesLevel
  })
}
