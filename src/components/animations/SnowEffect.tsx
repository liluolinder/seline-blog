'use client'

import { useEffect, useRef } from 'react'

interface Snowflake {
  el: HTMLDivElement
  x: number
  y: number
  size: number
  speed: number
  sway: number
  swaySpeed: number
  opacity: number
}

export function SnowEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const flakesRef = useRef<Snowflake[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const count = 200
    const flakes: Snowflake[] = []

    for (let i = 0; i < count; i++) {
      const size = 4 + Math.random() * 8
      const el = document.createElement('div')
      el.className = 'pointer-events-none absolute'
      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(200,220,255,0.4));
        border-radius: 50%;
        filter: blur(${Math.random() * 0.5}px);
        box-shadow: 0 0 ${size * 4}px rgba(180, 210, 255, 0.4), 0 0 ${size * 2}px rgba(255, 255, 255, 0.3);
      `
      container.appendChild(el)

      flakes.push({
        el,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        speed: 0.8 + Math.random() * 1.2,
        sway: Math.random() * 60,
        swaySpeed: 0.3 + Math.random() * 0.6,
        opacity: 0.6 + Math.random() * 0.4,
      })
    }

    flakesRef.current = flakes

    let animId: number
    const animate = () => {
      for (const f of flakes) {
        f.y += f.speed
        f.sway += f.swaySpeed
        f.x += Math.sin(f.sway * 0.02) * 0.2

        if (f.y > 105) { f.y = -5; f.x = Math.random() * 100 }
        if (f.x < -5) f.x = 105
        if (f.x > 105) f.x = -5

        f.el.style.left = `${f.x}%`
        f.el.style.top = `${f.y}%`
        f.el.style.opacity = `${f.opacity * (1 - Math.abs(f.y - 50) / 60)}`
      }
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ isolation: 'isolate' }}
    />
  )
}
