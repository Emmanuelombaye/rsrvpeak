"use client";

import Link from "next/link";
import { useState } from "react";
import { shopProtocols } from "@/lib/data";
import { withBase } from "@/lib/paths";

export function ProtocolPicker() {
  const [index, setIndex] = useState(0);
  const item = shopProtocols[index];

  return (
    <div className="protocols">
      <div className="protocol-visual">
        <img src={withBase(item.img)} alt={item.name} />
      </div>
      <div className="protocol-copy">
        <div className="eyebrow">General</div>
        <h3 className="display">{item.name}</h3>
        <div className="eyebrow">Prescription Grade Protocol</div>
        <div className="price">
          <span>STARTING AT</span>
          {item.price}
        </div>
        <p className="lede">{item.copy}</p>
        <div className="thumbs">
          {shopProtocols.map((protocol, n) => (
            <button
              key={protocol.slug}
              type="button"
              className={n === index ? "active" : ""}
              onClick={() => setIndex(n)}
            >
              <img src={withBase(protocol.img)} alt={protocol.name} />
            </button>
          ))}
        </div>
        <Link className="btn btn-primary" href={item.href}>
          Start Treatment
        </Link>
      </div>
    </div>
  );
}
