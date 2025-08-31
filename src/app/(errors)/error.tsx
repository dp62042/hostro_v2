'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
      <p className="mt-4 text-gray-600">
        Don’t worry, our team has been notified. You can try again.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
      >
        Try Again
      </button>
    </main>
  )
}
