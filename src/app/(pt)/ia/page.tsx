import type { Metadata } from 'next'
import { iaPages } from '@/content/ia'
import { iaPath } from '@/components/seo/IaArticle'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Perguntas sobre IA: respostas diretas e práticas',
  description:
    'Respostas diretas do INEMA para as dúvidas mais comuns sobre inteligência artificial, agentes, automação e ferramentas, com o caminho para aprender na prática.',
  alternates: { canonical: '/ia/' },
}

export default function IaIndexPage() {
  const pages = [...iaPages].sort((a, b) => b.updated.localeCompare(a.updated))
  const listJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Perguntas sobre IA — INEMA.club',
    numberOfItems: pages.length,
    itemListElement: pages.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}${iaPath(page)}`,
      name: page.title,
    })),
  }

  return (
    <main className="course-page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd).replace(/</g, '\\u003c') }}
      />
      <nav className="course-breadcrumb" aria-label="Navegação estrutural">
        <a href="/">INEMA.club</a><span aria-hidden="true">/</span><span>Perguntas sobre IA</span>
      </nav>
      <header className="course-index-header">
        <h1>Perguntas sobre IA</h1>
        <p>
          Respostas diretas para as dúvidas mais comuns sobre inteligência artificial e agentes. Para o caminho completo,
          comece pelo guia <a href="/aprender-inteligencia-artificial/">como aprender IA do zero ao avançado</a>.
        </p>
      </header>
      <ul className="course-catalog-list">
        {pages.map((page) => (
          <li key={page.slug} className="course-catalog-item">
            <h2><a href={iaPath(page)}>{page.title}</a></h2>
            <p>{page.description}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
