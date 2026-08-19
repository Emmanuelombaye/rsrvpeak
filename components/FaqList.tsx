"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

export function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div className="wrap faq">
      <p className="lede">Questions?</p>
      <h2>We have answers.</h2>
      {faqs.map((item, n) => (
        <div key={item.q} className={`faq-item${open === n ? " open" : ""}`}>
          <button type="button" onClick={() => setOpen(open === n ? -1 : n)}>
            {item.q}
          </button>
          <div className="a">{item.a}</div>
        </div>
      ))}
    </div>
  );
}
