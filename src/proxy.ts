import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { webMcpKnowledge } from '@/data/webmcp-knowledge'

const localKnowledgePaths = new Set(webMcpKnowledge.map((article) => `/conhecimento/${article.slug}/`))

// F2 do programa AIV: base de conhecimento pública (AEO/GEO), hospedada como
// GitHub Pages no repo NeiMaldaner/conhecimento, servida sob inema.club pra
// concentrar autoridade. Usa o pathname original (com barra final intacta)
// em vez do rewrite do next.config, que perde a barra ao reconstruir :path*.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`
  if (localKnowledgePaths.has(normalizedPath)) {
    return NextResponse.next()
  }
  if (pathname.startsWith('/conhecimento/') || pathname === '/conhecimento') {
    const destination = new URL(pathname + search, 'https://neimaldaner.github.io')
    return NextResponse.rewrite(destination)
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/conhecimento/:path*',
}
