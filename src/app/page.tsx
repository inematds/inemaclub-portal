import { supabaseAdmin } from '@/lib/supabase'
import Portal from '@/components/Portal'

export const revalidate = 60 // revalida a cada 60 segundos

export default async function Home() {
  let visitStats = { total: 0, uniqueLogged: 0, uniqueAnon: 0 }

  try {
    const { data: visits } = await supabaseAdmin
      .from('visits')
      .select('user_id, session_id')

    if (visits) {
      const total = visits.length
      const uniqueLogged = new Set(
        visits.filter((v) => v.user_id).map((v) => v.user_id)
      ).size
      const uniqueAnon = new Set(
        visits.filter((v) => !v.user_id).map((v) => v.session_id)
      ).size
      visitStats = { total, uniqueLogged, uniqueAnon }
    }
  } catch {
    // Supabase não configurado ainda — retorna zeros
  }

  return <Portal visitStats={visitStats} />
}
