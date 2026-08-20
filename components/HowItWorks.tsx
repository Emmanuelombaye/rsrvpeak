import { Reveal } from "@/components/Reveal";
import { SlideShow } from "@/components/SlideShow";

const gold = "#C4A265";
const ivory = "#F3F1EC";
const mute = "#B8AFA0";
const field = "#1C1914";
const line = "#3A3224";

function TicketForm({ uid = "form" }: { uid?: string }) {
  return (
    <svg viewBox="0 0 400 300" className="ticket-art" fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`${uid}-formGrad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#161410" />
          <stop offset="100%" stopColor="#0C0B09" />
        </linearGradient>
        <radialGradient id={`${uid}-formBlob`} cx="0.1" cy="0" r="1">
          <stop offset="0%" stopColor="#C4A265" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#C4A265" stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-ff-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#C4A265" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect width="400" height="300" rx="18" fill={`url(#${uid}-formGrad)`} />
      <circle cx="36" cy="12" r="110" fill={`url(#${uid}-formBlob)`} />
      <rect x="0.75" y="0.75" width="398.5" height="298.5" rx="17.2" stroke={gold} strokeOpacity="0.22" />
      <text x="28" y="44" fontSize="22" fontWeight="600" fill={ivory} fontFamily="Georgia, serif">
        Health Questionnaire
      </text>
      <text x="28" y="64" fontSize="12" fill={mute}>
        Two minutes. Reviewed by a licensed clinician.
      </text>
      <rect x="28" y="78" width="166" height="48" rx="12" fill={field} stroke={line} />
      <text x="40" y="96" fontSize="10" fontWeight="700" letterSpacing="1.2" fill={gold}>
        FIRST NAME
      </text>
      <rect x="40" y="104" width="88" height="8" rx="4" fill="#C4A265" fillOpacity="0.35" />
      <rect x="206" y="78" width="166" height="48" rx="12" fill={field} stroke={line} />
      <text x="218" y="96" fontSize="10" fontWeight="700" letterSpacing="1.2" fill={gold}>
        LAST NAME
      </text>
      <rect x="218" y="104" width="88" height="8" rx="4" fill="#C4A265" fillOpacity="0.35" />
      <rect x="28" y="136" width="344" height="48" rx="12" fill={field} stroke={line} />
      <text x="40" y="154" fontSize="10" fontWeight="700" letterSpacing="1.2" fill={gold}>
        DATE OF BIRTH
      </text>
      <rect x="40" y="162" width="120" height="8" rx="4" fill="#C4A265" fillOpacity="0.28" />
      <g transform="translate(338 148)" stroke={gold} fill="none">
        <rect width="18" height="16" y="2" rx="3" strokeWidth="1.6" />
        <path d="M0 7h18" strokeWidth="1.6" />
        <path d="M5 0v4M13 0v4" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <rect x="28" y="194" width="344" height="48" rx="12" fill={field} stroke={line} />
      <text x="40" y="212" fontSize="10" fontWeight="700" letterSpacing="1.2" fill={gold}>
        PRIMARY GOAL
      </text>
      <text x="40" y="228" fontSize="12" fill={ivory}>
        Medical weight management
      </text>
      <path d="M338 212l4 4 4-4" stroke={gold} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <rect x="28" y="252" width="344" height="32" rx="16" fill={gold} filter={`url(#${uid}-ff-shadow)`} />
      <text x="200" y="273" fontSize="14" fontWeight="700" fill="#111111" textAnchor="middle">
        Submit Profile
      </text>
      <g filter={`url(#${uid}-ff-shadow)`}>
        <rect x="252" y="16" width="120" height="28" rx="14" fill="#1A1712" stroke={gold} strokeOpacity="0.45" />
        <circle cx="270" cy="30" r="4.5" fill={gold} />
        <text x="282" y="34" fontSize="11" fontWeight="600" fill={ivory}>
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
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.45" />
        </filter>
        <linearGradient id={`${uid}-avatarGrad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E0C48A" />
          <stop offset="100%" stopColor="#C4A265" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" rx="18" fill="#0C0B09" />
      <rect x="0.75" y="0.75" width="398.5" height="298.5" rx="17.2" stroke={gold} strokeOpacity="0.22" />
      <circle cx="46" cy="34" r="16" fill={`url(#${uid}-avatarGrad)`} />
      <text x="46" y="39" fontSize="12" fontWeight="700" fill="#111111" textAnchor="middle">
        CL
      </text>
      <text x="70" y="31" fontSize="15" fontWeight="600" fill={ivory}>
        Clinician
      </text>
      <circle cx="72" cy="43" r="3.2" fill={gold} />
      <text x="82" y="47" fontSize="11" fill={mute}>
        Online now
      </text>
      <line x1="20" y1="60" x2="380" y2="60" stroke={line} strokeWidth="1.2" />
      <circle cx="46" cy="90" r="14" fill="#2A241C" stroke={gold} strokeOpacity="0.5" />
      <text x="46" y="95" fontSize="10" fontWeight="700" fill={ivory} textAnchor="middle">
        JD
      </text>
      <path d="M64 76h230a12 12 0 0 1 12 12v16a12 12 0 0 1-12 12H80l-16 12V76Z" fill="#1C1914" stroke={line} />
      <text x="84" y="96" fontSize="13" fill={ivory}>
        Is it normal to feel a little
      </text>
      <text x="84" y="113" fontSize="13" fill={ivory}>
        nauseous the first week?
      </text>
      <text x="64" y="134" fontSize="10" fill={mute}>
        10:41 AM
      </text>
      <path
        d="M336 148H108a12 12 0 0 0-12 12v16a12 12 0 0 0 12 12h228l16 12v-40a12 12 0 0 0-12-12Z"
        fill="#241E16"
        stroke={gold}
        strokeOpacity="0.35"
        filter={`url(#${uid}-cc-shadow)`}
      />
      <text x="328" y="168" fontSize="13" fill={ivory} textAnchor="end">
        That’s common and usually
      </text>
      <text x="328" y="185" fontSize="13" fill={ivory} textAnchor="end">
        fades within 10–14 days.
      </text>
      <text x="316" y="206" fontSize="10" fill={mute} textAnchor="end">
        10:43 AM
      </text>
      <path d="M322 206l3 3 6-6" stroke={gold} strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <rect x="28" y="220" width="58" height="26" rx="13" fill="#1C1914" stroke={line} />
      <circle cx="46" cy="233" r="3" fill={gold} />
      <circle cx="58" cy="233" r="3" fill={gold} opacity="0.55" />
      <circle cx="70" cy="233" r="3" fill={gold} opacity="0.28" />
      <rect x="20" y="258" width="360" height="28" rx="14" fill="#141210" stroke={line} />
      <text x="34" y="277" fontSize="12" fill={mute}>
        Message clinician…
      </text>
      <circle cx="358" cy="272" r="14" fill={gold} filter={`url(#${uid}-cc-shadow)`} />
      <g transform="translate(351 264)" stroke="#111111" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <rect width="400" height="300" rx="18" fill="#0C0B09" />
      <rect x="0.75" y="0.75" width="398.5" height="298.5" rx="17.2" stroke={gold} strokeOpacity="0.22" />
      <text x="28" y="42" fontSize="22" fontWeight="600" fill={ivory} fontFamily="Georgia, serif">
        Treatment Plan
      </text>
      <g filter={`url(#${uid}-tt-shadow)`}>
        <rect x="278" y="18" width="94" height="26" rx="13" fill="#1C1914" stroke={gold} strokeOpacity="0.4" />
        <text x="325" y="36" fontSize="11" fontWeight="700" fill={gold} textAnchor="middle">
          Day 3 / 30
        </text>
      </g>
      <line x1="47" y1="78" x2="47" y2="256" stroke={line} strokeWidth="2" />
      <line x1="47" y1="78" x2="47" y2="146" stroke={gold} strokeWidth="2" />
      <circle cx="47" cy="78" r="17" fill={gold} filter={`url(#${uid}-tt-shadow)`} />
      <g transform="translate(38 69)" stroke="#111111" strokeWidth="1.6" fill="none" strokeLinejoin="round">
        <rect x="0" y="2" width="13" height="10" rx="1.5" />
        <path d="M13 6h5l3 3.5V12h-8z" />
        <circle cx="4" cy="14.5" r="2" />
        <circle cx="17" cy="14.5" r="2" />
      </g>
      <rect x="78" y="58" width="294" height="48" rx="12" fill={field} stroke={gold} strokeOpacity="0.28" />
      <text x="92" y="78" fontSize="15" fontWeight="600" fill={ivory}>
        Medication shipped
      </text>
      <text x="92" y="96" fontSize="12" fill={mute}>
        Arriving tomorrow · FedEx cold-chain
      </text>
      <circle cx="47" cy="148" r="17" fill="#1C1914" stroke={gold} strokeOpacity="0.45" />
      <g transform="translate(38 139)" stroke={gold} fill="none">
        <rect width="18" height="16" y="2" rx="3" strokeWidth="1.6" />
        <path d="M0 7h18" strokeWidth="1.6" />
        <path d="M5 0v4M13 0v4" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <rect x="78" y="128" width="294" height="48" rx="12" fill={field} stroke={line} />
      <text x="92" y="148" fontSize="15" fontWeight="600" fill={ivory}>
        First dose
      </text>
      <text x="92" y="166" fontSize="12" fill={mute}>
        Scheduled Friday, 8:00 AM
      </text>
      <circle cx="47" cy="218" r="17" fill="#1C1914" stroke={gold} strokeOpacity="0.45" />
      <g transform="translate(38 209)" stroke={gold} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="1" width="14" height="17" rx="2.4" />
        <path d="M6.5 1V0.2a1.2 1.2 0 0 1 1.2-1.2h2.6a1.2 1.2 0 0 1 1.2 1.2V1" />
        <path d="M6 10l2.2 2.2L13 7.7" />
      </g>
      <rect x="78" y="198" width="294" height="48" rx="12" fill={field} stroke={line} />
      <text x="92" y="218" fontSize="15" fontWeight="600" fill={ivory}>
        Follow-up check-in
      </text>
      <text x="92" y="236" fontSize="12" fill={mute}>
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
    <section className="section how-dark center" id="how-it-works">
      <Reveal className="wrap how-wrap">
        <h2>
          How it <span className="accent">works.</span>
        </h2>
        <p className="lede">
          Reserved clinical access. Complete your intake, receive a licensed review, and if approved, medication ships
          overnight — cold-chain.
        </p>
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
              <div className="step-badge">Step 01</div>
              <h3>Health Profile</h3>
              <p>A two-minute questionnaire. You are billed only after a licensed clinician approves your plan.</p>
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
              <div className="step-badge">Step 02</div>
              <h3>Clinician Review</h3>
              <p>A licensed U.S. provider reviews your history and messages you with a personalized protocol.</p>
            </div>
          </article>
          <article className="step">
            <div className="ticket-wrap">
              <div className="ticket cut-tr">
                <TicketPlan uid="desk-plan" />
              </div>
            </div>
            <div className="step-copy">
              <div className="step-badge">Step 03</div>
              <h3>Begin Treatment</h3>
              <p>Medication ships overnight, temperature-controlled, with scheduled follow-up from your care team.</p>
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
                <div className="step-badge">Step 01</div>
                <h3>Health Profile</h3>
                <p>A two-minute questionnaire. You are billed only after a licensed clinician approves your plan.</p>
              </div>
            </article>,
            <article className="how-slide-card cut-tl" key="s2">
              <div className="how-slide-art">
                <TicketChat uid="mob-chat" />
              </div>
              <div className="step-copy">
                <div className="step-badge">Step 02</div>
                <h3>Clinician Review</h3>
                <p>A licensed U.S. provider reviews your history and messages you with a personalized protocol.</p>
              </div>
            </article>,
            <article className="how-slide-card cut-tr" key="s3">
              <div className="how-slide-art">
                <TicketPlan uid="mob-plan" />
              </div>
              <div className="step-copy">
                <div className="step-badge">Step 03</div>
                <h3>Begin Treatment</h3>
                <p>Medication ships overnight, temperature-controlled, with scheduled follow-up from your care team.</p>
              </div>
            </article>,
          ]}
        </SlideShow>
      </Reveal>
    </section>
  );
}
