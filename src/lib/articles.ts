import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Article, ArticleMeta } from '@/types'

const articlesDir = path.join(process.cwd(), 'content', 'articles')

// 模块级缓存，避免每次请求都重新扫描磁盘
let cachedArticles: ArticleMeta[] | null = null

function scanArticles(dir: string, baseSlug: string): ArticleMeta[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const result: ArticleMeta[] = []

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const subSlug = baseSlug ? `${baseSlug}/${entry.name}` : entry.name
      result.push(...scanArticles(full, subSlug))
    } else if (entry.name.endsWith('.md')) {
      const raw = fs.readFileSync(full, 'utf-8')
      const { data } = matter(raw)
      const slug = baseSlug ? `${baseSlug}/${entry.name.replace(/\.md$/, '')}` : entry.name.replace(/\.md$/, '')
      // 从路径中提取合集层次（所有目录段）
      const collection = baseSlug || undefined
      result.push({
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || '',
        tags: data.tags || [],
        collection: data.collection || collection,
        sort: data.sort !== undefined ? Number(data.sort) : undefined,
        cover: data.cover || undefined,
        published: data.published !== false,
      } as ArticleMeta)
    }
  }

  return result
}

export function getAllArticles(): ArticleMeta[] {
  // 缓存命中直接返回
  if (cachedArticles) return cachedArticles

  if (!fs.existsSync(articlesDir)) {
    cachedArticles = []
    return cachedArticles
  }

  cachedArticles = scanArticles(articlesDir, '')
    .filter((a) => a.published)
    .sort((a, b) => {
      if (a.sort !== undefined && b.sort !== undefined) return a.sort - b.sort
      if (a.sort !== undefined) return -1
      if (b.sort !== undefined) return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return cachedArticles
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const baseSlug = slug.includes('/') ? slug.split('/').slice(0, -1).join('/') : ''
  const collection = data.collection || baseSlug || undefined

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || '',
    tags: data.tags || [],
    collection,
    sort: data.sort !== undefined ? Number(data.sort) : undefined,
    cover: data.cover || undefined,
    published: data.published !== false,
    content,
  }
}

export function saveArticle(
  slug: string,
  data: { title: string; description: string; date: string; tags: string[]; collection?: string; sort?: number; cover?: string; published: boolean; content: string }
): void {
  const filePath = path.join(articlesDir, `${slug}.md`)
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  const frontmatter: Record<string, unknown> = {
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags,
    published: data.published,
  }
  if (data.collection) frontmatter.collection = data.collection
  if (data.sort !== undefined) frontmatter.sort = data.sort
  if (data.cover) frontmatter.cover = data.cover

  const fileContent = matter.stringify(data.content, frontmatter)
  fs.writeFileSync(filePath, fileContent, 'utf-8')
  // 写入后重置缓存
  cachedArticles = null
}

export function deleteArticle(slug: string): void {
  const filePath = path.join(articlesDir, `${slug}.md`)
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  // 删除后重置缓存
  cachedArticles = null
}
