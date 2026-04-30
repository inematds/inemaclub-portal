import { NextResponse } from 'next/server'

export const revalidate = 600 // 10 min de cache

type GhCommit = {
  sha: string
  html_url: string
  commit: {
    message: string
    author: { name: string; date: string } | null
  }
  author: { login: string; avatar_url: string } | null
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
      'https://api.github.com/repos/inematds/portal/commits?per_page=20',
      { headers, next: { revalidate: 600 } }
    )

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `GitHub API ${res.status}` },
        { status: 502 }
      )
    }

    const commits = (await res.json()) as GhCommit[]

    const items = commits.map((c) => {
      const fullMsg = c.commit.message ?? ''
      const title = fullMsg.split('\n')[0]
      return {
        sha: c.sha.slice(0, 7),
        url: c.html_url,
        title,
        author: c.author?.login ?? c.commit.author?.name ?? 'unknown',
        date: c.commit.author?.date ?? '',
      }
    })

    return NextResponse.json({ ok: true, items })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown error'
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
