import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { session_id, url, label, section } = await req.json()

  const { error } = await supabaseAdmin
    .from('clicks')
    .insert({ session_id, url, label, section })

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
