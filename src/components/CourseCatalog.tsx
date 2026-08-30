'use client'

import { useEffect, useMemo, useState } from 'react'
import type { CatalogCourse } from '@/lib/catalog'

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default function CourseCatalog({ courses }: { courses: CatalogCourse[] }) {
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
        <span>Buscar no catálogo</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ex.: WebMCP, agentes, automação"
        />
      </label>
      <p className="course-result-count" aria-live="polite">
        {visibleCourses.length} {visibleCourses.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
      </p>
      {visibleCourses.length ? (
        <div className="course-catalog-list">
          {visibleCourses.map((course) => (
            <article className="course-catalog-item" key={course.id}>
              <div>
                <h2><a href={course.canonicalPath}>{course.title}</a></h2>
                <p>{course.description}</p>
              </div>
              <ul aria-label="Temas do curso">
                {course.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          ))}
        </div>
      ) : (
        <p className="course-empty">Nenhum curso corresponde à busca. Tente um tema mais amplo.</p>
      )}
    </>
  )
}
