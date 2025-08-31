'use client'

import { ReactNode, useEffect, useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'
import { api } from '@/lib/fetcher'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

  // Optional client-side guard (middleware already protects route)
  useEffect(() => {
    ;(async () => {
      try {
        const me = await api<{ user: any }>(
          '/api/auth/me',
          {},
          { throwOnError: false }
        )
        if (!me?.user || !['admin', 'superadmin'].includes(me.user.role)) {
          router.replace('/auth/login?next=/dashboards/admin')
          return
        }
      } finally {
        setLoaded(true)
      }
    })()
  }, [router])

  if (!loaded) return <div className="p-6">Loading…</div>

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar open={open} setOpen={setOpen} />
      <div className="flex flex-1 flex-col">
        <AdminTopbar onMenu={() => setOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
