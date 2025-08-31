import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: {
    default: 'Legal',
    template: '%s | Hostro',
  },
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const links = [
    { href: '/legal/privacy', label: 'Privacy Policy' },
    { href: '/legal/terms', label: 'Terms & Conditions' },
    { href: '/legal/cookies', label: 'Cookie Policy' },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-400">
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">Legal</h1>
          <p className="mt-1 text-sm text-gray-600">
            Hostro Ventures Pvt Ltd — official policies
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-[220px_1fr]">
        <nav className="md:sticky md:top-6">
          <ul className="space-y-1 rounded-2xl border p-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border bg-gray-50 p-3 text-xs text-gray-600">
            <p className="font-semibold">Need help?</p>
            <p>
              Email{' '}
              <a className="underline" href="mailto:legal@hostro.in">
                legal@hostro.in
              </a>
            </p>
          </div>
        </nav>

        <main className="prose prose-gray max-w-none prose-headings:scroll-mt-24">
          {children}
        </main>
      </div>
    </div>
  )
}
