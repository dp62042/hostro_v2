import type { Metadata as PrivacyMetadata } from 'next'

export const metadata: PrivacyMetadata = {
  title: 'Privacy Policy',
  description:
    'How Hostro collects, uses, shares, and protects your personal data, with rights under India’s DPDP Act and notices for GDPR jurisdictions.',
}

export default function PrivacyPage() {
  const EFFECTIVE_DATE = '11 August 2025'
  return (
    <article>
      <h1 className="text-3xl font-bold text-emerald-600">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-600">Effective: {EFFECTIVE_DATE}</p>

      <p>
        Hostro Ventures Pvt Ltd ("<strong>Hostro</strong>", "<strong>we</strong>
        ") operates the Hostro platform for PG & co‑living discovery, booking,
        payments, and digital agreements (the "<strong>Platform</strong>"). This
        Policy explains our practices for information collected from visitors,
        students/tenants, PG owners/partners, vendors, and admins.
      </p>

      <h2 id="what-we-collect">1. Data We Collect</h2>
      <ul>
        <li>
          <strong>Account</strong>: name, email, phone, role, password hash,
          avatar, address, preferences.
        </li>
        <li>
          <strong>KYC/Compliance</strong> (where required): identity/address
          proofs; GST and business details for owners/vendors.
        </li>
        <li>
          <strong>Transactions</strong>: bookings, payments, invoices/refunds,
          coupons, tickets/complaints, chat/support interactions.
        </li>
        <li>
          <strong>Usage & Logs</strong>: device info, IP, user agent,
          timestamps, feature usage, crash reports, and diagnostics.
        </li>
        <li>
          <strong>Location</strong>: city/region inferred from IP or provided by
          you to show relevant listings; no continuous GPS tracking.
        </li>
        <li>
          <strong>Cookies & Similar Tech</strong>: session, preferences,
          analytics, and (with consent) marketing identifiers. See our{' '}
          <a href="/legal/cookies">Cookie Policy</a>.
        </li>
        <li>
          <strong>Voluntary Content</strong>: reviews/ratings, attachments,
          forms, and communications with us.
        </li>
      </ul>

      <h2 id="how-we-use">2. How We Use Data</h2>
      <ul>
        <li>
          Operate, secure, and improve the Platform; fulfill bookings and
          payments.
        </li>
        <li>
          Verify identity (KYC), prevent fraud/abuse, and enforce house rules
          and Terms.
        </li>
        <li>
          Provide support and dispute resolution; send service messages and
          receipts.
        </li>
        <li>
          Personalize search results and recommendations; analyze product usage.
        </li>
        <li>
          Comply with laws, taxation, audits, and record‑keeping obligations.
        </li>
      </ul>

      <h2 id="legal-basis">3. Legal Basis</h2>
      <p>
        In India, we rely on consent and legitimate uses under the Digital
        Personal Data Protection Act, 2023 (DPDP Act), contractual necessity,
        and legal obligations. In the EEA/UK, processing may rely on consent,
        contract, legitimate interests, legal obligations, or vital/public
        interests.
      </p>

      <h2 id="sharing">4. Sharing & Disclosures</h2>
      <ul>
        <li>
          <strong>Service Providers</strong>: hosting, payments, communications,
          analytics, KYC, and support—bound by confidentiality and processing
          terms.
        </li>
        <li>
          <strong>Owners ↔ Students</strong>: limited data shared on a
          need‑to‑know basis to create/manage bookings and agreements.
        </li>
        <li>
          <strong>Compliance & Safety</strong>: regulators or law enforcement
          upon lawful requests or to prevent harm.
        </li>
        <li>
          <strong>Corporate Events</strong>: reorganization, merger, or
          acquisition with appropriate safeguards and notice when required.
        </li>
      </ul>

      <h2 id="intl">5. International Transfers</h2>
      <p>
        Data may be processed outside your country. Where required, we implement
        safeguards (e.g., contractual clauses, regional hosting).
      </p>

      <h2 id="retention">6. Retention</h2>
      <p>
        We keep data as long as needed for the purposes above and legal
        requirements. Typical periods: account data for account lifetime + up to
        7 years; support logs 12–24 months; telemetry 6–18 months.
      </p>

      <h2 id="security">7. Security</h2>
      <p>
        We use encryption in transit, role‑based access, least‑privilege,
        audits, and regular backups. No method is 100% secure.
      </p>

      <h2 id="your-rights">8. Your Rights</h2>
      <ul>
        <li>
          <strong>India (DPDP)</strong>: access information, correction/erasure,
          grievance redressal, nominate a person to exercise rights.
        </li>
        <li>
          <strong>EEA/UK (GDPR)</strong>: access, rectification, erasure,
          restriction, objection, portability, and withdrawal of consent.
        </li>
      </ul>
      <p>
        To exercise rights, email{' '}
        <a href="mailto:privacy@hostro.in">privacy@hostro.in</a> or use in‑app
        controls.
      </p>

      <h2 id="children">9. Children</h2>
      <p>
        The Platform is not intended for children under 13. If you believe a
        child provided data, contact us for deletion.
      </p>

      <h2 id="changes">10. Changes</h2>
      <p>
        We may update this Policy; material changes will be notified via email
        or in‑app notices. The Effective date reflects the latest version.
      </p>

      <h2 id="contact">11. Contact & Grievance Officer (India)</h2>
      <ul>
        <li>
          <strong>Company</strong>: Hostro Ventures Pvt Ltd
        </li>
        <li>
          <strong>Email</strong>:{' '}
          <a href="mailto:privacy@hostro.in">privacy@hostro.in</a>
        </li>
        <li>
          <strong>Grievance Officer</strong>: [Name],{' '}
          <a href="mailto:grievance@hostro.in">grievance@hostro.in</a>
        </li>
        <li>
          <strong>Address</strong>: [Registered Address], India
        </li>
      </ul>

      <p className="mt-8 text-xs text-gray-500">
        This document is informational and not legal advice.
      </p>
    </article>
  )
}
