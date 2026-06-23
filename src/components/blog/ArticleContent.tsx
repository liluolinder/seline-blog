'use client'

import { Card } from '@/components/ui'
import { MarkdownRenderer } from '@/lib/markdown'

export function ArticleContent({ content }: { content: string }) {
  return (
    <Card hover={false} className="!p-8 md:!p-10">
      <article className="max-w-none">
        {content ? (
          <MarkdownRenderer content={content} />
        ) : (
          <p className="text-gray-400">文章内容为空</p>
        )}
      </article>
    </Card>
  )
}
