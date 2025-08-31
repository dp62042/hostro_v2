import type { Metadata } from 'next'
import { FaSearch, FaShieldAlt, FaRupeeSign, FaHeadset } from 'react-icons/fa'
import { IoFlashOutline } from 'react-icons/io5'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Hostro — PG & Co-living made simple.',
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <div className="group rounded-2xl border p-6 hover:shadow-md transition-shadow">
      <div className="mb-3 text-emerald-600">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-gray-600">{text}</p>
      <span className="mt-4 block h-[2px] w-0 bg-emerald-600 transition-all duration-300 group-hover:w-16" />
    </div>
  )
}

export default function PublicHome() {
  return (
    <main className="relative overflow-hidden">
      {/* Soft hero glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-emerald-500/15 blur-3xl"
      />

      {/* HERO */}
      <section className="relative">
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-10">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold tracking-wide text-emerald-600 uppercase">
              Welcome to Hostro
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
              Find your perfect <span className="text-emerald-600">PG</span> in
              minutes
            </h1>
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              Verified listings, instant booking, digital agreements, and
              transparent payments — all on one platform designed for students
              and young professionals.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/explore"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
              >
                Explore PGs
              </a>
              <a
                href="/register?role=owner"
                className="px-5 py-2.5 rounded-xl border border-gray-200 hover:border-emerald-600 hover:text-emerald-700 transition font-medium"
              >
                List your PG
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature
              icon={<FaSearch className="text-2xl" />}
              title="Smart Search"
              text="Filter by location, price, amenities, and more to discover the best options fast."
            />
            <Feature
              icon={<IoFlashOutline className="text-2xl" />}
              title="Instant Booking"
              text="Reserve rooms instantly or send a request — get confirmations without delays."
            />
            <Feature
              icon={<FaShieldAlt className="text-2xl" />}
              title="Verified & Secure"
              text="KYC-verified owners, secure payments, and digital agreements keep you safe."
            />
            <Feature
              icon={<FaRupeeSign className="text-2xl" />}
              title="Transparent Pricing"
              text="No surprises. Clear rents, deposits, and add-ons with downloadable invoices."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / STEPS */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold">How it works</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Discover',
                text: 'Browse verified PGs, compare photos, amenities, and reviews.',
              },
              {
                step: '02',
                title: 'Book',
                text: 'Instantly book or request to book; sign digitally if required.',
              },
              {
                step: '03',
                title: 'Move in',
                text: 'Pay rent online, raise tickets, and manage everything in one place.',
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-sm font-semibold text-emerald-700">
                  {s.step}
                </div>
                <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-gray-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT STRIP */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border p-6 bg-gradient-to-br from-white to-emerald-50/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FaHeadset className="text-emerald-600 text-2xl" />
              <div>
                <h3 className="text-lg font-semibold">24×7 Support</h3>
                <p className="text-gray-600">
                  Need help? We’re one message away.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="/contact"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
              >
                Contact us
              </a>
              <a
                href="/faq"
                className="px-5 py-2.5 rounded-xl border border-gray-200 hover:border-emerald-600 hover:text-emerald-700 transition font-medium"
              >
                FAQs
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
