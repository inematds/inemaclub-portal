import { NextResponse } from 'next/server'

export const revalidate = 1800 // 30 min de cache

type GhEvent = {
  type: string
  created_at: string
  repo: { name: string }
  payload: { ref?: string; head?: string; ref_type?: string }
}

type GhRepo = {
  name: string
  full_name: string
  html_url: string
  description: string | null
  created_at: string
  pushed_at: string
}

const MAX_ITEMS = 20
const NEW_REPO_DAYS = 14 // dias desde criação para considerar "novo"

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const evRes = await fetch(
      'https://api.github.com/users/inematds/events/public?per_page=100',
      { headers, next: { revalidate: 1800 } }
    )

    if (!evRes.ok) {
      return NextResponse.json(
        { ok: false, error: `GitHub events ${evRes.status}` },
        { status: 502 }
      )
    }

    const events = (await evRes.json()) as GhEvent[]

    // Pega o evento mais recente de cada repositório (Push ou Create de repo)
    const seenRepos = new Set<string>()
    const targets: Array<{ repo: string; date: string; createEvent: boolean }> = []
    for (const ev of events) {
      const isPush = ev.type === 'PushEvent' && !!ev.payload?.head
      const isCreate =
        ev.type === 'CreateEvent' && ev.payload?.ref_type === 'repository'
      if (!isPush && !isCreate) continue
      if (seenRepos.has(ev.repo.name)) continue
      seenRepos.add(ev.repo.name)
      targets.push({
        repo: ev.repo.name,
        date: ev.created_at,
        createEvent: isCreate,
      })
      if (targets.length >= MAX_ITEMS) break
    }

    // Busca metadados do repo em paralelo (descrição + data de criação)
    const repoResults = await Promise.allSettled(
      targets.map((t) =>
        fetch(`https://api.github.com/repos/${t.repo}`, {
          headers,
          next: { revalidate: 1800 },
        }).then(async (r) => (r.ok ? ((await r.json()) as GhRepo) : null))
      )
    )

    const now = Date.now()
    const items = repoResults.map((res, i) => {
      const t = targets[i]
      const meta = res.status === 'fulfilled' ? res.value : null
      const shortName = t.repo.replace(/^inematds\//, '')
      const createdAt = meta?.created_at
      const ageDays = createdAt
        ? (now - new Date(createdAt).getTime()) / 86400000
        : Infinity
      const isNovo = t.createEvent || ageDays <= NEW_REPO_DAYS

      return {
        name: shortName,
        url: meta?.html_url ?? `https://github.com/${t.repo}`,
        description: meta?.description ?? '',
        date: t.date,
        type: isNovo ? 'novo' : 'atualizado',
      }
    })

    return NextResponse.json({ ok: true, items })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown error'
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
