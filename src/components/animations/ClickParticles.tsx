'use client'

import { useEffect, useRef, useCallback } from 'react'

const COLORS = ['#f9a8d4', '#f472b6', '#fbcfe8', '#fce7f3', '#ec4899', '#db2777']
const PETAL_SHAPES = ['🌸', '💮', '🪷', '✨']

interface Particle {
  el: HTMLSpanElement
  vx: number
  vy: number
  life: number
  maxLife: number
  rotation: number
  rotSpeed: number
}

export function ClickParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])

  const createParticle = useCallback((x: number, y: number) => {
    const container = containerRef.current
    if (!container) return

    const isPetal = Math.random() > 0.3
    const el = document.createElement('span')
    el.className = 'pointer-events-none absolute select-none'
    el.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      font-size: ${14 + Math.random() * 10}px;
      opacity: ${0.6 + Math.random() * 0.4};
      transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg);
      transition: none;
    `
    el.textContent = isPetal ? PETAL_SHAPES[Math.floor(Math.random() * PETAL_SHAPES.length)] : ''
    
    if (!isPetal) {
      // 小圆点花瓣
      el.style.width = `${6 + Math.random() * 6}px`
      el.style.height = `${6 + Math.random() * 6}px`
      el.style.borderRadius = '50%'
      el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)]
      el.style.boxShadow = `0 0 4px ${COLORS[Math.floor(Math.random() * COLORS.length)]}40`
      el.style.opacity = `${0.5 + Math.random() * 0.3}`
    }

    container.appendChild(el)

    const particle: Particle = {
      el,
      vx: (Math.random() - 0.5) * 3,
      vy: -(2 + Math.random() * 3),
      life: 0,
      maxLife: 60 + Math.random() * 40,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 6,
    }

    particlesRef.current.push(particle)
  }, [])

  useEffect(() => {
    let animId: number

    const animate = () => {
      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.vy += 0.06 // 重力
        p.vx += (Math.random() - 0.5) * 0.3 // 随机飘动
        p.rotation += p.rotSpeed

        const el = p.el
        const x = parseFloat(el.style.left)
        const y = parseFloat(el.style.top)

        el.style.left = `${x + p.vx}px`
        el.style.top = `${y + p.vy}px`
        el.style.transform = `translate(-50%, -50%) rotate(${p.rotation}deg)`
        el.style.opacity = `${Math.max(0, 1 - p.life / p.maxLife)}`

        if (p.life >= p.maxLife) {
          el.remove()
          particles.splice(i, 1)
        }
      }
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.code-copy-btn') ||
        target.closest('.no-ripple')
      ) return

      // 每次点击生成 3-6 个粒子
      const count = 3 + Math.floor(Math.random() * 4)
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          createParticle(
            e.clientX + (Math.random() - 0.5) * 20,
            e.clientY + (Math.random() - 0.5) * 20
          )
        }, i * 30)
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      cancelAnimationFrame(animId)
      particlesRef.current.forEach((p) => p.el.remove())
      particlesRef.current = []
    }
  }, [createParticle])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
    />
  )
}
