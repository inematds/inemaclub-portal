import { supabaseAdmin } from '@/lib/supabase'
import PortalV2 from '@/components/PortalV2'

const BASE_TOTAL = 90000
const BASE_UNIQUE_ANON = 50000

export const revalidate = 60

export default async function NewPage() {
  let visitStats = { total: BASE_TOTAL, uniqueLogged: 0, uniqueAnon: BASE_UNIQUE_ANON }

  try {
    const { data } = await supabaseAdmin.rpc('visit_stats')
    if (data) {
      visitStats = {
        total: BASE_TOTAL + data.total,
        uniqueLogged: data.unique_logged,
        uniqueAnon: BASE_UNIQUE_ANON + data.unique_anon,
      }
    }
  } catch {
    // Supabase não configurado — retorna valores base
  }

  return <PortalV2 visitStats={visitStats} />
}
