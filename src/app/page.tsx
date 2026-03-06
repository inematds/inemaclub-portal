import { supabaseAdmin } from '@/lib/supabase'
import Portal from '@/components/Portal'

export const revalidate = 60 // revalida a cada 60 segundos

export default async function Home() {
  const BASE_TOTAL = 20000
  const BASE_UNIQUE_ANON = 10000
  let visitStats = { total: BASE_TOTAL, uniqueLogged: 0, uniqueAnon: BASE_UNIQUE_ANON }

  try {
    // Contagem total via count do Supabase (sem transferir dados)
    const { count: totalCount } = await supabaseAdmin
      .from('visits')
      .select('*', { count: 'exact', head: true })

    // Busca dados para cálculo de únicos (limit alto para superar default de 1000)
    const { data: visits } = await supabaseAdmin
      .from('visits')
      .select('user_id, session_id')
      .limit(100000)

    if (visits) {
      const total = BASE_TOTAL + (totalCount ?? visits.length)
      const uniqueLogged = new Set(
        visits.filter((v) => v.user_id).map((v) => v.user_id)
      ).size
      const uniqueAnon = BASE_UNIQUE_ANON + new Set(
        visits.filter((v) => !v.user_id).map((v) => v.session_id)
      ).size
      visitStats = { total, uniqueLogged, uniqueAnon }
    }
  } catch {
    // Supabase não configurado ainda — retorna base values
  }

  return <Portal visitStats={visitStats} />
}
