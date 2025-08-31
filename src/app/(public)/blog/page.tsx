import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Hostro updates, guides, and product announcements.',
}

type Post = {
  slug: string
  title: string
  summary: string
  date: string // ISO
  read: string
  tags: string[]
}

const POSTS: Post[] = [
  {
    slug: 'introducing-hostro-connect-plus',
    title: 'Introducing Hostro Connect+ for Colleges',
    summary:
      'Partnering with colleges to streamline verified PG discovery and onboarding.',
    date: '2025-06-15',
    read: '4 min',
    tags: ['Announcements', 'Partners'],
  },
  {
    slug: 'payments-made-simple',
    title: 'Payments made simple: rent, deposits & invoices',
    summary:
      'A quick guide to transparent pricing and secure online payments on Hostro.',
    date: '2025-05-02',
    read: '6 min',
    tags: ['Guides', 'Payments'],
  },
  {
    slug: 'pg-life-checklist',
    title: 'Your PG life checklist before move-in',
    summary:
      'From KYC to laundry plans — here’s everything to check off before you move.',
    date: '2025-03-20',
    read: '5 min',
    tags: ['Guides', 'Students'],
  },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

export default function BlogPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-emerald-500/12 blur-3xl"
        />
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-8 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold">Hostro Blog</h1>
          <p className="mt-4 text-gray-600 md:text-lg">
            Product updates, tips, and stories from the world of PG & co-living.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p) => (
              <article
                key={p.slug}
                className="group rounded-2xl border p-6 bg-white hover:shadow-md transition-shadow"
              >
                <div className="text-sm text-gray-500 flex items-center gap-3">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span>•</span>
                  <span>{p.read}</span>
                </div>
                <h2 className="mt-2 text-lg font-semibold">{p.title}</h2>
                <p className="mt-2 text-gray-600">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-2 py-0.5 text-[11px] text-gray-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${p.slug}`}
                  className="mt-5 inline-block text-emerald-700 font-medium hover:underline"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
