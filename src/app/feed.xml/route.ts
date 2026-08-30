import { catalogUpdates, courses } from '@/lib/catalog'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function updateUrl(update: (typeof catalogUpdates)[number]) {
  if (update.category === 'curso') {
    return courses.find((course) => course.applicationUrl === update.url)?.canonicalUrl ?? update.url
  }
  return update.url
}

export function GET() {
  const items = catalogUpdates.slice(0, 50).map((update) => {
    const url = updateUrl(update)
    const description = `${update.type === 'novo' ? 'Novo' : 'Atualizado'} ${update.category} no catálogo do INEMA.`
    return `    <item>
      <title>${escapeXml(update.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="false">${escapeXml(`${update.category}:${update.date}:${update.title}`)}</guid>
      <pubDate>${new Date(`${update.date}T12:00:00-03:00`).toUTCString()}</pubDate>
      <category>${escapeXml(update.category)}</category>
      <description>${escapeXml(description)}</description>
    </item>`
  }).join('\n')
  const latestDate = catalogUpdates[0]?.date ?? '2026-08-30'
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Atualizações do INEMA.club</title>
    <link>${SITE_URL}/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date(`${latestDate}T12:00:00-03:00`).toUTCString()}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}

