import type { Metadata as TermsMetadata } from 'next'

export const metadata: TermsMetadata = {
  title: 'Terms & Conditions',
  description:
    'Rules for using Hostro — accounts, listings, bookings, payments, cancellations, liabilities, and dispute resolution.',
}

export default function TermsPage() {
  const EFFECTIVE_DATE = '11 August 2025'
  return (
    <article>
      <h1 className="text-3xl font-bold text-emerald-600">
        Terms & Conditions
      </h1>
      <p className="mt-2 text-sm text-gray-600">Effective: {EFFECTIVE_DATE}</p>

      <h2 id="acceptance">1. Acceptance</h2>
      <p>
        By accessing or using the Platform, you agree to these Terms. If you do
        not agree, do not use the Platform.
      </p>

      <h2 id="accounts">2. Eligibility & Accounts</h2>
      <ul>
        <li>
          You must be at least 18 and capable of forming a binding contract.
        </li>
        <li>
          Keep your credentials secure; you are responsible for all activity
          under your account.
        </li>
        <li>
          KYC may be required for Owners/vendors (and in some cases Students) to
          comply with law and prevent abuse.
        </li>
      </ul>

      <h2 id="listings">3. Listings & Content</h2>
      <ul>
        <li>
          Owners are solely responsible for the accuracy, legality, safety, and
          compliance of listings, amenities, pricing, and house rules.
        </li>
        <li>
          We may moderate, verify, approve, or remove listings and content to
          ensure quality and safety.
        </li>
        <li>
          By uploading content, you grant Hostro a worldwide, non‑exclusive,
          royalty‑free license to host, store, reproduce, and display it to
          operate the Platform.
        </li>
      </ul>

      <h2 id="bookings">4. Bookings, Agreements & Payments</h2>
      <ul>
        <li>
          A booking forms a contract between Student and Owner; Hostro
          facilitates discovery, payment, and (where provided) digital e‑sign
          agreements.
        </li>
        <li>
          Fees, commissions, security deposits, taxes, and gateway charges are
          shown at checkout. You authorize us and our processors to charge your
          selected method.
        </li>
        <li>
          Invoices/receipts are available in your account. Late/failed payments
          may lead to suspension or cancellation.
        </li>
      </ul>

      <h2 id="cancellations">5. Cancellations & Refunds</h2>
      <p>
        Policies vary by listing and are shown at booking. Unless otherwise
        stated: (a) pre‑move‑in cancellations may incur a fee; (b) post‑move‑in
        refunds are prorated based on notice, usage, and local laws; (c) gateway
        fees are typically non‑refundable. Disputes follow our support process.
      </p>

      <h2 id="acceptable-use">6. Acceptable Use</h2>
      <ul>
        <li>No unlawful, harmful, fraudulent, or harassing activity.</li>
        <li>
          No scraping, reverse engineering, or circumvention of security
          measures.
        </li>
        <li>No infringing, deceptive, or obscene content.</li>
      </ul>

      <h2 id="third-party">7. Third‑Party Services</h2>
      <p>
        The Platform integrates payment gateways, communication tools, and KYC
        providers. Your use of these services may be subject to their own terms
        and privacy policies.
      </p>

      <h2 id="ip">8. Intellectual Property</h2>
      <p>
        Hostro trademarks, logos, and software are owned by Hostro Ventures Pvt
        Ltd. You may not use our IP without prior written consent.
        User‑submitted content remains yours subject to the limited license in
        Section 3.
      </p>

      <h2 id="reviews">9. Ratings & Reviews</h2>
      <p>
        Reviews must be truthful, relevant, and free of hate speech or personal
        data. We may remove content that violates these guidelines.
      </p>

      <h2 id="privacy">10. Privacy</h2>
      <p>
        See our <a href="/legal/privacy">Privacy Policy</a> for how we process
        personal data.
      </p>

      <h2 id="disclaimers">11. Disclaimers</h2>
      <p>
        The Platform is provided on an "as is" and "as available" basis. We do
        not guarantee uninterrupted or error‑free operation, or the accuracy of
        listings provided by Owners.
      </p>

      <h2 id="liability">12. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Hostro is not liable for
        indirect, incidental, special, consequential, or punitive damages, or
        loss of profits/data. Our aggregate liability shall not exceed the
        greater of ₹10,000 or the amounts paid by you to Hostro in the 6 months
        preceding the claim.
      </p>

      <h2 id="indemnity">13. Indemnity</h2>
      <p>
        You agree to defend, indemnify, and hold harmless Hostro and its
        affiliates from claims arising out of your misuse of the Platform or
        violation of these Terms.
      </p>

      <h2 id="termination">14. Suspension & Termination</h2>
      <p>
        We may suspend or terminate access for violations, suspected fraud,
        non‑payment, or legal risk. You may close your account at any time.
      </p>

      <h2 id="law">15. Governing Law & Disputes</h2>
      <p>
        These Terms are governed by the laws of India. Courts at Jaipur,
        Rajasthan, shall have exclusive jurisdiction, subject to any mandatory
        arbitration agreed separately.
      </p>

      <h2 id="changes">16. Changes to Terms</h2>
      <p>
        We may update these Terms. Continued use after changes constitutes
        acceptance. The Effective date reflects the latest version.
      </p>

      <h2 id="contact">17. Contact</h2>
      <ul>
        <li>
          <strong>Company</strong>: Hostro Ventures Pvt Ltd
        </li>
        <li>
          <strong>Email</strong>:{' '}
          <a href="mailto:legal@hostro.in">legal@hostro.in</a>
        </li>
        <li>
          <strong>Address</strong>: [Registered Address], Jaipur, Rajasthan,
          India
        </li>
      </ul>

      <p className="mt-8 text-xs text-gray-500">
        For convenience only; in case of conflict, the full Terms control.
      </p>
    </article>
  )
}
