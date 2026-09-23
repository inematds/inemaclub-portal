/**
 * Páginas de conteúdo SEO (pilares e guias) servidas pelo inema.club.
 * Fonte única: sitemap.ts e llms.txt leem daqui, então página nova registrada
 * aqui entra nos dois automaticamente. `updated` = data real da última revisão
 * do conteúdo (nunca build time). Plano: repo inematds/inemaseo.
 */
export type SeoPage = {
  path: string
  title: string
  description: string
  updated: string
}

export const seoPages: SeoPage[] = [
  {
    path: '/aprender-inteligencia-artificial/',
    title: 'Como aprender Inteligência Artificial do zero ao avançado',
    description:
      'Guia prático do INEMA para aprender IA na ordem certa: prompts, ferramentas, agentes de código, automação e projetos reais, com cursos gratuitos e comunidade.',
    updated: '2026-09-23',
  },
]
