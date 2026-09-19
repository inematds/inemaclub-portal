import { courses } from '@/lib/catalog'
import { webMcpKnowledge } from '@/data/webmcp-knowledge'

export function GET() {
  const webMcpCourses = courses.filter((course) => course.tags.includes('WebMCP'))
  const content = `# INEMA.club

> Plataforma brasileira de formação prática em inteligência artificial, agentes e automação, criada por Nei Maldaner.

## Principais páginas

- [Portal INEMA — Português](https://www.inema.club/)
- [Portal INEMA — English](https://www.inema.club/en/)
- [Portal INEMA — Español](https://www.inema.club/es/)
- [Sobre o INEMA](https://www.inema.club/conhecimento/o-que-e-o-inema/)
- [Cursos](https://www.inema.club/cursos/)
- [Projetos](https://www.inema.club/conhecimento/projetos-publicos-do-inema/)
- [Base de conhecimento](https://www.inema.club/conhecimento/)

## Formação WebMCP

${webMcpCourses.map((course) => `- [${course.title}](${course.canonicalUrl})`).join('\n')}

## Perguntas sobre WebMCP

${webMcpKnowledge.map((article) => `- [${article.title}](https://www.inema.club/conhecimento/${article.slug}/)`).join('\n')}

## Descoberta

- [Manifesto INEMA](https://www.inema.club/inema.json): identidade, idiomas, relações e capacidades declaradas.
- [Sitemap de páginas](https://www.inema.club/sitemap.xml)
- [Sitemap de cursos](https://www.inema.club/courses-sitemap.xml)

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

## Idiomas e ferramentas

- [Homes PT/EN/ES](https://www.inema.club/): somente as homes estão traduzidas; catálogo e conhecimento permanecem em português.
- [Ferramentas WebMCP declaradas](https://www.inema.club/inema.json): disponíveis na página quando o navegador suporta o registro; use as APIs JSON como alternativa de leitura. Este índice não comprova execução.
- [News PT](https://news.inema.pro/), [English](https://news.inema.pro/en/), [Español](https://news.inema.pro/es/): notícias.
- [Eventos PT](https://eventos.inema.pro/), [English](https://eventos.inema.pro/en/), [Español](https://eventos.inema.pro/es/): agenda e páginas de eventos.
- [WebMCP Readiness](https://webmcp.inema.pro/): análise passiva de sites.

Índice gerado a partir do catálogo; datas de conteúdo estão nos registros e sitemaps quando conhecidas.
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
