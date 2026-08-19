import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <main className="wrap legal">
      <h1>About Us</h1>
      <p>
        Peakcare is a telehealth platform connecting patients with licensed providers and pharmacies for personalized,
        compounded treatments. While we are best known for our GLP-1 weight management programs, we also support patients
        across other health needs with tailored, science-backed care.
      </p>
      <p>
        The platform is HIPAA compliant, physician led, and pharmacy integrated — with licensed providers in all 50 states
        and fulfillment through U.S. licensed pharmacies. Medications ship overnight in temperature-controlled packaging.
      </p>
      <p>
        Medical intake evaluation, continuous check-ins, and continuous care support are part of every protocol. Payment is
        only charged after your treatment plan is approved.
      </p>
      <p>
        <Link className="btn btn-primary" href="/shop">
          Shop Clinical Protocols
        </Link>
      </p>
    </main>
  );
}
