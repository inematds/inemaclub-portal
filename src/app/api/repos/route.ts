import { NextResponse } from 'next/server'

export const revalidate = 600 // 10 min de cache

type GhRepo = {
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  pushed_at: string
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
      'https://api.github.com/users/inematds/repos?per_page=100&type=owner&sort=updated',
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
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 15)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description ?? '',
        stars: r.stargazers_count,
        language: r.language,
        pushed_at: r.pushed_at,
      }))

    return NextResponse.json({ ok: true, items })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown error'
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
