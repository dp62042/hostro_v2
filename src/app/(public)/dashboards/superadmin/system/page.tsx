'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/fetcher'

export default function SystemPage() {
  const [sys, setSys] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      setSys(await api('/api/superadmin/system', {}, { throwOnError: false }))
    })()
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">System Health</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">DB</div>
          <div className="mt-1 text-xl font-semibold">
            {sys?.db?.status ?? '—'}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Queue</div>
          <div className="mt-1 text-xl font-semibold">
            {sys?.queue?.status ?? '—'}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Storage</div>
          <div className="mt-1 text-xl font-semibold">
            {sys?.storage?.status ?? '—'}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 shadow">
        <div className="mb-2 text-lg font-semibold">Details (JSON)</div>
        <pre className="text-sm text-gray-800 overflow-auto">
          {JSON.stringify(
            sys || { note: 'Wire /api/superadmin/system' },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  )
}
