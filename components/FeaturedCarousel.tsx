"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { withBase } from "@/lib/paths";

const slides = [
  {
    type: "lifestyle" as const,
    img: "/assets/peakcare/lifestyle-slider-1.png",
    alt: "Empty RSRV consultation suite",
    kicker: "Physician-prescribed protocol",
    title: "Medical Weight Loss",
    href: "/shop",
    cta: "Explore Protocol",
  },
  {
    type: "product" as const,
    img: "/assets/peakcare/tirzepatide.png",
    alt: "Tirzepatide (GLP-1) Therapy",
    href: "/tirzepatide",
    cta: "Featured: Tirzepatide Therapy",
  },
  {
    type: "product" as const,
    img: "/assets/peakcare/semaglutide.png",
    alt: "Semaglutide (GLP-1) Therapy",
    href: "/semaglutide",
    cta: "Featured: Semaglutide (GLP-1) Therapy",
  },
];

export function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const last = slides.length - 1;

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((value) => (value === last ? 0 : value + 1));
    }, 4200);
    return () => window.clearInterval(id);
  }, [index, last]);

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
      <div className="slide-track" style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}>
        {slides.map((slide) => (
          <div key={slide.alt} className={`slide${slide.type === "lifestyle" ? " slide-lifestyle" : ""}`}>
            {slide.type === "lifestyle" ? (
              <>
                <img src={withBase(slide.img)} alt={slide.alt} />
                <div className="shade" />
                <span className="kicker-white">{slide.kicker}</span>
                <h3>{slide.title}</h3>
                <Link className="explore" href={slide.href}>
                  {slide.cta}
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 12L12 4M12 4H6.5M12 4v5.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </Link>
              </>
            ) : (
              <>
                <div className="vial-wrap">
                  <img src={withBase(slide.img)} alt={slide.alt} />
                </div>
                <div className="product-footer">
                  <Link className="pill" href={slide.href}>
                    {slide.cta}
                  </Link>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="product-footer" style={{ pointerEvents: "none" }}>
        <span />
        <div className="dots" style={{ pointerEvents: "auto" }}>
          {slides.map((slide, n) => (
            <button
              key={slide.alt}
              type="button"
              className={n === index ? "active" : ""}
              aria-label={`Show ${slide.alt}`}
              onClick={() => setIndex(n)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
