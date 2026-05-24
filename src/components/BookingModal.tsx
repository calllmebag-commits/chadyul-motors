'use client'

import { useState, useEffect, useRef } from 'react'
import { useModal } from '@/context/ModalContext'

export default function BookingModal() {
  const { booking, closeAll } = useModal()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (booking.open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
    if (!booking.open) setSuccess(false)
  }, [booking.open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAll() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeAll])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = {
      first_name: (form.elements.namedItem('fname') as HTMLInputElement).value,
      last_name: (form.elements.namedItem('lname') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      topic: (form.elements.namedItem('topic') as HTMLSelectElement).value,
      model: (form.elements.namedItem('model') as HTMLSelectElement).value,
      showroom: (form.elements.namedItem('showroom') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    try {
      await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    } catch {}
    setLoading(false)
    setSuccess(true)
    form.reset()
    setTimeout(() => { closeAll(); setSuccess(false) }, 3000)
  }

  return (
    <>
      <div className={`modal-backdrop${booking.open ? ' is-open' : ''}`} onClick={closeAll} />
      <div className={`modal${booking.open ? ' is-open' : ''}`}>
        <div className="modal__box">
          <button className="modal__close" aria-label="Close" onClick={closeAll}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <div className="modal__kicker">— Chadyul Motors</div>
          <h2 className="modal__title">Book a consultation.</h2>
          <p className="modal__sub">A specialist responds within one business day. For test drives, finance quotes, track days and Custom Commissions.</p>
          <form className="modal__form" onSubmit={handleSubmit}>
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
            <div className="modal__actions">
              <button type="submit" className="btn" disabled={loading}>{loading ? 'Sending…' : 'Send enquiry'}</button>
              <a href="tel:+498912900440" className="btn btn--outline">Call instead</a>
            </div>
            <div className={`modal__success${success ? ' visible' : ''}`}>Enquiry received — a specialist will be in touch within one business day.</div>
          </form>
        </div>
      </div>
    </>
  )
}
