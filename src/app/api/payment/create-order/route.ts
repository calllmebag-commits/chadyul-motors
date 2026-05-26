import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 503 })
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })
    const body = await req.json()

    const order = await razorpay.orders.create({
      amount: 500000, // ₹5,000 in paise
      currency: 'INR',
      receipt: `booking_${Date.now()}`,
      notes: {
        topic: body.topic || '',
        name: `${body.first_name || ''} ${body.last_name || ''}`.trim(),
        email: body.email || '',
      },
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    })
  } catch (err) {
    console.error('Razorpay create-order error:', err)
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 })
  }
}
