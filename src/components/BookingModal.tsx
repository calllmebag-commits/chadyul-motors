'use client'

import { useState, useEffect, useRef } from 'react'
import { useModal } from '@/context/ModalContext'

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  order_id: string
  name: string
  description: string
  prefill: { name: string; email: string; contact: string }
  theme: { color: string }
  handler: (response: RazorpayPaymentResponse) => void
  modal: { ondismiss: () => void }
}

interface RazorpayInstance {
  open: () => void
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) { resolve(true); return }
    const script = document.createElement('script')
    script.id = 'razorpay-script'
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function BookingModal() {
  const { booking, closeAll } = useModal()
  const [step, setStep] = useState<'form' | 'paying' | 'success' | 'error'>('form')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const formDataRef = useRef<Record<string, string>>({})

  useEffect(() => {
    if (booking.open && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100)
    if (!booking.open) { setStep('form'); setErrorMsg('') }
  }, [booking.open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAll() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeAll])

  async function handlePay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const form = e.currentTarget
    const data: Record<string, string> = {
      first_name: (form.elements.namedItem('fname') as HTMLInputElement).value,
      last_name: (form.elements.namedItem('lname') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      topic: (form.elements.namedItem('topic') as HTMLSelectElement).value,
      model: (form.elements.namedItem('model') as HTMLSelectElement).value,
      showroom: (form.elements.namedItem('showroom') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    formDataRef.current = data

    // Load Razorpay SDK
    const loaded = await loadRazorpayScript()
    if (!loaded) {
      setErrorMsg('Could not load payment SDK. Check your connection and try again.')
      setLoading(false)
      return
    }

    // Create order on server
    let orderData: { orderId: string; amount: number; currency: string; keyId: string }
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      orderData = await res.json()
      if (!orderData.orderId) throw new Error(orderData.error || 'Order creation failed')
    } catch (err) {
      setErrorMsg('Payment gateway unavailable. Please call us directly or use the enquiry form.')
      setLoading(false)
      return
    }

    setLoading(false)
    setStep('paying')

    // Open Razorpay checkout
    const rzp = new window.Razorpay({
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      order_id: orderData.orderId,
      name: 'Chadyul Motors',
      description: `Booking deposit — ${data.topic}`,
      prefill: {
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        contact: data.phone,
      },
      theme: { color: '#C8A96E' },
      handler: async (response: RazorpayPaymentResponse) => {
        // Verify and save
        try {
          const vRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, booking: formDataRef.current }),
          })
          const vData = await vRes.json()
          if (vData.success) {
            setStep('success')
            setTimeout(() => { closeAll(); setStep('form') }, 4000)
          } else {
            setStep('error')
            setErrorMsg('Payment received but verification failed. Please contact us with your payment ID: ' + response.razorpay_payment_id)
          }
        } catch {
          setStep('error')
          setErrorMsg('Payment received. Please contact us to confirm your booking.')
        }
      },
      modal: {
        ondismiss: () => setStep('form'),
      },
    })

    rzp.open()
  }

  return (
    <>
      <div className={`modal-backdrop${booking.open ? ' is-open' : ''}`} onClick={closeAll} />
      <div className={`modal${booking.open ? ' is-open' : ''}`}>
        <div className="modal__box">
          <button className="modal__close" aria-label="Close" onClick={closeAll}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>

          {step === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5" style={{ marginBottom: '16px' }}><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
              <h2 className="modal__title" style={{ marginBottom: '8px' }}>Booking confirmed.</h2>
              <p className="modal__sub">Your deposit has been received. A specialist will contact you within one business day.</p>
            </div>
          ) : step === 'error' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <h2 className="modal__title" style={{ marginBottom: '8px' }}>Something went wrong.</h2>
              <p className="modal__sub">{errorMsg}</p>
              <button className="btn" style={{ marginTop: '16px' }} onClick={() => setStep('form')}>Try again</button>
            </div>
          ) : (
            <>
              <div className="modal__kicker">— Chadyul Motors</div>
              <h2 className="modal__title">Book a consultation.</h2>
              <p className="modal__sub">A ₹5,000 deposit secures your booking. A specialist responds within one business day.</p>

              {/* Payment badge */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--cm-muted)', textTransform: 'uppercase', border: '1px solid var(--cm-border)', padding: '4px 10px' }}>Secured by Razorpay</span>
                <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--cm-muted)', textTransform: 'uppercase', border: '1px solid var(--cm-border)', padding: '4px 10px' }}>UPI · Cards · Net Banking</span>
              </div>

              <form className="modal__form" onSubmit={handlePay}>
                <div className="modal__row">
                  <div className="field"><label htmlFor="bk-fname">First name</label><input ref={inputRef} id="bk-fname" name="fname" type="text" placeholder="First name" required /></div>
                  <div className="field"><label htmlFor="bk-lname">Last name</label><input id="bk-lname" name="lname" type="text" placeholder="Last name" required /></div>
                </div>
                <div className="modal__row">
                  <div className="field"><label htmlFor="bk-email">Email</label><input id="bk-email" name="email" type="email" placeholder="name@example.com" required /></div>
                  <div className="field"><label htmlFor="bk-phone">Phone</label><input id="bk-phone" name="phone" type="tel" placeholder="+49 89 0000 0000" /></div>
                </div>
                <div className="modal__row">
                  <div className="field">
                    <label htmlFor="bk-topic">Topic</label>
                    <select id="bk-topic" name="topic" defaultValue={booking.topic} key={`topic-${booking.topic}`}>
                      <option>Test drive</option><option>Consultation</option><option>Track academy</option>
                      <option>Custom Commission</option><option>Trade-in valuation</option>
                      <option>Service or maintenance</option><option>Finance &amp; leasing</option><option>Other</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="bk-model">Model of interest</label>
                    <select id="bk-model" name="model" defaultValue={booking.model} key={`model-${booking.model}`}>
                      <option>M2 Competition</option><option>M3 CS</option><option>M4 Competition Coupe</option>
                      <option>M5 Competition</option><option>X3 M / X5 M</option><option>XM Label</option>
                      <option>Not decided yet</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label>Preferred showroom</label>
                  <select name="showroom">
                    <option>Munich · Leopoldstrasse</option><option>London · Berkeley Square</option>
                    <option>Dubai · DIFC</option><option>Singapore · Orchard</option>
                    <option>Los Angeles · Beverly Hills</option>
                  </select>
                </div>
                <div className="field">
                  <label>Message (optional)</label>
                  <textarea name="message" placeholder="Anything we should know before we call?" />
                </div>
                {errorMsg && <p style={{ color: '#e05252', fontSize: '13px', margin: '0 0 12px' }}>{errorMsg}</p>}
                <div className="modal__actions">
                  <button type="submit" className="btn" disabled={loading || step === 'paying'}>
                    {loading ? 'Preparing payment…' : step === 'paying' ? 'Complete in popup…' : 'Pay ₹5,000 Deposit'}
                  </button>
                  <a href="tel:+498912900440" className="btn btn--outline">Call instead</a>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--cm-muted)', margin: '12px 0 0', lineHeight: 1.6 }}>Refundable if no specialist contacts you within 2 business days. Secured by 256-bit SSL.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
