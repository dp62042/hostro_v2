import type { Metadata } from 'next'
import TeamClient from './TeamClient'

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the people building Hostro.',
}

export default function TeamPage() {
  return <TeamClient />
}
