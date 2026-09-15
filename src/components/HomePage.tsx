import Portal from '@/components/Portal'
import { buildHomeJsonLd, getVisitStats } from '@/lib/home-page'
import type { Locale } from '@/i18n/locales'

export default async function HomePage({ locale }: { locale: Locale }) {
  const visitStats = await getVisitStats()
  const jsonLd = buildHomeJsonLd(locale)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Portal visitStats={visitStats} locale={locale} />
    </>
  )
}
