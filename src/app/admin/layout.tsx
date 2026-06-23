'use client'

import { AdminSidebar } from '@/components/layout'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-8 pt-20 md:pt-8 overflow-auto">
        {children}
      </div>
    </div>
  )
}
