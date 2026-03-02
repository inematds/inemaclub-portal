import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { session_id } = await req.json()

  // Tenta extrair user_id do Bearer token JWT (usuário logado)
  let user_id: string | null = null
  const authHeader = req.headers.get('Authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7)
    const {
      data: { user },
    } = await supabaseAdmin.auth.getUser(token)
    user_id = user?.id ?? null
  }

  const { error } = await supabaseAdmin
    .from('eai-visitors')
    .insert({ session_id, user_id })

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
