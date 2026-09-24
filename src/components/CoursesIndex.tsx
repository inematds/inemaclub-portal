import type { Metadata } from 'next'
import CourseCatalog from '@/components/CourseCatalog'
import { courses } from '@/lib/catalog'
import { SITE_URL } from '@/lib/site'
import { getDictionary } from '@/i18n/dictionary'
import { coursesPath, localeHome, type Locale } from '@/i18n/locales'
import { translatedFor } from '@/data/translated-courses'

const COURSES_ALTERNATES = {
  'pt-BR': coursesPath('pt'),
  en: coursesPath('en'),
  es: coursesPath('es'),
  'x-default': coursesPath('pt'),
}

export function buildCoursesMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).coursesPage
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: coursesPath(locale), languages: COURSES_ALTERNATES },
    openGraph: {
      type: 'website',
      url: coursesPath(locale),
      title: t.ogTitle,
      description: t.ogDescription,
    },
  }
}

/**
 * Catálogo de cursos. Em EN/ES o catálogo continua em PT (fichas canônicas só em PT);
 * no topo entram os cursos que já têm versão no idioma (translated-courses.ts).
 */
export default function CoursesIndex({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).coursesPage
  const translated = translatedFor(locale).filter((item) => item.kind === 'curso')
  const listJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.ogTitle,
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
      <nav className="course-breadcrumb" aria-label={t.breadcrumbLabel}>
        <a href={locale === 'pt' ? SITE_URL : localeHome(locale)}>INEMA.club</a><span aria-hidden="true">/</span><span>{t.breadcrumb}</span>
      </nav>
      <header className="course-index-header">
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </header>
      {locale !== 'pt' && translated.length > 0 && (
        <section className="course-translated" aria-labelledby="course-translated-title">
          <h2 id="course-translated-title" className="course-section-title">{t.translatedTitle}</h2>
          <div className="course-catalog-list">
            {translated.map((item) => (
              <article className="course-catalog-item" key={`${item.locale}-${item.id}`}>
                <div>
                  <h2><a href={item.url} target="_blank" rel="noopener noreferrer">{item.icon} {item.title}</a></h2>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      {locale !== 'pt' && <h2 className="course-section-title">{t.catalogTitle}</h2>}
      <CourseCatalog
        courses={courses.map(({ canonicalPath, title, description, tags }) => ({ canonicalPath, title, description, tags }))}
        labels={{
          searchLabel: t.searchLabel,
          searchPlaceholder: t.searchPlaceholder,
          countOne: t.countOne,
          countMany: t.countMany,
          empty: t.empty,
          tagsLabel: t.tagsLabel,
        }}
      />
    </main>
  )
}
