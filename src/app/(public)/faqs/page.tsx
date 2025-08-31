'use client'

import { JSX, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaSearch,
  FaChevronDown,
  FaHome,
  FaUserShield,
  FaMoneyBillWave,
  FaTools,
  FaClipboardCheck,
} from 'react-icons/fa'
import {
  MdFoodBank,
  MdLocalLaundryService,
  MdSupportAgent,
} from 'react-icons/md'

type Category =
  | 'All'
  | 'Booking'
  | 'Payments'
  | 'Policies'
  | 'Move-in/Move-out'
  | 'Complaints'
  | 'Meals & Laundry'
  | 'Account/KYC'
  | 'For Owners'

type FaqItem = {
  id: string
  q: string
  a: string
  category: Exclude<Category, 'All'>
  tags?: string[]
}

const CATEGORIES: { key: Category; icon: JSX.Element }[] = [
  { key: 'All', icon: <FaSearch /> },
  { key: 'Booking', icon: <FaHome /> },
  { key: 'Payments', icon: <FaMoneyBillWave /> },
  { key: 'Policies', icon: <FaClipboardCheck /> },
  { key: 'Move-in/Move-out', icon: <FaTools /> },
  { key: 'Complaints', icon: <MdSupportAgent /> },
  { key: 'Meals & Laundry', icon: <MdFoodBank /> },
  { key: 'Account/KYC', icon: <FaUserShield /> },
  { key: 'For Owners', icon: <MdLocalLaundryService /> }, // icon reuse, fine
]

// --- Seed FAQs (adapt/extend anytime) ---
const FAQS: FaqItem[] = [
  {
    id: 'bk-1',
    q: 'How do I book a PG on Hostro?',
    a: 'Use Explore to filter by city, budget and amenities. Choose Instant Book or Request to Book. You’ll receive a confirmation and digital agreement steps on your dashboard.',
    category: 'Booking',
    tags: ['instant booking', 'request'],
  },
  {
    id: 'bk-2',
    q: 'Is there any booking fee?',
    a: 'Some properties require a small, refundable booking advance that is adjusted in your first month’s invoice. Details are shown before you confirm.',
    category: 'Booking',
  },
  {
    id: 'pay-1',
    q: 'What payment methods are supported?',
    a: 'UPI, Cards, NetBanking, and popular wallets via our secured payment gateway. You’ll get invoices and receipts instantly in your account.',
    category: 'Payments',
    tags: ['upi', 'razorpay', 'invoice'],
  },
  {
    id: 'pay-2',
    q: 'Are payments safe?',
    a: 'Yes. All payments are processed via PCI-DSS compliant gateways. Hostro never stores your card details.',
    category: 'Payments',
  },
  {
    id: 'pol-1',
    q: 'What is the cancellation & refund policy?',
    a: 'Refunds depend on the property’s policy and notice period. It’s shown clearly on the listing and during checkout.',
    category: 'Policies',
  },
  {
    id: 'mv-1',
    q: 'How do move-in and KYC work?',
    a: 'After booking, complete basic KYC (ID/address proof). On move-in day, the owner or caretaker verifies and hands over keys.',
    category: 'Move-in/Move-out',
  },
  {
    id: 'mv-2',
    q: 'How do I raise a move-out request?',
    a: 'From Dashboard → Move-out. Select your date; the system notifies the owner and generates your final invoice automatically.',
    category: 'Move-in/Move-out',
  },
  {
    id: 'cmp-1',
    q: 'How do I raise a complaint or service ticket?',
    a: 'Go to Support → New Ticket. Pick a category (maintenance, cleanliness, behaviour, billing), add details and photos. You’ll get updates on WhatsApp and email.',
    category: 'Complaints',
  },
  {
    id: 'meal-1',
    q: 'Do you provide tiffin or laundry services?',
    a: 'Many Hostro-partnered PGs offer meal plans and scheduled laundry. See Services → Tiffin/Laundry for plans, pause/resume and pricing.',
    category: 'Meals & Laundry',
  },
  {
    id: 'acc-1',
    q: 'I cannot log in / OTP not received.',
    a: 'Check number/email, wait 60s, and request again. If still stuck, use “Trouble signing in” to get manual assistance.',
    category: 'Account/KYC',
  },
  {
    id: 'own-1',
    q: 'I am a PG owner. How do I list my property?',
    a: 'Register as Owner, complete KYC, add property details, photos, pricing and rules. Our moderation team verifies and publishes it.',
    category: 'For Owners',
  },
  {
    id: 'own-2',
    q: 'What commission does Hostro charge?',
    a: 'Commission depends on city and services enabled (payments, support, marketing). You can see the exact rate in Owner → Settings → Commission.',
    category: 'For Owners',
  },
]

