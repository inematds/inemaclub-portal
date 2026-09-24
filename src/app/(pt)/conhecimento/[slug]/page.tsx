import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WEBMCP_CHROME_DOCS, WEBMCP_SPEC_URL, webMcpKnowledge } from '@/data/webmcp-knowledge'
import { SITE_URL } from '@/lib/site'
import { authorRef, publisherRef } from '@/lib/entities'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return webMcpKnowledge.map((article) => ({ slug: article.slug }))
}

function findArticle(slug: string) {
  return webMcpKnowledge.find((article) => article.slug === slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = findArticle((await params).slug)
  if (!article) return {}
  const path = `/conhecimento/${article.slug}/`
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title: article.title, description: article.description },
    twitter: { card: 'summary', title: article.title, description: article.description },
  }
}

export default async function KnowledgePage({ params }: Props) {
  const article = findArticle((await params).slug)
  if (!article) notFound()
  const url = `${SITE_URL}/conhecimento/${article.slug}/`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      url,
      datePublished: '2026-08-30',
      dateModified: '2026-08-30',
      inLanguage: 'pt-BR',
      author: authorRef,
      reviewedBy: publisherRef,
      publisher: publisherRef,
      citation: [WEBMCP_SPEC_URL, WEBMCP_CHROME_DOCS],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'INEMA.club', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Conhecimento', item: `${SITE_URL}/conhecimento/` },
        { '@type': 'ListItem', position: 3, name: article.title, item: url },
      ],
    },
  ]

  return (
    <main className="course-page-shell knowledge-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav className="course-breadcrumb" aria-label="Navegação estrutural">
        <a href="/">INEMA.club</a><span aria-hidden="true">/</span><a href="/conhecimento/">Conhecimento</a>
        <span className="breadcrumb-current"><span aria-hidden="true">/</span><span>{article.title}</span></span>
      </nav>
      <article>
        <header>
          <h1>{article.title}</h1>
          <p className="course-direct-answer">{article.description}</p>
        </header>

        <section>
          <h2>Em resumo</h2>
          <ul className="knowledge-summary">
            {article.summary.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}

        <section>
          <h2>Perguntas relacionadas</h2>
          <div className="course-faq-list">
            {article.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2>Fontes</h2>
          <ul className="knowledge-sources">
            <li><a href={WEBMCP_SPEC_URL}>WebMCP — Draft Community Group Report</a></li>
            <li><a href={WEBMCP_CHROME_DOCS}>Chrome for Developers — WebMCP</a></li>
          </ul>
        </section>

        <footer className="course-source-note">
          <p>Autor: Nei Maldaner · Revisão: INEMA · Publicado e atualizado em 30 de agosto de 2026.</p>
        </footer>
      </article>
    </main>
  )
}
