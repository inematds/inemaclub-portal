import { courses } from '@/lib/catalog'
import { OFFICIAL_PROFILES, SITE_URL } from '@/lib/site'
import type { IaPage } from '@/content/ia'
import InlineText, { plainText } from './InlineText'

function sameUrl(a: string, b: string) {
  return a.replace(/\/$/, '').toLowerCase() === b.replace(/\/$/, '').toLowerCase()
}

function formatDate(iso: string) {
  return iso.split('-').reverse().join('/')
}

export function iaPath(page: IaPage) {
  return `/ia/${page.slug}/`
}

export function buildIaJsonLd(page: IaPage) {
  const url = `${SITE_URL}${iaPath(page)}`
  const jsonLd: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: page.title,
      description: page.description,
      url,
      inLanguage: 'pt-BR',
      datePublished: page.published,
      dateModified: page.updated,
      keywords: page.keyword,
      author: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#nei`,
        name: 'Nei Maldaner',
        url: `${SITE_URL}/conhecimento/quem-e-nei-maldaner/`,
        sameAs: OFFICIAL_PROFILES,
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
      isPartOf: { '@id': `${SITE_URL}${page.pillar.path}#article` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'INEMA.club', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: page.pillar.title, item: `${SITE_URL}${page.pillar.path}` },
        { '@type': 'ListItem', position: 3, name: page.title, item: url },
      ],
    },
  ]
  if (page.faq.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: plainText(item.answer) },
      })),
    })
  }
  return jsonLd
}

export default function IaArticle({ page }: { page: IaPage }) {
  const related = page.relatedCourses.flatMap((url) => {
    const course = courses.find((item) => sameUrl(item.url, url))
    return course ? [course] : []
  })

  return (
    <main className="course-page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIaJsonLd(page)).replace(/</g, '\\u003c') }}
      />
      <nav className="course-breadcrumb" aria-label="Navegação estrutural">
        <a href="/">INEMA.club</a><span aria-hidden="true">/</span><a href={page.pillar.path}>{page.pillar.title}</a>
        <span className="breadcrumb-current"><span aria-hidden="true">/</span><span>{page.title}</span></span>
      </nav>
      <article className="course-detail">
        <header>
          <h1>{page.title}</h1>
          <p className="course-direct-answer"><InlineText text={page.answer} /></p>
        </header>

        {page.sections.map((section, index) => {
          const id = `secao-${index + 1}`
          const List = section.ordered ? 'ol' : 'ul'
          return (
            <section key={section.heading} aria-labelledby={id}>
              <h2 id={id}>{section.heading}</h2>
              {section.paragraphs?.map((text) => <p key={text}><InlineText text={text} /></p>)}
              {section.list && (
                <List className="seo-list">
                  {section.list.map((item) => <li key={item}><InlineText text={item} /></li>)}
                </List>
              )}
              {section.table && (
                <div className="seo-table-wrap">
                  <table className="seo-table">
                    <thead><tr>{section.table.head.map((cell) => <th key={cell} scope="col">{cell}</th>)}</tr></thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row[0]}>{row.map((cell, i) => <td key={i}><InlineText text={cell} /></td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )
        })}

        {related.length > 0 && (
          <section aria-labelledby="cursos-relacionados">
            <h2 id="cursos-relacionados">Cursos do INEMA sobre o tema</h2>
            <ul className="seo-list">
              {related.map((course) => (
                <li key={course.canonicalPath}><a href={course.canonicalPath}>{course.title}</a></li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="comunidade">
          <h2 id="comunidade">Aprenda junto com a comunidade</h2>
          <p>
            Para tirar dúvidas, ver projetos de outros alunos e acompanhar as novidades, a formação contínua do INEMA fica no{' '}
            <a href="https://inema.pro" target="_blank" rel="noopener noreferrer">INEMA.PRO</a>, que inclui a comunidade{' '}
            <a href="https://inema.vip" target="_blank" rel="noopener noreferrer">INEMA.VIP</a>.
          </p>
        </section>

        {page.faq.length > 0 && (
          <section aria-labelledby="faq">
            <h2 id="faq">Perguntas frequentes</h2>
            <div className="course-faq-list">
              {page.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p><InlineText text={item.answer} /></p>
                </details>
              ))}
            </div>
          </section>
        )}

        {page.relatedPages.length > 0 && (
          <section aria-labelledby="leia-tambem">
            <h2 id="leia-tambem">Leia também</h2>
            <ul className="related-course-list">
              {page.relatedPages.map((item) => <li key={item.path}><a href={item.path}>{item.title}</a></li>)}
            </ul>
          </section>
        )}

        <footer className="course-source-note">
          <p>
            Por <a href="/conhecimento/quem-e-nei-maldaner/">Nei Maldaner</a>, criador do INEMA · Publicado em{' '}
            <time dateTime={page.published}>{formatDate(page.published)}</time>
            {page.updated !== page.published && (
              <> · Atualizado em <time dateTime={page.updated}>{formatDate(page.updated)}</time></>
            )}
          </p>
        </footer>
      </article>
    </main>
  )
}
