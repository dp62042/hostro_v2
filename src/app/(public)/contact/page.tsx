import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Hostro team.',
}

export default function ContactPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-emerald-500/12 blur-3xl"
        />
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-6 text-center max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold">Contact us</h1>
          <p className="mt-4 text-gray-600">
            Questions, partnerships, or support — we’d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8">
          {/* Info */}
          <div className="rounded-2xl border p-6 bg-gradient-to-br from-white to-emerald-50/50">
            <h2 className="text-xl font-semibold">How can we help?</h2>
            <p className="mt-2 text-gray-600">
              Reach out for product questions, media, partnerships, or report a
              problem.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <div>
                <span className="font-medium">Support:</span> support@hostro.in
              </div>
              <div>
                <span className="font-medium">Partners:</span>{' '}
                partners@hostro.in
              </div>
              <div>
                <span className="font-medium">Phone:</span> +91 98765 43210
              </div>
              <div className="text-gray-500 mt-4">
                Prefer chat? Visit{' '}
                <a href="/support" className="text-emerald-700 hover:underline">
                  Support
                </a>
                .
              </div>
            </div>

            <div className="mt-6 rounded-2xl border p-4">
              <div className="text-sm font-medium">Office</div>
              <div className="text-gray-600 text-sm">
                Jaipur, Rajasthan (remote-friendly team)
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Send a message</h2>
            <ContactClient />
          </div>
        </div>
      </section>
    </main>
  )
}
