'use client'

import { useState, useEffect, useRef } from 'react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [preview, setPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertMarkdown = (before: string, after = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = value.substring(start, end)
    const newValue = value.substring(0, start) + before + selected + after + value.substring(end)
    onChange(newValue)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length)
    }, 0)
  }

  const toolbarItems = [
    { label: 'B', action: () => insertMarkdown('**', '**'), title: '加粗' },
    { label: 'I', action: () => insertMarkdown('*', '*'), title: '斜体' },
    { label: 'H2', action: () => insertMarkdown('## '), title: '标题' },
    { label: '🔗', action: () => insertMarkdown('[', '](url)'), title: '链接' },
    { label: '📷', action: () => insertMarkdown('![alt](', ')'), title: '图片' },
    { label: '`', action: () => insertMarkdown('`', '`'), title: '代码' },
    { label: '```', action: () => insertMarkdown('```\n', '\n```'), title: '代码块' },
    { label: '•', action: () => insertMarkdown('- '), title: '列表' },
    { label: '📋', action: () => insertMarkdown('> '), title: '引用' },
    { label: '—', action: () => insertMarkdown('---\n'), title: '分割线' },
  ]

  useEffect(() => {
    if (preview) {
      // We'll just show the raw markdown in preview mode for simplicity
    }
  }, [preview])

  return (
    <div className="border border-blue-200 dark:border-blue-800 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-blue-100 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 flex-wrap">
        {toolbarItems.map((item) => (
          <button
            key={item.title}
            onClick={item.action}
            title={item.title}
            className="px-2.5 py-1 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {item.label}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={() => setPreview(!preview)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            preview
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/40'
          }`}
        >
          {preview ? '✏️ 编辑' : '👁️ 预览'}
        </button>
      </div>

      {/* Editor / Preview */}
      {preview ? (
        <div className="p-4 min-h-[400px] prose prose-blue dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {value || '*暂无内容*'}
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[400px] p-4 bg-transparent text-gray-800 dark:text-gray-200 font-mono text-sm resize-y focus:outline-none"
          placeholder="使用 Markdown 编写文章..."
        />
      )}
    </div>
  )
}
