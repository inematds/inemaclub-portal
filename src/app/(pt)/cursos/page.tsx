import type { Metadata } from 'next'
import CourseCatalog from '@/components/CourseCatalog'
import { courses } from '@/lib/catalog'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cursos de inteligência artificial, agentes e automação',
  description: 'Catálogo público de cursos do INEMA, com páginas canônicas, temas e acesso à aplicação de cada formação.',
  alternates: { canonical: '/cursos/' },
  openGraph: {
    type: 'website',
    url: '/cursos/',
    title: 'Cursos do INEMA',
    description: 'Formação prática em inteligência artificial, agentes, automação e desenvolvimento com IA.',
  },
}

export default function CoursesPage() {
  const listJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cursos do INEMA',
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: course.canonicalUrl,
      name: course.title,
    })),
  }

  return (
    <main className="course-page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd).replace(/</g, '\\u003c') }}
      />
      <nav className="course-breadcrumb" aria-label="Navegação estrutural">
        <a href={SITE_URL}>INEMA.club</a><span aria-hidden="true">/</span><span>Cursos</span>
      </nav>
      <header className="course-index-header">
        <h1>Cursos para aprender e aplicar IA na prática</h1>
        <p>Explore o catálogo público do INEMA. Cada ficha reúne o que já está documentado e leva à aplicação original do curso.</p>
      </header>
      <CourseCatalog
        courses={courses.map(({ canonicalPath, title, description, tags }) => ({ canonicalPath, title, description, tags }))}
      />
    </main>
  )
}

