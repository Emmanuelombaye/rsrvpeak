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

  function slides() {
    const el = ref.current;
    if (!el) return [];
    return [...el.children].filter((node): node is HTMLElement => {
      if (!(node instanceof HTMLElement)) return false;
      const style = window.getComputedStyle(node);
      return style.display !== "none" && node.offsetWidth > 24;
    });
  }

  function onScroll() {
    const el = ref.current;
    const kids = slides();
    if (!el || !kids.length) return;
    let best = 0;
    let bestDist = Infinity;
    kids.forEach((kid, n) => {
      const dist = Math.abs(kid.offsetLeft - el.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = n;
      }
    });
    setIndex(best);
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
            onClick={() => slides()[n]?.scrollIntoView({ inline: "start", block: "nearest", behavior: "smooth" })}
          />
        ))}
      </div>
    </div>
  );
}
