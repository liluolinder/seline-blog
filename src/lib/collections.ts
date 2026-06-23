import { getAllArticles } from './articles'
import type { ArticleMeta } from '@/types'

export interface Collection {
  name: string
  articles: ArticleMeta[]
}

export function getAllCollections(): Collection[] {
  const articles = getAllArticles()
  const map = new Map<string, ArticleMeta[]>()

  for (const article of articles) {
    const name = article.collection || '未分类'
    const existing = map.get(name) || []
    existing.push(article)
    map.set(name, existing)
  }

  return Array.from(map.entries())
    .map(([name, arts]) => ({
      name,
      articles: arts,
    }))
    .sort((a, b) => b.articles.length - a.articles.length)
}

export function getArticlesByCollection(name: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.collection === name)
}

// 获取指定路径下所有文章（含子合集）
export function getArticlesUnderPath(colPath: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.collection === colPath || (a.collection && a.collection.startsWith(colPath + '/')))
}

// 构建合集树（用于文章详情页左侧）
export function buildArticleTree(colPath: string): { name: string; path: string; children: { name: string; path: string; articles: ArticleMeta[] }[]; articles: ArticleMeta[] } | null {
  const all = getAllArticles()
  const rootArts = all.filter((a) => a.collection === colPath)
  const children: { name: string; path: string; articles: ArticleMeta[] }[] = []

  // 找出直接子目录
  const subDirs = new Set<string>()
  for (const a of all) {
    if (a.collection && a.collection.startsWith(colPath + '/')) {
      const rest = a.collection.slice(colPath.length + 1)
      const sub = rest.split('/')[0]
      subDirs.add(sub)
    }
  }

  for (const sub of subDirs) {
    const subPath = colPath + '/' + sub
    const arts = all.filter((a) => a.collection && (a.collection === subPath || a.collection.startsWith(subPath + '/')))
    children.push({ name: sub, path: subPath, articles: arts })
  }

  return { name: colPath.split('/').pop() || colPath, path: colPath, children, articles: rootArts }
}
