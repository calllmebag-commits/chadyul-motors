import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { error } = await supabase.from('contact_enquiries').insert([{
      first_name: body.first_name || '',
      last_name: body.last_name || '',
      email: body.email || '',
      phone: body.phone || '',
      topic: body.topic || '',
      showroom: body.showroom || '',
      message: body.message || '',
    }])
    if (error) {
      console.error('Supabase error (contact):', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API error (contact):', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
