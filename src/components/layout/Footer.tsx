import { Label } from '@headlessui/react'
import Link from 'next/link'
import { FaInstagram, FaLinkedin, FaYoutube, FaXTwitter } from 'react-icons/fa6'

const socials = [
  { name: 'Twitter/X', href: 'https://x.com/hostroventures', Icon: FaXTwitter },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/hostro.in?igsh=eHQ3cnU0emppMTE2',
    Icon: FaInstagram,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hostro-ventures-private-limited/',
    Icon: FaLinkedin,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@hostro.i?feature=shared',
    Icon: FaYoutube,
  },
]

const useful = [
  { label: 'Home', href: '/' },
  { label: 'Connect+', href: '/connect-plus' },
  { label: 'Vendors', href: '/vendors' },
  { label: 'Admin', href: '/auth/admin/register' },
  { label: 'Superadmin', href: '/auth/superadmin/register' },
  { label: 'Owner', href: '/owner' },
  { label: 'Student', href: '/student' },
]

const company = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Team', href: '/team' },
  { label: 'Faqs', href: '/faqs' },
]

const resources = [
  { label: 'Developers', href: '/developers' },
  { label: 'Sparks', href: '/sparks' },
  { label: 'Status', href: '/status' },
  { label: 'Support', href: '/support' },
]

export default function Footer() {
  return (
    <footer className="border-t  dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Top */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + socials */}
          <div>
            <div className="mb-3">
              <span className="text-2xl font-bold text-emerald-600">
                Hostro
              </span>
            </div>
            <p className="max-w-sm text-sm text-gray-600 dark:text-gray-300">
              Ventures Private Limited
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="rounded p-2 text-gray-600 transition hover:bg-gray-100 hover:text-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 dark:text-gray-300 dark:hover:bg-zinc-900"
                >
                  <Icon aria-hidden size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Useful + Company links */}
          <FooterCol title="Useful Links" items={useful} />
          <FooterCol title="Company" items={company} />

          {/* Resources + Newsletter */}
          <div>
            <FooterCol title="Resources" items={resources} />
            <form
              className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center"
              action="/api/subscribe"
              method="post"
              aria-label="Subscribe to newsletter"
            >
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full rounded-md border px-3 py-2 text-sm outline-none ring-green-500/50 placeholder:text-gray-400 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-900"
              />
              <button
                className="whitespace-nowrap rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:brightness-110 active:scale-95"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-gray-600 dark:border-zinc-800 dark:text-gray-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} Hostro Ventures Private Limited. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/legal/privacy"
              className="transition hover:text-green-500 hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="transition hover:text-green-500 hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/legal/cookies"
              className="transition hover:text-green-500 hover:underline"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ---------- Helper ---------- */
function FooterCol({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className="text-sm text-gray-600 transition hover:text-green-500 dark:text-gray-300"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
