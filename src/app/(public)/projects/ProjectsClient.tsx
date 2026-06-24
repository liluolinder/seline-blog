'use client'

import { useState, useMemo } from 'react'
import type { Project } from '@/types'
import { Card } from '@/components/ui'
import { FadeIn } from '@/components/animations'

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState('')
  const [activeLabel, setActiveLabel] = useState<string | null>(null)

  const allLabels = useMemo(() => {
    const set = new Set<string>()
    for (const p of projects) {
      for (const l of p.labels) set.add(l)
    }
    return Array.from(set).sort()
  }, [projects])

  const filtered = useMemo(() => {
    return projects
      .filter((p) => {
        if (activeLabel && !p.labels.includes(activeLabel)) return false
        if (query) {
          const q = query.toLowerCase()
          return (
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.labels.some((l) => l.toLowerCase().includes(q))
          )
        }
        return true
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [projects, query, activeLabel])

  return (
    <div className="min-h-screen pb-16">
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">🚀 项目</h1>
              <p className="text-gray-600 dark:text-gray-400">我的开源项目</p>
            </div>
          </FadeIn>

          {/* 搜索框 — 和首页搜索框一致 */}
          <div className="flex items-center gap-3 px-5 h-12 rounded-2xl transition-all duration-300 liquid-glass-card mb-8">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索项目名称、描述或标签…"
              className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus-visible:!outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shrink-0"
              >
                <span className="text-xs">✕</span>
              </button>
            )}
          </div>

          {/* 标签筛选 — 和文章页标签一致 */}
          {allLabels.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveLabel(null)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${!activeLabel ? 'bg-blue-500 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'}`}
              >
                全部
              </button>
              {allLabels.map((l) => (
                <button
                  key={l}
                  onClick={() => setActiveLabel(l === activeLabel ? null : l)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${activeLabel === l ? 'bg-blue-500 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((project, i) => (
                <FadeIn key={`${project.name}-${i}`} delay={i * 0.1}>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <Card className="h-full">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{project.name}</h3>
                        {project.platform && (
                          <span className="text-gray-400 shrink-0 ml-2">
                            <img
                              src={`/icons/${project.platform.toLowerCase()}.svg`}
                              alt={project.platform}
                              referrerPolicy="no-referrer"
                              className="w-5 h-5"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/icons/git.svg'
                              }}
                            />
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.labels.map((l) => (
                          <span
                            key={l}
                            className="text-xs px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </a>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-gray-500 dark:text-gray-400">
                {query || activeLabel ? '没有匹配的项目' : '暂无项目展示'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
