'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/fetcher'
import DataTable from '@/components/common/DataTable'

export default function StudentOverview() {
  const [me, setMe] = useState<any>(null)
  const [current, setCurrent] = useState<any>(null)
  const [recentComplaints, setRecentComplaints] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const m = await api<{ user: any }>('/api/auth/me')
        setMe(m.user)
        const b = await api<{ data: any[] }>(
          '/api/bookings?mine=true&status=active',
          {},
          { throwOnError: false }
        )
        setCurrent(b?.data?.[0] || null)
        const c = await api<{ data: any[] }>(
          '/api/complaints?mine=true&limit=5',
          {},
          { throwOnError: false }
        )
        setRecentComplaints(c?.data || [])
      } catch (e) {
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Current PG</div>
          <div className="mt-1 text-lg font-semibold">
            {current?.pg?.name || 'No active booking'}
          </div>
          <div className="text-sm text-gray-600">
            {current?.room?.label ? `Room: ${current.room.label}` : ''}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Next Rent Due</div>
          <div className="mt-1 text-lg font-semibold">
            {current?.nextRentDue
              ? new Date(current.nextRentDue).toDateString()
              : '—'}
          </div>
          <div className="text-sm text-emerald-700">
            {current?.dueAmount ? `₹ ${current.dueAmount}` : ''}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Open Complaints</div>
          <div className="mt-1 text-lg font-semibold">
            {recentComplaints.filter((x) => x.status !== 'resolved').length}
          </div>
          <div className="text-sm text-gray-600">Last 5 shown below</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="mb-2 font-semibold">Quick Actions</div>
          <div className="flex flex-wrap gap-2">
            <a
              className="rounded-lg border px-3 py-2 hover:bg-gray-50"
              href="/dashboards/student/payments"
            >
              Pay Rent
            </a>
            <a
              className="rounded-lg border px-3 py-2 hover:bg-gray-50"
              href="/dashboards/student/complaints"
            >
              Raise Complaint
            </a>
            <a
              className="rounded-lg border px-3 py-2 hover:bg-gray-50"
              href="/dashboards/student/agreements"
            >
              View Agreement
            </a>
            <a
              className="rounded-lg border px-3 py-2 hover:bg-gray-50"
              href="/dashboards/student/search"
            >
              Find PG
            </a>
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <div className="mb-3 font-semibold">Recent Complaints</div>
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'category', label: 'Category' },
              { key: 'status', label: 'Status' },
              { key: 'createdAt', label: 'Created' },
            ]}
            rows={recentComplaints.map((c: any) => ({
              id: c.ticketNo || c._id,
              category: c.category,
              status: (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    c.status === 'resolved'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {c.status}
                </span>
              ),
              createdAt: new Date(c.createdAt).toLocaleString(),
            }))}
            empty="No complaints"
          />
        </div>
      </div>
    </div>
  )
}
