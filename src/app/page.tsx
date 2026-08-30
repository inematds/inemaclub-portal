import { supabaseAdmin } from '@/lib/supabase'
import Portal from '@/components/Portal'
import { OFFICIAL_PROFILES, SITE_DESCRIPTION, SITE_URL } from '@/lib/site'

export const revalidate = 60 // revalida a cada 60 segundos

const BASE_TOTAL = 100000
const BASE_UNIQUE_ANON = 50000

type StatsRow = { total: number; unique_anon: number; unique_logged: number }

export default async function Home() {
  let visitStats = { total: BASE_TOTAL, uniqueLogged: 0, uniqueAnon: BASE_UNIQUE_ANON }

  try {
    // RPC visit_stats() usa RETURNS TABLE → vem como array [{...}]
    const { data } = await supabaseAdmin.rpc('visit_stats')
    const row: StatsRow | null = Array.isArray(data) ? data[0] ?? null : (data as StatsRow | null)
    if (row && typeof row.total === 'number') {
      visitStats = {
        total: BASE_TOTAL + row.total,
        uniqueLogged: row.unique_logged ?? 0,
        uniqueAnon: BASE_UNIQUE_ANON + (row.unique_anon ?? 0),
      }
    }
  } catch {
    // Supabase não configurado — retorna valores base
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'INEMA.club',
    alternateName: 'INEMA',
    url: SITE_URL,
    logo: `${SITE_URL}/doc/conviteinemap.png`,
    description: SITE_DESCRIPTION,
    founder: {
      '@type': 'Person',
      name: 'Nei Maldaner',
      url: `${SITE_URL}/conhecimento/quem-e-nei-maldaner/`,
    },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    sameAs: OFFICIAL_PROFILES,
    subOrganization: [
      { '@type': 'Organization', name: 'INEMA.pro', url: 'https://inema.pro/' },
      { '@type': 'Organization', name: 'INEMA.VIP', url: 'https://inema.vip/' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cursos e formações do INEMA',
      url: `${SITE_URL}/cursos/`,
    },
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'INEMA.club',
    description: SITE_DESCRIPTION,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'pt-BR',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, websiteJsonLd]).replace(/</g, '\\u003c') }}
      />
      <Portal visitStats={visitStats} />
    </>
  )
}
