import type { Metadata as CookiesMetadata } from 'next'

export const metadata: CookiesMetadata = {
  title: 'Cookie Policy',
  description:
    'Details on how Hostro uses cookies and similar technologies, plus how you can manage preferences.',
}

export default function CookiePolicyPage() {
  const EFFECTIVE_DATE = '11 August 2025'
  return (
    <article>
      <h1 className="text-3xl font-bold text-emerald-600">Cookie Policy</h1>
      <p className="mt-2 text-sm text-gray-600">Effective: {EFFECTIVE_DATE}</p>

      <p>
        Cookies are small text files placed on your device to store information.
        We use cookies and similar technologies (local storage, pixels) to run
        our Platform, remember preferences, and improve performance and
        marketing. This Policy explains what we collect and how you can control
        it.
      </p>

      <h2 id="types">1. Types of Cookies We Use</h2>
      <ul>
        <li>
          <strong>Strictly Necessary</strong>: required for login, security,
          load balancing, and page navigation (cannot be switched off).
        </li>
        <li>
          <strong>Preferences</strong>: remember choices like language, role
          tabs, and saved filters.
        </li>
        <li>
          <strong>Analytics</strong>: help us understand usage (e.g., page
          views, feature adoption) to improve the product.
        </li>
        <li>
          <strong>Marketing</strong>: measure campaigns and show relevant
          content; set only with consent where required.
        </li>
      </ul>

      <h2 id="examples">2. Example Cookies</h2>
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Purpose</th>
              <th className="p-3">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">hostro_session</td>
              <td className="p-3">Authenticate user session</td>
              <td className="p-3">Session</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">role_pref</td>
              <td className="p-3">
                Remember last selected role (student/owner)
              </td>
              <td className="p-3">6 months</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">analytics_id</td>
              <td className="p-3">
                Aggregate analytics (page views, feature adoption)
              </td>
              <td className="p-3">2 years</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="manage">3. Managing Preferences</h2>
      <ul>
        <li>
          Use our in‑product <strong>Cookie Preferences</strong> (if available)
          to opt in/out of non‑essential cookies.
        </li>
        <li>
          Browser controls allow blocking or deleting cookies. Disabling
          essential cookies may break core features like login or payments.
        </li>
        <li>Mobile OS settings may limit ad tracking or reset identifiers.</li>
      </ul>

      <h2 id="third">4. Third‑Party Cookies</h2>
      <p>
        Our partners (e.g., payment gateways, analytics, support chat) may set
        cookies subject to their own policies. We endeavor to keep an up‑to‑date
        list in our consent manager.
      </p>

      <h2 id="dnt">5. Do Not Track</h2>
      <p>
        Some browsers offer a “Do Not Track” signal; our Platform currently does
        not respond to DNT signals.
      </p>

      <h2 id="changes">6. Changes</h2>
      <p>
        We may update this Cookie Policy as technology or law evolves. The
        Effective date indicates the latest version.
      </p>

      <h2 id="contact">7. Contact</h2>
      <p>
        Questions? Email{' '}
        <a href="mailto:privacy@hostro.in">privacy@hostro.in</a>.
      </p>

      <p className="mt-8 text-xs text-gray-500">
        This policy is informational and not legal advice.
      </p>
    </article>
  )
}
