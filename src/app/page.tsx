import { supabaseAdmin } from '@/lib/supabase'
import Portal from '@/components/Portal'

export const revalidate = 60 // revalida a cada 60 segundos

export default async function Home() {
  const BASE_TOTAL = 20000
  const BASE_UNIQUE_ANON = 10000
  let visitStats = { total: BASE_TOTAL, uniqueLogged: 0, uniqueAnon: BASE_UNIQUE_ANON }

  try {
    const { data: visits } = await supabaseAdmin
      .from('eai-visitors')
      .select('user_id, session_id')

    if (visits) {
      const total = BASE_TOTAL + visits.length
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
