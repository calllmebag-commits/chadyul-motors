import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSupabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking } = body

    const secret = process.env.RAZORPAY_KEY_SECRET
    if (!secret) return NextResponse.json({ error: 'Not configured' }, { status: 503 })

    // Verify Razorpay signature
    const expectedSign = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expectedSign !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

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
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount: 500000,
      currency: 'INR',
      status: 'paid',
      email: booking.email || '',
      name: `${booking.first_name || ''} ${booking.last_name || ''}`.trim(),
      topic: booking.topic || '',
    }])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Payment verify error:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
