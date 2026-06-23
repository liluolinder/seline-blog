'use client'

import { useBackground, images } from '@/lib/background-context'
import { motion, AnimatePresence } from 'framer-motion'

export function BackgroundWrapper() {
  const { mode, currentIndex, isDark, loaded } = useBackground()

  const currentSrc = images[currentIndex][isDark ? 'dark' : 'light']
  const isReady = loaded.has(currentSrc)

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 渐进过渡 — 只有图片加载完毕才显示 */}
      <AnimatePresence mode="wait">
        {isReady && (
          <motion.div
            key={`${mode}-${currentIndex}-${isDark}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentSrc})`,
            }}
          />
        )}
      </AnimatePresence>

      {/* 加载中占位 — 保持底色一致性 */}
      {!isReady && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-950 dark:to-slate-900" />
      )}

      {/* 渐变叠加层 — 让内容可读 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/15 to-white/30 dark:from-gray-950/40 dark:via-gray-900/25 dark:to-slate-950/40" />
    </div>
  )
}
