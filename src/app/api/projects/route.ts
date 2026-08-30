import { NextRequest, NextResponse } from 'next/server'
import { projects } from '@/lib/catalog'

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim()
  const requestedLimit = Number.parseInt(request.nextUrl.searchParams.get('limit') ?? '50', 10)
  const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 100) : 50
  const term = query ? normalize(query) : null
  const result = term
    ? projects.filter((project) => normalize(`${project.name} ${project.desc} ${project.badge ?? ''}`).includes(term))
    : projects

  return NextResponse.json({
    ok: true,
    total: result.length,
    count: Math.min(result.length, limit),
    items: result.slice(0, limit),
  })
}

