import { NextRequest, NextResponse } from 'next/server'
import { webMcpKnowledge } from '@/data/webmcp-knowledge'
import { SITE_URL } from '@/lib/site'

const KNOWLEDGE_INDEX = 'https://neimaldaner.github.io/conhecimento/api/index.json'

type KnowledgeItem = {
  slug: string
  tipo: string
  titulo: string
  url: string
}

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(KNOWLEDGE_INDEX, { next: { revalidate: 3600 } })
    if (!response.ok) throw new Error(`upstream ${response.status}`)

    const query = request.nextUrl.searchParams.get('q')?.trim()
    const type = request.nextUrl.searchParams.get('tipo')?.trim()
    const term = query ? normalize(query) : null
    const source = (await response.json()) as KnowledgeItem[]
    const localItems: KnowledgeItem[] = webMcpKnowledge.map((article) => ({
      slug: article.slug,
      tipo: 'faq',
      titulo: article.title,
      url: `${SITE_URL}/conhecimento/${article.slug}/`,
    }))
    const items = [...localItems, ...source]
      .map((item) => ({ ...item, url: item.url.replace('https://inema.club', 'https://www.inema.club') }))
      .filter((item) => (!type || item.tipo === type) && (!term || normalize(`${item.titulo} ${item.tipo}`).includes(term)))

    return NextResponse.json({ ok: true, total: items.length, items })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'A base de conhecimento está temporariamente indisponível.' },
      { status: 502 },
    )
  }
}
