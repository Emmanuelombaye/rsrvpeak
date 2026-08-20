"use client";

import { FaqList } from "@/components/FaqList";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { products } from "@/lib/data";
import { withBase } from "@/lib/paths";

function shopPrice(price: string) {
  return price.replace(".00", "").replace("/mo", "");
}

export function ProductDetail({ product }: { product: Product }) {
  const [open, setOpen] = useState("overview");
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 2);
  const price = shopPrice(product.price);
  const sections = [
    { id: "overview", title: "Product Overview", copy: product.overview },
    {
      id: "ingredients",
      title: "Ingredients & Formulation",
      copy: "Prepared by a state-licensed U.S. compounding pharmacy. Exact strength and dosing are determined by your licensed clinician after intake.",
    },
    { id: "admin", title: "Administration & Guidance", copy: product.admin },
  ];

  return (
    <main>
      <section className="wrap pdp">
        <div className="pdp-visual">
          <img src={withBase(product.img)} alt={product.name} />
        </div>
        <div className="pdp-copy">
          <nav className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/shop">Treatments</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>
          <p className="eyebrow">Treatment Protocol</p>
          <h1>{product.name}</h1>
          <p className="lede">{product.copy}</p>
          <div className="pdp-price">
            <strong>{price}</strong>
            <span>USD</span>
          </div>
          <p className="lede">Includes clinical consultation & overnight shipping</p>
          <Link className="btn btn-primary" href={`/checkout?product=${product.slug}`}>
            Start Medical Intake
          </Link>
          <div className="pdp-acc">
            {sections.map((section) => (
              <div key={section.id} className={open === section.id ? "open" : ""}>
                <button type="button" onClick={() => setOpen(open === section.id ? "" : section.id)}>
                  {section.title}
                </button>
                {open === section.id ? <p>{section.copy}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap related">
        <div className="related-head">
          <h2>Related Protocols</h2>
          <Link href="/shop">View All Protocols</Link>
        </div>
        <div className="grid-3 related-grid">
          {related.map((item) => (
            <article className="product-card" key={item.slug}>
              <div className="product-pills">
                {item.pills.map((pill) => (
                  <span className={pill === "Best Seller" ? "tag-pill white" : "tag-pill beige"} key={pill}>
                    {pill}
                  </span>
                ))}
              </div>
              <Link href={item.href} className="product-shot">
                <img src={withBase(item.img)} alt={item.name} />
              </Link>
              <div className="product-head">
                <h3>{item.name}</h3>
                <p className="product-price">
                  <span>Starting at</span>
                  {shopPrice(item.price)}
                </p>
              </div>
              <p>{item.copy}</p>
              <p>{item.available}</p>
              <div className="product-actions">
                <Link className="btn btn-primary" href={`/checkout?product=${item.slug}`}>
                  See if I qualify
                </Link>
                <Link className="btn btn-ghost" href={item.href}>
                  Learn more
                </Link>
              </div>
              <p className="product-note">*New Patients, 6-month plan</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section" id="faq">
        <FaqList />
      </section>
    </main>
  );
}
