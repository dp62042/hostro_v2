'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SuperAdminSidebar from '@/components/superadmin/SuperAdminSidebar'
import SuperAdminTopbar from '@/components/superadmin/SuperAdminTopbar'
import { api } from '@/lib/fetcher'

export default function SuperAdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

  // client guard in addition to middleware
  useEffect(() => {
    ;(async () => {
      try {
        const me = await api<{ user: any }>(
          '/api/auth/me',
          {},
          { throwOnError: false }
        )
        if (!me?.user || me.user.role !== 'superadmin') {
          router.replace('/auth/login?next=/dashboards/superadmin')
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
      <SuperAdminSidebar open={open} setOpen={setOpen} />
      <div className="flex flex-1 flex-col">
        <SuperAdminTopbar onMenu={() => setOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
