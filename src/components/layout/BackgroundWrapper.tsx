'use client'

import { useBackground, images } from '@/lib/background-context'
import { motion, AnimatePresence } from 'framer-motion'

export function BackgroundWrapper() {
  const { mode, currentIndex, isDark } = useBackground()

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${mode}-${currentIndex}-${isDark}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${images[currentIndex][isDark ? 'dark' : 'light']})`,
          }}
        />
      </AnimatePresence>

      {/* 渐变叠加层 — 让内容可读 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/40 dark:from-gray-950/50 dark:via-gray-900/35 dark:to-slate-950/50" />
    </div>
  )
}
