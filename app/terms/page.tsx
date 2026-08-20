import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { companyAddress } from "@/lib/data";

export const metadata: Metadata = { title: { absolute: "Terms of Service | RSRV" } };

export default function TermsPage() {
  return (
    <LegalLayout
      current="terms"
      kicker="RSRV Health · Document 01 of 05"
      title="Terms of Service"
      updated="Effective date: August 19, 2026 · RSRV Health"
    >
      <p>
        These Terms of Service (“Terms”) govern your access to and use of the RSRV website, mobile experiences, and
        related telehealth technology services (the “Platform”) operated by RSRV Health (“RSRV,” “we,” “us,” or “our”).
        By accessing the Platform, creating an account, or submitting a medical intake, you agree to these Terms, the
        Privacy Policy, the Medical Disclaimer, the Telehealth Informed Consent, and the HIPAA Notice of Privacy
        Practices.
      </p>
      <h2>1. What RSRV is — and is not</h2>
      <p>
        RSRV is a technology platform that connects patients with independently licensed U.S. clinicians and
        state-licensed pharmacies. RSRV does not itself practice medicine, write prescriptions, or operate a pharmacy.
        Medical care is provided solely by licensed clinicians. Pharmacy compounding and dispensing are performed by
        licensed pharmacies. Your clinician and pharmacy are independent professionals/entities and are not employees of
        RSRV unless expressly identified otherwise.
      </p>
      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old and located in the United States to use the Platform. Licensed providers in the
        RSRV network serve patients in all 50 states and the District of Columbia. Treatment is available only where a
        licensed clinician is authorized to practice and a licensed pharmacy can lawfully dispense.
        Eligibility for any protocol is determined solely by a licensed clinician after review of your intake, history,
        medications, and goals. Submitting an intake does not guarantee a prescription.
      </p>
      <h2>3. Medical intake and prescriptions</h2>
      <p>
        You agree to provide complete, accurate, and current information. You are responsible for disclosing allergies,
        medical conditions, pregnancy or nursing status, and all medications and supplements. Prescriptions, if issued,
        are based on the clinician’s independent professional judgment. You may message your care team through the
        Platform for protocol-related questions; this is not a substitute for emergency care.
      </p>
      <h2>4. Compounded medications</h2>
      <p>
        Some RSRV protocols involve compounded medications prepared by state-licensed U.S. pharmacies using FDA-inspected
        active pharmaceutical ingredients. Compounded medications are not FDA-approved, which means the FDA has not
        verified their safety, effectiveness, or manufacturing quality in the same way as FDA-approved products.
        Brand-name drugs such as those marketed for GLP-1 therapy are distinct from compounded versions. Your clinician
        will discuss whether a compounded preparation is appropriate for you.
      </p>
      <h2>5. Fees, billing, and refunds</h2>
      <p>
        Displayed prices start at the amounts shown on product pages (for example, programs currently start at $399/month
        depending on protocol and plan). You are not charged until a licensed provider has reviewed and approved your
        intake. Fees may include clinician review, medication, and cold-chain overnight shipping. Subscriptions renew
        until canceled according to the plan you select. If a clinician does not approve treatment, you will not be
        charged for medication. Refunds after shipment may be limited because prescription products generally cannot be
        restocked. Chargebacks initiated in bad faith may result in account suspension.
      </p>
      <h2>6. Shipping</h2>
      <p>
        Approved medications are typically shipped overnight in temperature-controlled packaging. You are responsible for
        providing a deliverable U.S. address and for prompt receipt. RSRV, clinicians, and pharmacies are not responsible
        for delays caused by carriers, weather, or incorrect address information.
      </p>
      <h2>7. Prohibited uses</h2>
      <p>
        You may not use the Platform to obtain medication for another person, resell products, misrepresent your identity
        or medical history, interfere with the Platform, or use the service for any unlawful purpose.
      </p>
      <h2>8. Intellectual property</h2>
      <p>
        The RSRV name, wordmark, site design, and content are owned by RSRV Health or its licensors. You may not copy,
        scrape, or commercially reuse the Platform except as allowed by law.
      </p>
      <h2>9. Disclaimers</h2>
      <p>
        THE PLATFORM IS PROVIDED “AS IS.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, RSRV DISCLAIMS WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. RSRV DOES NOT WARRANT THAT TREATMENT
        WILL ACHIEVE ANY PARTICULAR RESULT. See the Medical Disclaimer for additional notices.
      </p>
      <h2>10. Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, RSRV AND ITS OFFICERS, DIRECTORS, AND CONTRACTORS SHALL NOT BE LIABLE FOR
        INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS OR DATA. RSRV’S TOTAL
        LIABILITY FOR CLAIMS ARISING OUT OF THE PLATFORM SHALL NOT EXCEED THE AMOUNTS YOU PAID TO RSRV IN THE TWELVE
        MONTHS BEFORE THE CLAIM. THIS LIMITATION DOES NOT LIMIT LIABILITY THAT CANNOT BE LIMITED UNDER APPLICABLE LAW,
        INCLUDING LIABILITY FOR GROSS NEGLIGENCE OR WILLFUL MISCONDUCT, OR LIABILITY OF INDEPENDENT CLINICIANS OR
        PHARMACIES FOR THEIR OWN PROFESSIONAL SERVICES.
      </p>
      <h2>11. Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless RSRV from claims arising out of your misuse of the Platform, your
        violation of these Terms, or your inaccurate intake information, except to the extent caused by RSRV’s willful
        misconduct.
      </p>
      <h2>12. Dispute resolution</h2>
      <p>
        These Terms are governed by the laws of the State of Delaware, excluding conflict-of-law rules, unless a
        mandatory consumer law in your state requires otherwise. Before filing a claim, you agree to contact
        legal@rsrv.health and attempt informal resolution for 30 days. If unresolved, disputes shall be resolved in state
        or federal courts located in Delaware, unless applicable law requires a different forum.
      </p>
      <h2>13. Changes</h2>
      <p>We may update these Terms by posting a revised version on the Platform. Continued use after the effective date constitutes acceptance.</p>
      <h2>14. Contact</h2>
      <p>
        RSRV Health
        <br />
        Phone: +1 (978) 740-7778
        <br />
        Email: support@rsrv.health · Legal: legal@rsrv.health
        <br />
        {companyAddress.name}
        <br />
        {companyAddress.line1}
        <br />
        {companyAddress.city}, {companyAddress.state} {companyAddress.zip}
      </p>
    </LegalLayout>
  );
}
