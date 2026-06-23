'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArticleMeta } from '@/types'
import { Card, Button } from '@/components/ui'

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleMeta[]>([])

  useEffect(() => {
    fetch('/api/articles')
      .then((r) => r.json())
      .then(setArticles)
      .catch(() => {})
  }, [])

  const handleDelete = async (slug: string) => {
    if (!confirm('确定删除这篇文章吗？')) return
    try {
      await fetch(`/api/articles?slug=${slug}`, { method: 'DELETE' })
      setArticles(articles.filter((a) => a.slug !== slug))
    } catch {
      alert('删除失败')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">📝 文章管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">共 {articles.length} 篇文章</p>
        </div>
        <Link href="/admin/articles/new">
          <Button>✍️ 写新文章</Button>
        </Link>
      </div>

      {articles.length > 0 ? (
        <div className="space-y-3">
          {articles.map((article) => (
            <Card key={article.slug} hover={false} className="flex items-center justify-between !p-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 truncate">{article.title}</h3>
                  {!article.published && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                      草稿
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{article.date}</span>
                  <span>{article.tags.join(', ')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                <Link href={`/admin/articles/${article.slug}`}>
                  <Button variant="secondary" size="sm">编辑</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(article.slug)}>🗑️</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card hover={false} className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📝</p>
          <p>还没有文章</p>
          <Link href="/admin/articles/new">
            <Button className="mt-4">✍️ 写第一篇</Button>
          </Link>
        </Card>
      )}
    </div>
  )
}
