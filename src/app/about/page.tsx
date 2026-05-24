'use client'

import Link from 'next/link'
import { useModal } from '@/context/ModalContext'

export default function AboutPage() {
  const { openBooking } = useModal()
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=80&auto=format&fit=crop')" }} />
        <div className="cm-container page-hero__inner">
          <div className="breadcrumbs">
            <Link href="/">Home</Link><span className="sep">/</span><span className="current">About</span>
          </div>
          <h1>FIFTY YEARS<br /><span className="stroke">OF M.</span></h1>
          <p className="page-hero__sub">Chadyul Motors has been the M division&apos;s authorised retail partner since 1981. Forty-five years, five continents, twenty-seven thousand cars handed over to drivers who would not be told what to drive.</p>
        </div>
      </section>

      <section className="section">
        <div className="cm-container">
          <div className="about-two-col">
            <div>
              <div className="section__kicker">Our story</div>
              <h2 style={{ fontFamily: 'var(--cm-font-display)', fontSize: 'clamp(40px,5vw,56px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.3px', textTransform: 'uppercase', color: '#fff' }}>Engineered.<br />Not assembled.</h2>
            </div>
            <div>
              <p>The first Chadyul showroom opened on Leopoldstrasse in March 1981 — three M1 demonstrators on the floor, a Telex machine in the back, and Theodor Chadyul personally signing every delivery card.</p>
              <p>Four decades later the principle holds. We do not stock the wider range. We do not finance generic saloons. The wall has read <strong style={{ color: '#fff', fontWeight: 700 }}>M only</strong> for every working day of the company&apos;s history.</p>
              <p>What changed is scale. Five showrooms across three continents. A track academy. A Custom Workshop that ships eight commissioned cars a month. A customer roster that includes nineteen Formula 1 drivers, four heads of state, and the better part of Bavaria&apos;s industrial nobility.</p>
              <p>What did not change is the standard. Engineered, factual, restrained. We let the cars carry the volume.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft section--tight">
        <div className="cm-container">
          <div className="about-numbers">
            <div className="about-numbers__cell">
              <div className="about-numbers__value">45<small>YR</small></div>
              <div className="about-numbers__label">Authorised since 1981</div>
            </div>
            <div className="about-numbers__cell">
              <div className="about-numbers__value">27,400</div>
              <div className="about-numbers__label">Cars delivered</div>
            </div>
            <div className="about-numbers__cell">
              <div className="about-numbers__value">5</div>
              <div className="about-numbers__label">Showrooms · 3 continents</div>
            </div>
            <div className="about-numbers__cell">
              <div className="about-numbers__value">96<small>%</small></div>
              <div className="about-numbers__label">Returning customers</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="cm-container">
          <div className="section__head">
            <div>
              <div className="section__kicker">Heritage</div>
              <h2>Forty-five years,<br />in headlines.</h2>
            </div>
          </div>
          <div className="timeline">
            {[
              { year: '1981', title: 'Founded', body: 'Theodor Chadyul opens the Leopoldstrasse showroom with three M1 demonstrators and an exclusive M-only retail licence.' },
              { year: '1995', title: 'London', body: 'A second showroom on Berkeley Square. The first M3 GT delivered outside Germany leaves this floor.' },
              { year: '2008', title: 'Track Academy', body: 'Two-day customer driving programme launches at Salzburgring under former DTM driver Andreas Vogt.' },
              { year: '2018', title: 'Custom Workshop', body: 'In-house Custom Workshop opens behind the Munich showroom. Eight bespoke commissions delivered each month.' },
              { year: '2021', title: 'Dubai · Singapore', body: 'Asia-Pacific expansion. The Singapore showroom houses the largest M heritage collection outside Munich.' },
              { year: '2024', title: 'Los Angeles', body: 'Fifth showroom opens in Beverly Hills. The first hybrid-era M5 sold in the United States is delivered here.' },
              { year: '2025', title: 'EV pilot', body: 'Partnership with M Performance Electric formalised. Chadyul becomes the lead retail partner for the first all-electric M.' },
              { year: '2026', title: 'Now', body: 'Forty-five years on, the wall still reads M only. Twenty-seven thousand four hundred cars later, the standard holds.' },
            ].map(t => (
              <div className="timeline__cell" key={t.year}>
                <div className="timeline__year">{t.year}</div>
                <div className="timeline__title">{t.title}</div>
                <div className="timeline__body">{t.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="cm-container">
          <div className="section__head">
            <div>
              <div className="section__kicker">Leadership</div>
              <h2>The people<br />behind the desk.</h2>
            </div>
            <Link href="/contact" className="textlink">Get in touch</Link>
          </div>
          <div className="team-grid">
            {[
              { name: 'Markus Chadyul', role: 'CEO · Third generation', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop' },
              { name: 'Sophia Rauch', role: 'Head of Custom Workshop', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format&fit=crop' },
              { name: 'Andreas Vogt', role: 'Track Academy · Lead Instructor', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop' },
              { name: 'Lena Brückner', role: 'Head of Customer Care', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop' },
            ].map(p => (
              <article className="team-card" key={p.name}>
                <div className="team-card__photo">
                  <img src={p.img} alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
                <div className="team-card__name">{p.name}</div>
                <div className="team-card__role">{p.role}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="cm-container">
          <div className="about-two-col">
            <div>
              <div className="section__kicker">Philosophy</div>
              <h2 style={{ fontFamily: 'var(--cm-font-display)', fontSize: 'clamp(40px,5vw,56px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.3px', textTransform: 'uppercase', color: '#fff' }}>Three rules<br />we don&apos;t break.</h2>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--cm-font-display)', fontSize: '24px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.2, letterSpacing: '-0.2px', marginBottom: '12px' }}>01 — M only.</p>
              <p>The wall has read M for forty-five years. We do not stock the wider range. A customer who walks in asking for a saloon walks out with a directions card to a sister dealership two streets away.</p>
              <p style={{ fontFamily: 'var(--cm-font-display)', fontSize: '24px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.2, letterSpacing: '-0.2px', margin: '40px 0 12px' }}>02 — One specialist, one customer.</p>
              <p>From enquiry to handover to the morning of the two-hundred-thousandth kilometre, the same name sits in the file. No call-centre triage, no rotation, no escalation tree.</p>
              <p style={{ fontFamily: 'var(--cm-font-display)', fontSize: '24px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.2, letterSpacing: '-0.2px', margin: '40px 0 12px' }}>03 — The work is signed.</p>
              <p>Every service ticket carries the name of the lead technician who carried out the work. Every Custom Commission carries the signature of the studio head. Accountability is not a process. It is a person.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band__bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493238792000-8113da705763?w=2000&q=80&auto=format&fit=crop')" }} />
        <div className="cm-container cta-band__inner">
          <div className="section__kicker" style={{ color: '#fff' }}>— Visit us</div>
          <h2>Walk into a showroom.</h2>
          <p>Five doors across three continents. The espresso machine in Munich is older than most of the cars. You&apos;re welcome anyway.</p>
          <div className="cta-band__buttons">
            <Link href="/contact" className="btn">Find a showroom</Link>
            <Link href="/services" className="btn btn--outline">See our services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
