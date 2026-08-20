"use client";

import Link from "next/link";
import { useState } from "react";
import { withBase } from "@/lib/paths";

function TickerRow() {
  return (
    <div className="ticker-row">
      <span className="ticker-item">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3l7 3v6c0 5-3.4 8.4-7 9.5C8.4 20.4 5 17 5 12V6l7-3z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        U.S. Licensed Pharmacies
      </span>
      <span className="ticker-item">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        Licensed U.S. Providers
      </span>
      <span className="ticker-item">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12l16-7-7 16-2.2-6.8L4 12z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        Free Expedited Shipping
      </span>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="ticker">
        <div className="ticker-track">
          <TickerRow />
          <TickerRow />
          <TickerRow />
          <TickerRow />
        </div>
      </div>
      <div className="header-bar">
        <header className="header">
          <button className="menu-btn" type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <span />
            <span />
            <span />
          </button>
          <Link className="logo" href="/" aria-label="RSRV home">
            <img src={withBase("/logos/rsrv-wordmark.svg")} alt="RSRV" />
          </Link>
          <nav className="nav">
            <Link href="/shop">TREATMENTS</Link>
            <Link href="/shop">SHOP</Link>
          </nav>
        </header>
      </div>
      <div className={`menu${open ? " open" : ""}`}>
        <button className="menu-backdrop" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />
        <aside className="menu-panel">
          <button className="menu-close" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
            Close
          </button>
          <Link href="/shop" onClick={() => setOpen(false)}>
            Treatments
          </Link>
          <Link href="/shop" onClick={() => setOpen(false)}>
            Shop
          </Link>
          <Link href="/#how-it-works" onClick={() => setOpen(false)}>
            How it works
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <Link href="/documents" onClick={() => setOpen(false)}>
            Documents
          </Link>
          <Link href="/#faq" onClick={() => setOpen(false)}>
            FAQs
          </Link>
        </aside>
      </div>
    </>
  );
}
