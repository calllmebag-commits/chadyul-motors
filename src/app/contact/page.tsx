'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useModal } from '@/context/ModalContext'

export default function ContactPage() {
  const { openBooking, openWaitlist } = useModal()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

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
      showroom: (form.elements.namedItem('showroom') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    } catch {}
    setLoading(false)
    setSuccess(true)
    form.reset()
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542228262-3d663b306a53?w=1800&q=80&auto=format&fit=crop')" }} />
        <div className="cm-container page-hero__inner">
          <div className="breadcrumbs">
            <Link href="/">Home</Link><span className="sep">/</span><span className="current">Contact</span>
          </div>
          <h1>SPEAK<br /><span className="stroke">TO US.</span></h1>
          <p className="page-hero__sub">Five showrooms across three continents. One specialist answers — by name, in person, in under thirty seconds. Munich, before nine in the morning, every working day.</p>
        </div>
      </section>

      <section className="section">
        <div className="cm-container">
          <div className="contact-grid">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="section__kicker">Enquiry</div>
              <h2 style={{ fontFamily: 'var(--cm-font-display)', fontSize: '40px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.3px', lineHeight: 1.05, margin: '0 0 12px' }}>Send a brief.</h2>
              <p style={{ margin: '0 0 20px', fontFamily: 'var(--cm-font-body)', fontSize: '15px', fontWeight: 300, lineHeight: 1.6, color: 'var(--cm-body)', maxWidth: '540px' }}>A specialist responds within one business day. For test drives, finance quotes, or Custom Commissions please use this form, or call directly.</p>
              <div className="contact-form__row">
                <div className="field"><label htmlFor="fname">First name</label><input type="text" id="fname" name="fname" placeholder="First name" required /></div>
                <div className="field"><label htmlFor="lname">Last name</label><input type="text" id="lname" name="lname" placeholder="Last name" required /></div>
              </div>
              <div className="contact-form__row">
                <div className="field"><label htmlFor="email">Email</label><input type="email" id="email" name="email" placeholder="name@example.com" required /></div>
                <div className="field"><label htmlFor="phone">Phone</label><input type="tel" id="phone" name="phone" placeholder="+49 89 0000 0000" /></div>
              </div>
              <div className="contact-form__row">
                <div className="field">
                  <label htmlFor="topic">Topic</label>
                  <select id="topic" name="topic">
                    <option>Configurator or stock enquiry</option>
                    <option>Test drive</option>
                    <option>Track academy</option>
                    <option>Custom Commission</option>
                    <option>Trade-in valuation</option>
                    <option>Service or maintenance</option>
                    <option>Press</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="showroom">Preferred showroom</label>
                  <select id="showroom" name="showroom">
                    <option>Munich · Leopoldstrasse</option>
                    <option>London · Berkeley Square</option>
                    <option>Dubai · DIFC</option>
                    <option>Singapore · Orchard</option>
                    <option>Los Angeles · Beverly Hills</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="What are you looking for? Specifications, timing, anything else we should know." />
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button type="submit" className="btn" disabled={loading}>{loading ? 'Sending…' : 'Send enquiry'}</button>
                <a href="tel:+498912900440" className="btn btn--outline">Call instead</a>
              </div>
              <div className={`form-ok${success ? ' visible' : ''}`}>Enquiry received. A specialist will be in touch within one business day.</div>
            </form>

            <aside className="contact-meta">
              <div className="contact-meta__block">
                <h4>Direct line</h4>
                <a href="tel:+498912900440">+49 89 1290 0440</a>
                <p style={{ fontFamily: 'var(--cm-font-body)', fontSize: '13px', fontWeight: 300, color: 'var(--cm-body)', marginTop: '6px' }}>Munich answers, 08:00–19:00 CET, Monday to Saturday.</p>
              </div>
              <div className="contact-meta__block">
                <h4>Email</h4>
                <a href="mailto:hello@chadyul.com">hello@chadyul.com</a>
                <p style={{ fontFamily: 'var(--cm-font-body)', fontSize: '13px', fontWeight: 300, color: 'var(--cm-body)', marginTop: '6px' }}>Press &amp; media · <a href="mailto:press@chadyul.com" style={{ color: 'var(--cm-body)', fontSize: '13px' }}>press@chadyul.com</a></p>
              </div>
              <div className="contact-meta__block">
                <h4>Custom Workshop</h4>
                <a href="mailto:atelier@chadyul.com">atelier@chadyul.com</a>
                <p style={{ fontFamily: 'var(--cm-font-body)', fontSize: '13px', fontWeight: 300, color: 'var(--cm-body)', marginTop: '6px' }}>Six-to-nine month build window. By appointment only.</p>
              </div>
              <div className="contact-meta__block">
                <h4>WhatsApp Business</h4>
                <a href="tel:+4917012900440">+49 170 1290 0440</a>
                <p style={{ fontFamily: 'var(--cm-font-body)', fontSize: '13px', fontWeight: 300, color: 'var(--cm-body)', marginTop: '6px' }}>For existing customers and service appointments.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="cm-container">
          <div className="section__head">
            <div>
              <div className="section__kicker">Showrooms</div>
              <h2>Five doors.<br />Three continents.</h2>
            </div>
            <button className="textlink" onClick={() => openBooking('Consultation')} style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer' }}>Open map view</button>
          </div>
          <div className="dealer-grid">
            <article className="dealer-card">
              <div className="dealer-card__city">— Headquarters</div>
              <div className="dealer-card__name">Munich</div>
              <div className="dealer-card__addr">Leopoldstrasse 124<br />80804 Munich<br />Germany</div>
              <div className="dealer-card__phone">+49 89 1290 0440</div>
              <div className="dealer-card__hours">Mon–Fri 08:00–19:00<br />Sat 10:00–17:00 · Closed Sundays</div>
            </article>
            <article className="dealer-card">
              <div className="dealer-card__city">— United Kingdom</div>
              <div className="dealer-card__name">London</div>
              <div className="dealer-card__addr">46 Berkeley Square<br />Mayfair, London W1J 5AT<br />United Kingdom</div>
              <div className="dealer-card__phone">+44 20 7290 0440</div>
              <div className="dealer-card__hours">Mon–Fri 09:00–19:00<br />Sat 10:00–18:00 · Closed Sundays</div>
            </article>
            <article className="dealer-card">
              <div className="dealer-card__city">— Middle East</div>
              <div className="dealer-card__name">Dubai</div>
              <div className="dealer-card__addr">DIFC Gate Village 4<br />Dubai International Financial Centre<br />United Arab Emirates</div>
              <div className="dealer-card__phone">+971 4 290 0440</div>
              <div className="dealer-card__hours">Sat–Thu 09:00–21:00<br />Closed Fridays</div>
            </article>
            <article className="dealer-card">
              <div className="dealer-card__city">— Asia-Pacific</div>
              <div className="dealer-card__name">Singapore</div>
              <div className="dealer-card__addr">290 Orchard Road #04-01<br />Paragon, Singapore 238859<br />Singapore</div>
              <div className="dealer-card__phone">+65 6290 0440</div>
              <div className="dealer-card__hours">Mon–Sat 10:00–20:00<br />Sun 11:00–18:00</div>
            </article>
            <article className="dealer-card">
              <div className="dealer-card__city">— North America</div>
              <div className="dealer-card__name">Los Angeles</div>
              <div className="dealer-card__addr">9440 Wilshire Boulevard<br />Beverly Hills, CA 90212<br />United States</div>
              <div className="dealer-card__phone">+1 310 290 0440</div>
              <div className="dealer-card__hours">Mon–Sat 09:00–19:00<br />Sun 11:00–17:00</div>
            </article>
            <article className="dealer-card" style={{ justifyContent: 'space-between' }}>
              <div>
                <div className="dealer-card__city">— Coming 2027</div>
                <div className="dealer-card__name">Tokyo</div>
                <div className="dealer-card__addr" style={{ color: 'var(--cm-muted)' }}>Marunouchi, Chiyoda<br />Tokyo, Japan</div>
              </div>
              <button className="textlink" onClick={() => openWaitlist('Tokyo Showroom Opening')} style={{ border: 0, background: 'none', padding: 0, marginTop: '20px', cursor: 'pointer' }}>Register interest</button>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band__bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555215695-3004980ad54e?w=2000&q=80&auto=format&fit=crop')" }} />
        <div className="cm-container cta-band__inner">
          <div className="section__kicker" style={{ color: '#fff' }}>— Skip the form</div>
          <h2>Book a test drive.</h2>
          <p>If you know the car already, the fastest path is the showroom. Walk in, identify yourself, take the keys.</p>
          <div className="cta-band__buttons">
            <a href="tel:+498912900440" className="btn">Call Munich</a>
            <Link href="/services" className="btn btn--outline">See all services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
