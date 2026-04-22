import { supabaseAdmin } from '@/lib/supabase'
import Portal from '@/components/Portal'

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

  return <Portal visitStats={visitStats} />
}
