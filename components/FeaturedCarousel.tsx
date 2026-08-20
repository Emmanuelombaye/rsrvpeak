"use client";

import Link from "next/link";
import { useState } from "react";
import { withBase } from "@/lib/paths";

const slides = [
  {
    img: "/assets/peakcare/tirzepatide.png",
    alt: "Tirzepatide (GLP-1) Therapy",
    href: "/tirzepatide",
    cta: "Featured: Tirzepatide Therapy",
  },
  {
    img: "/assets/peakcare/semaglutide.png",
    alt: "Semaglutide (GLP-1) Therapy",
    href: "/semaglutide",
    cta: "Featured: Semaglutide (GLP-1) Therapy",
  },
];

export function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const last = slides.length - 1;

  return (
    <article className="card card-product">
      <div className="arrows">
        <button
          className="arrow"
          type="button"
          aria-label="Previous Slide"
          onClick={() => setIndex((value) => (value === 0 ? last : value - 1))}
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <button
          className="arrow"
          type="button"
          aria-label="Next Slide"
          onClick={() => setIndex((value) => (value === last ? 0 : value + 1))}
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>
      {slides.map((slide, n) => (
        <div key={slide.alt} className={`slide${n === index ? " active" : ""}`}>
          <div className="vial-wrap">
            <img src={withBase(slide.img)} alt={slide.alt} />
          </div>
          <div className="product-footer">
            <Link className="pill" href={slide.href}>
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}
      <div className="product-footer" style={{ pointerEvents: "none" }}>
        <span />
        <div className="dots" style={{ pointerEvents: "auto" }}>
          {slides.map((slide, n) => (
            <span key={slide.alt} className={n === index ? "active" : ""} />
          ))}
        </div>
      </div>
    </article>
  );
}
