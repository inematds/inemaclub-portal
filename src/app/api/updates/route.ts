import { NextRequest, NextResponse } from 'next/server'
import { catalogUpdates } from '@/lib/catalog'

export function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('tipo')
  const requestedLimit = Number.parseInt(request.nextUrl.searchParams.get('limit') ?? '30', 10)
  const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 100) : 30
  const items = category === 'curso' || category === 'projeto'
    ? catalogUpdates.filter((update) => update.category === category)
    : catalogUpdates

  return NextResponse.json({ ok: true, total: items.length, items: items.slice(0, limit) })
}

