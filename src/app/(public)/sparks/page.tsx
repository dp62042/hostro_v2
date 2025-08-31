import type { Metadata } from 'next'
import SparksClient from './SparksClient'

export const metadata: Metadata = {
  title: 'Hostro Sparks',
  description: 'Hackathons & ideathons by Hostro — build for PG & co-living.',
}

export default function SparksPage() {
  return <SparksClient />
}
