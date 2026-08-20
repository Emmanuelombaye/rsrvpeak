import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = { title: { absolute: "Privacy Policy | RSRV" } };

export default function PrivacyPage() {
  return (
    <LegalLayout
      current="privacy"
      kicker="RSRV Health · Document 02 of 05"
      title="Privacy Policy"
      updated="Effective date: August 19, 2026 · RSRV Health"
    >
      <p>
        This Privacy Policy describes how RSRV Health (“RSRV,” “we,” “us”) collects, uses, and shares information when
        you use the RSRV website and telehealth platform. RSRV is a technology company. Independent clinicians and
        pharmacies may also handle your information under their own professional and legal obligations, including HIPAA
        where they are covered entities. For health-information rights that apply to covered entities, see the HIPAA
        Notice of Privacy Practices.
      </p>
      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Account and contact data:</strong> name, email, phone, shipping address, date of birth.
        </li>
        <li>
          <strong>Health information you submit:</strong> intake responses, medications, allergies, goals, messages with
          clinicians, and prescription-related details. This may be protected health information when held by a clinician
          or pharmacy.
        </li>
        <li>
          <strong>Payment data:</strong> processed by a third-party processor. RSRV does not store full card numbers.
        </li>
        <li>
          <strong>Technical data:</strong> IP address, device/browser type, pages viewed, cookies or similar identifiers.
        </li>
      </ul>
      <h2>2. How we use information</h2>
      <p>
        We use information to operate the Platform, route intakes to licensed clinicians, coordinate pharmacy fulfillment
        and cold-chain shipping, process payments after clinical approval, communicate about your order and care
        logistics, improve the site, prevent fraud, and comply with law. We do not sell your personal information.
      </p>
      <h2>3. How we share information</h2>
      <p>
        We share information with: (a) licensed clinicians in our network for evaluation and treatment; (b) licensed
        pharmacies for compounding, dispensing, and shipping; (c) service providers such as hosting, payment, customer
        support, and analytics vendors under contract; (d) authorities when required by law; and (e) a successor in a
        merger or acquisition, subject to this Policy. Clinicians and pharmacies use your information to provide
        professional services and may maintain their own records.
      </p>
      <h2>4. HIPAA and health data</h2>
      <p>
        Independent clinicians and pharmacies on the Platform may be covered entities or business associates under HIPAA.
        RSRV supports HIPAA-compliant, physician-led, pharmacy-integrated workflows. Where RSRV acts as a business
        associate, we handle protected health information only as permitted by our business associate agreements and
        applicable law. This Policy is not a substitute for the HIPAA Notice of Privacy Practices.
      </p>
      <h2>5. Cookies</h2>
      <p>
        We use essential cookies to run the site and may use analytics cookies to understand traffic. You can control
        cookies in your browser. Blocking some cookies may affect site function.
      </p>
      <h2>6. Retention</h2>
      <p>
        We retain account and transaction records as needed to provide the service, resolve disputes, and meet legal, tax,
        and clinical-record obligations. Clinicians and pharmacies may retain medical records for the periods required by
        state law.
      </p>
      <h2>7. Security</h2>
      <p>We use administrative, technical, and physical safeguards designed to protect information. No method of transmission or storage is 100% secure.</p>
      <h2>8. Your choices</h2>
      <p>
        You may update account information, request deletion of Platform account data, or opt out of marketing emails. We
        may retain information required for legal, clinical, or pharmacy recordkeeping. Residents of certain states
        (including California) may have additional rights to access, delete, or correct personal information, or to
        appeal a denial. Submit requests to privacy@rsrv.health. We will not discriminate against you for exercising
        privacy rights.
      </p>
      <h2>9. Children</h2>
      <p>The Platform is not directed to children under 18. We do not knowingly collect information from minors.</p>
      <h2>10. International users</h2>
      <p>
        The Platform is intended for use in the United States. If you access it from elsewhere, you do so on your own
        initiative and information may be processed in the U.S.
      </p>
      <h2>11. Changes</h2>
      <p>We may update this Policy by posting a new version with a revised effective date.</p>
      <h2>12. Contact</h2>
      <p>
        Privacy questions: privacy@rsrv.health · +1 (978) 740-7778
        <br />
        RSRV Health — mailing address to be inserted by RSRV.
      </p>
    </LegalLayout>
  );
}
