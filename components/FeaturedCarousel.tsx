"use client";

import Link from "next/link";
import { useState } from "react";
import { withBase } from "@/lib/paths";

const slides = [
  {
    type: "lifestyle" as const,
    img: "/assets/peakcare/lifestyle-slider-1.png",
    alt: "Medical Weight Loss",
    kicker: "Clinically Proven Protocol",
    title: "Medical Weight Loss",
    href: "/shop",
    cta: "Explore Protocol",
  },
  {
    type: "product" as const,
    img: "/assets/peakcare/semaglutide.png",
    alt: "Semaglutide+",
    href: "/semaglutide",
    cta: "Featured: Semaglutide+",
  },
  {
    type: "product" as const,
    img: "/assets/peakcare/sermorelin-brand.png",
    alt: "Sermorelin",
    href: "/sermorelin",
    cta: "Featured: Sermorelin",
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
      {slides.map((slide, n) =>
        slide.type === "lifestyle" ? (
          <div key={slide.alt} className={`slide slide-lifestyle${n === index ? " active" : ""}`}>
            <img src={withBase(slide.img)} alt={slide.alt} />
            <div className="shade" />
            <span className="kicker-white">{slide.kicker}</span>
            <h3>{slide.title}</h3>
            <Link className="explore" href={slide.href}>
              {slide.cta}
            </Link>
          </div>
        ) : (
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
        ),
      )}
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
