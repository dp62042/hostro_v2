import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Auth', template: '%s | Hostro' },
  description: 'Sign in or create your Hostro account.',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[80vh] bg-white grid place-items-center py-10 text-gray-400">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 px-4">
        {/* Brand / blurb panel */}
        <div className="hidden lg:flex flex-col justify-center rounded-2xl border p-8 bg-gradient-to-br from-white to-emerald-50/60">
          <h2 className="text-2xl font-semibold">
            Welcome to <span className="text-emerald-600">Hostro</span>
          </h2>
          <p className="mt-2 text-gray-600">
            Verified PGs, instant booking, secure payments & dependable support.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-gray-700">
            <li>• Instant booking & digital agreements</li>
            <li>• Transparent rent & invoices</li>
            <li>• 24×7 support with ticketing</li>
          </ul>
        </div>

        {/* Forms render here */}
        <div className="rounded-2xl border p-6 md:p-8 bg-white">{children}</div>
      </div>
    </div>
  )
}
