'use client'

import { useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArticleCard } from '@/components/blog'
import { Card } from '@/components/ui'
import { FadeIn } from '@/components/animations'
import type { ArticleMeta } from '@/types'

interface ColNode {
  name: string
  path: string
  children: ColNode[]
  articles: ArticleMeta[]
}

function ColItem({ node, depth = 0, activeTag, expandedCols, toggleCol }: {
  node: ColNode
  depth?: number
  activeTag: string | null
  expandedCols: Set<string>
  toggleCol: (p: string) => void
}) {
  const hasKids = node.children.length > 0 || node.articles.length > 0
  const isExpanded = expandedCols.has(node.path)
  const articleCount = node.articles.length + node.children.reduce((s, c) => s + c.articles.length, 0)

  return (
    <div>
      <button
        onClick={() => toggleCol(node.path)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
        style={{ paddingLeft: `${12 + depth * 12}px` }}
      >
        <span className="flex items-center gap-1">
          {hasKids && <span className="text-[10px] w-3">{isExpanded ? '▼' : '▶'}</span>}
          <span>{node.name}</span>
        </span>
        <span className="text-[10px] text-gray-400">{articleCount}</span>
      </button>
      {isExpanded && (
        <div>
          {node.articles.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="block px-3 py-1 text-xs rounded-lg text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors truncate"
              style={{ paddingLeft: `${24 + depth * 12}px` }}
            >
              {a.title}
            </Link>
          ))}
          {node.children.map((child) => (
            <ColItem key={child.path} node={child} depth={depth + 1} activeTag={activeTag} expandedCols={expandedCols} toggleCol={toggleCol} />
          ))}
        </div>
      )}
    </div>
  )
}

export function ArticlesPageClient({
  articles,
  allTags,
  collectionTree,
  uncategorized,
}: {
  articles: ArticleMeta[]
  allTags: string[]
  collectionTree: ColNode[]
  uncategorized: ArticleMeta[]
}) {
  const searchParams = useSearchParams()
  const activeTag = searchParams.get('tag')
  const [expandedCols, setExpandedCols] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    if (!activeTag) return articles
    return articles.filter((a) => a.tags.includes(activeTag))
  }, [articles, activeTag])

  const toggleCol = useCallback((path: string) => {
    setExpandedCols((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }, [])

  return (
    <div className="min-h-screen pb-16">
      {/* 左侧合集树 */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 w-[240px] hidden lg:block z-10">
        <div className="liquid-glass rounded-2xl p-5 space-y-3 max-h-[70vh] overflow-y-auto">
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">合集</h3>
          <div className="w-full h-px bg-blue-100/50 dark:bg-blue-900/30" />
          <nav className="space-y-0.5">
            <Link
              href="/articles"
              className={`block px-3 py-1.5 text-xs rounded-lg transition-colors font-medium ${
                !activeTag ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
              }`}
            >
              全部文章
            </Link>
            {collectionTree.map((node) => (
              <ColItem key={node.path} node={node} activeTag={activeTag} expandedCols={expandedCols} toggleCol={toggleCol} />
            ))}
            {/* 未分类文章 */}
            {uncategorized.length > 0 && (
              <div>
                <button
                  onClick={() => toggleCol('__uncategorized__')}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <span className="flex items-center gap-1">
                    <span className="text-[10px] w-3">{expandedCols.has('__uncategorized__') ? '▼' : '▶'}</span>
                    <span>未分类</span>
                  </span>
                  <span className="text-[10px] text-gray-400">{uncategorized.length}</span>
                </button>
                {expandedCols.has('__uncategorized__') && (
                  <div className="ml-2 space-y-0.5 mt-0.5 border-l border-blue-100/50 dark:border-blue-900/30 pl-2">
                    {uncategorized.map((a) => (
                      <Link key={a.slug} href={`/articles/${a.slug}`}
                        className="block px-3 py-1 text-xs rounded-lg text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors truncate"
                      >
                        {a.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </aside>

      {/* 主内容 */}
      <div className="lg:pl-[320px] xl:pr-[320px] pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {activeTag ? `#${activeTag}` : '📝 文章'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {activeTag
                  ? `找到 ${filtered.length} 篇带 #${activeTag} 标签的文章`
                  : `共 ${articles.length} 篇文章`}
              </p>
            </div>
          </FadeIn>

          {/* 手机版：合集（和PC一样 liquid-glass 卡片+树形结构，在标签筛上方） */}
          {collectionTree.length > 0 && (
            <div className="lg:hidden mb-6">
              <div className="liquid-glass rounded-2xl p-5 space-y-3 max-h-[50vh] overflow-y-auto">
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">合集</h3>
                <div className="w-full h-px bg-blue-100/50 dark:bg-blue-900/30" />
                <nav className="space-y-0.5">
                  <Link
                    href="/articles"
                    className={`block px-3 py-1.5 text-xs rounded-lg transition-colors font-medium ${
                      !activeTag ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    全部文章
                  </Link>
                  {collectionTree.map((node) => (
                    <ColItem key={node.path} node={node} activeTag={activeTag} expandedCols={expandedCols} toggleCol={toggleCol} />
                  ))}
                  {/* 未分类文章 */}
                  {uncategorized.length > 0 && (
                    <div>
                      <button
                        onClick={() => toggleCol('__uncategorized__')}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <span className="flex items-center gap-1">
                          <span className="text-[10px] w-3">{expandedCols.has('__uncategorized__') ? '▼' : '▶'}</span>
                          <span>未分类</span>
                        </span>
                        <span className="text-[10px] text-gray-400">{uncategorized.length}</span>
                      </button>
                      {expandedCols.has('__uncategorized__') && (
                        <div className="ml-2 space-y-0.5 mt-0.5 border-l border-blue-100/50 dark:border-blue-900/30 pl-2">
                          {uncategorized.map((a) => (
                            <Link key={a.slug} href={`/articles/${a.slug}`}
                              className="block px-3 py-1 text-xs rounded-lg text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors truncate"
                            >
                              {a.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </nav>
              </div>
            </div>
          )}

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Link href="/articles" className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${!activeTag ? 'bg-blue-500 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'}`}>全部</Link>
              {allTags.map((tag) => (
                <Link key={tag} href={`/articles?tag=${tag}`} className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${activeTag === tag ? 'bg-blue-500 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'}`}>#{tag}</Link>
              ))}
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((article, i) => (<ArticleCard key={article.slug} article={article} index={i} />))}
            </div>
          ) : (
            <FadeIn>
              <Card hover={false} className="text-center py-20 text-gray-400">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-sm">没有找到带 #{activeTag} 标签的文章</p>
                <Link href="/articles" className="text-xs text-blue-500 mt-2 inline-block hover:underline">查看全部文章 →</Link>
              </Card>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  )
}
