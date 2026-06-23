'use client'

import { useBackground } from '@/lib/background-context'
import { motion } from 'framer-motion'

export function BackgroundToggle() {
  const { mode, toggleMode, nextImage, prevImage } = useBackground()

  return (
    <div className="flex items-center gap-1.5">
      {/* 切换模式 */}
      <button
        onClick={toggleMode}
        className="relative w-14 h-7 rounded-full bg-white/30 dark:bg-gray-800/40 backdrop-blur-md border border-blue-100/40 dark:border-blue-900/30 flex items-center px-1 transition-colors hover:bg-white/50 dark:hover:bg-gray-800/60"
        title={mode === 'single' ? '切换为轮播模式' : '切换为单图模式'}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
            mode === 'single'
              ? 'bg-blue-400 text-white'
              : 'bg-cyan-400 text-white ml-7'
          }`}
        >
          {mode === 'single' ? '1' : '▶'}
        </motion.div>
      </button>

      {/* 上一张 / 下一张 */}
      <button
        onClick={prevImage}
        className="w-7 h-7 rounded-full bg-white/30 dark:bg-gray-800/40 backdrop-blur-md border border-blue-100/40 dark:border-blue-900/30 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/60 transition-colors text-xs"
        title="上一张"
      >
        ◀
      </button>
      <button
        onClick={nextImage}
        className="w-7 h-7 rounded-full bg-white/30 dark:bg-gray-800/40 backdrop-blur-md border border-blue-100/40 dark:border-blue-900/30 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/60 transition-colors text-xs"
        title="下一张"
      >
        ▶
      </button>
    </div>
  )
}
