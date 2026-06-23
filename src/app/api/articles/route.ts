import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles, getArticleBySlug, saveArticle, deleteArticle } from '@/lib/articles'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (slug) {
    const article = getArticleBySlug(slug)
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }
    return NextResponse.json(article)
  }

  const articles = getAllArticles()
  return NextResponse.json(articles)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, ...data } = body

    if (!slug || !data.title) {
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 })
    }

    saveArticle(slug, data)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save article' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }

  deleteArticle(slug)
  return NextResponse.json({ success: true })
}
