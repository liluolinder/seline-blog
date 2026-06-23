'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'
import { useState } from 'react'

const imgPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) return null

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div className="liquid-glass-header h-14 flex items-center justify-between px-4 sm:px-6 rounded-2xl shadow-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-auto h-9 rounded-lg overflow-hidden flex-shrink-0">
            <img src={imgPath('/images/logo.webp')} alt={siteConfig.name} className="h-full w-auto object-contain" />
          </span>
          <span className="text-base font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </Link>

        {/* Right section: nav + mobile menu */}
        <div className="flex items-center gap-2">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <span className="text-lg">{isMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-lg border border-blue-100/50 dark:border-blue-900/30 overflow-hidden"
        >
          <nav className="p-2 flex flex-col gap-0.5">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </motion.div>
      )}
    </header>
  )
}