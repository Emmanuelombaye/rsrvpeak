"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

export function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div className="wrap faq">
      <p className="faq-kicker">Questions?</p>
      <h2>We have answers.</h2>
      {faqs.map((item, n) => (
        <div key={item.q} className={`faq-item${open === n ? " open" : ""}`}>
          <button type="button" aria-expanded={open === n} onClick={() => setOpen(open === n ? -1 : n)}>
            <span>{item.q}</span>
            <span className="faq-chevron" aria-hidden="true">
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          <div className="a">{item.a}</div>
        </div>
      ))}
    </div>
  );
}
