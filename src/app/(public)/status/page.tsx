import type { Metadata } from 'next'
import StatusClient from './StatusClient'

export const metadata: Metadata = {
  title: 'Status',
  description: 'Live status of Hostro systems.',
}

export default function StatusPage() {
  return <StatusClient />
}
