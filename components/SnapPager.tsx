"use client";

import { useRef, useState, type ReactNode } from "react";

export function SnapPager({
  children,
  count,
  className = "",
  trackClassName = "snap-track",
}: {
  children: ReactNode;
  count: number;
  className?: string;
  trackClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function onScroll() {
    const el = ref.current;
    if (!el) return;
    const width = el.clientWidth;
    if (!width) return;
    setIndex(Math.round(el.scrollLeft / width));
  }

  return (
    <div className={className}>
      <div className={trackClassName} ref={ref} onScroll={onScroll}>
        {children}
      </div>
      <div className="snap-dots">
        {Array.from({ length: count }, (_, n) => (
          <button
            key={n}
            type="button"
            className={n === index ? "active" : ""}
            aria-label={`Show slide ${n + 1}`}
            onClick={() => ref.current?.scrollTo({ left: n * (ref.current.clientWidth || 0), behavior: "smooth" })}
          />
        ))}
      </div>
    </div>
  );
}
