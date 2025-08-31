'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaMagnifyingGlass,
  FaLocationDot,
  FaCalendarCheck,
  FaFileSignature,
  FaKey,
  FaMoneyBillWave,
  FaShirt,
  FaUtensils,
  FaHeadset,
  FaCircleCheck,
  FaArrowRightLong,
} from 'react-icons/fa6'

const fade = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  viewport: { once: true, margin: '-80px' },
}
const card = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
  viewport: { once: true, margin: '-80px' },
}

const OVERVIEW = [
  {
    icon: <FaMagnifyingGlass className="text-emerald-600" />,
    title: 'Discover',
    text: 'Verified PGs with photos, amenities, and map view.',
  },
  {
    icon: <FaCalendarCheck className="text-emerald-600" />,
    title: 'Book',
    text: 'Choose a room, pick a move-in date, and reserve instantly.',
  },
  {
    icon: <FaMoneyBillWave className="text-emerald-600" />,
    title: 'Manage',
    text: 'Pay rent, track invoices, request support — all in one place.',
  },
]

const STEPS = [
  {
    step: '01',
    title: 'Browse verified listings',
    icon: <FaLocationDot className="text-emerald-600" />,
    bullets: [
      'Filters for budget, food, AC/Non-AC, sharing type',
      'Map & neighborhood view',
      'Owner & property verification badges',
    ],
    link: { href: '/listings', label: 'Explore listings' },
  },
  {
    step: '02',
    title: 'Instant booking & digital docs',
    icon: <FaFileSignature className="text-emerald-600" />,
    bullets: [
      'Pick a room & move-in date',
      'e-KYC & digital agreement',
      'Secure payment for deposit/first month',
    ],
    link: { href: '/auth/register', label: 'Create account' },
  },
  {
    step: '03',
    title: 'Move in & get settled',
    icon: <FaKey className="text-emerald-600" />,
    bullets: [
      'Owner handover checklist',
      'Upload inventory photos',
      'Access Wi-Fi and house rules',
    ],
    link: { href: '/support', label: 'Need help?' },
  },
  {
    step: '04',
    title: 'Monthly rent & services',
    icon: <FaMoneyBillWave className="text-emerald-600" />,
    bullets: [
      'Auto-reminders & receipts',
      'Pause/resume meals during travel',
      'Add laundry or house-help plans',
    ],
    link: { href: '/developers', label: 'How payments work' },
  },
]

const SERVICES = [
  {
    icon: <FaShirt className="text-emerald-600" />,
    title: 'Laundry',
    text: 'Per-kg and subscription plans with doorstep pickup.',
  },
  {
    icon: <FaUtensils className="text-emerald-600" />,
    title: 'Tiffin / Mess',
    text: 'Veg & non-veg weekly menus delivered fresh.',
  },
  {
    icon: <FaHeadset className="text-emerald-600" />,
    title: 'Support',
    text: '24×7 ticketing with SLAs and escalation matrix.',
  },
]

const FAQ = [
  {
    q: 'Do I pay on the app or to the owner?',
    a: 'Pay securely on Hostro via UPI/cards/netbanking. We record invoices and payouts to owners transparently.',
  },
  {
    q: 'Can I cancel after reserving?',
    a: 'Yes — cancellation/refund depends on the property policy shown at checkout. Receipts reflect refunds automatically.',
  },
  {
    q: 'How are properties verified?',
    a: 'We collect KYC and conduct manual checks for ownership, basic safety, and amenity claims before verification badges show.',
  },
]

export default function HowItWorksClient() {
  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-emerald-500/12 blur-3xl"
        />
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-6 text-center max-w-3xl">
          <motion.h1 {...fade} className="text-3xl md:text-5xl font-bold">
            How <span className="text-emerald-600">Hostro</span> works
          </motion.h1>
          <motion.p {...fade} className="mt-3 text-gray-600 md:text-lg">
            From discovery to move-in and monthly life — everything streamlined
            for PG & co-living.
          </motion.p>
          <motion.div
            {...fade}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <Link
              href="/listings"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
            >
              Find a place
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl border hover:border-emerald-600 hover:text-emerald-700 transition font-medium"
            >
              Talk to us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid sm:grid-cols-3 gap-6"
            initial="initial"
            whileInView="whileInView"
            viewport={fade.viewport}
          >
            {OVERVIEW.map((o, i) => (
              <motion.div
                key={i}
                {...card}
                className="rounded-2xl border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                    {o.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{o.title}</h3>
                </div>
                <p className="mt-2 text-gray-600">{o.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <motion.h2 {...fade} className="text-2xl md:text-3xl font-semibold">
            Step-by-step
          </motion.h2>
          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                {...card}
                className="relative rounded-2xl border p-6"
              >
                <div className="absolute -top-3 -left-3 rounded-xl bg-white border px-3 py-1 text-xs font-semibold">
                  {s.step}
                </div>
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700 shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <FaCircleCheck className="mt-1 text-emerald-600" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {s.link && (
                      <Link
                        href={s.link.href}
                        className="mt-3 inline-flex items-center gap-2 text-emerald-700 font-medium hover:underline"
                      >
                        {s.link.label} <FaArrowRightLong />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES ADD-ONS */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <motion.h2 {...fade} className="text-2xl md:text-3xl font-semibold">
            Add-on services
          </motion.h2>
          <motion.div
            className="mt-6 grid sm:grid-cols-3 gap-6"
            initial="initial"
            whileInView="whileInView"
            viewport={fade.viewport}
          >
            {SERVICES.map((s, i) => (
              <motion.div key={i} {...card} className="rounded-2xl border p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                </div>
                <p className="mt-2 text-gray-600">{s.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MINI TIMELINE */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <motion.h2 {...fade} className="text-2xl md:text-3xl font-semibold">
            Your first week
          </motion.h2>
          <motion.ol {...fade} className="mt-4 space-y-3 text-sm text-gray-700">
            <li>Day 0: Reserve room & complete e-KYC</li>
            <li>Day 1: Move-in checklist & Wi-Fi setup</li>
            <li>Day 2–3: Upload room photos & inventory</li>
            <li>Day 4: Pick meal/laundry plans</li>
            <li>Day 7: First rent reminder — enable auto-pay (optional)</li>
          </motion.ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <motion.h2 {...fade} className="text-2xl md:text-3xl font-semibold">
            FAQs
          </motion.h2>
          <div className="mt-4 grid gap-4">
            {FAQ.map((f, i) => (
              <motion.details
                key={i}
                {...card}
                className="rounded-2xl border p-4"
              >
                <summary className="cursor-pointer list-none font-medium">
                  {f.q}
                </summary>
                <p className="mt-2 text-gray-700 text-sm">{f.a}</p>
              </motion.details>
            ))}
          </div>
          <div className="mt-6 text-sm text-gray-700">
            More questions? Visit{' '}
            <Link href="/faqs" className="text-emerald-700 hover:underline">
              FAQ
            </Link>{' '}
            or{' '}
            <Link href="/support" className="text-emerald-700 hover:underline">
              Support
            </Link>
            .
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <motion.div
            {...card}
            className="rounded-3xl border p-6 md:p-8 bg-gradient-to-br from-white to-emerald-50/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">
                Ready to start?
              </h3>
              <p className="mt-1 text-gray-600">
                Create your account and book your room in minutes.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/auth/register"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
              >
                Create account
              </Link>
              <Link
                href="/blog"
                className="px-5 py-2.5 rounded-xl border hover:border-emerald-600 hover:text-emerald-700 transition font-medium"
              >
                Learn more
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
