import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <div className="wordmark">RSRV</div>
          <p>
            The definitive infrastructure for specialized medical care and performance protocols. HIPAA compliant,
            physician led, and pharmacy integrated.
          </p>
        </div>
        <div>
          <h5>TREATMENTS</h5>
          <Link href="/shop">Weight Loss</Link>
          <Link href="/shop">Longevity</Link>
          <Link href="/shop">Muscle Recovery</Link>
        </div>
        <div>
          <h5>COMPANY</h5>
          <Link href="/#how-it-works">How It Works</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h5>SUPPORT</h5>
          <Link href="/#faq">FAQs</Link>
          <Link href="/contact">Support</Link>
          <Link href="/documents">Documents</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/disclaimer">Medical Disclaimer</Link>
          <Link href="/consent">Telehealth Consent</Link>
          <Link href="/hipaa">HIPAA Notice</Link>
        </div>
      </div>
      <div className="wrap">
        <p className="disclaimer-bar">
          Compounded medications are not FDA-approved. RSRV is a telehealth technology platform that connects patients
          with independently licensed clinicians and pharmacies; it does not itself practice medicine or operate a
          pharmacy. See the <Link href="/documents">RSRV documents</Link> for Terms, Privacy, Disclaimer, Consent, and
          HIPAA Notice.
        </p>
        <div className="footer-bottom">
          <span>© {year} RSRV. All rights reserved.</span>
          <span>
            <a href="#">LINKEDIN</a> · <a href="#">INSTAGRAM</a> · <a href="#">FACEBOOK</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
