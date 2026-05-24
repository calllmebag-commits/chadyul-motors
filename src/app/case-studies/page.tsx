'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useModal } from '@/context/ModalContext'

const CASES = [
  { id: 1, cat: 'custom', tag: 'Custom Workshop', title: 'The Lake Como M3 CS.', body: 'Custom paint matched to a 1973 Riva Aquarama. Walnut interior, brushed aluminium trim, no badging. Delivered on a barge.', meta: ['9 months', '2025', 'Milan'], img: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80&auto=format&fit=crop', action: 'Custom Commission' },
  { id: 2, cat: 'track', tag: 'Track', title: 'The Nurburgring fleet.', body: 'Six M4 CSLs built to identical specification for a private track-day collective. Same paint, same wheels, six sets of initials on the headrests.', meta: ['11 months', '2025', 'Cologne'], img: 'https://images.unsplash.com/photo-1611821064430-0d40291922d2?w=1200&q=80&auto=format&fit=crop', action: 'Track academy' },
  { id: 3, cat: 'heritage', tag: 'Heritage', title: 'A 1988 M3 returns.', body: 'Three-year restoration of a 1988 E30 M3 originally delivered by Chadyul. Same family, same chassis, same delivery card.', meta: ['36 months', '2024', 'Munich'], img: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200&q=80&auto=format&fit=crop', action: 'Consultation' },
  { id: 4, cat: 'corporate', tag: 'Corporate', title: 'The Allianz Board.', body: 'Thirty-two M5 Competitions, four configurations, two-year service plan. Built and delivered across nine working weeks.', meta: ['9 weeks', '2024', 'Munich'], img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80&auto=format&fit=crop', action: 'Consultation' },
  { id: 5, cat: 'custom', tag: 'Custom Workshop', title: 'The Dubai XM Label.', body: "Champagne metallic with a colour-shift over carbon black. Embroidered ceiling. The owner's personal Arabic monogram on every seatback.", meta: ['7 months', '2025', 'Dubai'], img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop', action: 'Custom Commission' },
  { id: 6, cat: 'track', tag: 'Track', title: 'The carbon M2.', body: 'Bare-carbon bonnet, roof, splitter and diffuser. Stripped interior. Half-cage. Delivered to a customer who finishes 12th overall at the 24 Hours of Spa.', meta: ['5 months', '2024', 'Brussels'], img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80&auto=format&fit=crop', action: 'Track academy' },
]

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'custom', label: 'Custom Workshop' },
  { key: 'track', label: 'Track' },
  { key: 'heritage', label: 'Heritage' },
  { key: 'corporate', label: 'Corporate' },
]

export default function CaseStudiesPage() {
  const { openBooking } = useModal()
  const [active, setActive] = useState('all')
  const shown = active === 'all' ? CASES : CASES.filter(c => c.cat === active)

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1800&q=80&auto=format&fit=crop')" }} />
        <div className="cm-container page-hero__inner">
          <div className="breadcrumbs">
            <Link href="/">Home</Link><span className="sep">/</span><span className="current">Case Studies</span>
          </div>
          <h1>CARS WITH<br /><span className="stroke">A NAME ON THEM.</span></h1>
          <p className="page-hero__sub">Six commissions, six owners, six different reasons. Each one signed off in Munich. Each one driven the way it was meant to be driven.</p>
        </div>
      </section>

      <section className="section">
        <div className="cm-container">
          <div className="case-feature">
            <div className="case-feature__media" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1600&q=80&auto=format&fit=crop')" }} />
            <div className="case-feature__copy">
              <div className="case-feature__tag">FEATURED · CUSTOM WORKSHOP</div>
              <h3>The Salzburg M4.<br />A nine-month build.</h3>
              <blockquote className="case-feature__quote">
                &ldquo;I did not want a configurator car. I wanted the car my father would have wanted in 1985. Markus understood that in the first conversation.&rdquo;
                <cite>— Dr Konrad Hauser · Owner</cite>
              </blockquote>
              <p style={{ margin: 0, fontFamily: 'var(--cm-font-body)', fontSize: '15px', fontWeight: 300, lineHeight: 1.6, color: 'var(--cm-body)' }}>Frozen Marina Bay paint, M2 reissue stripes, brown Vintage Connolly leather, manual gearbox, no infotainment screen. Built around a 2025 M4 chassis over nine months in the Custom Workshop.</p>
              <button className="textlink" onClick={() => openBooking('Custom Commission')} style={{ border: 0, background: 'none', padding: 0, marginTop: '8px', cursor: 'pointer' }}>Read the full case</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="cm-container">
          <div className="filter-tabs">
            {FILTERS.map(f => (
              <button key={f.key} className={`filter-tab${active === f.key ? ' is-active' : ''}`} onClick={() => setActive(f.key)}>{f.label}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="cm-container">
          <div className="case-grid">
            {shown.map(c => (
              <div key={c.id} className="case-card" onClick={() => openBooking(c.action)}>
                <div className="case-card__media">
                  <span className="case-card__tag">{c.tag}</span>
                  <img src={c.img} alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <div className="case-card__meta">{c.meta.map(m => <span key={m}>{m}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft section--tight">
        <div className="cm-container">
          <div className="section__head">
            <div>
              <div className="section__kicker">By the numbers</div>
              <h2>Custom Workshop output.</h2>
            </div>
          </div>
          <div className="about-numbers">
            <div className="about-numbers__cell"><div className="about-numbers__value">312</div><div className="about-numbers__label">Custom Commissions since 2018</div></div>
            <div className="about-numbers__cell"><div className="about-numbers__value">8<small>/MO</small></div><div className="about-numbers__label">Cars shipped per month</div></div>
            <div className="about-numbers__cell"><div className="about-numbers__value">9<small>MO</small></div><div className="about-numbers__label">Average build window</div></div>
            <div className="about-numbers__cell"><div className="about-numbers__value">100<small>%</small></div><div className="about-numbers__label">Signed off in Munich</div></div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band__bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=2000&q=80&auto=format&fit=crop')" }} />
        <div className="cm-container cta-band__inner">
          <div className="section__kicker" style={{ color: '#fff' }}>— Custom Workshop</div>
          <h2>Start a build.</h2>
          <p>Bespoke commissions begin with a single conversation, in person, at any of our five showrooms. Six-to-nine month build window from sign-off to handover.</p>
          <div className="cta-band__buttons">
            <button className="btn" onClick={() => openBooking('Custom Commission')}>Request a brief</button>
            <Link href="/services" className="btn btn--outline">See our services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
