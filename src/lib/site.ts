import type { Course } from '@/data/courses'

export const SITE_URL = 'https://www.inema.club'
export const SITE_NAME = 'INEMA.club'
export const SITE_DESCRIPTION =
  'Plataforma brasileira de formação prática em inteligência artificial, agentes e automação, com cursos, projetos, trilhas e comunidade.'

export function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function courseSlug(course: Course) {
  return `${course.id}-${slugify(course.title)}`
}

export function coursePath(course: Course) {
  return `/cursos/${courseSlug(course)}/`
}

export function courseCanonicalUrl(course: Course) {
  return `${SITE_URL}${coursePath(course)}`
}

