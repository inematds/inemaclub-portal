import { NextResponse } from 'next/server'

export const revalidate = 600 // 10 min de cache

type GhRepo = {
  name: string
  html_url: string
  description: string | null
  pushed_at: string
  updated_at: string
  stargazers_count: number
  fork: boolean
  archived: boolean
  language: string | null
}

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const res = await fetch(
      'https://api.github.com/orgs/inematds/repos?sort=pushed&direction=desc&per_page=20&type=public',
      { headers, next: { revalidate: 600 } }
    )

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `GitHub API ${res.status}` },
        { status: 502 }
      )
    }

    const repos = (await res.json()) as GhRepo[]

    const items = repos
      .filter((r) => !r.fork && !r.archived && r.name !== 'portal')
      .slice(0, 20)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description ?? '',
        pushed_at: r.pushed_at,
        stars: r.stargazers_count,
        language: r.language,
      }))

    return NextResponse.json({ ok: true, items })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown error'
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
