'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { ArticleMeta } from '@/types'
import { ArticleCard } from './ArticleCard'
import { Card } from '@/components/ui'
import { FadeIn } from '@/components/animations'

export function SearchBox({ articles }: { articles: ArticleMeta[] }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const recentArticles = articles.slice(0, 5)

  const filtered = useMemo(() => {
    if (!query.trim()) return articles
    const q = query.toLowerCase()
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [query, articles])

  // Keyboard shortcut: Ctrl+K or Cmd+K to focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div>
      {/* 搜索输入框 */}
      <div
        className={`
          flex items-center gap-3 px-5 h-12 rounded-2xl transition-all duration-300
          liquid-glass-card mb-8
          ${focused ? 'shadow-xl shadow-blue-500/15' : ''}
        `}
      >
        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="搜索文章标题、描述或标签…"
          className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus-visible:!outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shrink-0"
          >
            <span className="text-xs">✕</span>
          </button>
        )}
      </div>

      {/* ===== 搜索模式：显示搜索结果 ===== */}
      {query ? (
        <>
          <FadeIn>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 ml-1">
              {filtered.length === 0
                ? '未找到匹配的文章'
                : `找到 ${filtered.length} 篇匹配文章`}
            </p>
          </FadeIn>

          {filtered.length > 0 ? (
            <div className="space-y-6">
              {filtered.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          ) : (
            <FadeIn>
              <Card hover={false} className="text-center py-20 text-gray-400">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-sm">没有找到与「{query}」相关的文章</p>
                <p className="text-xs mt-2 text-gray-300 dark:text-gray-600">试试其他关键词</p>
              </Card>
            </FadeIn>
          )}
        </>
      ) : (
        /* ===== 默认模式：显示最近文章 ===== */
        <>
          <FadeIn delay={0.1}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full inline-block" />
                最近文章
              </h2>
            </div>
          </FadeIn>

          {recentArticles.length > 0 ? (
            <div className="space-y-6">
              {recentArticles.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          ) : (
            <FadeIn>
              <Card hover={false} className="text-center py-20 text-gray-400">
                <p className="text-5xl mb-4">📝</p>
                <p>还没有文章，敬请期待 ✨</p>
              </Card>
            </FadeIn>
          )}
        </>
      )}
    </div>
  )
}
