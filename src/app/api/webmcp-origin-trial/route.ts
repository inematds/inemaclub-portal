import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export function GET() {
  const token = process.env.WEBMCP_ORIGIN_TRIAL_TOKEN?.trim()
  const mode = process.env.WEBMCP_ORIGIN_TRIAL_MODE?.trim()

  const script = token && mode === 'third-party'
    ? `(()=>{const m=document.createElement('meta');m.httpEquiv='origin-trial';m.content=${JSON.stringify(token)};document.head.appendChild(m)})();`
    : '/* WebMCP Origin Trial third-party token not configured. */'

  return new NextResponse(script, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=300, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
