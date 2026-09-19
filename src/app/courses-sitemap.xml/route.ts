import { courses } from '@/lib/catalog'

function xmlEscape(value: string) {
  return value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!)
}

export function GET() {
  const lastModified = courses.reduce<string | null>(
    (latest, course) => (!latest || (course.lastUpdated && course.lastUpdated > latest) ? course.lastUpdated : latest),
    null,
  )
  const urls = courses
    .map(
      (course) => `  <url><loc>${xmlEscape(course.canonicalUrl)}</loc>${course.lastUpdated ? `<lastmod>${xmlEscape(course.lastUpdated)}</lastmod>` : ''}</url>`,
    )
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://www.inema.club/cursos/</loc>${lastModified ? `<lastmod>${lastModified}</lastmod>` : ''}</url>\n${urls}\n</urlset>\n`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
