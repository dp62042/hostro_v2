import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Forbidden',
  description: 'You do not have permission to view this page.',
}

export default function ForbiddenPage({
  searchParams,
}: {
  searchParams?: { msg?: string }
}) {
  const msg =
    searchParams?.msg ||
    'You do not have permission to access this page with your current role.'

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl rounded-2xl border bg-white p-8 text-center shadow-sm">
        <h1 className="text-4xl font-bold text-emerald-600">403</h1>
        <p className="mt-3 text-lg font-semibold text-gray-800">Forbidden</p>
        <p className="mt-2 text-gray-600">{msg}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700"
          >
            Go Home
          </Link>
          <Link
            href="/auth/login?msg=Please%20sign%20in%20with%20the%20right%20account"
            className="rounded-lg border px-5 py-2.5 text-emerald-700 hover:bg-emerald-50"
          >
            Sign in
          </Link>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Need access? Contact your administrator.
        </p>
      </div>
    </main>
  )
}
