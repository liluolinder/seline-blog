'use client'

import { useBackground, images } from '@/lib/background-context'
import { motion, AnimatePresence } from 'framer-motion'

export function BackgroundWrapper() {
  const { mode, currentIndex, isDark, opacity, blur } = useBackground()

  const currentSrc = images[currentIndex][isDark ? 'dark' : 'light']

  if (mode === 'none') return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${currentSrc}`}
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentSrc})`,
            filter: blur > 0 ? `blur(${blur}px)` : undefined,
          }}
        />
      </AnimatePresence>

      {/* 渐变叠加层 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/15 to-white/30 dark:from-gray-950/40 dark:via-gray-900/25 dark:to-slate-950/40" />
    </div>
  )
}
