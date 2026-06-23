'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export type BgMode = 'single' | 'carousel'

interface BackgroundState {
  mode: BgMode
  currentIndex: number
  isDark: boolean
  setMode: (mode: BgMode) => void
  toggleMode: () => void
  nextImage: () => void
  prevImage: () => void
}

const images = [
  { light: '/images/bg1.png', dark: '/images/bg2.png' },
  { light: '/images/bg2.png', dark: '/images/bg1.png' },
]

const BackgroundContext = createContext<BackgroundState | null>(null)

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<BgMode>('single')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDark, setIsDark] = useState(false)

  // Detect dark mode
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Carousel auto-play
  useEffect(() => {
    if (mode !== 'carousel') return
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [mode])

  const toggleMode = useCallback(() => {
    setMode((m) => (m === 'single' ? 'carousel' : 'single'))
  }, [])

  const nextImage = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length)
  }, [])

  const prevImage = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length)
  }, [])

  return (
    <BackgroundContext.Provider
      value={{ mode, currentIndex, isDark, setMode, toggleMode, nextImage, prevImage }}
    >
      {children}
    </BackgroundContext.Provider>
  )
}

export function useBackground() {
  const ctx = useContext(BackgroundContext)
  if (!ctx) throw new Error('useBackground must be used within BackgroundProvider')
  return ctx
}

export { images }
