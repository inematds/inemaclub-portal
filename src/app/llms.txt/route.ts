import { courses } from '@/lib/catalog'
import { webMcpKnowledge } from '@/data/webmcp-knowledge'

export function GET() {
  const webMcpCourses = courses.filter((course) => course.tags.includes('WebMCP'))
  const content = `# INEMA.club

> Plataforma brasileira de formação prática em inteligência artificial, agentes e automação, criada por Nei Maldaner.

## Principais páginas

- [Portal INEMA](https://www.inema.club/)
- [Sobre o INEMA](https://www.inema.club/conhecimento/o-que-e-o-inema/)
- [Cursos](https://www.inema.club/cursos/)
- [Projetos](https://www.inema.club/conhecimento/projetos-publicos-do-inema/)
- [Base de conhecimento](https://www.inema.club/conhecimento/)

## Formação WebMCP

${webMcpCourses.map((course) => `- [${course.title}](${course.canonicalUrl})`).join('\n')}

## Perguntas sobre WebMCP

${webMcpKnowledge.map((article) => `- [${article.title}](https://www.inema.club/conhecimento/${article.slug}/)`).join('\n')}

## Catálogos para agentes

- [Cursos em JSON](https://www.inema.club/api/courses)
- [Projetos em JSON](https://www.inema.club/api/projects)
- [Trilhas em JSON](https://www.inema.club/api/trails)
- [Conhecimento em JSON](https://www.inema.club/api/knowledge)
- [Atualizações em JSON](https://www.inema.club/api/updates)
- [Atualizações em RSS](https://www.inema.club/feed.xml)

## Ecossistema oficial

- [INEMA.pro](https://inema.pro/)
- [INEMA.VIP](https://inema.vip/)
- [GitHub](https://github.com/inematds)

Última atualização: 2026-08-30.
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
