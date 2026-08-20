"use client";

import Link from "next/link";
import { useState } from "react";
import { shopProtocols } from "@/lib/data";
import { withBase } from "@/lib/paths";

export function ProtocolPicker() {
  const [index, setIndex] = useState(0);
  const item = shopProtocols[index];
  const watermark = item.name.split(" ")[0].replace("+", "").toUpperCase();
  const price = item.price.replace(".00", "");

  return (
    <section className="protocol-stage" id="shop">
      <div className="protocol-inner">
        <h2 className="watermark">{watermark}</h2>
        <h2 className="protocol-title">Shop our best protocols</h2>
        <div className="protocol-meta">
          <div className="eyebrow">{item.category}</div>
          <h3>{item.name}</h3>
          <div className="eyebrow">Prescription Grade Protocol</div>
        </div>
        <Link href={item.href} className="protocol-visual">
          <img src={withBase(item.img)} alt={item.name} />
        </Link>
        <div className="protocol-bottom">
          <div className="thumbs">
            {shopProtocols.map((protocol, n) => (
              <button
                key={protocol.slug}
                type="button"
                className={n === index ? "active" : ""}
                aria-label={`Select ${protocol.name}`}
                onClick={() => setIndex(n)}
              >
                <img src={withBase(protocol.img)} alt={protocol.name} />
              </button>
            ))}
          </div>
          <div className="protocol-card">
            <div className="price">
              <span>Starting at</span>
              {price}
            </div>
            <p className="lede">{item.copy}</p>
        <Link className="btn btn-primary" href={`/checkout?product=${item.slug}`}>
          Start Treatment
        </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
