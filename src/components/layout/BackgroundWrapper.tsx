'use client'

import { useBackground, images } from '@/lib/background-context'
import { motion, AnimatePresence } from 'framer-motion'

export function BackgroundWrapper() {
  const { mode, currentIndex, isDark, loaded } = useBackground()

  const currentSrc = images[currentIndex][isDark ? 'dark' : 'light']
  const isReady = loaded.has(currentSrc)

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 背景图 — 直接渲染，首次加载时 opacity:0→1 自然过渡 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${mode}-${currentIndex}-${isDark}`}
          initial={{ opacity: isReady ? 0 : 1, scale: isReady ? 1.05 : 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: isReady ? 1.2 : 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentSrc})`,
          }}
        />
      </AnimatePresence>

      {/* 渐变叠加层 — 让内容可读 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/15 to-white/30 dark:from-gray-950/40 dark:via-gray-900/25 dark:to-slate-950/40" />
    </div>
  )
}
