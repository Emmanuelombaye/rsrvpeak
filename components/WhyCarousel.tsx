import { Reveal } from "@/components/Reveal";
import { SnapPager } from "@/components/SnapPager";
import { withBase } from "@/lib/paths";

const reasons = [
  {
    title: "Transparent & Trusted",
    copy: "From ingredient sourcing to doorstep delivery, we prioritize pharmaceutical-grade quality and complete transparency.",
    icon: "grid" as const,
    pos: "tl",
  },
  {
    title: "Tailored Care",
    copy: "We create tailored plans based on your health goals, ensuring the best path to your success and well-being.",
    icon: "atom" as const,
    pos: "tr",
  },
  {
    title: "Science-backed",
    copy: "Clinically guided care designed to support long-term health, performance, and overall physical wellbeing.",
    icon: "flask" as const,
    pos: "bl",
  },
  {
    title: "Cold-Chain Delivery",
    copy: "Medications are shipped overnight in temperature-controlled packaging to ensure absolute efficacy upon arrival.",
    icon: "plus" as const,
    pos: "br",
  },
];

function Icon({ name }: { name: (typeof reasons)[number]["icon"] }) {
  if (name === "atom") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
      </svg>
    );
  }
  if (name === "flask") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3h6" />
        <path d="M10 3v6.2L5.4 17a3 3 0 0 0 2.5 4.6h8.2A3 3 0 0 0 18.6 17L14 9.2V3" />
        <path d="M8.2 14h7.6" />
      </svg>
    );
  }
  if (name === "plus") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18" />
        <path d="M3 12h18" />
        <path d="m18 6-6 6" />
        <path d="m6 18 6-6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="16" cy="8" r="2.5" />
      <circle cx="8" cy="16" r="2.5" />
      <circle cx="16" cy="16" r="2.5" />
    </svg>
  );
}

export function WhyCarousel() {
  return (
    <section className="section why center" id="why">
      <div className="why-glow" aria-hidden="true" />
      <Reveal className="wrap">
        <h2>
          Why <span className="accent">RSRV?</span>
        </h2>
        <p className="lede">
          A daily combination of medical-grade treatments designed to support longevity, maintain metabolic balance, and
          help you feel consistently well.
        </p>
      </Reveal>
      <div className="why-stage">
        <div className="why-product">
          <img src={withBase("/assets/peakcare/product-delivery-box.png")} alt="RSRV treatment box" />
        </div>
        {reasons.map((reason) => (
          <article className={`why-card ${reason.pos}`} key={reason.title}>
            <span className="why-shine" aria-hidden="true" />
            <span className="why-notch" aria-hidden="true" />
            <div className="why-icon">
              <Icon name={reason.icon} />
            </div>
            <h3>{reason.title}</h3>
            <p>{reason.copy}</p>
          </article>
        ))}
      </div>
      <div className="why-mobile">
        <div className="why-product">
          <img src={withBase("/assets/peakcare/product-delivery-box.png")} alt="RSRV treatment box" />
        </div>
        <SnapPager className="why-mobile-pager" count={reasons.length}>
          {reasons.map((reason) => (
            <article className="why-card" key={`${reason.title}-m`}>
              <span className="why-shine" aria-hidden="true" />
              <div className="why-icon">
                <Icon name={reason.icon} />
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.copy}</p>
            </article>
          ))}
        </SnapPager>
      </div>
    </section>
  );
}
