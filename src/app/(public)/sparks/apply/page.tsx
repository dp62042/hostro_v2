import type { Metadata } from 'next'
import SparksApplyClient from './SparksApplyClient'

export const metadata: Metadata = {
  title: 'Apply to Hostro Sparks',
  description: 'Submit your application for Hostro Sparks hackathon/ideathon.',
}

export default function SparksApplyPage() {
  return (
    <main className="bg-white text-gray-800">
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-emerald-500/12 blur-3xl"
        />
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-6 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold">
            Apply to <span className="text-emerald-600">Sparks</span>
          </h1>
          <p className="mt-4 text-gray-600 md:text-lg">
            Tell us about your team and idea. We review apps on a rolling basis.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <SparksApplyClient />
        </div>
      </section>
    </main>
  )
}
