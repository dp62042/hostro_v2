'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import OwnerSidebar from '@/components/owner/OwnerSidebar'
import OwnerTopbar from '@/components/owner/OwnerTopbar'
import { api } from '@/lib/fetcher'

export default function OwnerLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      try {
        const me = await api<{ user?: { role?: string } }>(
          '/api/auth/me',
          {},
          { throwOnError: false }
        )
        if (!me?.user || me.user.role !== 'owner') {
          router.replace('/auth/login?next=/dashboards/owner')
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
      <OwnerSidebar open={open} setOpen={setOpen} />
      <div className="flex flex-1 flex-col">
        <OwnerTopbar onMenu={() => setOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
