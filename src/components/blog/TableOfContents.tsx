'use client'

import { useMemo } from 'react'

interface TocItem {
  level: number
  text: string
  id: string
}

function parseHeadings(content: string): TocItem[] {
  const headings: TocItem[] = []
  const regex = /^(#{1,3})\s+(.+)$/gm
  let match: RegExpExecArray | null
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
    headings.push({ level, text, id })
  }
  return headings
}

export function TocSidebar({ content }: { content: string }) {
  const headings = useMemo(() => parseHeadings(content), [content])

  if (headings.length === 0) return null

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 w-[220px] hidden xl:block z-10">
      <div className="liquid-glass rounded-2xl p-5 max-h-[70vh] overflow-y-auto">
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          目录
        </h3>
        <nav className="space-y-1">
          {headings.map((item, i) => (
            <a
              key={i}
              href={`#${item.id}`}
              className={`
                block text-xs leading-relaxed transition-colors rounded px-2 py-1
                ${item.level === 1
                  ? 'text-gray-700 dark:text-gray-300 font-medium'
                  : item.level === 2
                    ? 'text-gray-500 dark:text-gray-400 pl-4'
                    : 'text-gray-400 dark:text-gray-500 pl-7'
                }
                hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20
              `}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>

      <p className="text-[10px] text-gray-300 dark:text-gray-600 text-center mt-3">
        📖 文章目录
      </p>
    </aside>
  )
}
