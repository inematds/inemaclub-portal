'use client'

import { useEffect, useMemo, useState } from 'react'
/** Só o que a lista usa: o catálogo completo ia inteiro (e duplicado) no HTML de /cursos/. */
export type CatalogListItem = { canonicalPath: string; title: string; description: string; tags: string[] }
/** Textos da interface (strings puras: o componente é client, não aceita função vinda do server). */
export type CatalogLabels = {
  searchLabel: string
  searchPlaceholder: string
  countOne: string
  countMany: string
  empty: string
  tagsLabel: string
}

const PT_LABELS: CatalogLabels = {
  searchLabel: 'Buscar no catálogo',
  searchPlaceholder: 'Ex.: WebMCP, agentes, automação',
  countOne: 'curso encontrado',
  countMany: 'cursos encontrados',
  empty: 'Nenhum curso corresponde à busca. Tente um tema mais amplo.',
  tagsLabel: 'Temas do curso',
}

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default function CourseCatalog({ courses, labels = PT_LABELS }: { courses: CatalogListItem[]; labels?: CatalogLabels }) {
  const [query, setQuery] = useState('')
  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get('q')
    if (initialQuery) setQuery(initialQuery)
  }, [])
  const visibleCourses = useMemo(() => {
    const term = normalize(query.trim())
    if (!term) return courses
    return courses.filter((course) =>
      normalize(`${course.title} ${course.description} ${course.tags.join(' ')}`).includes(term),
    )
  }, [courses, query])

  return (
    <>
      <label className="course-search">
        <span>{labels.searchLabel}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.searchPlaceholder}
        />
      </label>
      <p className="course-result-count" aria-live="polite">
        {visibleCourses.length} {visibleCourses.length === 1 ? labels.countOne : labels.countMany}
      </p>
      {visibleCourses.length ? (
        <div className="course-catalog-list">
          {visibleCourses.map((course) => (
            <article className="course-catalog-item" key={course.canonicalPath}>
              <div>
                <h2><a href={course.canonicalPath}>{course.title}</a></h2>
                <p>{course.description}</p>
              </div>
              <ul aria-label={labels.tagsLabel}>
                {course.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          ))}
        </div>
      ) : (
        <p className="course-empty">{labels.empty}</p>
      )}
    </>
  )
}
