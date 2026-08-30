import { NextRequest, NextResponse } from 'next/server'
import { courses, searchCourses } from '@/lib/catalog'

const DEFAULT_LIMIT = 50
const MAX_LIMIT = 100

function parseLimit(value: string | null) {
  if (!value) return DEFAULT_LIMIT
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), MAX_LIMIT) : DEFAULT_LIMIT
}

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const id = params.get('id')
  const slug = params.get('slug')

  if (id || slug) {
    const course = courses.find((item) => item.id === Number(id) || item.slug === slug)
    if (!course) {
      return NextResponse.json({ ok: false, error: 'Curso não encontrado.' }, { status: 404 })
    }
    return NextResponse.json({ ok: true, item: course })
  }

  const requestedIds = params
    .get('ids')
    ?.split(',')
    .map((value) => Number.parseInt(value, 10))
    .filter(Number.isFinite)

  const result = requestedIds?.length
    ? courses.filter((course) => requestedIds.includes(course.id))
    : searchCourses({
        query: params.get('q'),
        theme: params.get('tema'),
        level: params.get('nivel'),
        objective: params.get('objetivo'),
      })

  const limit = parseLimit(params.get('limit'))
  return NextResponse.json({
    ok: true,
    total: result.length,
    count: Math.min(result.length, limit),
    items: result.slice(0, limit),
  })
}

