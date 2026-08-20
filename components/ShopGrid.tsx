"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/lib/data";
import { withBase } from "@/lib/paths";

const filters = ["All", "Weight Loss"] as const;
const shopProducts = products.filter((product) => product.pills.includes("Weight Loss"));

function shopPrice(price: string) {
  return price.replace(".00", "").replace("/mo", "");
}

export function ShopGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = useMemo(
    () =>
      filter === "All" ? shopProducts : shopProducts.filter((product) => product.pills.includes(filter) || product.category === filter),
    [filter],
  );

  return (
    <>
      <div className="shop-filters">
        {filters.map((item, i) => (
          <button
            key={item}
            type="button"
            className={`filter-pill${filter === item ? " active" : ""}`}
            onClick={() => setFilter(item)}
          >
            <em>{String(i + 1).padStart(2, "0")}</em> {item}
          </button>
        ))}
      </div>
      <section className="grid-3 shop-grid">
        {list.map((product) => (
          <article className="product-card" key={product.slug}>
            <div className="product-pills">
              {product.pills.map((pill) => (
                <span className={pill === "Best Seller" ? "tag-pill white" : "tag-pill beige"} key={pill}>
                  {pill}
                </span>
              ))}
            </div>
            <Link href={product.href} className="product-shot">
              <img src={withBase(product.img)} alt={product.name} />
            </Link>
            <div className="product-head">
              <h3>
                <Link href={product.href}>{product.name}</Link>
              </h3>
              <p className="product-price">
                <span>Starting at</span>
                {shopPrice(product.price)}
              </p>
            </div>
            <p>{product.copy}</p>
            <p>{product.available}</p>
            <div className="product-actions">
              <Link className="btn btn-primary" href={`/checkout?product=${product.slug}`}>
                See if I qualify
              </Link>
              <Link className="btn btn-ghost" href={product.href}>
                Learn more
              </Link>
            </div>
            <p className="product-note">*New patients. Billed monthly after clinician approval.</p>
          </article>
        ))}
      </section>
    </>
  );
}
