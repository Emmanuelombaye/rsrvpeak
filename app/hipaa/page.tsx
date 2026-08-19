import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = { title: { absolute: "HIPAA Notice of Privacy Practices | RSRV" } };

export default function HipaaPage() {
  return (
    <LegalLayout
      current="hipaa"
      kicker="RSRV Health · Document 05 of 05"
      title="HIPAA Notice of Privacy Practices"
      updated="Effective date: August 19, 2026 · RSRV Health"
    >
      <p>
        This Notice of Privacy Practices describes how medical information about you may be used and disclosed and how
        you can get access to this information. Please review it carefully. Independent clinicians and pharmacies on the
        RSRV platform may be covered entities under HIPAA and may provide their own notices. Where RSRV Health acts as a
        business associate, it handles protected health information (“PHI”) only as permitted by contract and law.
      </p>
      <h2>1. Our duties</h2>
      <p>
        We are required by law to maintain the privacy of PHI, to provide this Notice of our legal duties and privacy
        practices, and to notify affected individuals of a breach of unsecured PHI. We must follow the terms of the
        Notice that is currently in effect.
      </p>
      <h2>2. How we may use and disclose PHI</h2>
      <p>We may use and disclose PHI without your written authorization for:</p>
      <ul>
        <li>
          <strong>Treatment:</strong> to licensed clinicians evaluating your intake, prescribing, or providing follow-up
          care, and to pharmacies compounding, dispensing, and shipping medication.
        </li>
        <li>
          <strong>Payment:</strong> to bill and collect for services after clinical approval, including payment
          processors and insurers if applicable.
        </li>
        <li>
          <strong>Health care operations:</strong> quality review, customer support related to your care logistics,
          training, and legal or compliance activities.
        </li>
        <li>
          <strong>As required by law:</strong> including public-health reporting, health-oversight activities, judicial
          or administrative proceedings, law enforcement in limited circumstances, and reports of abuse, neglect, or
          threats of harm when required or permitted.
        </li>
        <li>
          <strong>Business associates:</strong> vendors who help operate the Platform under written agreements that
          require them to protect PHI.
        </li>
      </ul>
      <p>
        Other uses and disclosures — including most marketing that is not face-to-face, sale of PHI, and most sharing of
        psychotherapy notes — require your written authorization. You may revoke an authorization in writing except to
        the extent we have already relied on it.
      </p>
      <h2>3. Your rights</h2>
      <p>Subject to HIPAA and state law, you have the right to:</p>
      <ul>
        <li>
          Request restrictions on certain uses and disclosures of PHI (we are not required to agree, except in limited
          payment-related cases required by law).
        </li>
        <li>Request confidential communications at an alternative address or by alternative means.</li>
        <li>
          Inspect and obtain a copy of PHI in a designated record set, including an electronic copy if we maintain the
          record electronically.
        </li>
        <li>Request an amendment of PHI you believe is incorrect or incomplete.</li>
        <li>Receive an accounting of certain disclosures of PHI.</li>
        <li>Receive a paper copy of this Notice even if you agreed to receive it electronically.</li>
        <li>File a complaint if you believe your privacy rights have been violated.</li>
      </ul>
      <p>
        To exercise these rights, contact privacy@rsrv.health. We will not retaliate against you for filing a complaint.
        You may also file a complaint with the U.S. Department of Health and Human Services, Office for Civil Rights.
      </p>
      <h2>4. Independent clinicians and pharmacies</h2>
      <p>
        Your treating clinician and dispensing pharmacy maintain medical and pharmacy records and may use and disclose PHI
        for treatment, payment, and operations as described in their own notices. RSRV does not replace those entities’
        HIPAA obligations.
      </p>
      <h2>5. Changes to this Notice</h2>
      <p>
        We may change this Notice and make the revised Notice effective for PHI we already have as well as information we
        receive in the future. The current Notice will be posted on the Platform with its effective date.
      </p>
      <h2>6. Contact</h2>
      <p>
        Privacy Officer · RSRV Health
        <br />
        privacy@rsrv.health · legal@rsrv.health
        <br />
        Mailing address: to be inserted by RSRV (registered office / principal place of business).
      </p>
    </LegalLayout>
  );
}
