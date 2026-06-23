'use client'

import { useBackground, images } from '@/lib/background-context'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import type { BgMode } from '@/lib/background-context'

export function BackgroundToggle() {
  const { mode, currentIndex, nextImage, prevImage, setMode, opacity, setOpacity, blur, setBlur } = useBackground()
  const constraintsRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({})
  const carouselRef = useRef<HTMLDivElement>(null)
  const dragCountRef = useRef(0)

  const openPanel = () => {
    if (dragCountRef.current > 0) return
    const btn = buttonRef.current
    if (!btn) { setIsOpen(true); return }

    const rect = btn.getBoundingClientRect()
    const panelW = 320
    const gap = 8
    const vw = window.innerWidth

    // 水平：优先在按钮右侧展开
    let left = rect.right + gap
    if (left + panelW > vw - gap) {
      left = Math.max(gap, vw - panelW - gap)
    }

    // 垂直：上方空间够就面板底部对齐按钮顶部，否则面板顶部对齐按钮底部
    const spaceAbove = rect.top
    const spaceBelow = window.innerHeight - rect.bottom

    if (spaceAbove > 300) {
      // 上方够 → 面板在按钮上方（bottom 定位）
      setPanelStyle({ position: 'fixed', left, bottom: window.innerHeight - rect.top + gap })
    } else {
      // 下方够 → 面板在按钮下方（top 定位）
      setPanelStyle({ position: 'fixed', left, top: rect.bottom + gap })
    }
    setIsOpen(true)
  }

  const modes: { key: BgMode; label: string }[] = [
    { key: 'none', label: '无' },
    { key: 'single', label: '单图' },
    { key: 'carousel', label: '轮播' },
  ]

  // 滚轮 + 手指滑动
  useEffect(() => {
    const el = carouselRef.current
    if (!el || !isOpen) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0) nextImage()
      else prevImage()
    }

    let startX = 0
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
    const onTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX
      if (Math.abs(diff) > 30) {
        if (diff > 0) nextImage()
        else prevImage()
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [isOpen, nextImage, prevImage])

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-40" />
      <motion.div
        ref={buttonRef}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.05 }}
        onDragStart={() => dragCountRef.current++}
        onDragEnd={() => { setTimeout(() => { dragCountRef.current = 0 }, 100) }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/50 backdrop-blur-xl border border-white/50 dark:border-gray-700/40 shadow-lg cursor-grab active:cursor-grabbing select-none"
      >
        <button
          onClick={openPanel}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
          title="背景设置"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="z-50 w-80 liquid-glass rounded-2xl p-5 shadow-xl"
              style={panelStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-5">背景设置</h3>

              <div className="space-y-5">
                {/* 模式选择 */}
                <div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 block mb-2">背景模式</span>
                  <div className="relative flex rounded-xl bg-gray-100 dark:bg-gray-800 p-0.5">
                    {modes.map((m) => (
                      <button
                        key={m.key}
                        onClick={() => setMode(m.key)}
                        className={`relative flex-1 py-1.5 text-sm rounded-[10px] font-medium transition-colors z-10 ${
                          mode === m.key
                            ? 'text-gray-900 dark:text-gray-100'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                    {/* 滑动指示器 */}
                    <motion.div
                      layout
                      layoutId="bg-mode-pill"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      className="absolute top-0.5 bottom-0.5 rounded-[10px] bg-white dark:bg-gray-700 shadow-sm"
                      style={{
                        left: `${(modes.findIndex((m) => m.key === mode) / modes.length) * 100 + 0.5}%`,
                        width: `${(1 / modes.length) * 100 - 0.5}%`,
                      }}
                    />
                  </div>
                </div>

                {/* 不透明度 + 模糊度 + 图片选择 — 无模式时不显示 */}
                <AnimatePresence>
                  {mode !== 'none' && (
                    <motion.div
                      key="bg-controls"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden space-y-5"
                    >
                      {/* 不透明度 */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-gray-700 dark:text-gray-300">不透明度</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{Math.round(opacity * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={opacity}
                          onChange={(e) => setOpacity(parseFloat(e.target.value))}
                          className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-blue-500"
                        />
                      </div>

                      {/* 模糊度 */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-gray-700 dark:text-gray-300">模糊度</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{blur}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          step="1"
                          value={blur}
                          onChange={(e) => setBlur(parseInt(e.target.value))}
                          className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-blue-500"
                        />
                      </div>

                      {/* 图片选择 */}
                      <div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 block mb-2">背景图片</span>
                        <div ref={carouselRef} className="relative h-20 flex items-center justify-center touch-pan-y">
                          <AnimatePresence mode="popLayout">
                            {images.map((_, i) => {
                              const offset = i - currentIndex
                              if (Math.abs(offset) > 1) return null
                              return (
                                <motion.button
                                  key={i}
                                  layout
                                  initial={{ opacity: 0, scale: 0.8, x: offset * 60 }}
                                  animate={{ opacity: i === currentIndex ? 1 : 0.7, scale: i === currentIndex ? 1.1 : 0.9, x: offset * 60, zIndex: i === currentIndex ? 10 : 0 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                  onClick={() => {
                                    const diff = i - currentIndex
                                    if (diff > 0) nextImage()
                                    else if (diff < 0) prevImage()
                                  }}
                                  className={`absolute h-16 rounded-lg bg-cover bg-center border-2 ${i === currentIndex ? 'w-28 border-blue-500 shadow-lg ring-2 ring-blue-500/20' : 'w-24 border-gray-300 dark:border-gray-500'}`}
                                  style={{ backgroundImage: `url(${images[i].light})` }}
                                  title={`背景 ${i + 1}`}
                                />
                              )
                            })}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-white/40 dark:hover:bg-white/10 transition-colors text-xs">✕</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
