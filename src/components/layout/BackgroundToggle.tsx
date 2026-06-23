'use client'

import { useBackground } from '@/lib/background-context'
import { motion } from 'framer-motion'
import { useRef } from 'react'

export function BackgroundToggle() {
  const { mode, toggleMode, nextImage, prevImage } = useBackground()
  const constraintsRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* 拖拽约束范围 */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-40" />
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.05 }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/50 backdrop-blur-xl border border-white/50 dark:border-gray-700/40 shadow-lg cursor-grab active:cursor-grabbing select-none"
      >
        {/* 切换模式 */}
        <button
          onClick={toggleMode}
          className="relative w-12 h-6 rounded-full flex items-center px-0.5 transition-colors bg-white/30 dark:bg-gray-900/40"
          title={mode === 'single' ? '切换为轮播模式' : '切换为单图模式'}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-md ${
              mode === 'single'
                ? 'bg-blue-500 text-white'
                : 'bg-cyan-500 text-white ml-6'
            }`}
          >
            {mode === 'single' ? '1' : '▶'}
          </motion.div>
        </button>

        {/* 分隔线 */}
        <div className="w-px h-4 bg-white/30 dark:bg-gray-600/40" />

        {/* 上一张 / 下一张 */}
        <button
          onClick={prevImage}
          className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/10 transition-colors text-xs"
          title="上一张"
        >
          ◀
        </button>
        <button
          onClick={nextImage}
          className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/10 transition-colors text-xs"
          title="下一张"
        >
          ▶
        </button>
      </motion.div>
    </>
  )
}
