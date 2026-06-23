'use client'

import { useEffect, useState } from 'react'
import { StatsCard } from '@/components/admin'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ articles: 0, projects: 0, friends: 0 })

  useEffect(() => {
    async function loadStats() {
      try {
        const [articlesRes, projectsRes, friendsRes] = await Promise.all([
          fetch('/api/articles').then(r => r.json()),
          fetch('/api/projects').then(r => r.json()),
          fetch('/api/friends').then(r => r.json()),
        ])
        setStats({
          articles: Array.isArray(articlesRes) ? articlesRes.length : 0,
          projects: Array.isArray(projectsRes) ? projectsRes.length : 0,
          friends: Array.isArray(friendsRes) ? friendsRes.length : 0,
        })
      } catch {
        // API not available (static export)
      }
    }
    loadStats()
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">📊 仪表盘</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">站点概览</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="文章总数" value={stats.articles} icon="📝" color="blue" />
        <StatsCard title="项目总数" value={stats.projects} icon="🚀" color="purple" />
        <StatsCard title="友链总数" value={stats.friends} icon="🔗" color="green" />
      </div>
    </div>
  )
}
