import { supabaseAdmin } from '@/lib/supabase'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site'
import { ORG_ID } from '@/lib/entities'
import { HTML_LANG, localeHome, type Locale } from '@/i18n/locales'

export type VisitStats = { total: number; uniqueLogged: number; uniqueAnon: number }

const BASE_TOTAL = 100000
const BASE_UNIQUE_ANON = 50000

type StatsRow = { total: number; unique_anon: number; unique_logged: number }

export async function getVisitStats(): Promise<VisitStats> {
  let visitStats: VisitStats = { total: BASE_TOTAL, uniqueLogged: 0, uniqueAnon: BASE_UNIQUE_ANON }
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
  return visitStats
}

export function buildHomeJsonLd(locale: Locale) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}${localeHome(locale)}#website`,
    url: `${SITE_URL}${localeHome(locale)}`,
    name: 'INEMA.club',
    description: SITE_DESCRIPTION,
    publisher: { '@id': ORG_ID },
    inLanguage: HTML_LANG[locale],
  }

  // A organização e o Nei vêm do RootShell (src/lib/entities.ts), em toda página.
  return [websiteJsonLd]
}
