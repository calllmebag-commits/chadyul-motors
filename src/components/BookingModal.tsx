'use client'

import { useState, useEffect, useRef } from 'react'
import { useModal } from '@/context/ModalContext'

type Step = 'form' | 'payment' | 'processing' | 'success'
type PayMethod = 'upi' | 'card' | 'netbanking'

const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Yes Bank', 'Punjab National Bank', 'Bank of Baroda']

export default function BookingModal() {
  const { booking, closeAll } = useModal()
  const [step, setStep] = useState<Step>('form')
  const [method, setMethod] = useState<PayMethod>('upi')
  const [upiId, setUpiId] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [bank, setBank] = useState(BANKS[0])
  const [payError, setPayError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const bookingDataRef = useRef<Record<string, string>>({})
  const txnRef = useRef<string>('')

  useEffect(() => {
    if (booking.open && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100)
    if (!booking.open) { setStep('form'); setPayError(''); resetPayFields() }
  }, [booking.open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAll() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeAll])

  function resetPayFields() {
    setUpiId(''); setCardNum(''); setCardName(''); setCardExpiry(''); setCardCvv(''); setBank(BANKS[0]); setPayError('')
  }

  function formatCard(val: string) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }
  function formatExpiry(val: string) {
    const v = val.replace(/\D/g, '').slice(0, 4)
    return v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    bookingDataRef.current = {
      first_name: (form.elements.namedItem('fname') as HTMLInputElement).value,
      last_name: (form.elements.namedItem('lname') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      topic: (form.elements.namedItem('topic') as HTMLSelectElement).value,
      model: (form.elements.namedItem('model') as HTMLSelectElement).value,
      showroom: (form.elements.namedItem('showroom') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    setStep('payment')
  }

  function validateAndPay() {
    setPayError('')
    if (method === 'upi') {
      if (!upiId.includes('@')) { setPayError('Enter a valid UPI ID (e.g. name@upi)'); return }
    }
    if (method === 'card') {
      if (cardNum.replace(/\s/g, '').length < 16) { setPayError('Enter a valid 16-digit card number'); return }
      if (!cardName.trim()) { setPayError('Enter the name on your card'); return }
      if (cardExpiry.length < 5) { setPayError('Enter a valid expiry date (MM/YY)'); return }
      if (cardCvv.length < 3) { setPayError('Enter a valid CVV'); return }
    }
    processPayment()
  }

  async function processPayment() {
    setStep('processing')
    await new Promise(r => setTimeout(r, 2800))
    const txnId = `CM${Date.now()}`
    try {
      await fetch('/api/payment/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking: bookingDataRef.current,
          payment: {
            transaction_id: txnId,
            method,
            amount: 500000,
          },
        }),
      })
    } catch {}
    txnRef.current = txnId
    setStep('success')
    setTimeout(() => { closeAll(); setStep('form'); resetPayFields() }, 4000)
  }

  const topic = bookingDataRef.current.topic || 'Consultation'
  const name = `${bookingDataRef.current.first_name || ''} ${bookingDataRef.current.last_name || ''}`.trim()

  return (
    <>
      <div className={`modal-backdrop${booking.open ? ' is-open' : ''}`} onClick={closeAll} />
      <div className={`modal${booking.open ? ' is-open' : ''}`}>
        <div className="modal__box" style={{ maxWidth: step === 'payment' ? '460px' : undefined }}>

          {/* ── CLOSE ── */}
          {step !== 'processing' && (
            <button className="modal__close" aria-label="Close" onClick={closeAll}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          )}

          {/* ══ STEP: FORM ══ */}
          {step === 'form' && (
            <>
              <div className="modal__kicker">— Chadyul Motors</div>
              <h2 className="modal__title">Book a consultation.</h2>
              <p className="modal__sub">A ₹5,000 deposit secures your booking. A specialist responds within one business day.</p>
              <form className="modal__form" onSubmit={handleFormSubmit}>
                <div className="modal__row">
                  <div className="field"><label htmlFor="bk-fname">First name</label><input ref={inputRef} id="bk-fname" name="fname" type="text" placeholder="First name" required /></div>
                  <div className="field"><label htmlFor="bk-lname">Last name</label><input id="bk-lname" name="lname" type="text" placeholder="Last name" required /></div>
                </div>
                <div className="modal__row">
                  <div className="field"><label htmlFor="bk-email">Email</label><input id="bk-email" name="email" type="email" placeholder="name@example.com" required /></div>
                  <div className="field"><label htmlFor="bk-phone">Phone</label><input id="bk-phone" name="phone" type="tel" placeholder="+91 98000 00000" /></div>
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
                    <option>Dubai · DIFC</option><option>Singapore · Orchard</option><option>Los Angeles · Beverly Hills</option>
                  </select>
                </div>
                <div className="field">
                  <label>Message (optional)</label>
                  <textarea name="message" placeholder="Anything we should know before we call?" />
                </div>
                <div className="modal__actions">
                  <button type="submit" className="btn">Pay ₹5,000 Deposit</button>
                  <a href="tel:+498912900440" className="btn btn--outline">Call instead</a>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--cm-muted)', margin: '12px 0 0', lineHeight: 1.6 }}>
                  Refundable if no specialist contacts you within 2 business days. Secured by 256-bit SSL.
                </p>
              </form>
            </>
          )}

          {/* ══ STEP: PAYMENT ══ */}
          {step === 'payment' && (
            <div style={{ fontFamily: 'var(--cm-font-body)' }}>
              {/* Gateway header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--cm-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', background: '#C8A96E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#000', fontFamily: 'var(--cm-font-display)', letterSpacing: '-0.5px' }}>CM</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--cm-heading)', lineHeight: 1.2 }}>Chadyul Motors</div>
                    <div style={{ fontSize: '11px', color: 'var(--cm-muted)' }}>{topic}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#C8A96E', fontFamily: 'var(--cm-font-display)', letterSpacing: '-0.5px' }}>₹5,000</div>
                  <div style={{ fontSize: '11px', color: 'var(--cm-muted)' }}>Booking Deposit</div>
                </div>
              </div>

              {/* Customer info strip */}
              {name && (
                <div style={{ fontSize: '12px', color: 'var(--cm-muted)', marginBottom: '16px', display: 'flex', gap: '16px' }}>
                  <span>👤 {name}</span>
                  {bookingDataRef.current.email && <span>✉ {bookingDataRef.current.email}</span>}
                </div>
              )}

              {/* Method tabs */}
              <div style={{ display: 'flex', gap: '0', marginBottom: '20px', border: '1px solid var(--cm-border)' }}>
                {(['upi', 'card', 'netbanking'] as PayMethod[]).map((m, i) => (
                  <button key={m} onClick={() => { setMethod(m); setPayError('') }}
                    style={{ flex: 1, padding: '9px 4px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', border: 'none', borderRight: i < 2 ? '1px solid var(--cm-border)' : 'none', cursor: 'pointer', background: method === m ? '#C8A96E' : 'transparent', color: method === m ? '#000' : 'var(--cm-muted)', transition: 'all 0.15s' }}>
                    {m === 'upi' ? 'UPI' : m === 'card' ? 'Card' : 'Net Banking'}
                  </button>
                ))}
              </div>

              {/* UPI */}
              {method === 'upi' && (
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                      <span key={app} style={{ fontSize: '11px', padding: '4px 10px', border: '1px solid var(--cm-border)', color: 'var(--cm-muted)', letterSpacing: '0.03em' }}>{app}</span>
                    ))}
                  </div>
                  <div className="field" style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', color: 'var(--cm-muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>UPI ID</label>
                    <input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi" style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: '1px solid var(--cm-border)', color: 'var(--cm-heading)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    <span style={{ fontSize: '11px', color: 'var(--cm-muted)', marginTop: '4px', display: 'block' }}>e.g. name@okaxis · name@ybl · phone@gpay</span>
                  </div>
                </div>
              )}

              {/* Card */}
              {method === 'card' && (
                <div>
                  <div className="field" style={{ marginBottom: '12px' }}>
                    <label style={{ fontSize: '12px', color: 'var(--cm-muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Card Number</label>
                    <input value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19}
                      style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: '1px solid var(--cm-border)', color: 'var(--cm-heading)', fontSize: '14px', outline: 'none', letterSpacing: '0.08em', boxSizing: 'border-box' }} />
                  </div>
                  <div className="field" style={{ marginBottom: '12px' }}>
                    <label style={{ fontSize: '12px', color: 'var(--cm-muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Name on Card</label>
                    <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="As printed on card"
                      style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: '1px solid var(--cm-border)', color: 'var(--cm-heading)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div className="field">
                      <label style={{ fontSize: '12px', color: 'var(--cm-muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Expiry</label>
                      <input value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5}
                        style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: '1px solid var(--cm-border)', color: 'var(--cm-heading)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div className="field">
                      <label style={{ fontSize: '12px', color: 'var(--cm-muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>CVV</label>
                      <input value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="•••" maxLength={4} type="password"
                        style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: '1px solid var(--cm-border)', color: 'var(--cm-heading)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {method === 'netbanking' && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                    {BANKS.slice(0, 4).map(b => (
                      <button key={b} onClick={() => setBank(b)}
                        style={{ padding: '10px 8px', border: `1px solid ${bank === b ? '#C8A96E' : 'var(--cm-border)'}`, background: bank === b ? 'rgba(200,169,110,0.08)' : 'transparent', color: bank === b ? '#C8A96E' : 'var(--cm-muted)', fontSize: '11px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.03em', textAlign: 'center', transition: 'all 0.15s' }}>
                        {b.replace('State Bank of India', 'SBI').replace('Kotak Mahindra', 'Kotak').replace('Punjab National Bank', 'PNB').replace('Bank of Baroda', 'BoB')}
                      </button>
                    ))}
                  </div>
                  <div className="field">
                    <label style={{ fontSize: '12px', color: 'var(--cm-muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Or select another bank</label>
                    <select value={bank} onChange={e => setBank(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', background: 'var(--cm-bg)', border: '1px solid var(--cm-border)', color: 'var(--cm-heading)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}>
                      {BANKS.map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Error */}
              {payError && <p style={{ color: '#e05252', fontSize: '12px', margin: '0 0 12px', lineHeight: 1.5 }}>⚠ {payError}</p>}

              {/* Pay button */}
              <button onClick={validateAndPay} className="btn" style={{ width: '100%', justifyContent: 'center', marginBottom: '12px', fontSize: '14px', padding: '14px' }}>
                Pay ₹5,000
              </button>

              {/* Back + trust badges */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <button onClick={() => { setStep('form'); setPayError('') }} style={{ background: 'none', border: 'none', color: 'var(--cm-muted)', fontSize: '12px', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ← Back
                </button>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--cm-muted)' }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span style={{ fontSize: '11px', color: 'var(--cm-muted)' }}>256-bit SSL · Secured Payment</span>
                </div>
              </div>
            </div>
          )}

          {/* ══ STEP: PROCESSING ══ */}
          {step === 'processing' && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ width: '48px', height: '48px', border: '2px solid var(--cm-border)', borderTopColor: '#C8A96E', borderRadius: '50%', margin: '0 auto 24px', animation: 'spin 0.8s linear infinite' }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              <h2 className="modal__title" style={{ marginBottom: '8px' }}>Processing payment…</h2>
              <p className="modal__sub">Please wait. Do not close this window.</p>
              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {method === 'upi' && <span style={{ fontSize: '12px', color: 'var(--cm-muted)' }}>Waiting for UPI confirmation on <strong style={{ color: 'var(--cm-heading)' }}>{upiId}</strong></span>}
                {method === 'card' && <span style={{ fontSize: '12px', color: 'var(--cm-muted)' }}>Authorising card ending in <strong style={{ color: 'var(--cm-heading)' }}>{cardNum.slice(-4)}</strong></span>}
                {method === 'netbanking' && <span style={{ fontSize: '12px', color: 'var(--cm-muted)' }}>Connecting to <strong style={{ color: 'var(--cm-heading)' }}>{bank}</strong></span>}
              </div>
            </div>
          )}

          {/* ══ STEP: SUCCESS ══ */}
          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '56px', height: '56px', background: 'rgba(34,197,94,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#22c55e', marginBottom: '8px' }}>Payment Successful</div>
              <h2 className="modal__title" style={{ marginBottom: '8px' }}>Booking confirmed.</h2>
              <p className="modal__sub">₹5,000 deposit received. A Chadyul Motors specialist will contact you within one business day.</p>
              <div style={{ marginTop: '20px', padding: '16px', border: '1px solid var(--cm-border)', textAlign: 'left' }}>
                <div style={{ fontSize: '11px', color: 'var(--cm-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Transaction reference</div>
                <div style={{ fontSize: '13px', color: 'var(--cm-heading)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                  {txnRef.current}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
