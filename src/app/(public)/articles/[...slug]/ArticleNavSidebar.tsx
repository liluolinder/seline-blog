'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { ArticleMeta } from '@/types'

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
      {isExp && (
        <div>
          {node.articles.map((a) => (
            <Link key={a.slug} href={`/articles/${a.slug}`}
              className={`block px-3 py-1 text-xs rounded-lg transition-colors truncate ${a.slug === currentSlug ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'}`}
              style={{ paddingLeft: `${24 + depth * 12}px` }}
            >
              {a.sort !== undefined && <span className="text-[10px] text-gray-400 mr-1.5">{a.sort}.</span>}
              {a.title}
            </Link>
          ))}
          {node.children.map((child) => (
            <NavNode key={child.path} node={child} depth={depth + 1} currentSlug={currentSlug} expandedSet={expandedSet} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  )
}

export function ArticleNavSidebar({ rootPath, rootName, articles, currentSlug }: {
  rootPath: string
  rootName: string
  articles: ArticleMeta[]
  currentSlug: string
}) {
  // 计算当前文章所在合集路径，自动展开到当前位置
  const currentArticle = articles.find((a) => a.slug === currentSlug)
  const currentColPath = currentArticle?.collection || ''

  const defaultExpanded = useMemo(() => {
    const set = new Set<string>([rootPath])
    if (currentColPath) {
      const parts = currentColPath.split('/')
      let p = rootPath
      const idx = parts.indexOf(rootPath.split('/')[0])
      if (idx !== -1) {
        for (let i = idx + 1; i < parts.length; i++) {
          p = p + '/' + parts[i]
          set.add(p)
        }
      }
    }
    return set
  }, [rootPath, currentColPath])

  const [expandedSet, setExpandedSet] = useState<Set<string>>(defaultExpanded)

  const tree = useMemo(() => buildTree(articles, rootPath), [articles, rootPath])

  const onToggle = (p: string) => {
    setExpandedSet((prev) => {
      const next = new Set(prev)
      if (next.has(p)) next.delete(p)
      else next.add(p)
      return next
    })
  }

  return (
    <nav className="space-y-0.5">
      {/* 根节点 */}
      <button
        onClick={() => onToggle(rootPath)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
      >
        <span className="flex items-center gap-1">
          <span className="text-[10px] w-3">{expandedSet.has(rootPath) ? '▼' : '▶'}</span>
          <span>{rootName}</span>
        </span>
        <span className="text-[10px] text-gray-400">{articles.length}</span>
      </button>
      {expandedSet.has(rootPath) && tree.map((node) => (
        <NavNode key={node.path} node={node} depth={1} currentSlug={currentSlug} expandedSet={expandedSet} onToggle={onToggle} />
      ))}
    </nav>
  )
}
