'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react'
import { siteConfig } from '@/lib/config'

export type BgMode = 'none' | 'single' | 'carousel'

interface BackgroundState {
  mode: BgMode
  currentIndex: number
  isDark: boolean
  loaded: Set<string>
  opacity: number
  blur: number
  setMode: (mode: BgMode) => void
  toggleMode: () => void
  nextImage: () => void
  prevImage: () => void
  setOpacity: (v: number) => void
  setBlur: (v: number) => void
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const images: { light: string; dark: string }[] = siteConfig.backgrounds.light.map((_: string, i: number) => ({
  light: `${basePath}${siteConfig.backgrounds.light[i]}`,
  dark: `${basePath}${siteConfig.backgrounds.dark[i]}`,
}))

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

const STORAGE_KEY = 'seline-bg-settings'

function loadSettings() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveSettings(data: Record<string, unknown>) {
  try {
    const prev = loadSettings() || {}
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, ...data }))
  } catch { /* ignore */ }
}

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<BgMode>('single')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const [loaded, setLoaded] = useState<Set<string>>(new Set())
  const [opacity, setOpacity] = useState(0.6)
  const [blur, setBlur] = useState(0)
  const preloadedRef = useRef<Set<string>>(new Set())

  // 水合后加载持久化设置
  useEffect(() => {
    const saved = loadSettings()
    if (!saved) return
    if (saved.mode) setMode(saved.mode)
    if (saved.currentIndex !== undefined) setCurrentIndex(saved.currentIndex)
    if (saved.opacity !== undefined) setOpacity(saved.opacity)
    if (saved.blur !== undefined) setBlur(saved.blur)
  }, [])

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
      setCurrentIndex((i: number) => (i + 1) % images.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [mode])

  // 切换图片时预加载下一张（提前缓存）
  useEffect(() => {
    if (images.length === 0) return
    const nextIdx = (currentIndex + 1) % images.length
    const nextSrc = images[nextIdx][isDark ? 'dark' : 'light']
    if (!preloadedRef.current.has(nextSrc)) {
      preloadImage(nextSrc).then((src) => {
        preloadedRef.current.add(src)
        setLoaded(new Set(preloadedRef.current))
      })
    }
  }, [currentIndex, isDark])

  // 持久化设置
  useEffect(() => { saveSettings({ mode }) }, [mode])
  useEffect(() => { saveSettings({ opacity }) }, [opacity])
  useEffect(() => { saveSettings({ blur }) }, [blur])
  useEffect(() => { saveSettings({ currentIndex }) }, [currentIndex])

  const toggleMode = useCallback(() => {
    setMode((m) => (m === 'none' ? 'single' : m === 'single' ? 'carousel' : 'none'))
  }, [])

  const nextImage = useCallback(() => {
    setCurrentIndex((i: number) => Math.min(i + 1, images.length - 1))
  }, [])

  const prevImage = useCallback(() => {
    setCurrentIndex((i: number) => Math.max(i - 1, 0))
  }, [])

  const handleSetMode = useCallback((m: BgMode) => {
    setMode(m)
  }, [])

  return (
    <BackgroundContext.Provider
      value={{ mode, currentIndex, isDark, loaded, opacity, blur, setMode: handleSetMode, toggleMode, nextImage, prevImage, setOpacity, setBlur }}
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
