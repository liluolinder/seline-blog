'use client'

import { motion } from 'framer-motion'

export function Card({
  children,
  className = '',
  hover = true,
  glass = true,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  onClick?: () => void
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, boxShadow: '0 20px 60px rgba(59, 130, 246, 0.20)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`rounded-2xl p-6 ${glass ? 'liquid-glass-card' : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md border border-blue-100/50 dark:border-blue-900/30'} ${hover ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}
