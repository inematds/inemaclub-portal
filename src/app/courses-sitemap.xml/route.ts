import { courses } from '@/lib/catalog'
import { getSyllabus } from '@/lib/syllabus'

function xmlEscape(value: string) {
  return value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!)
}

export function GET() {
  // Só as fichas com ementa real (scripts/extrai-syllabus.mjs). As outras continuam no ar e
  // linkadas em /cursos/, mas ficam fora do sitemap até serem enriquecidas (ver inemaseo).
  const enriched = courses.flatMap((course) => {
    const syllabus = getSyllabus(course.applicationUrl)
    return syllabus ? [{ course, lastmod: syllabus.enrichedAt }] : []
  })
  const lastModified = enriched.reduce<string | null>((latest, item) => (!latest || item.lastmod > latest ? item.lastmod : latest), null)
  const urls = enriched
    .map(({ course, lastmod }) => `  <url><loc>${xmlEscape(course.canonicalUrl)}</loc><lastmod>${xmlEscape(lastmod)}</lastmod></url>`)
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://www.inema.club/cursos/</loc>${lastModified ? `<lastmod>${lastModified}</lastmod>` : ''}</url>\n${urls}\n</urlset>\n`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
