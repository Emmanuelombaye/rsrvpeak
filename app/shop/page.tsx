import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Medical Protocols & Treatments",
};

export default function ShopPage() {
  return (
    <main className="wrap">
      <section className="page-hero">
        <p className="lede">Shop Clinical Protocols</p>
        <h1>Treatments tailored to your biology.</h1>
        <p className="lede">
          Pharmaceutical-grade therapies delivered cold-chain to your door, prescribed by licensed clinicians.
        </p>
      </section>
      <section className="grid-3" style={{ paddingBottom: 80 }}>
        {products.map((product) => (
          <article className="product-card" key={product.slug}>
            <div className="tag">{product.tag}</div>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Starting at {product.price.replace("/mo", "")}</p>
            <p>{product.copy}</p>
            <p>{product.available}</p>
            <div className="product-actions">
              <Link className="btn btn-primary" href={product.href}>
                See if I qualify
              </Link>
              <Link className="btn btn-ghost" href={product.href}>
                Learn more
              </Link>
            </div>
            <p className="lede">*New Patients, 6-month plan</p>
          </article>
        ))}
      </section>
    </main>
  );
}
