import type { MetadataRoute } from 'next'
import legacyKnowledge from '@/data/knowledge-sitemap.json'
import { webMcpKnowledge } from '@/data/webmcp-knowledge'
import { seoPages } from '@/data/seo-pages'
import { catalogUpdates, courses } from '@/lib/catalog'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = catalogUpdates[0]?.date
  const courseDate = courses.flatMap(c => c.lastUpdated ? [c.lastUpdated] : []).sort().at(-1)
  const languages = { 'pt-BR': `${SITE_URL}/`, en: `${SITE_URL}/en/`, es: `${SITE_URL}/es/`, 'x-default': `${SITE_URL}/` }
  const courseLanguages = { 'pt-BR': `${SITE_URL}/cursos/`, en: `${SITE_URL}/en/cursos/`, es: `${SITE_URL}/es/cursos/`, 'x-default': `${SITE_URL}/cursos/` }
  return [
    ...['/', '/en/', '/es/'].map(path => ({ url: `${SITE_URL}${path}`, ...(latest ? { lastModified: latest } : {}), alternates: { languages } })),
    ...['/cursos/', '/en/cursos/', '/es/cursos/'].map(path => ({ url: `${SITE_URL}${path}`, ...(courseDate ? { lastModified: courseDate } : {}), alternates: { languages: courseLanguages } })),
    ...seoPages.map(page => ({ url: `${SITE_URL}${page.path}`, lastModified: page.updated })),
    ...legacyKnowledge,
    // Same dateModified as the knowledge page template; never use build time.
    ...webMcpKnowledge.map(article => ({ url: `${SITE_URL}/conhecimento/${article.slug}/`, lastModified: '2026-08-30' })),
  ]
}
