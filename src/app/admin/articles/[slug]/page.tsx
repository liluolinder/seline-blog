'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Input, Button } from '@/components/ui'
import { MarkdownEditor } from '@/components/admin'

export default function EditArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [form, setForm] = useState({
    slug: '',
    title: '',
    description: '',
    date: '',
    tags: '',
    content: '',
    published: true,
  })
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/articles?slug=${slug}`)
      .then((r) => r.json())
      .then((article) => {
        if (article) {
          setForm({
            slug: article.slug,
            title: article.title,
            description: article.description,
            date: article.date,
            tags: article.tags.join(', '),
            content: article.content,
            published: article.published,
          })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  const handleSave = async () => {
    if (!form.slug || !form.title) {
      alert('Slug 和标题不能为空')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: form.slug,
          title: form.title,
          description: form.description,
          date: form.date,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
          content: form.content,
          published: form.published,
        }),
      })
      if (res.ok) {
        router.push('/admin/articles')
      } else {
        alert('保存失败')
      }
    } catch {
      alert('保存失败')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">✏️ 编辑文章</h1>
      </div>

      <div className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Slug (URL标识)"
            value={form.slug}
            onChange={(v) => setForm({ ...form, slug: v })}
            placeholder="my-article-slug"
            required
          />
          <Input
            label="日期"
            type="date"
            value={form.date}
            onChange={(v) => setForm({ ...form, date: v })}
          />
        </div>

        <Input
          label="标题"
          value={form.title}
          onChange={(v) => setForm({ ...form, title: v })}
          placeholder="文章标题"
          required
        />

        <Input
          label="描述"
          value={form.description}
          onChange={(v) => setForm({ ...form, description: v })}
          placeholder="文章摘要..."
        />

        <Input
          label="标签 (用逗号分隔)"
          value={form.tags}
          onChange={(v) => setForm({ ...form, tags: v })}
          placeholder="Next.js, React, TypeScript"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">内容 (Markdown)</label>
          <MarkdownEditor
            value={form.content}
            onChange={(v) => setForm({ ...form, content: v })}
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-4 h-4 rounded border-blue-300 text-blue-500 focus:ring-blue-400"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">已发布</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? '保存中...' : '💾 保存修改'}
          </Button>
          <Button variant="secondary" onClick={() => router.push('/admin/articles')}>
            取消
          </Button>
        </div>
      </div>
    </div>
  )
}
