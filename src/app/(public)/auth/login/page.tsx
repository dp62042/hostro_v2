import type { Metadata } from 'next'
import LoginClient from './LoginCLient'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your Hostro account.',
}

export default function LoginPage() {
  return <LoginClient />
}
