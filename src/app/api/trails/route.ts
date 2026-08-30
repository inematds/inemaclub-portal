import { NextResponse } from 'next/server'
import { learningTrails } from '@/lib/catalog'

export function GET() {
  return NextResponse.json({
    ok: true,
    total: learningTrails.length,
    items: learningTrails,
  })
}

