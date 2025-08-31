import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const POSTS = {
  'introducing-hostro-connect-plus': {
    title: 'Introducing Hostro Connect+ for Colleges',
    date: '2025-06-15',
    body: `
Hostro Connect+ brings verified PG discovery right into college workflows.

### Why it matters
- Fewer scams, faster onboarding
- Centralised support for students and admins

### What’s next
We’re piloting in select campuses this semester.
    `,
  },
  'payments-made-simple': {
    title: 'Payments made simple: rent, deposits & invoices',
    date: '2025-05-02',
    body: `
Pay securely with UPI, cards, and netbanking. Download invoices anytime.

### Tips
- Set up auto-reminders
- Track deposits and add-on services
    `,
  },
  'pg-life-checklist': {
    title: 'Your PG life checklist before move-in',
    date: '2025-03-20',
    body: `
From KYC to laundry—here’s a simple checklist to make your first week smooth.

- KYC docs ready
- Room photos and inventory
- Meal/laundry plan chosen
    `,
  },
} as const

type Slug = keyof typeof POSTS

export async function generateMetadata({
  params,
}: {
  params: { slug: Slug }
}): Promise<Metadata> {
  const post = POSTS[params.slug]
  if (!post) return {}
  return {
    title: post.title,
    description: post.body.trim().split('\n').slice(0, 2).join(' '),
  }
}

export default function BlogPostPage({ params }: { params: { slug: Slug } }) {
  const post = POSTS[params.slug]
  if (!post) return notFound()

  const date = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })

  return (
    <main className="bg-white text-gray-800">
      <section className="container mx-auto px-4 pt-16 md:pt-24 pb-8 max-w-3xl">
        <Link href="/blog" className="text-emerald-700 hover:underline">
          &larr; Back to blog
        </Link>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold">{post.title}</h1>
        <div className="mt-2 text-sm text-gray-500">{date}</div>
        <article className="prose prose-emerald max-w-none mt-6">
          {post.body.split('\n').map((line, i) => (
            <p key={i}>{line || <br />}</p>
          ))}
        </article>
      </section>
    </main>
  )
}
