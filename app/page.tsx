import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { HowItWorks } from "@/components/HowItWorks";
import { ProtocolPicker } from "@/components/ProtocolPicker";
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
            Physician-prescribed protocols for longevity, performance, and your next level of well-being.
          </p>
        </section>

        <section className="wrap cards">
          <FeaturedCarousel />

          <Link className="card card-catalog" href="/shop">
            <img className="bg" src={withBase("/assets/peakcare/lifestyle-hero.png")} alt="" />
            <div className="shade" />
            <div className="catalog-content">
              <span className="badge">BROWSE CATALOG</span>
              <h2>
                <em>Explore</em> all protocols.
              </h2>
              <p>Curated treatments for weight loss, longevity, and performance.</p>
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
        </section>
      </div>

      <HowItWorks />

      <WhyCarousel />

      <ProtocolPicker />

      <section className="section" id="doctor">
        <div className="wrap doctor">
          <div className="doctor-photo">
            <div className="tilt" />
            <img src={withBase("/assets/peakcare/avatar-doctor.png")} alt="Dr. Jerry J. Cattelane, D.O." />
          </div>
          <div>
            <div className="doc-badges">
              <span>Licensed</span>
              <span>Board Certified</span>
              <span>Trusted by Clinical Experts</span>
            </div>
            <h2>
              Dr. Jerry J.
              <br /> Cattelane, D.O.
            </h2>
            <p className="lede">Medical Director & Lead Physician</p>
            <p className="quote">
              “Licensed nationwide, with extensive experience in telemedicine, clinical care, and metabolic health.
              Dedicated to helping patients achieve their wellness goals through evidence-based, personalized protocols.”
            </p>
            <div className="meta">
              <div>
                <strong>Education</strong>
                <br />
                NY College of Osteopathic Medicine
              </div>
              <div>
                <strong>Recognition</strong>
                <br />
                Educator of the Year · Patients&apos; Top Choice
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
            Access premium protocols designed to support longevity, maintain metabolic balance, and elevate your everyday
            health.
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
