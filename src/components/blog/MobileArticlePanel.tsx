'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { ArticleMeta } from '@/types'

interface TocItem {
  level: number
  text: string
  id: string
}

function parseHeadings(content: string): TocItem[] {
  const headings: TocItem[] = []
  const regex = /^(#{1,3})\s+(.+)$/gm
  let match: RegExpExecArray | null
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
    headings.push({ level, text, id })
  }
  return headings
}

// ─── 合集树相关 ───

interface TreeNode {
  name: string
  path: string
  children: TreeNode[]
  articles: ArticleMeta[]
}

function buildTree(articles: ArticleMeta[], rootPath: string): TreeNode[] {
  const map = new Map<string, TreeNode>()
  const roots: TreeNode[] = []

  for (const a of articles) {
    const colPath = a.collection || rootPath
    const segments = colPath.split('/')
    const idx = segments.indexOf(rootPath)
    if (idx === -1) continue
    const relSegments = segments.slice(idx + 1)

    let currentPath = rootPath
    let parent: TreeNode | null = null
    for (const seg of relSegments) {
      currentPath += '/' + seg
      let node = map.get(currentPath)
      if (!node) {
        node = { name: seg, path: currentPath, children: [], articles: [] }
        map.set(currentPath, node)
        if (parent) parent.children.push(node)
        else roots.push(node)
      }
      parent = node
    }
    if (parent) parent.articles.push(a)
  }

  return roots
}

function NavNode({ node, depth, currentSlug, expandedSet, onToggle }: {
  node: TreeNode
  depth: number
  currentSlug: string
  expandedSet: Set<string>
  onToggle: (p: string) => void
}) {
  const hasKidsInner = node.children.length > 0 || node.articles.length > 0
  const isExp = expandedSet.has(node.path)
  const count = node.articles.length + node.children.reduce((s, c) => s + c.articles.length, 0)

  return (
    <div>
      <button
        onClick={() => onToggle(node.path)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
        style={{ paddingLeft: `${12 + depth * 12}px` }}
      >
        <span className="flex items-center gap-1">
          {hasKidsInner && <span className="text-[10px] w-3">{isExp ? '▼' : '▶'}</span>}
          <span>{node.name}</span>
        </span>
        <span className="text-[10px] text-gray-400">{count}</span>
      </button>
      <AnimatePresence>
        {isExp && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {node.articles.map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`}
                className={`block px-3 py-1 text-xs rounded-lg transition-colors truncate ${a.slug === currentSlug ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'}`}
                style={{ paddingLeft: `${24 + depth * 12}px` }}
              >
                {a.title}
              </Link>
            ))}
            {node.children.map((child) => (
              <NavNode key={child.path} node={child} depth={depth + 1} currentSlug={currentSlug} expandedSet={expandedSet} onToggle={onToggle} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── 计算当前文章所在合集路径，自动展开到当前位置 ───
function computeDefaultExpanded(rootColPath: string, currentSlug: string, allArticles: ArticleMeta[]): Set<string> {
  const set = new Set<string>([rootColPath])
  const currentArticle = allArticles.find((a) => a.slug === currentSlug)
  const currentColPath = currentArticle?.collection || ''
  if (currentColPath) {
    const parts = currentColPath.split('/')
    let p = rootColPath
    const idx = parts.indexOf(rootColPath)
    if (idx !== -1) {
      for (let i = idx + 1; i < parts.length; i++) {
        p = p + '/' + parts[i]
        set.add(p)
      }
    }
  }
  return set
}

// ─── 主组件 ───

export function MobileArticlePanel({
  content,
  collection,
  rootColPath,
  allArticles,
  currentSlug,
}: {
  content: string
  collection: string | undefined
  rootColPath: string | null
  allArticles: ArticleMeta[]
  currentSlug: string
}) {
  const [tocOpen, setTocOpen] = useState(false)
  const defaultExpanded = useMemo(
    () => rootColPath ? computeDefaultExpanded(rootColPath, currentSlug, allArticles) : new Set<string>(),
    [rootColPath, currentSlug, allArticles]
  )
  const [expandedSet, setExpandedSet] = useState<Set<string>>(defaultExpanded)
  const headings = useMemo(() => parseHeadings(content), [content])

  const treeArts = useMemo(() => {
    if (!rootColPath) return []
    return allArticles.filter(
      (a) => a.collection === rootColPath || (a.collection && a.collection.startsWith(rootColPath + '/'))
    )
  }, [allArticles, rootColPath])

  const tree = useMemo(() => {
    if (!rootColPath) return []
    return buildTree(treeArts, rootColPath)
  }, [treeArts, rootColPath])

  const onToggle = (p: string) => {
    setExpandedSet((prev) => {
      const next = new Set(prev)
      if (next.has(p)) next.delete(p)
      else next.add(p)
      return next
    })
  }

  return (
    <div className="lg:hidden">
      {/* ─── 浮动目录 ─── */}
      {headings.length > 0 && (
        <>
          {/* 右上角切换按钮 */}
          <motion.button
            onClick={() => setTocOpen((o) => !o)}
            className="fixed top-20 right-4 z-50 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-blue-100/50 dark:border-gray-700/50 shadow-lg flex items-center justify-center text-blue-500 dark:text-blue-400 text-xs cursor-pointer"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            title="目录"
          >
            {tocOpen ? '✕' : '📖'}
          </motion.button>

          {/* 浮动目录面板 */}
          <AnimatePresence>
            {tocOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="fixed top-28 right-4 z-50 w-56 max-h-[55vh] liquid-glass rounded-2xl p-4 overflow-y-auto shadow-xl"
              >
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">目录</h3>
                <nav className="space-y-1">
                  {headings.map((item, i) => (
                    <a
                      key={i}
                      href={`#${item.id}`}
                      onClick={() => setTocOpen(false)}
                      className={`
                        block text-xs leading-relaxed transition-colors rounded px-2 py-1
                        ${item.level === 1
                          ? 'text-gray-700 dark:text-gray-300 font-medium'
                          : item.level === 2
                            ? 'text-gray-500 dark:text-gray-400 pl-4'
                            : 'text-gray-400 dark:text-gray-500 pl-7'
                        }
                        hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20
                      `}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ─── 底部合集列表 ─── */}
      {rootColPath && treeArts.length > 0 && (
        <div className="mt-12 mb-8">
          <div className="liquid-glass rounded-2xl p-5 space-y-3 max-h-[50vh] overflow-y-auto">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">合集</h3>
            <div className="w-full h-px bg-blue-100/50 dark:bg-blue-900/30" />
            <nav className="space-y-0.5">
              <button
                onClick={() => onToggle(rootColPath)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <span className="flex items-center gap-1">
                  <span className="text-[10px] w-3">{expandedSet.has(rootColPath) ? '▼' : '▶'}</span>
                  <span>{rootColPath}</span>
                </span>
                <span className="text-[10px] text-gray-400">{treeArts.length}</span>
              </button>
              {expandedSet.has(rootColPath) && tree.map((node) => (
                <NavNode key={node.path} node={node} depth={1} currentSlug={currentSlug} expandedSet={expandedSet} onToggle={onToggle} />
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
