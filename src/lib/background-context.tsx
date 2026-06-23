'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react'

export type BgMode = 'single' | 'carousel'

interface BackgroundState {
  mode: BgMode
  currentIndex: number
  isDark: boolean
  loaded: Set<string>
  setMode: (mode: BgMode) => void
  toggleMode: () => void
  nextImage: () => void
  prevImage: () => void
}

const images = [
  { light: '/images/bg1.webp', dark: '/images/bg2.webp' },
  { light: '/images/bg2.webp', dark: '/images/bg1.webp' },
]

const BackgroundContext = createContext<BackgroundState | null>(null)

/** 预加载单张图片，返回图片 URL（缓存复用） */
function preloadImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = () => reject(src)
    img.src = src
  })
}

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<BgMode>('single')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const [loaded, setLoaded] = useState<Set<string>>(new Set())
  // 用 ref 跟踪已触发预加载的 URL，避免重复请求
  const preloadedRef = useRef<Set<string>>(new Set())

  // 预加载全部图片
  const preloadAll = useCallback(async () => {
    const allSrcs = images.flatMap((img) => [img.light, img.dark])
    const newSrcs = allSrcs.filter((src) => !preloadedRef.current.has(src))
    if (newSrcs.length === 0) return

    const results = await Promise.allSettled(newSrcs.map(preloadImage))
    for (const result of results) {
      if (result.status === 'fulfilled') {
        preloadedRef.current.add(result.value)
      }
    }
    setLoaded(new Set(preloadedRef.current))
  }, [])

  // 首次挂载预加载全部图片
  useEffect(() => {
    preloadAll()
  }, [preloadAll])

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

  // 切换图片时预加载下一张（提前缓存）
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % images.length
    const nextSrc = images[nextIdx][isDark ? 'dark' : 'light']
    if (!preloadedRef.current.has(nextSrc)) {
      preloadImage(nextSrc).then((src) => {
        preloadedRef.current.add(src)
        setLoaded(new Set(preloadedRef.current))
      })
    }
  }, [currentIndex, isDark])

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
      value={{ mode, currentIndex, isDark, loaded, setMode, toggleMode, nextImage, prevImage }}
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
