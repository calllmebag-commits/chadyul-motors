'use client'

import Link from 'next/link'
import { useModal } from '@/context/ModalContext'

export default function SiteFooter() {
  const { openBooking, openWaitlist } = useModal()
  return (
    <footer className="site-footer">
      <div className="cm-container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <span className="site-footer__brand-mark" aria-hidden="true"><span /><span /><span /></span>
            <h4>CHADYUL<br />MOTORS</h4>
            <p>Authorised dealer for the M division. Showrooms in Munich, London, Dubai, Singapore and Los Angeles.</p>
          </div>
          <div className="site-footer__col">
            <h5>Models</h5>
            <ul>
              <li><a onClick={() => openWaitlist('M2 Competition')}>M2 Competition</a></li>
              <li><a onClick={() => openWaitlist('M3 CS')}>M3 CS</a></li>
              <li><a onClick={() => openWaitlist('M4 Coupe')}>M4 Coupe</a></li>
              <li><a onClick={() => openWaitlist('M5 Competition')}>M5 Competition</a></li>
              <li><a onClick={() => openWaitlist('X3 M · X5 M')}>X3 M · X5 M</a></li>
              <li><a onClick={() => openWaitlist('XM Label')}>XM Label</a></li>
            </ul>
          </div>
          <div className="site-footer__col">
            <h5>Services</h5>
            <ul>
              <li><a onClick={() => openBooking('Test drive')}>Test drive</a></li>
              <li><a onClick={() => openBooking('Finance & leasing')}>Financing</a></li>
              <li><a onClick={() => openBooking('Trade-in valuation')}>Trade-in</a></li>
              <li><a onClick={() => openBooking('Service or maintenance')}>Service plans</a></li>
              <li><a onClick={() => openBooking('Track academy')}>Track days</a></li>
            </ul>
          </div>
          <div className="site-footer__col">
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About Chadyul</Link></li>
              <li><Link href="/case-studies">Case studies</Link></li>
              <li><a onClick={() => openBooking('Track academy')}>Motorsport</a></li>
              <li><a onClick={() => openBooking('Other')}>Careers</a></li>
              <li><a onClick={() => openBooking('Other')}>Press</a></li>
            </ul>
          </div>
          <div className="site-footer__col">
            <h5>Contact</h5>
            <ul>
              <li><Link href="/contact">Showrooms</Link></li>
              <li><a href="tel:+498912900440">+49 89 1290 0440</a></li>
              <li><Link href="/contact">hello@chadyul.com</Link></li>
              <li><a onClick={() => openWaitlist('Newsletter')}>Newsletter</a></li>
            </ul>
          </div>
        </div>
        <div className="site-footer__stripe" />
        <div className="site-footer__legal">
          <div><a href="#">Privacy</a><a href="#">Cookie settings</a><a href="#">Legal</a><a href="#">Legal Notice</a></div>
          <div>© 2026 Chadyul Motors AG · All rights reserved</div>
        </div>
      </div>
    </footer>
  )
}
