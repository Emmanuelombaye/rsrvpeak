import Link from "next/link";
import { FooterCompliance } from "@/components/FooterCompliance";
import { companyPhone } from "@/lib/data";
import { withBase } from "@/lib/paths";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-photo" aria-hidden="true">
        <img src={withBase("/assets/peakcare/lifestyle-footer.png")} alt="" />
      </div>
      <div className="wrap footer-shell">
        <div className="footer-card">
          <div className="footer-grid">
            <div>
              <Link className="footer-logo" href="/" aria-label="RSRV home">
                <img src={withBase("/logos/rsrv-wordmark.svg")} alt="RSRV" />
              </Link>
              <p>
                Physician-prescribed GLP-1 weight-management programs. HIPAA compliant, physician led, and pharmacy
                integrated.
              </p>
            </div>
            <div className="footer-links">
              <div>
                <h5>TREATMENTS</h5>
                <Link href="/tirzepatide">Tirzepatide</Link>
                <Link href="/semaglutide">Semaglutide</Link>
              </div>
              <div>
                <h5>COMPANY</h5>
                <Link href="/#how-it-works">How It Works</Link>
                <Link href="/about">About Us</Link>
                <Link href="/contact">Contact</Link>
                <a href={companyPhone.href}>{companyPhone.display}</a>
              </div>
              <div>
                <h5>SUPPORT</h5>
                <Link href="/#faq">FAQs</Link>
                <Link href="/contact">Support</Link>
                <Link href="/terms">Terms of Service</Link>
                <Link href="/privacy">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {year} RSRV. All rights reserved.</span>
            <span>
              <a href={companyPhone.href}>{companyPhone.display}</a> ·{" "}
              <a href="mailto:support@rsrv.health">support@rsrv.health</a>
            </span>
          </div>
        </div>
      </div>
      <FooterCompliance />
      <div className="footer-wordmark" aria-hidden="true">
        rsrv
      </div>
    </footer>
  );
}
