'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const adminNav = [
  { name: '📊 仪表盘', path: '/admin' },
  { name: '📝 文章管理', path: '/admin/articles' },
  { name: '🔗 友链管理', path: '/admin/friends' },
  { name: '🚀 项目管理', path: '/admin/projects' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-blue-100/50 dark:border-blue-900/30 hidden md:block">
      <div className="p-5 border-b border-blue-100/50 dark:border-blue-900/30">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">💎</span>
          <span className="font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Seline Admin
          </span>
        </Link>
      </div>
      <nav className="p-3 flex flex-col gap-1">
        {adminNav.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path))
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="admin-nav-indicator"
                  className="absolute left-0 top-1 bottom-1 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"
                />
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
