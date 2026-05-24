import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { error } = await supabase.from('waitlist').insert([{
      email: body.email || '',
      model_name: body.model_name || '',
    }])
    if (error) {
      console.error('Supabase error (waitlist):', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API error (waitlist):', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
