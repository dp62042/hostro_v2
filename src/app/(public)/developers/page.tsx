import type { Metadata } from 'next'
import ApiDocsClient from './ApiDocsClient'

export const metadata: Metadata = {
  title: 'Hostro API & Docs',
  description:
    'One-page API reference and live examples for Hostro route handlers.',
}

export default function DevelopersPage() {
  return <ApiDocsClient />
}
