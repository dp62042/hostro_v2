import type { Metadata } from 'next'
import SupportClient from './SupportClient'

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Get help from the Hostro team — raise tickets and track progress.',
}

export default function SupportPage() {
  return <SupportClient />
}
