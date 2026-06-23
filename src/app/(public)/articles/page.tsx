import { Suspense } from 'react'
import { getAllArticles } from '@/lib/articles'
import { ArticlesPageClient } from './ArticlesPageClient'
import type { ArticleMeta } from '@/types'

export default function ArticlesPage() {
  const articles = getAllArticles()
  const allTags = Array.from(new Set(articles.flatMap((a) => a.tags)))

  // 构建树形合集结构
  interface ColNode {
    name: string
    path: string
    children: ColNode[]
    articles: ArticleMeta[]
  }
  const rootMap = new Map<string, ColNode>()
  const uncategorized: ArticleMeta[] = []

  for (const a of articles) {
    const colPath = a.collection
    if (!colPath) {
      uncategorized.push(a)
      continue
    }
    const segments = colPath.split('/')
    let parent: ColNode | null = null
    for (let i = 0; i < segments.length; i++) {
      const p = segments.slice(0, i + 1).join('/')
      let node = rootMap.get(p)
      if (!node) {
        node = { name: segments[i], path: p, children: [], articles: [] }
        rootMap.set(p, node)
        if (parent) parent.children.push(node)
      }
      parent = node
    }
    if (parent) parent.articles.push(a)
  }

  const collectionTree = Array.from(rootMap.values()).filter((n) => !n.path.includes('/'))

  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">加载中...</div>}>
      <ArticlesPageClient
        articles={articles}
        allTags={allTags}
        collectionTree={collectionTree}
        uncategorized={uncategorized}
      />
    </Suspense>
  )
}
