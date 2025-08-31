import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-[70dvh] place-items-center px-4">
      <div className="text-center">
        <p className="mb-2 text-sm font-medium text-emerald-600">
          404 — Not Found
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">
          This page doesn’t exist
        </h1>
        <p className="mt-2 text-gray-600">
          The link might be broken or the page may have been moved.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.01] active:scale-95"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-semibold transition-colors hover:border-emerald-300 hover:bg-emerald-50"
          >
            Contact Support
          </Link>
        </div>

        {/* subtle animation */}
        <div className="mt-10 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-gray-600 shadow-sm ring-1 ring-black/5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600" />
          Let’s get you back on track
        </div>
      </div>
    </main>
  )
}
