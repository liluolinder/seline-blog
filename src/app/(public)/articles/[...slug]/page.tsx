import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import { buildArticleTree } from '@/lib/collections'
import { ArticleContent, TocSidebar } from '@/components/blog'
import { FadeIn } from '@/components/animations'
import { ArticleNavSidebar } from './ArticleNavSidebar'

interface Props {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug.split('/'),
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const slugStr = slug.map(decodeURIComponent).join('/')
  const article = getArticleBySlug(slugStr)
  if (!article) return { title: '文章未找到' }
  return { title: `${article.title} | Seline Blog`, description: article.description }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const slugStr = slug.map(decodeURIComponent).join('/')
  const article = getArticleBySlug(slugStr)

  if (!article) notFound()

  return (
    <div className="min-h-screen pb-16">
      <TocSidebar content={article.content} />

      {article.collection && (() => {
        const rootColPath = article.collection!.split('/')[0]
        const allArticles = getAllArticles()
        // 收集以 rootColPath 开头的所有文章
        const treeArts = allArticles.filter(
          (a) => a.collection === rootColPath || (a.collection && a.collection.startsWith(rootColPath + '/'))
        )
        return (
          <aside className="fixed left-6 top-1/2 -translate-y-1/2 w-[240px] hidden lg:block z-10">
            <div className="liquid-glass rounded-2xl p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">合集</h3>
              <div className="w-full h-px bg-blue-100/50 dark:bg-blue-900/30" />
              <ArticleNavSidebar
                rootPath={rootColPath}
                rootName={rootColPath}
                articles={treeArts}
                currentSlug={slugStr}
              />
            </div>
          </aside>
        )
      })()}

      <div className="lg:pl-[320px] xl:pr-[280px] pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <Link href="/articles" className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 mb-6 transition-colors">← 返回文章列表</Link>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">{article.date}</span>
                <div className="flex gap-1.5">
                  {article.tags.map((tag) => (<span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">#{tag}</span>))}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 leading-tight">{article.title}</h1>
              <p className="mt-3 text-gray-700 dark:text-gray-300 text-lg">{article.description}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}><ArticleContent content={article.content} /></FadeIn>
        </div>
      </div>
    </div>
  )
}
