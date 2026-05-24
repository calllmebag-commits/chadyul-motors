'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface BookingState {
  open: boolean
  topic: string
  model: string
}

interface WaitlistState {
  open: boolean
  modelName: string
}

interface ModalContextType {
  booking: BookingState
  waitlist: WaitlistState
  searchOpen: boolean
  mobileNavOpen: boolean
  openBooking: (topic?: string, model?: string) => void
  openWaitlist: (modelName?: string) => void
  openSearch: () => void
  openMobileNav: () => void
  closeAll: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>({ open: false, topic: 'Test drive', model: 'Not decided yet' })
  const [waitlist, setWaitlist] = useState<WaitlistState>({ open: false, modelName: '' })
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const openBooking = (topic = 'Test drive', model = 'Not decided yet') => {
    setBooking({ open: true, topic, model })
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'
  }

  const openWaitlist = (modelName = '') => {
    setWaitlist({ open: true, modelName })
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'
  }

  const openSearch = () => {
    setSearchOpen(true)
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'
  }

  const openMobileNav = () => {
    setMobileNavOpen(true)
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'
  }

  const closeAll = () => {
    setBooking(b => ({ ...b, open: false }))
    setWaitlist(w => ({ ...w, open: false }))
    setSearchOpen(false)
    setMobileNavOpen(false)
    if (typeof document !== 'undefined') document.body.style.overflow = ''
  }

  return (
    <ModalContext.Provider value={{ booking, waitlist, searchOpen, mobileNavOpen, openBooking, openWaitlist, openSearch, openMobileNav, closeAll }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}
