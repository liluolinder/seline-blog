'use client'

import { useEffect, useRef } from 'react'

export function RippleEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleClick = (e: MouseEvent) => {
      // 排除输入框、按钮、链接等交互元素
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.code-copy-btn') ||
        target.closest('.no-ripple')
      ) return

      const rect = container.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 0.3

      const ripple = document.createElement('span')
      ripple.className = 'pointer-events-none absolute rounded-full'
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
        transform: scale(0);
        animation: ripple-effect 0.6s ease-out forwards;
      `
      container.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ isolation: 'isolate' }}
    />
  )
}
