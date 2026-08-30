import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['OAI-SearchBot', 'Claude-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Googlebot', 'Bingbot'],
        allow: '/',
      },
    ],
    host: 'https://www.inema.club',
    sitemap: [
      'https://www.inema.club/sitemap.xml',
      'https://www.inema.club/courses-sitemap.xml',
    ],
  }
}
