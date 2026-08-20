import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = { title: { absolute: "Telehealth Informed Consent | RSRV" } };

export default function ConsentPage() {
  return (
    <LegalLayout
      current="consent"
      kicker="RSRV Health · Document 04 of 05"
      title="Telehealth Informed Consent"
      updated="Effective date: August 19, 2026 · RSRV Health"
    >
      <p>
        This Telehealth Informed Consent (“Consent”) explains how medical evaluation and treatment may be provided
        through the RSRV platform. By submitting an intake, creating an account, or accepting treatment through RSRV, you
        consent to receive telehealth services from independently licensed clinicians as described here.
      </p>
      <h2>1. Nature of telehealth</h2>
      <p>
        Telehealth means you and a licensed clinician may communicate by secure messaging, video, phone, or asynchronous
        review of your written intake, photographs, and medical history, rather than an in-person visit. Your clinician
        decides whether telehealth is appropriate for you. If it is not, you may be referred to in-person care.
      </p>
      <h2>2. Benefits</h2>
      <p>
        Telehealth can make licensed care more accessible, reduce travel, and allow follow-up check-ins after a protocol
        is prescribed. Typical clinician review of a complete RSRV intake is within 24 hours. You are not charged for
        medication until a licensed provider has reviewed and approved your intake.
      </p>
      <h2>3. Limits and risks</h2>
      <p>
        Telehealth has limits compared with an in-person exam. A clinician may not be able to perform a physical
        examination, obtain immediate lab work, or manage every condition remotely. Technology can fail, delay messages,
        or be interrupted. There is a risk that information could be accessed by unauthorized persons despite safeguards.
        Treatment outcomes are not guaranteed.
      </p>
      <h2>4. Emergencies</h2>
      <p>
        RSRV and Platform messaging are not for emergencies. If you have a medical emergency, call 911 or go to the
        nearest emergency department. If you have thoughts of harming yourself or others, call 988 or go to the nearest
        emergency department. Tell emergency personnel about any medications you are taking.
      </p>
      <h2>5. Your responsibilities</h2>
      <p>
        You agree to provide complete and truthful information, keep a working email and phone number, be in the United
        States at the time of care, follow prescribed instructions, report side effects promptly, and seek in-person care
        when advised. You will not share your account or obtain medication for anyone else.
      </p>
      <h2>6. Compounded medications</h2>
      <p>
        If a clinician prescribes a compounded medication, you understand it is prepared by a state-licensed U.S.
        pharmacy, is not FDA-approved, and is not the same as an FDA-approved brand-name product. You will use it only as
        prescribed and store it as instructed, including any refrigeration requirements after cold-chain delivery.
      </p>
      <h2>7. Records, privacy, and clinicians</h2>
      <p>
        Your intake, messages, and prescription details may be part of a medical record maintained by your clinician
        and/or pharmacy. RSRV may facilitate those communications as a technology platform. Independent clinicians are
        not employees of RSRV unless expressly identified otherwise. See the Privacy Policy and HIPAA Notice for how
        information is handled.
      </p>
      <h2>8. Right to withdraw</h2>
      <p>
        You may refuse or withdraw consent to telehealth at any time by contacting support@rsrv.health or messaging your
        clinician. Withdrawal does not affect care already provided. Canceling a subscription does not automatically
        cancel an existing prescription; follow clinician and pharmacy instructions for remaining medication.
      </p>
      <h2>9. Acknowledgment</h2>
      <p>
        You acknowledge that you have read this Consent, the Terms of Service, Privacy Policy, Medical Disclaimer, and
        HIPAA Notice, that you understand telehealth is voluntary, and that you have had an opportunity to ask questions
        of your clinician before treatment begins.
      </p>
      <h2>10. Contact</h2>
      <p>
        RSRV Health · +1 (978) 740-7778 · support@rsrv.health · legal@rsrv.health
        <br />
        Clinical questions after you are a patient: message your assigned clinician through the Platform.
      </p>
    </LegalLayout>
  );
}
