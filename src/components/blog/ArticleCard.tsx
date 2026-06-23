import Link from 'next/link'
import { ArticleMeta } from '@/types'
import { Card } from '@/components/ui'
import { FadeIn } from '@/components/animations'

export function ArticleCard({ article, index = 0 }: { article: ArticleMeta; index?: number }) {
  return (
    <FadeIn delay={index * 0.1}>
      <Link href={`/articles/${article.slug}`}>
        <Card className="h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {article.date}
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">
              {article.description}
            </p>
            <div className="mt-4 text-xs text-blue-500 dark:text-blue-400 font-medium flex items-center gap-1">
              阅读更多
              <span>→</span>
            </div>
          </div>
        </Card>
      </Link>
    </FadeIn>
  )
}
