import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = { title: { absolute: "Medical Disclaimer | RSRV" } };

export default function DisclaimerPage() {
  return (
    <LegalLayout
      current="disclaimer"
      kicker="RSRV Health · Document 03 of 05"
      title="Medical Disclaimer"
      updated="Effective date: August 19, 2026 · RSRV Health"
    >
      <p>
        The information on this website is for general educational purposes and does not constitute medical advice,
        diagnosis, or treatment. Always seek the advice of a licensed physician or other qualified health provider with
        any questions regarding a medical condition. Never disregard professional medical advice or delay seeking it
        because of something you read on the RSRV site.
      </p>
      <h2>Not a substitute for in-person care</h2>
      <p>
        Telehealth has limits. RSRV protocols are not appropriate for every person. If you have a medical emergency, call
        911 or go to the nearest emergency department. Do not use Platform messaging for chest pain, severe allergic
        reaction, suicidal thoughts, or other emergencies.
      </p>
      <h2>Prescription products</h2>
      <p>
        Treatments offered through RSRV require a valid prescription from a licensed U.S. clinician after medical intake.
        Listing a protocol, price, or “starting at” amount does not mean you will be prescribed that product. A clinician
        may decline treatment, recommend a different protocol, or refer you to in-person care.
      </p>
      <h2>Compounded medications and FDA status</h2>
      <p>
        Compounded medications available through RSRV are prepared by state-licensed U.S. pharmacies. They are not
        FDA-approved. The FDA does not verify the safety, effectiveness, or manufacturing of compounded drugs in the same
        way as FDA-approved medications. Compounded GLP-1 and related preparations are not the same as FDA-approved
        brand-name products. Use only as prescribed. Report side effects to your clinician promptly.
      </p>
      <h2>Results vary</h2>
      <p>
        Weight and metabolic outcomes vary. Marketing copy, photographs, and clinician illustrations on this site are
        educational and are not a guarantee of your result. Photographs are illustrative.
      </p>
      <h2>Clinician and pharmacy independence</h2>
      <p>
        Licensed U.S. clinicians provide care as independent licensed professionals. Pharmacies that
        fulfill RSRV orders are independently licensed. RSRV Health is a telehealth technology platform and does not
        replace your clinician’s judgment.
      </p>
      <h2>Risks</h2>
      <p>
        GLP-1 receptor agonist therapy may cause gastrointestinal symptoms, hypoglycemia risk in some
        patients, injection-site reactions, and other adverse effects. Certain conditions (including pregnancy, personal
        or family history of medullary thyroid carcinoma or MEN2, and other clinician-identified contraindications) may
        make treatment inappropriate. Your clinician will review risks, benefits, and alternatives with you.
      </p>
      <h2>Contact</h2>
      <p>
        Clinical questions after you are a patient: message your assigned clinician through the Platform.
        <br />
        General: support@rsrv.health · +1 (978) 740-7778
      </p>
    </LegalLayout>
  );
}
