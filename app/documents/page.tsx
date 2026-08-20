import type { Metadata } from "next";
import Link from "next/link";
import { companyPhone, documents } from "@/lib/data";

export const metadata: Metadata = { title: { absolute: "RSRV Documents" } };

export default function DocumentsPage() {
  return (
    <main className="wrap legal legal-wide">
      <p className="kicker">RSRV Health</p>
      <h1>Documents</h1>
      <p className="updated">
        Effective date: August 19, 2026 · Hosted on this site. These pages are the RSRV legal pack — they are not linked
        to any external document host.
      </p>
      <p>
        Read these documents before creating an account or submitting a medical intake. Using the RSRV platform means you
        agree to the Terms of Service, Privacy Policy, Medical Disclaimer, Telehealth Informed Consent, and HIPAA Notice
        of Privacy Practices.
      </p>
      <div className="doc-grid">
        {documents.map((doc) => (
          <Link className="doc-card" href={doc.href} key={doc.href}>
            <span>{doc.n}</span>
            <h2>{doc.title}</h2>
            <p>{doc.copy}</p>
          </Link>
        ))}
      </div>
      <p>
        Phone: <a href={companyPhone.href}>{companyPhone.display}</a> · Questions:{" "}
        <a href="mailto:legal@rsrv.health">legal@rsrv.health</a> · Privacy:{" "}
        <a href="mailto:privacy@rsrv.health">privacy@rsrv.health</a> · Support:{" "}
        <a href="mailto:support@rsrv.health">support@rsrv.health</a>
      </p>
    </main>
  );
}
