import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: { default: 'Dashboard', template: '%s | Hostro' },
  description: 'Private dashboard area.',
}

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This wraps ALL routes that live under (dashboard) — e.g. /admin, /owner, /student, etc.
  // Keep it light so nested layouts (like /admin/layout) can do the heavy chrome.
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Suspense
        fallback={
          <div className="p-6 text-sm text-gray-500">Loading dashboard…</div>
        }
      >
        {children}
      </Suspense>
    </div>
  )
}
