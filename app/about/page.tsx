import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <main className="wrap legal">
      <h1>About Us</h1>
      <p>
        RSRV is a U.S. telehealth platform connecting patients with independently licensed clinicians and state-licensed
        compounding pharmacies for physician-prescribed GLP-1 weight-management programs.
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
