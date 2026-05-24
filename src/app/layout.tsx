import type { Metadata } from 'next'
import './globals.css'
import { ModalProvider } from '@/context/ModalContext'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import BookingModal from '@/components/BookingModal'
import WaitlistModal from '@/components/WaitlistModal'
import SearchOverlay from '@/components/SearchOverlay'
import MobileNav from '@/components/MobileNav'

export const metadata: Metadata = {
  title: 'Chadyul Motors — Authorised BMW M Dealer',
  description: 'Authorised dealer for the BMW M division. Showrooms in Munich, London, Dubai, Singapore and Los Angeles.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ModalProvider>
          <SiteNav />
          <main>{children}</main>
          <SiteFooter />
          <BookingModal />
          <WaitlistModal />
          <SearchOverlay />
          <MobileNav />
        </ModalProvider>
      </body>
    </html>
  )
}
