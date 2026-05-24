'use client'

import Link from 'next/link'
import { useModal } from '@/context/ModalContext'

export default function ServicesPage() {
  const { openBooking } = useModal()
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero__bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1800&q=80&auto=format&fit=crop')" }} />
        <div className="cm-container page-hero__inner">
          <div className="breadcrumbs">
            <Link href="/">Home</Link><span className="sep">/</span><span className="current">Services</span>
          </div>
          <h1><span className="stroke">OWNER</span><br />SERVICES.</h1>
          <p className="page-hero__sub">From the moment you sign the order to the morning of your two-hundred-thousandth kilometre — Chadyul Motors carries the responsibility of the engineering. You drive.</p>
        </div>
      </section>

      {/* SERVICE GRID */}
      <section className="section">
        <div className="cm-container">
          <div className="section__head">
            <div>
              <div className="section__kicker">What we do</div>
              <h2>Six disciplines.<br />One standard.</h2>
            </div>
            <Link href="/contact" className="textlink">Speak to a specialist</Link>
          </div>
          <div className="svc-grid">
            <article className="svc-card">
              <div className="svc-card__num">01 / 06</div>
              <div className="svc-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>
              </div>
              <h3>Test drives &amp; track days</h3>
              <p>Drive any model in inventory on the road, or join one of our instructors at the Salzburgring or Hockenheim for a full-day track programme.</p>
              <button className="svc-card__cta" onClick={() => openBooking('Test drive')}>Book a slot</button>
            </article>
            <article className="svc-card">
              <div className="svc-card__num">02 / 06</div>
              <div className="svc-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="0"/><path d="M2 10h20"/><path d="M6 14h4"/></svg>
              </div>
              <h3>Financing &amp; leasing</h3>
              <p>Fixed-rate finance from 2.9% APR, balloon leasing, and corporate frameworks. Indicative quotes returned in under 24 hours of application.</p>
              <button className="svc-card__cta" onClick={() => openBooking('Finance & leasing')}>Run the numbers</button>
            </article>
            <article className="svc-card">
              <div className="svc-card__num">03 / 06</div>
              <div className="svc-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </div>
              <h3>Trade-in valuation</h3>
              <p>A senior appraiser inspects your current vehicle in person within 48 hours. Written offer, no obligation, settled on the same day if you proceed.</p>
              <button className="svc-card__cta" onClick={() => openBooking('Trade-in valuation')}>Request valuation</button>
            </article>
            <article className="svc-card">
              <div className="svc-card__num">04 / 06</div>
              <div className="svc-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <h3>M-certified service</h3>
              <p>Factory-trained technicians, OEM parts only, M-specification fluids. Every service ticket signed by the lead engineer who carried out the work.</p>
              <button className="svc-card__cta" onClick={() => openBooking('Service or maintenance')}>Schedule service</button>
            </article>
            <article className="svc-card">
              <div className="svc-card__num">05 / 06</div>
              <div className="svc-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              </div>
              <h3>Concierge collection</h3>
              <p>For service appointments, a Chadyul driver collects your vehicle from home or office and returns a courtesy M-series for the duration of the work.</p>
              <button className="svc-card__cta" onClick={() => openBooking('Service or maintenance')}>Arrange pickup</button>
            </article>
            <article className="svc-card">
              <div className="svc-card__num">06 / 06</div>
              <div className="svc-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3>Custom Commissions</h3>
              <p>Bespoke paint, leather, woodwork, embroidery and aerodynamic packages. Six-to-nine month build window, signed off in our Munich studio.</p>
              <button className="svc-card__cta" onClick={() => openBooking('Custom Commission')}>Start commission</button>
            </article>
          </div>
        </div>
      </section>

      {/* M TRACK ACADEMY */}
      <section className="section section--soft">
        <div className="cm-container">
          <div className="feature-band">
            <div className="feature-band__media" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611821064430-0d40291922d2?w=1600&q=80&auto=format&fit=crop')" }} />
            <div className="feature-band__copy">
              <div className="section__kicker">— M Track Academy</div>
              <h3>Two days.<br />One driver. You.</h3>
              <p>Three levels — Compact, Intensive, Professional. Curriculum designed by former DTM driver Andreas Vogt. Twelve hours of seat time across two days, plus telemetry debriefs for every session.</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn" onClick={() => openBooking('Track academy')}>Reserve a place</button>
                <button className="btn btn--outline" onClick={() => openBooking('Track academy')}>View calendar</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="section">
        <div className="cm-container">
          <div className="section__head">
            <div>
              <div className="section__kicker">How it works</div>
              <h2>From enquiry<br />to handover.</h2>
            </div>
          </div>
          <div className="timeline">
            <div className="timeline__cell">
              <div className="timeline__year">STEP 01</div>
              <div className="timeline__title">Enquiry</div>
              <div className="timeline__body">Send a short brief, or walk into any of our five showrooms. A dedicated specialist responds within one business day.</div>
            </div>
            <div className="timeline__cell">
              <div className="timeline__year">STEP 02</div>
              <div className="timeline__title">Configuration</div>
              <div className="timeline__body">In-person walk-through of the configurator, finance options and any Custom Workshop work. Full quotation issued same day.</div>
            </div>
            <div className="timeline__cell">
              <div className="timeline__year">STEP 03</div>
              <div className="timeline__title">Build</div>
              <div className="timeline__body">Stock cars: 14 days. Configured: 12–14 weeks. Custom Workshop: 6–9 months. Weekly progress notes for every commission.</div>
            </div>
            <div className="timeline__cell">
              <div className="timeline__year">STEP 04</div>
              <div className="timeline__title">Handover</div>
              <div className="timeline__body">Two-hour delivery ceremony with the lead technician. Full systems walkthrough, first-tank fuel, three-year ownership programme begins.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="cta-band__bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=2000&q=80&auto=format&fit=crop')" }} />
        <div className="cm-container cta-band__inner">
          <div className="section__kicker" style={{ color: '#fff' }}>— Direct line</div>
          <h2>Speak to a specialist.</h2>
          <p>The fastest way to a quote, a test drive, or a Custom Workshop conversation is to call. Munich answers in under thirty seconds.</p>
          <div className="cta-band__buttons">
            <a href="tel:+498912900440" className="btn">+49 89 1290 0440</a>
            <button className="btn btn--outline" onClick={() => openBooking('Consultation')}>Send an enquiry</button>
          </div>
        </div>
      </section>
    </>
  )
}
