'use client'

import { useBackground, images } from '@/lib/background-context'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Modal } from '@/components/ui/Modal'

export function BackgroundToggle() {
  const { mode, currentIndex, toggleMode, nextImage, prevImage } = useBackground()
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

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
        <button
          onClick={() => setIsOpen(true)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/10 transition-colors text-lg"
          title="背景设置"
        >
          ⚙
        </button>
      </motion.div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="背景设置">
        <div className="space-y-6">
          {/* 模式切换 */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">背景模式</span>
            <button
              onClick={toggleMode}
              className={`relative w-12 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                mode === 'carousel' ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              title={mode === 'single' ? '切换为轮播模式' : '切换为单图模式'}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-5 h-5 rounded-full bg-white shadow-md ${
                  mode === 'carousel' ? 'ml-6' : 'ml-0'
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 -mt-4">
            {mode === 'single'
              ? '当前：单图模式，背景固定显示'
              : '当前：轮播模式，每 6 秒自动切换'}
          </p>

          {/* 分隔线 */}
          <hr className="border-gray-200 dark:border-gray-700" />

          {/* 图片切换 */}
          <div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-3">背景图片</span>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevImage}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                title="上一张"
              >
                ◀
              </button>

              {/* 图片缩略图指示器 */}
              <div className="flex gap-3">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className={`w-16 h-10 rounded-lg bg-cover bg-center border-2 transition-all ${
                      i === currentIndex
                        ? 'border-blue-500 shadow-md scale-110'
                        : 'border-transparent opacity-60 hover:opacity-80'
                    }`}
                    style={{
                      backgroundImage: `url(${images[i].light})`,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextImage}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                title="下一张"
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
