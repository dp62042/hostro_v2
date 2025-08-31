import type { Metadata } from 'next'
import RegisterClient from './RegisterClient'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create your Hostro account.',
}

export default function RegisterPage() {
  return <RegisterClient />
}
