import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { courses } from '@/lib/catalog'
import { SITE_URL } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }))
}

function findCourse(slug: string) {
  return courses.find((course) => course.slug === slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = findCourse((await params).slug)
  if (!course) return {}

  return {
    title: course.title,
    description: course.description,
    alternates: { canonical: course.canonicalPath },
    openGraph: {
      type: 'article',
      url: course.canonicalPath,
      title: course.title,
      description: course.description,
      images: ['/doc/inema-hero-aprenda-pratique-evolua.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description: course.description,
      images: ['/doc/inema-hero-aprenda-pratique-evolua.webp'],
    },
  }
}

export default async function CoursePage({ params }: Props) {
  const course = findCourse((await params).slug)
  if (!course) notFound()

  const related = courses
    .filter((candidate) => candidate.id !== course.id && candidate.tags.some((tag) => course.tags.includes(tag)))
    .slice(0, 4)
  const faq = [
    {
      question: `O que é o curso ${course.title}?`,
      answer: course.description,
    },
    {
      question: 'Quais temas este curso aborda?',
      answer: `Os temas catalogados são: ${course.tags.join(', ')}. Consulte a aplicação do curso para o programa detalhado.`,
    },
    {
      question: 'Como acessar o curso?',
      answer: 'Use o botão “Abrir o curso” nesta página. Ele leva à aplicação oficial onde o conteúdo e as condições atuais de acesso são apresentados.',
    },
  ]
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${course.canonicalUrl}#course`,
      name: course.title,
      description: course.description,
      url: course.canonicalUrl,
      provider: { '@type': 'EducationalOrganization', '@id': `${SITE_URL}/#organization`, name: 'INEMA.club' },
      author: { '@type': 'Person', name: 'Nei Maldaner' },
      teaches: course.tags,
      inLanguage: 'pt-BR',
      dateModified: course.lastUpdated ?? undefined,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        url: course.applicationUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'INEMA.club', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Cursos', item: `${SITE_URL}/cursos/` },
        { '@type': 'ListItem', position: 3, name: course.title, item: course.canonicalUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return (
    <main className="course-page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <nav className="course-breadcrumb" aria-label="Navegação estrutural">
        <a href="/">INEMA.club</a><span aria-hidden="true">/</span><a href="/cursos/">Cursos</a>
        <span className="breadcrumb-current"><span aria-hidden="true">/</span><span>{course.title}</span></span>
      </nav>
      <article className="course-detail">
        <header>
          <h1>{course.title}</h1>
          <p className="course-direct-answer">{course.description}</p>
          <a className="course-primary-action" href={course.applicationUrl} target="_blank" rel="noopener noreferrer">
            Abrir o curso
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
          </a>
        </header>

        <section aria-labelledby="course-summary">
          <h2 id="course-summary">Resumo do curso</h2>
          <dl className="course-facts">
            <div><dt>Formato</dt><dd>Online</dd></div>
            <div><dt>Nível catalogado</dt><dd>{course.level ?? 'Não informado na fonte'}</dd></div>
            <div><dt>Autor</dt><dd>Nei Maldaner</dd></div>
            <div><dt>Atualização</dt><dd>{course.lastUpdated ?? 'Não informada na fonte'}</dd></div>
          </dl>
        </section>

        <section aria-labelledby="course-outcomes">
          <h2 id="course-outcomes">O que você encontra</h2>
          <ul className="course-topics">
            {course.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <p>A carga horária, os pré-requisitos, os módulos e as condições de acesso devem ser confirmados na aplicação oficial do curso.</p>
        </section>

        <section aria-labelledby="course-faq">
          <h2 id="course-faq">Perguntas frequentes</h2>
          <div className="course-faq-list">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section aria-labelledby="related-courses">
            <h2 id="related-courses">Cursos relacionados</h2>
            <ul className="related-course-list">
              {related.map((item) => <li key={item.id}><a href={item.canonicalPath}>{item.title}</a></li>)}
            </ul>
          </section>
        )}

        <footer className="course-source-note">
          <p>Fonte canônica: INEMA.club · Aplicação do curso: <a href={course.applicationUrl}>{course.applicationUrl}</a></p>
        </footer>
      </article>
    </main>
  )
}
