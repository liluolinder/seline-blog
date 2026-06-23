'use client'

import { useEffect, useState } from 'react'
import { Friend } from '@/types'
import { Card, Button, Input, Modal } from '@/components/ui'

export default function AdminFriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [form, setForm] = useState<Friend>({ name: '', url: '', avatar: '', description: '' })

  useEffect(() => {
    fetch('/api/friends')
      .then((r) => r.json())
      .then(setFriends)
      .catch(() => {})
  }, [])

  const handleSave = async () => {
    let newFriends: Friend[]
    if (editingIndex !== null) {
      newFriends = friends.map((f, i) => (i === editingIndex ? form : f))
    } else {
      newFriends = [...friends, form]
    }

    try {
      const res = await fetch('/api/friends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFriends),
      })
      if (res.ok) {
        setFriends(newFriends)
        setShowModal(false)
        setForm({ name: '', url: '', avatar: '', description: '' })
        setEditingIndex(null)
      }
    } catch {
      alert('保存失败')
    }
  }

  const handleDelete = (index: number) => {
    if (!confirm('确定删除这个友链吗？')) return
    const newFriends = friends.filter((_, i) => i !== index)
    fetch('/api/friends', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFriends),
    }).then(() => setFriends(newFriends))
  }

  const openEdit = (index: number) => {
    setEditingIndex(index)
    setForm(friends[index])
    setShowModal(true)
  }

  const openNew = () => {
    setEditingIndex(null)
    setForm({ name: '', url: '', avatar: '', description: '' })
    setShowModal(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">🔗 友链管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">共 {friends.length} 个友链</p>
        </div>
        <Button onClick={openNew}>➕ 添加友链</Button>
      </div>

      {friends.length > 0 ? (
        <div className="space-y-3">
          {friends.map((friend, i) => (
            <Card key={i} hover={false} className="flex items-center justify-between !p-4">
              <div className="flex items-center gap-4">
                <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-xl bg-blue-50" />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">{friend.name}</h3>
                  <p className="text-xs text-gray-400">{friend.description}</p>
                  <p className="text-xs text-blue-500">{friend.url}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => openEdit(i)}>编辑</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(i)}>🗑️</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card hover={false} className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🔗</p>
          <p>暂无友链</p>
        </Card>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingIndex !== null ? '编辑友链' : '添加友链'}
      >
        <div className="space-y-4">
          <Input label="站点名称" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Input label="站点链接" value={form.url} onChange={(v) => setForm({ ...form, url: v })} required placeholder="https://" />
          <Input label="头像链接" value={form.avatar} onChange={(v) => setForm({ ...form, avatar: v })} placeholder="https://api.dicebear.com/..." />
          <Input label="描述" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowModal(false)}>取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
