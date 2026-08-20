import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="wrap legal">
      <h1>Contact & Support</h1>
      <p>
        For protocol questions after you are a patient, message your assigned clinician in the care chat. For account,
        shipping, or billing questions, use the contacts below.
      </p>
      <p>
        <strong>Support:</strong> <a href="mailto:support@rsrv.health">support@rsrv.health</a>
        <br />
        <strong>Privacy:</strong> <a href="mailto:privacy@rsrv.health">privacy@rsrv.health</a>
        <br />
        <strong>Legal:</strong> <a href="mailto:legal@rsrv.health">legal@rsrv.health</a>
      </p>
      <p>
        Typical clinician review is within 24 hours of a complete intake. You are not charged until a provider has
        reviewed and approved your intake.
      </p>
      <p>
        <Link className="btn btn-primary" href="/shop">
          See if I qualify
        </Link>
      </p>
    </main>
  );
}
