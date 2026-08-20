import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { HowItWorks } from "@/components/HowItWorks";
import { ProtocolPicker } from "@/components/ProtocolPicker";
import { SnapPager } from "@/components/SnapPager";
import { WhyCarousel } from "@/components/WhyCarousel";
import { withBase } from "@/lib/paths";

export default function HomePage() {
  return (
    <main>
      <div className="hero-block">
        <div className="hero-glow" aria-hidden="true">
          <span />
          <span />
        </div>
        <section className="wrap hero">
          <h1>
            <span className="amber">Elevated health.</span>
            <br /> Reserved for you.
          </h1>
          <p>
            Physician-prescribed GLP-1 weight-management programs, with licensed U.S. clinicians and U.S. compounding pharmacies.
          </p>
        </section>

        <section className="wrap">
          <SnapPager className="hero-cards-pager" trackClassName="cards" count={3}>
          <FeaturedCarousel />

          <Link className="card card-catalog" href="/shop">
            <img className="bg" src={withBase("/assets/peakcare/lifestyle-hero.png")} alt="" />
            <div className="shade" />
            <div className="catalog-content">
              <span className="badge">BROWSE CATALOG</span>
              <h2>
                <em>Explore</em> all protocols.
              </h2>
              <p>Curated GLP-1 treatments for medical weight management.</p>
              <span className="shop-all">
                SHOP ALL{" "}
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H6.5M12 4v5.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </div>
          </Link>

          <article className="card card-care">
            <div className="avatars">
              <img src={withBase("/assets/peakcare/avatar-team-1.png")} alt="" />
              <img src={withBase("/assets/peakcare/avatar-team-2.png")} alt="" />
              <img src={withBase("/assets/peakcare/avatar-team-3.png")} alt="" />
            </div>
            <h2>Nationwide Network of U.S. Licensed Clinicians</h2>
            <p>Medical intake evaluation, continuous check-ins, and continuous care support.</p>
          </article>
          </SnapPager>
        </section>
      </div>

      <HowItWorks />

      <WhyCarousel />

      <ProtocolPicker />

      <section className="section doctor-section" id="doctor">
        <div className="wrap">
          <div className="doctor">
          <div className="doctor-visual">
            <div className="doctor-photo">
              <div className="tilt" />
              <article className="doctor-brand">
                <img src={withBase("/logos/rsrv-wordmark.svg")} alt="RSRV" />
                <p className="eyebrow">Clinical network</p>
                <h3>
                  Physician-led
                  <br /> care.
                </h3>
                <p>Licensed clinicians in all 50 states. HIPAA compliant. U.S. compounding pharmacies.</p>
              </article>
              <aside className="doctor-cert">
                <div className="doctor-cert-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p>Licensed</p>
                  <p>Prescription required</p>
                </div>
              </aside>
            </div>
          </div>
          <div className="doctor-copy">
            <p className="eyebrow">Physician-led clinical network</p>
            <h2>
              RSRV
              <br /> Clinical <span>Network</span>
            </h2>
            <p className="doctor-role">Physician-led care</p>
            <p className="quote">
              “Independent licensed U.S. clinicians review each intake. Care is personalized after medical evaluation —
              not guaranteed by marketing copy or photographs on this site.”
            </p>
            <div className="meta">
              <div>
                <p className="meta-label">Coverage</p>
                <p className="meta-value">Licensed providers in all 50 states</p>
              </div>
              <div>
                <p className="meta-label">Compliance</p>
                <p className="meta-value">
                  HIPAA
                  <br /> U.S. licensed pharmacies
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <FaqList />
      </section>

      <section className="cta-plain">
        <div className="wrap">
          <h2>
            Achieve lasting vitality with clinical-grade <span className="accent italic">treatments.</span>
          </h2>
          <p className="lede">
            Access physician-prescribed GLP-1 protocols designed to support metabolic health under clinician supervision.
          </p>
          <Link className="btn btn-accent" href="/shop">
            Shop Clinical Protocols
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 17 17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
