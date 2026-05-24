'use client'

import { useState, useEffect } from 'react'
import { useModal } from '@/context/ModalContext'

export default function WaitlistModal() {
  const { waitlist, closeAll } = useModal()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!waitlist.open) setSuccess(false)
  }, [waitlist.open])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, model_name: waitlist.modelName }),
      })
    } catch {}
    setLoading(false)
    setSuccess(true)
    ;(e.currentTarget as HTMLFormElement).reset()
    setTimeout(() => { closeAll(); setSuccess(false) }, 3000)
  }

  const title = waitlist.modelName ? `${waitlist.modelName} CONFIGURATOR` : 'CONFIGURATOR'

  return (
    <div className={`waitlist-modal${waitlist.open ? ' is-open' : ''}`}>
      <div className="waitlist-modal__box">
        <button className="waitlist-modal__close" aria-label="Close" onClick={closeAll}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <span className="waitlist-modal__mark" aria-hidden="true"><span /><span /><span /></span>
        <div className="waitlist-modal__eyebrow">Coming soon</div>
        <h2 className="waitlist-modal__title">{title}</h2>
        <p className="waitlist-modal__body">We&apos;re building something. Join the waitlist and be first to configure your M when it launches.</p>
        <form className="waitlist-modal__input-row" onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="your@email.com" required />
          <button type="submit" className="btn" disabled={loading}>{loading ? '…' : 'Join waitlist'}</button>
        </form>
        <div className={`waitlist-modal__success${success ? ' visible' : ''}`}>You&apos;re on the list — we&apos;ll be in touch.</div>
      </div>
    </div>
  )
}
