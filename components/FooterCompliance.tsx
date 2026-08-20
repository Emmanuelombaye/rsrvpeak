"use client";

import { useRef } from "react";
import Link from "next/link";

function UsaFlag() {
  return (
    <svg viewBox="0 0 60 40" className="compliance-flag" aria-hidden="true" preserveAspectRatio="none">
      {Array.from({ length: 13 }, (_, i) => (
        <rect
          key={i}
          y={i * (40 / 13)}
          width="60"
          height={40 / 13 + 0.15}
          fill={i % 2 === 0 ? "#B31942" : "#fff"}
        />
      ))}
      <rect width="24" height="21.54" fill="#4A2C73" />
    </svg>
  );
}

function Caduceus() {
  return (
    <svg viewBox="0 0 72 72" className="compliance-caduceus" aria-hidden="true">
      <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
        <path d="M36 8v52" strokeWidth="2.4" opacity="0.95" />
        <path d="M27 10h18" strokeWidth="2.2" opacity="0.9" />
        <path d="M36 16c-11-1-18 4-22 11" strokeWidth="3" opacity="0.45" />
        <path d="M36 16c11-1 18 4 22 11" strokeWidth="3" opacity="0.45" />
        <path d="M36 22c-13 7-17 15-8 22 9 7 8 11-5 17" strokeWidth="3.4" opacity="0.78" />
        <path d="M36 22c13 7 17 15 8 22-9 7-8 11 5 17" strokeWidth="3.4" opacity="0.78" />
        <path d="M22 28c8 5 14 8 28 8" strokeWidth="2.6" opacity="0.4" />
        <path d="M50 28c-8 5-14 8-28 8" strokeWidth="2.6" opacity="0.4" />
      </g>
    </svg>
  );
}

export function FooterCompliance() {
  const track = useRef<HTMLDivElement>(null);

  function move(dir: number) {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="compliance">
      <button className="compliance-nav" type="button" aria-label="Previous compliance badge" onClick={() => move(-1)}>
        ‹
      </button>
      <div className="compliance-track" ref={track}>
        <Link className="compliance-item" href="/disclaimer">
          <div className="compliance-icon flag">
            <UsaFlag />
          </div>
          <div className="compliance-copy">
            <span>Compounded by</span>
            <strong>Licensed Pharmacies in the USA</strong>
          </div>
        </Link>
        <Link className="compliance-item" href="/hipaa">
          <div className="compliance-icon caduceus">
            <Caduceus />
          </div>
          <div className="compliance-copy hipaa">
            <span>Data protected</span>
            <b>HIPAA</b>
            <em>Compliant</em>
          </div>
        </Link>
      </div>
      <button className="compliance-nav" type="button" aria-label="Next compliance badge" onClick={() => move(1)}>
        ›
      </button>
    </div>
  );
}
