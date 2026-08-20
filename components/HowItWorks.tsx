import { Reveal } from "@/components/Reveal";
import { SlideShow } from "@/components/SlideShow";

function TicketForm({ uid = "form" }: { uid?: string }) {
  return (
    <svg viewBox="0 0 400 300" className="ticket-art" fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`${uid}-formGrad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fbfaf7" />
        </linearGradient>
        <radialGradient id={`${uid}-formBlob`} cx="0" cy="0" r="1">
          <stop offset="0%" stopColor="#F3EFE4" />
          <stop offset="100%" stopColor="#F3EFE4" stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-ff-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#111111" floodOpacity="0.08" />
        </filter>
      </defs>
      <rect width="400" height="300" rx="20" fill={`url(#${uid}-formGrad)`} />
      <circle cx="30" cy="20" r="120" fill={`url(#${uid}-formBlob)`} />
      <text x="30" y="46" fontSize="21" fontWeight="600" fill="#2D2D2D" fontFamily="serif">
        Health Questionnaire
      </text>
      <text x="30" y="64" fontSize="11" fill="#8A8477">
        Takes about two minutes
      </text>
      <rect x="30" y="80" width="160" height="46" rx="10" fill="#F5F0E8" />
      <text x="42" y="97" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="#8A8477">
        FIRST NAME
      </text>
      <rect x="42" y="103" width="80" height="8" rx="4" fill="#D9CFBE" />
      <rect x="210" y="80" width="160" height="46" rx="10" fill="#F5F0E8" />
      <text x="222" y="97" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="#8A8477">
        LAST NAME
      </text>
      <rect x="222" y="103" width="80" height="8" rx="4" fill="#D9CFBE" />
      <rect x="30" y="138" width="340" height="46" rx="10" fill="#F5F0E8" />
      <text x="42" y="155" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="#8A8477">
        DATE OF BIRTH
      </text>
      <rect x="42" y="161" width="110" height="8" rx="4" fill="#D9CFBE" />
      <g transform="translate(335 148)">
        <rect width="18" height="16" y="2" rx="3" fill="none" stroke="#C4A265" strokeWidth="1.6" />
        <path d="M0 7h18" stroke="#C4A265" strokeWidth="1.6" />
        <path d="M5 0v4M13 0v4" stroke="#C4A265" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <rect x="30" y="196" width="340" height="46" rx="10" fill="#F5F0E8" />
      <text x="42" y="213" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="#8A8477">
        PRIMARY GOAL
      </text>
      <rect x="42" y="219" width="150" height="8" rx="4" fill="#D9CFBE" />
      <path d="M334 214l4 4 4-4" stroke="#8A8477" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="30" y="254" width="340" height="30" rx="15" fill="#C4A265" filter={`url(#${uid}-ff-shadow)`} />
      <text x="192" y="273" fontSize="14" fontWeight="600" fill="#111111" textAnchor="middle">
        Submit Profile
      </text>
      <path d="M330 264l6 5-6 5" stroke="#111111" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g filter={`url(#${uid}-ff-shadow)`}>
        <rect x="255" y="18" width="115" height="30" rx="15" fill="white" stroke="#F3EFE4" strokeWidth="2" />
        <circle cx="273" cy="33" r="5" fill="#C4A265" />
        <text x="285" y="37" fontSize="10.5" fontWeight="600" fill="#2D2D2D">
          2 min left
        </text>
      </g>
    </svg>
  );
}

function TicketChat({ uid = "chat" }: { uid?: string }) {
  return (
    <svg viewBox="0 0 400 300" className="ticket-art" fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id={`${uid}-cc-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#111111" floodOpacity="0.08" />
        </filter>
        <linearGradient id={`${uid}-avatarGrad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4A265" />
          <stop offset="100%" stopColor="#a9884f" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" rx="20" fill="#ffffff" />
      <circle cx="46" cy="34" r="16" fill={`url(#${uid}-avatarGrad)`} />
      <text x="46" y="38" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">
        CL
      </text>
      <text x="70" y="31" fontSize="14" fontWeight="600" fill="#2D2D2D">
        Clinician
      </text>
      <circle cx="72" cy="42" r="3" fill="#C4A265" />
      <text x="80" y="45" fontSize="10" fill="#8A8477">
        Online now
      </text>
      <line x1="20" y1="60" x2="380" y2="60" stroke="#F0EEE3" strokeWidth="1.5" />
      <circle cx="46" cy="90" r="14" fill="#C4A265" />
      <text x="46" y="94" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">
        JD
      </text>
      <path d="M64 78h226a12 12 0 0 1 12 12v14a12 12 0 0 1-12 12H80l-16 12V78Z" fill="#F5F0E8" />
      <text x="84" y="97" fontSize="11.5" fill="#2D2D2D">
        Is it normal to feel a little
      </text>
      <text x="84" y="112" fontSize="11.5" fill="#2D2D2D">
        nauseous the first week?
      </text>
      <text x="64" y="132" fontSize="9" fill="#B4AC9C">
        10:41 AM
      </text>
      <path d="M336 150H110a12 12 0 0 0-12 12v14a12 12 0 0 0 12 12h226l16 12v-38a12 12 0 0 0-12-12Z" fill="#F3EFE4" filter={`url(#${uid}-cc-shadow)`} />
      <text x="330" y="169" fontSize="11.5" fill="#111111" textAnchor="end">
        That&apos;s common and usually
      </text>
      <text x="330" y="184" fontSize="11.5" fill="#111111" textAnchor="end">
        fades within 10–14 days.
      </text>
      <text x="316" y="204" fontSize="9" fill="#8A8477" textAnchor="end">
        10:43 AM
      </text>
      <path d="M322 204l3 3 6-6" stroke="#C4A265" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="30" y="222" width="58" height="28" rx="14" fill="#F5F0E8" />
      <circle cx="48" cy="236" r="3" fill="#B4AC9C" />
      <circle cx="58" cy="236" r="3" fill="#B4AC9C" opacity="0.7" />
      <circle cx="68" cy="236" r="3" fill="#B4AC9C" opacity="0.4" />
      <rect x="20" y="262" width="360" height="26" rx="13" fill="#FAF9F6" stroke="#EDE9DF" strokeWidth="1.5" />
      <text x="34" y="279" fontSize="10.5" fill="#B4AC9C">
        Message clinician…
      </text>
      <circle cx="358" cy="275" r="14" fill="#C4A265" filter={`url(#${uid}-cc-shadow)`} />
      <g transform="translate(351 267)" stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 8L16 0.5 9.5 16 7 9.5 0 8Z" />
      </g>
    </svg>
  );
}

function TicketPlan({ uid = "plan" }: { uid?: string }) {
  return (
    <svg viewBox="0 0 400 300" className="ticket-art" fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id={`${uid}-tt-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#111111" floodOpacity="0.06" />
        </filter>
      </defs>
      <rect width="400" height="300" rx="20" fill="#ffffff" />
      <text x="30" y="40" fontSize="21" fontWeight="600" fill="#2D2D2D" fontFamily="serif">
        Treatment Plan
      </text>
      <g filter={`url(#${uid}-tt-shadow)`}>
        <rect x="286" y="18" width="84" height="26" rx="13" fill="#F3EFE4" />
        <text x="328" y="35" fontSize="10.5" fontWeight="700" fill="#111111" textAnchor="middle">
          Day 3 / 30
        </text>
      </g>
      <line x1="47" y1="80" x2="47" y2="256" stroke="#E8E3D4" strokeWidth="2" />
      <line x1="47" y1="80" x2="47" y2="146" stroke="#C4A265" strokeWidth="2" />
      <circle cx="47" cy="80" r="18" fill="#C4A265" filter={`url(#${uid}-tt-shadow)`} />
      <g transform="translate(38 71)" stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinejoin="round">
        <rect x="0" y="2" width="13" height="10" rx="1.5" />
        <path d="M13 6h5l3 3.5V12h-8z" />
        <circle cx="4" cy="14.5" r="2" />
        <circle cx="17" cy="14.5" r="2" />
      </g>
      <rect x="80" y="60" width="290" height="46" rx="12" fill="#FAF9F6" stroke="#F3EFE4" strokeWidth="1.5" />
      <text x="94" y="80" fontSize="14" fontWeight="600" fill="#2D2D2D">
        Medication Shipped
      </text>
      <text x="94" y="96" fontSize="11.5" fill="#8A8477">
        Arriving tomorrow · FedEx cold-chain
      </text>
      <circle cx="47" cy="150" r="18" fill="#EDE9DF" />
      <g transform="translate(38 141)">
        <rect width="18" height="16" y="2" rx="3" fill="none" stroke="#8A8477" strokeWidth="1.6" />
        <path d="M0 7h18" stroke="#8A8477" strokeWidth="1.6" />
        <path d="M5 0v4M13 0v4" stroke="#8A8477" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <rect x="80" y="130" width="290" height="46" rx="12" fill="#FAF9F6" stroke="#EDE9DF" strokeWidth="1.5" />
      <text x="94" y="150" fontSize="14" fontWeight="600" fill="#2D2D2D">
        First Dose
      </text>
      <text x="94" y="166" fontSize="11.5" fill="#8A8477">
        Scheduled for Friday, 8:00 AM
      </text>
      <circle cx="47" cy="220" r="18" fill="#EDE9DF" />
      <g transform="translate(38 211)" stroke="#8A8477" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="1" width="14" height="17" rx="2.4" />
        <path d="M6.5 1V0.2a1.2 1.2 0 0 1 1.2-1.2h2.6a1.2 1.2 0 0 1 1.2 1.2V1" />
        <path d="M6 10l2.2 2.2L13 7.7" />
      </g>
      <rect x="80" y="200" width="290" height="46" rx="12" fill="#FAF9F6" stroke="#EDE9DF" strokeWidth="1.5" />
      <text x="94" y="220" fontSize="14" fontWeight="600" fill="#2D2D2D">
        Follow-up Check In
      </text>
      <text x="94" y="236" fontSize="11.5" fill="#8A8477">
        In 2 weeks · clinician follow-up
      </text>
    </svg>
  );
}

function StepArrow() {
  return (
    <span className="step-dot" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 12h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function HowItWorks() {
  return (
    <section className="section white center" id="how-it-works">
      <Reveal className="wrap how-wrap">
        <h2>
          How it <span className="accent">works.</span>
        </h2>
        <p className="lede">A clinical protocol designed for seamless access to premium healthcare. No confusion or delays.</p>
        <div className="steps">
          <div className="steps-line" aria-hidden="true" />
          <article className="step">
            <div className="ticket-wrap">
              <div className="ticket cut-tr">
                <TicketForm uid="desk-form" />
              </div>
              <StepArrow />
            </div>
            <div className="step-copy">
              <div className="step-badge">Step 1</div>
              <h3>Health Profile</h3>
              <p>Fill out a quick questionnaire. Payment is only charged after your treatment plan is approved.</p>
            </div>
          </article>
          <article className="step">
            <div className="ticket-wrap">
              <div className="ticket cut-tl">
                <TicketChat uid="desk-chat" />
              </div>
              <StepArrow />
            </div>
            <div className="step-copy">
              <div className="step-badge">Step 2</div>
              <h3>Doctor Review & Chat</h3>
              <p>A licensed provider will carefully review your information and chat with you to create a plan.</p>
            </div>
          </article>
          <article className="step">
            <div className="ticket-wrap">
              <div className="ticket cut-tr">
                <TicketPlan uid="desk-plan" />
              </div>
            </div>
            <div className="step-copy">
              <div className="step-badge">Step 3</div>
              <h3>Begin Your Treatment</h3>
              <p>Your personalized plan is delivered. Begin your treatment with ongoing support from our team.</p>
            </div>
          </article>
        </div>
        <SlideShow className="how-slideshow" autoplayMs={4200}>
          {[
            <article className="how-slide-card cut-tr" key="s1">
              <div className="how-slide-art">
                <TicketForm uid="mob-form" />
              </div>
              <div className="step-copy">
                <div className="step-badge">Step 1</div>
                <h3>Health Profile</h3>
                <p>Fill out a quick questionnaire. Payment is only charged after your treatment plan is approved.</p>
              </div>
            </article>,
            <article className="how-slide-card cut-tl" key="s2">
              <div className="how-slide-art">
                <TicketChat uid="mob-chat" />
              </div>
              <div className="step-copy">
                <div className="step-badge">Step 2</div>
                <h3>Doctor Review & Chat</h3>
                <p>A licensed provider will carefully review your information and chat with you to create a plan.</p>
              </div>
            </article>,
            <article className="how-slide-card cut-tr" key="s3">
              <div className="how-slide-art">
                <TicketPlan uid="mob-plan" />
              </div>
              <div className="step-copy">
                <div className="step-badge">Step 3</div>
                <h3>Begin Your Treatment</h3>
                <p>Your personalized plan is delivered. Begin your treatment with ongoing support from our team.</p>
              </div>
            </article>,
          ]}
        </SlideShow>
      </Reveal>
    </section>
  );
}
