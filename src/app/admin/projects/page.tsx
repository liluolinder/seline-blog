'use client'

import { useEffect, useState } from 'react'
import { Project } from '@/types'
import { Card, Button, Input, Modal } from '@/components/ui'

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [form, setForm] = useState<Project>({ name: '', description: '', url: '', github: '', tech: [] })
  const [techStr, setTechStr] = useState('')

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => {})
  }, [])

  const handleSave = async () => {
    const projectData = { ...form, tech: techStr.split(',').map((t) => t.trim()).filter(Boolean) }
    let newProjects: Project[]
    if (editingIndex !== null) {
      newProjects = projects.map((p, i) => (i === editingIndex ? projectData : p))
    } else {
      newProjects = [...projects, projectData]
    }

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProjects),
      })
      if (res.ok) {
        setProjects(newProjects)
        setShowModal(false)
        setForm({ name: '', description: '', url: '', github: '', tech: [] })
        setTechStr('')
        setEditingIndex(null)
      }
    } catch {
      alert('保存失败')
    }
  }

  const handleDelete = (index: number) => {
    if (!confirm('确定删除这个项目吗？')) return
    const newProjects = projects.filter((_, i) => i !== index)
    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProjects),
    }).then(() => setProjects(newProjects))
  }

  const openEdit = (index: number) => {
    setEditingIndex(index)
    setForm(projects[index])
    setTechStr(projects[index].tech.join(', '))
    setShowModal(true)
  }

  const openNew = () => {
    setEditingIndex(null)
    setForm({ name: '', description: '', url: '', github: '', tech: [] })
    setTechStr('')
    setShowModal(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">🚀 项目管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">共 {projects.length} 个项目</p>
        </div>
        <Button onClick={openNew}>➕ 添加项目</Button>
      </div>

      {projects.length > 0 ? (
        <div className="space-y-3">
          {projects.map((project, i) => (
            <Card key={i} hover={false} className="flex items-center justify-between !p-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">{project.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button variant="secondary" size="sm" onClick={() => openEdit(i)}>编辑</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(i)}>🗑️</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card hover={false} className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🚀</p>
          <p>暂无项目</p>
        </Card>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingIndex !== null ? '编辑项目' : '添加项目'}
      >
        <div className="space-y-4">
          <Input label="项目名称" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Input label="描述" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
          <Input label="项目链接" value={form.url} onChange={(v) => setForm({ ...form, url: v })} placeholder="https://" />
          <Input label="GitHub 链接" value={form.github || ''} onChange={(v) => setForm({ ...form, github: v })} placeholder="https://github.com/..." />
          <Input label="技术栈 (逗号分隔)" value={techStr} onChange={setTechStr} placeholder="Next.js, TypeScript, Tailwind" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowModal(false)}>取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
