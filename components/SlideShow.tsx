"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function SlideShow({
  children,
  className = "",
  autoplayMs = 4500,
}: {
  children: ReactNode[];
  className?: string;
  autoplayMs?: number;
}) {
  const count = children.length;
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    if (count < 2 || autoplayMs <= 0) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % count);
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [count, autoplayMs, index]);

  function go(next: number) {
    setIndex((next + count) % count);
  }

  return (
    <div className={`slideshow ${className}`.trim()}>
      <div
        className="slideshow-viewport"
        onPointerDown={(event) => {
          dragging.current = true;
          startX.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (!dragging.current) return;
          dragging.current = false;
          const dx = event.clientX - startX.current;
          if (dx > 40) go(index - 1);
          else if (dx < -40) go(index + 1);
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <div className="slideshow-track" style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}>
          {children.map((child, n) => (
            <div className="slideshow-slide" key={n}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="snap-dots">
        {children.map((_, n) => (
          <button
            key={n}
            type="button"
            className={n === index ? "active" : ""}
            aria-label={`Show slide ${n + 1}`}
            onClick={() => go(n)}
          />
        ))}
      </div>
    </div>
  );
}
