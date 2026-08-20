import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { ProtocolPicker } from "@/components/ProtocolPicker";
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
            <span className="amber">Redefine your health</span>
            <br /> and feel better than ever.
          </h1>
          <p>
            Explore physician-prescribed metabolic, longevity, and performance protocols designed for your individual
            biology.
          </p>
        </section>

        <section className="wrap cards">
          <FeaturedCarousel />

          <Link className="card card-catalog" href="/shop">
            <img className="bg" src={withBase("/assets/peakcare/lifestyle-hero.png")} alt="" />
            <div className="shade" />
            <div className="catalog-content">
              <span className="badge">BROWSE CATALOG</span>
              <h2>Explore all protocols.</h2>
              <p>Customized treatments for weight loss, longevity, and recovery.</p>
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

      <section className="section white center" id="how-it-works">
        <div className="wrap">
          <h2>
            How it <span className="accent">works.</span>
          </h2>
          <p className="lede">A clinical protocol designed for seamless access to premium healthcare. No confusion or delays.</p>
          <div className="steps">
            <article className="step">
              <div className="step-card">
                <div className="kicker">Health Questionnaire · Takes about two minutes</div>
                <div className="mock-row">
                  <div className="field">FIRST NAME</div>
                  <div className="field">LAST NAME</div>
                  <div className="field">DATE OF BIRTH</div>
                  <div className="field">PRIMARY GOAL</div>
                </div>
                <div className="fake-btn">Submit Profile</div>
              </div>
              <div className="kicker">Step 1</div>
              <h3>Health Profile</h3>
              <p className="lede">Fill out a quick questionnaire. Payment is only charged after your treatment plan is approved.</p>
            </article>
            <article className="step">
              <div className="step-card">
                <div className="kicker">Dr. Maya Chen · Online now</div>
                <div className="chat-line">Is it normal to feel a little nauseous the first week?</div>
                <div className="chat-line">That&apos;s common and usually fades within 10–14 days.</div>
              </div>
              <div className="kicker">Step 2</div>
              <h3>Doctor Review & Chat</h3>
              <p className="lede">A licensed provider will carefully review your information and chat with you to create a plan.</p>
            </article>
            <article className="step">
              <div className="step-card">
                <div className="plan-row">
                  <span>Medication Shipped</span>
                  <strong>Arriving tomorrow · FedEx cold-chain</strong>
                </div>
                <div className="plan-row">
                  <span>First Dose</span>
                  <strong>Scheduled for Friday, 8:00 AM</strong>
                </div>
                <div className="plan-row">
                  <span>Follow-up Check In</span>
                  <strong>In 2 weeks · with Dr. Chen</strong>
                </div>
              </div>
              <div className="kicker">Step 3</div>
              <h3>Begin Your Treatment</h3>
              <p className="lede">Your personalized plan is delivered. Begin your treatment with ongoing support from our team.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section why center" id="why">
        <div className="wrap">
          <h2>
            Why <span className="accent">Peakcare?</span>
          </h2>
          <p className="lede">
            A daily combination of medical-grade treatments designed to support longevity, maintain metabolic balance,
            and help you feel consistently well.
          </p>
          <div className="why-grid">
            <article className="why-item">
              <div className="why-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="8" cy="8" r="2.5" />
                  <circle cx="16" cy="8" r="2.5" />
                  <circle cx="8" cy="16" r="2.5" />
                  <circle cx="16" cy="16" r="2.5" />
                </svg>
              </div>
              <h3>Transparent & Trusted</h3>
              <p>From ingredient sourcing to doorstep delivery, we prioritize pharmaceutical-grade quality and complete transparency.</p>
            </article>
            <article className="why-item">
              <div className="why-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
                </svg>
              </div>
              <h3>Tailored Care</h3>
              <p>We create tailored plans based on your health goals, ensuring the best path to your success and well-being.</p>
            </article>
            <article className="why-item">
              <div className="why-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <h3>Science-backed</h3>
              <p>Clinically guided care designed to support long-term health, performance, and overall physical wellbeing.</p>
            </article>
            <article className="why-item">
              <div className="why-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                </svg>
              </div>
              <h3>Cold-Chain Delivery</h3>
              <p>Medications are shipped overnight in temperature-controlled packaging to ensure absolute efficacy upon arrival.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section center" id="shop">
        <div className="wrap">
          <div className="watermark">TIRZEPATIDE</div>
          <h2>Shop our best protocols</h2>
          <ProtocolPicker />
        </div>
      </section>

      <section className="section" id="doctor">
        <div className="wrap doctor">
          <div className="doctor-photo">
            <div className="tilt" />
            <img src={withBase("/assets/peakcare/avatar-doctor.png")} alt="Dr. Jerry J. Cattelane, D.O." />
          </div>
          <div>
            <div className="eyebrow">Licensed · Board Certified · Trusted by Clinical Experts</div>
            <h2>Dr. Jerry J. Cattelane, D.O.</h2>
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

      <section className="cta">
        <img src={withBase("/assets/peakcare/lifestyle-footer.png")} alt="" />
        <div className="shade" />
        <div className="cta-inner">
          <h2>Achieve lasting vitality with clinical-grade treatments.</h2>
          <p className="lede" style={{ margin: "16px auto 24px", color: "rgba(255,255,255,.82)" }}>
            Access premium protocols designed to support longevity, maintain metabolic balance, and elevate your everyday
            health.
          </p>
          <Link className="btn btn-primary" href="/shop">
            Shop Clinical Protocols
          </Link>
        </div>
      </section>
    </main>
  );
}
