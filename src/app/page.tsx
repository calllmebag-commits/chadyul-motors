'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useModal } from '@/context/ModalContext'

const MODELS = [
  { id: 'M2 Competition', name: 'M2 COUPE', sub: 'Competition', price: '$ 68,500', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80&auto=format&fit=crop', feats: ['M Sport seats', 'Active M differential', 'Track package available'] },
  { id: 'M3 CS', name: 'M3 SEDAN', sub: 'CS', price: '$ 105,000', img: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=80&auto=format&fit=crop', feats: ['CS aerodynamics package', 'Carbon ceramic brakes', 'Bucket seat option'] },
  { id: 'M4 Competition Coupe', name: 'M4 RWD COUPE', sub: 'Competition', price: '$ 87,500', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&q=80&auto=format&fit=crop', feats: ['Panoramic glass roof Sky Lounge', 'Active front seat ventilation', 'Acoustically comfortable glazing'] },
  { id: 'M4 M Track', name: 'M4 RWD COUPE', sub: 'M Track', price: '$ 102,000', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80&auto=format&fit=crop', feats: ['M seat belts', 'Decorative Carbon Fibre trims', 'M Alcantara headlining'] },
  { id: 'M4 Special Pro', name: 'M4 RWD COUPE', sub: 'Special Pro', price: '$ 119,500', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=80&auto=format&fit=crop', feats: ['M seat belts', 'Decorative Carbon Fibre trims', 'M Alcantara headlining'] },
  { id: 'M4 CSL', name: 'M4 RWD COUPE', sub: 'CSL', price: '$ 142,000', img: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=80&auto=format&fit=crop', feats: ['Carbon ceramic brakes', 'Track-tuned suspension', 'Custom Workshop paintwork'] },
]

export default function HomePage() {
  const { openBooking, openWaitlist } = useModal()
  const [start, setStart] = useState(0)
  const [visible, setVisible] = useState(4)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setVisible(w <= 640 ? 1 : w <= 1100 ? 2 : 4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const prev = () => setStart(s => Math.max(0, s - 1))
  const next = () => setStart(s => Math.min(MODELS.length - visible, s + 1))
  const shown = MODELS.slice(start, start + visible)

  return (
    <>
      {/* HERO M5 */}
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__kicker">THE NEW M5 · 2026</div>
          <div className="hero__stage">
            <div className="hero__bigtype hero__bigtype--stacked" aria-hidden="true">
              <div className="hero__bigtype-line">THE</div>
              <div className="hero__bigtype-line hero__bigtype-line--solid">M5</div>
            </div>
            <div className="hero__car hero__car--3d">
              <iframe
                title="BMW M5 F90 — 3D model"
                className="hero__car-iframe"
                src="https://sketchfab.com/models/5478e978bd634337adc8e3dc413fbfa3/embed?autospin=0.3&autostart=1&transparent=1&ui_infos=0&ui_controls=1&ui_inspector=0&ui_help=0&ui_settings=0&ui_stop=0&ui_annotations=0&ui_watermark_link=0&ui_watermark=0&ui_hint=0&dnt=1"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
              />
              <div className="hero__car-hint" aria-hidden="true"><span className="dot" /> Drag to rotate · Scroll to zoom</div>
              <div className="hero__car-credit">3D model · <a href="https://sketchfab.com/3d-models/bmw-m5-f90-5478e978bd634337adc8e3dc413fbfa3" target="_blank" rel="noopener">RES1N on Sketchfab</a></div>
            </div>
          </div>
          <div className="hero__copy">
            <div className="hero__copy-left">
              <h1>BMW M5<br />Competition</h1>
              <span className="lede">Sedan · V8 Hybrid</span>
            </div>
            <div className="hero__copy-right">
              The fifth generation of an icon. Engineered on the racetrack and built for the road, the new M5 carries forward 50 years of motorsport engineering into the high-performance hybrid era. Three uniquely calibrated drive modes. One unmistakable character.
              <Link href="/about" className="more">Read further</Link>
            </div>
          </div>
          <div className="hero__specs">
            <div><div className="hero__spec-label">Output</div><div className="hero__spec-value">625<small>HP</small></div></div>
            <div><div className="hero__spec-label">Top speed</div><div className="hero__spec-value">330<small>KM/H</small></div></div>
            <div><div className="hero__spec-label">0–100 km/h</div><div className="hero__spec-value">3.3<small>S</small></div></div>
            <div className="hero__cta">
              <button className="btn" onClick={() => openBooking('Test drive', 'M5 Competition')}>Book a consultation</button>
              <button className="btn btn--outline" onClick={() => openWaitlist('M5 Competition')}>Configurator</button>
            </div>
          </div>
        </div>
      </section>

      {/* MODEL GRID */}
      <section className="section section--soft">
        <div className="cm-container">
          <div className="section__head">
            <div>
              <div className="section__kicker">In stock now</div>
              <h2>Choose your M.</h2>
            </div>
            <a href="#inventory" className="textlink" onClick={(e) => { e.preventDefault(); document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' }) }}>View all inventory</a>
          </div>
          <div className="model-row" id="inventory">
            <button className="model-row__nav" aria-label="Previous" onClick={prev} disabled={start === 0}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            {shown.map((m) => (
              <div key={m.id} className="model-card" onClick={() => openWaitlist(m.id)}>
                <div className="model-card__photo">
                  <div className="model-card__title">
                    <span>{m.name} <em>{m.sub}</em></span>
                    <span className="mark"><span /><span /><span /></span>
                  </div>
                  <img src={m.img} alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
                <div className="model-card__body">
                  <div className="model-card__price"><em>from</em>{m.price}</div>
                  <button className="model-card__cta" onClick={(e) => { e.stopPropagation(); openWaitlist(m.id) }}>Select</button>
                  <ul className="model-card__feats">{m.feats.map(f => <li key={f}>{f}</li>)}</ul>
                </div>
              </div>
            ))}
            <button className="model-row__nav model-row__nav--right" aria-label="Next" onClick={next} disabled={start >= MODELS.length - visible}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* HERO M4 */}
      <section className="hero" style={{ paddingTop: 0 }}>
        <div className="hero__inner">
          <div className="hero__kicker">M4 COMPETITION · 2026</div>
          <div className="hero__stage">
            <div className="hero__bigtype hero__bigtype--stacked" aria-hidden="true">
              <div className="hero__bigtype-line">THE</div>
              <div className="hero__bigtype-line hero__bigtype-line--solid">M4</div>
            </div>
            <div className="hero__car">
              <img src="https://images.unsplash.com/photo-1542362567-b07e54358753?w=1800&q=80&auto=format&fit=crop" alt="BMW M4 Competition Coupe" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            </div>
          </div>
          <div className="hero__copy">
            <div className="hero__copy-left">
              <h1>BMW M4<br />Competition Coupe</h1>
              <span className="lede">Coupe · Twin-turbo inline-6</span>
            </div>
            <div className="hero__copy-right">
              The M4 Competition Coupe is the embodiment of M&apos;s design language. Aesthetic appeal, sharpened proportions and signature M engineering — all bound to a 510 hp inline-six with 650 Nm of torque. Built without compromise.
              <Link href="/about" className="more">Read further</Link>
            </div>
          </div>
          <div className="hero__specs">
            <div><div className="hero__spec-label">Output</div><div className="hero__spec-value">510<small>HP</small></div></div>
            <div><div className="hero__spec-label">Top speed</div><div className="hero__spec-value">300<small>KM/H</small></div></div>
            <div><div className="hero__spec-label">0–100 km/h</div><div className="hero__spec-value">3.1<small>S</small></div></div>
            <div className="hero__cta">
              <button className="btn" onClick={() => openBooking('Test drive', 'M4 Competition Coupe')}>Book a consultation</button>
              <button className="btn btn--outline" onClick={() => openWaitlist('M4 Competition')}>Configurator</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="cta-band__bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2000&q=80&auto=format&fit=crop')" }} />
        <div className="cm-container cta-band__inner">
          <div className="section__kicker" style={{ color: '#fff' }}>— Test drive</div>
          <h2>Drive an M.</h2>
          <p>Visit your nearest Chadyul M dealer for an in-person test drive — on the road, or with one of our instructors on the track.</p>
          <div className="cta-band__buttons">
            <button className="btn" onClick={() => openBooking('Test drive')}>Book a test drive</button>
            <Link href="/contact" className="btn btn--outline">Find a dealer</Link>
          </div>
        </div>
      </section>
    </>
  )
}
