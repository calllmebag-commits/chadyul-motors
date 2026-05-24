'use client'

import { useEffect, useRef } from 'react'
import { useModal } from '@/context/ModalContext'
import { useRouter } from 'next/navigation'

export default function SearchOverlay() {
  const { searchOpen, closeAll } = useModal()
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [searchOpen])

  return (
    <div className={`search-overlay${searchOpen ? ' is-open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeAll() }}>
      <button className="search-overlay__close" onClick={closeAll}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        ESC to close
      </button>
      <div className="search-overlay__inner">
        <div className="search-overlay__label">Search models, services &amp; more</div>
        <input
          ref={inputRef}
          className="search-overlay__input"
          type="search"
          placeholder="TYPE TO SEARCH..."
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
              closeAll()
              router.push('/contact')
            }
          }}
        />
        <div className="search-overlay__hint">Press ENTER · ESC to close</div>
      </div>
    </div>
  )
}
