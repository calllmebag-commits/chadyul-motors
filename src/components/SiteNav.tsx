'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useModal } from '@/context/ModalContext'

export default function SiteNav() {
  const pathname = usePathname()
  const { openSearch, openMobileNav, openBooking, closeAll } = useModal()

  const active = (href: string) => pathname === href ? 'is-active' : ''

  return (
    <>
      <div className="site-top-stripe" />
      <header className="site-nav">
        <div className="site-nav__inner">
          <Link href="/" className="site-nav__brand" aria-label="Chadyul Motors">
            <span className="site-nav__mark" aria-hidden="true"><span /><span /><span /></span>
            <span className="site-nav__wordmark">CHADYUL<small>M&nbsp;&nbsp;O&nbsp;&nbsp;T&nbsp;&nbsp;O&nbsp;&nbsp;R&nbsp;&nbsp;S</small></span>
          </Link>
          <nav className="site-nav__links" aria-label="Primary">
            <Link href="/" className={active('/')}>Models</Link>
            <Link href="/services" className={active('/services')}>Services</Link>
            <Link href="/case-studies" className={active('/case-studies')}>Case Studies</Link>
            <Link href="/about" className={active('/about')}>About</Link>
            <Link href="/contact" className={active('/contact')}>Contact</Link>
          </nav>
          <div className="site-nav__util">
            <span className="lang">EN</span>
            <button className="icon-btn" aria-label="Search" onClick={openSearch}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button className="icon-btn" aria-label="Locations" onClick={() => { window.location.href = '/contact' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </button>
            <button className="icon-btn" aria-label="Account" onClick={() => openBooking('Service or maintenance')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            <button className="hamburger" aria-label="Open menu" onClick={openMobileNav}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
