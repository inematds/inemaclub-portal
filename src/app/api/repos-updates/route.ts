import { NextResponse } from 'next/server'

export const revalidate = 1800 // 30 min de cache

type GhEvent = {
  type: string
  created_at: string
  repo: { name: string }
  payload: { ref?: string; head?: string }
}

type GhCommit = {
  sha: string
  html_url: string
  commit: {
    message: string
    author: { name: string; date: string } | null
  }
  author: { login: string } | null
}

const MAX_ITEMS = 20

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

    // Pega push events únicos (por SHA), preserva ordem cronológica
    const seen = new Set<string>()
    const targets: Array<{ repo: string; sha: string; date: string }> = []
    for (const ev of events) {
      if (ev.type !== 'PushEvent' || !ev.payload?.head) continue
      const key = `${ev.repo.name}@${ev.payload.head}`
      if (seen.has(key)) continue
      seen.add(key)
      targets.push({ repo: ev.repo.name, sha: ev.payload.head, date: ev.created_at })
      if (targets.length >= MAX_ITEMS) break
    }

    // Busca detalhes dos commits em paralelo
    const commitResults = await Promise.allSettled(
      targets.map((t) =>
        fetch(`https://api.github.com/repos/${t.repo}/commits/${t.sha}`, {
          headers,
          next: { revalidate: 1800 },
        }).then(async (r) => (r.ok ? ((await r.json()) as GhCommit) : null))
      )
    )

    const items = commitResults
      .map((res, i) => {
        const t = targets[i]
        const c = res.status === 'fulfilled' ? res.value : null
        const fullMsg = c?.commit?.message ?? ''
        const title = fullMsg.split('\n')[0] || `Push em ${t.repo.replace(/^inematds\//, '')}`
        return {
          sha: (c?.sha ?? t.sha).slice(0, 7),
          url:
            c?.html_url ??
            `https://github.com/${t.repo}/commit/${t.sha}`,
          title,
          author: c?.author?.login ?? 'inematds',
          date: c?.commit?.author?.date ?? t.date,
          repo: t.repo.replace(/^inematds\//, ''),
        }
      })
      .filter(Boolean)

    return NextResponse.json({ ok: true, items })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown error'
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
