'use client'

import { motion } from 'framer-motion'

interface StatsCardProps {
  title: string
  value: number | string
  icon: string
  color?: string
}

export function StatsCard({ title, value, icon, color = 'blue' }: StatsCardProps) {
  const colors: Record<string, string> = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-amber-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-blue-100/50 dark:border-blue-900/30 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold mt-1 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color] || colors.blue} flex items-center justify-center text-white text-xl shadow-lg`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}
