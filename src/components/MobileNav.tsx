'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useModal } from '@/context/ModalContext'

export default function MobileNav() {
  const { mobileNavOpen, closeAll } = useModal()
  const pathname = usePathname()
  const active = (href: string) => pathname === href ? 'is-active' : ''

  return (
    <nav className={`mobile-nav${mobileNavOpen ? ' is-open' : ''}`} aria-label="Mobile">
      <button className="mobile-nav__close" aria-label="Close menu" onClick={closeAll}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
      <div className="mobile-nav__stripe" />
      <Link href="/" className={active('/')} onClick={closeAll}>Models</Link>
      <Link href="/services" className={active('/services')} onClick={closeAll}>Services</Link>
      <Link href="/case-studies" className={active('/case-studies')} onClick={closeAll}>Case Studies</Link>
      <Link href="/about" className={active('/about')} onClick={closeAll}>About</Link>
      <Link href="/contact" className={active('/contact')} onClick={closeAll}>Contact</Link>
    </nav>
  )
}