// --- Components ---
function CategoryPill({
  name,
  icon,
  active,
  onClick,
  count,
}: {
  name: Category
  icon: JSX.Element
  active: boolean
  onClick: () => void
  count: number
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition
      ${
        active
          ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
          : 'border-gray-200 hover:border-emerald-300'
      }`}
    >
      <span className="text-emerald-600">{icon}</span>
      {name}
      <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px]">
        {count}
      </span>
    </button>
  )
}

function Accordion({
  item,
  open,
  onToggle,
}: {
  item: FaqItem
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-2xl border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-4 text-left"
        aria-expanded={open}
      >
        <span className="font-medium">{item.q}</span>
        <FaChevronDown
          className={`transition-transform ${
            open ? 'rotate-180 text-emerald-600' : 'rotate-0 text-gray-500'
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-4 pb-4 text-gray-600">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('All')
  const [openId, setOpenId] = useState<string | null>(null)

  // counts per category
  const counts = useMemo(() => {
    const map = new Map<Category, number>()
    CATEGORIES.forEach((c) => map.set(c.key, 0))
    FAQS.forEach((f) =>
      map.set(
        f.category as Category,
        (map.get(f.category as Category) || 0) + 1
      )
    )
    map.set('All', FAQS.length)
    return map
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FAQS.filter((f) => {
      const inCat = category === 'All' ? true : f.category === category
      const inText =
        !q ||
        f.q.toLowerCase().includes(q) ||
        f.a.toLowerCase().includes(q) ||
        (f.tags ?? []).some((t) => t.toLowerCase().includes(q))
      return inCat && inText
    })
  }, [query, category])

  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-emerald-500/12 blur-3xl"
        />
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold tracking-wide text-emerald-600 uppercase">
              Help Center
            </p>
            <h1 className="mt-2 text-3xl md:text-5xl font-bold">FAQs</h1>
            <p className="mt-3 text-gray-600">
              Everything you need to know about booking, payments, policies, and
              more.
            </p>

            {/* Search */}
            <div className="mt-6 relative max-w-xl mx-auto">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search keywords (e.g., refund, KYC, laundry)…"
                className="w-full rounded-xl border pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <CategoryPill
                key={c.key}
                name={c.key}
                icon={c.icon}
                active={category === c.key}
                onClick={() => setCategory(c.key)}
                count={counts.get(c.key) ?? 0}
              />
            ))}
            {query && (
              <button
                onClick={() => setQuery('')}
                className="ml-auto rounded-full border px-3 py-2 text-sm hover:border-emerald-300"
              >
                Clear search
              </button>
            )}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {filtered.length} result(s)
          </div>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border p-6 text-center text-gray-600">
              No answers yet for your query. Try a different keyword or contact
              support below.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((f) => (
                <Accordion
                  key={f.id}
                  item={f}
                  open={openId === f.id}
                  onToggle={() => setOpenId(openId === f.id ? null : f.id)}
                />
              ))}
            </div>
          )}

          {/* Support CTA */}
          <div className="mt-8 rounded-3xl border p-6 bg-gradient-to-br from-white to-emerald-50/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MdSupportAgent className="text-emerald-600 text-2xl" />
              <div>
                <h3 className="text-lg font-semibold">Still need help?</h3>
                <p className="text-gray-600">
                  Chat with support or raise a ticket. We usually reply within
                  minutes.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="/support"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
              >
                Open Support
              </a>
              <a
                href="/contact"
                className="px-5 py-2.5 rounded-xl border border-gray-200 hover:border-emerald-600 hover:text-emerald-700 transition font-medium"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
