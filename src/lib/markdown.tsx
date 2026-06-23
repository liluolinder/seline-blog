'use client'

import { useMemo, useEffect, useRef } from 'react'
import { Marked, Renderer } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

const renderer = new Renderer()

// 为标题生成 id，使 TOC 锚点可跳转
function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
}

renderer.heading = function ({ text, depth }) {
  const id = headingId(text)
  return `<h${depth} id="${id}" style="scroll-margin-top:100px">${text}</h${depth}>`
}

renderer.code = function ({ text, lang, escaped }) {
  const langClass = lang ? ` class="hljs language-${lang}"` : ' class="hljs"'
  const highlighted = lang && hljs.getLanguage(lang)
    ? hljs.highlight(text, { language: lang }).value
    : text

  return `<div class="code-block-wrapper relative my-4 rounded-xl shadow-lg overflow-hidden bg-gray-900 dark:bg-gray-950">
  <div class="flex items-center justify-between px-4 py-2.5 bg-gray-800/80 dark:bg-gray-900/80 border-b border-gray-700/50">
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 rounded-full bg-red-500 shadow-sm"></span>
      <span class="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></span>
      <span class="w-3 h-3 rounded-full bg-green-500 shadow-sm"></span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-[11px] text-gray-400 font-mono">${lang || 'code'}</span>
      <button class="code-copy-btn flex items-center gap-1 px-2 py-1 text-[11px] text-gray-400 hover:text-white bg-gray-700/50 hover:bg-gray-600/50 rounded-md transition-colors" data-code="${encodeURIComponent(text)}">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
        复制
      </button>
    </div>
  </div>
  <pre class="!m-0 !rounded-none !border-0 !shadow-none"><code${langClass}>${highlighted}</code></pre>
</div>`
}

// GitHub 风格告警框
const alertTypes: Record<string, { icon: string; color: string; bg: string; border: string; label: string }> = {
  NOTE:      { icon: 'ℹ️', color: '#2563eb', bg: '#eff6ff', border: '#3b82f6', label: 'NOTE' },
  TIP:       { icon: '💡', color: '#16a34a', bg: '#f0fdf4', border: '#22c55e', label: 'TIP' },
  IMPORTANT: { icon: '❗', color: '#9333ea', bg: '#faf5ff', border: '#a855f7', label: 'IMPORTANT' },
  WARNING:   { icon: '⚠️', color: '#d97706', bg: '#fffbeb', border: '#f59e0b', label: 'WARNING' },
  CAUTION:   { icon: '🚨', color: '#dc2626', bg: '#fef2f2', border: '#ef4444', label: 'CAUTION' },
}

renderer.blockquote = function ({ text }) {
  for (const [type, a] of Object.entries(alertTypes)) {
    if (text.startsWith(`[!${type}]`)) {
      let raw = text.slice(type.length + 4).trim()
      // 支持 ==高亮== 语法
      raw = raw.replace(/==([^=]+)==/g, '<mark style="background:#fef08a;padding:0 2px;border-radius:2px">$1</mark>')
      // 将内部 Markdown 转成 HTML（仅内联级别）
      const content = marked.parseInline(raw, { async: false }) as string
      return `<div class="alert-box my-4 rounded-xl p-4 border-l-4 shadow-sm" style="background:${a.bg};border-color:${a.border}"><div class="flex items-center gap-2 mb-2 pb-2 border-b" style="border-color:${a.border}40"><span class="text-lg">${a.icon}</span><span class="text-sm font-bold" style="color:${a.color}">${a.label}</span></div><div class="text-sm leading-relaxed" style="color:#334155">${content}</div></div>`
    }
  }
  return `<blockquote class="my-4 border-l-4 border-blue-400 dark:border-blue-600 pl-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-r-lg italic text-gray-600 dark:text-gray-400">${text}</blockquote>`
}

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(code, { language: lang }).value
        } catch {
          // fallback
        }
      }
      return code
    },
  }),
  {
    gfm: true,
    breaks: true,
    async: false,
    renderer,
  }
)

export function MarkdownRenderer({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const html = useMemo(() => {
    return marked.parse(content) as string
  }, [content])

  // 挂载复制按钮事件
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('.code-copy-btn') as HTMLElement | null
      if (!btn) return

      const encoded = btn.dataset.code
      if (!encoded) return

      const code = decodeURIComponent(encoded)
      navigator.clipboard.writeText(code).then(() => {
        const original = btn.innerHTML
        btn.innerHTML = '<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> 已复制'
        btn.classList.add('text-green-400')
        setTimeout(() => {
          btn.innerHTML = original
          btn.classList.remove('text-green-400')
        }, 2000)
      }).catch(() => {
        // fallback
      })
    }

    container.addEventListener('click', handleClick)
    return () => container.removeEventListener('click', handleClick)
  }, [])

  return (
    <div
      ref={containerRef}
      className="max-w-none markdown-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
