import type { Metadata } from 'next'
import HowItWorksClient from './HowItWorksClient'

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'See how Hostro helps you discover, book, move in, and manage PG life with ease.',
}

export default function HowItWorksPage() {
  return <HowItWorksClient />
}
