import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { booking, payment } = body
    const sb = getSupabase()

    // Save booking
    await sb.from('bookings').insert([{
      first_name: booking.first_name || '',
      last_name: booking.last_name || '',
      email: booking.email || '',
      phone: booking.phone || '',
      topic: booking.topic || '',
      model: booking.model || '',
      showroom: booking.showroom || '',
      message: booking.message || '',
    }])

    // Save payment record
    await sb.from('payments').insert([{
      razorpay_order_id: payment.transaction_id,
      razorpay_payment_id: payment.transaction_id,
      razorpay_signature: 'dummy',
      amount: 500000,
      currency: 'INR',
      status: 'paid',
      email: booking.email || '',
      name: `${booking.first_name || ''} ${booking.last_name || ''}`.trim(),
      topic: booking.topic || '',
    }])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Payment complete error:', err)
    return NextResponse.json({ error: 'Failed to save payment' }, { status: 500 })
  }
}
