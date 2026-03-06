import { supabaseAdmin } from '@/lib/supabase'
import { fetchAllRows } from '@/lib/supabase-utils'
import PortalV2 from '@/components/PortalV2'

const BASE_TOTAL = 90000
const BASE_UNIQUE_ANON = 50000

export const revalidate = 60

export default async function NewPage() {
  let visitStats = { total: BASE_TOTAL, uniqueLogged: 0, uniqueAnon: BASE_UNIQUE_ANON }

  try {
    const { count: totalCount } = await supabaseAdmin
      .from('visits')
      .select('*', { count: 'exact', head: true })

    const visits = await fetchAllRows(
      supabaseAdmin.from('visits').select('user_id, session_id')
    )

    if (visits.length > 0) {
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
    // Supabase não configurado — retorna valores base
  }

  return <PortalV2 visitStats={visitStats} />
}
