import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <h1 className="text-7xl font-bold text-emerald-600">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
      >
        Go Back Home
      </Link>
    </main>
  )
}
