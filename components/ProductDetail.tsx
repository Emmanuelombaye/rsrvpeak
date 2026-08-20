import Link from "next/link";
import type { Product } from "@/lib/data";
import { withBase } from "@/lib/paths";

export function ProductDetail({ product }: { product: Product }) {
  return (
    <main className="wrap pdp">
      <div className="pdp-visual">
        <img src={withBase(product.img)} alt={product.name} />
      </div>
      <div>
        <div className="tag">{product.category}</div>
        <h1>{product.name}</h1>
        <p className="lede">{product.copy}</p>
        <div className="price">
          <span>Total Price</span>
          {product.totalPrice}
        </div>
        <p className="lede">Includes clinical consultation & overnight shipping</p>
        <Link className="btn btn-primary" href="/contact">
          See if I qualify
        </Link>
        <div className="section" style={{ padding: "40px 0 0" }}>
          <h2>Product Overview</h2>
          <p className="lede">{product.overview}</p>
          <h2>Ingredients & Formulation</h2>
          <p className="lede">
            Prepared by a state-licensed U.S. compounding pharmacy. Exact strength and dosing are determined by your
            licensed clinician after intake.
          </p>
          <h2>Administration & Guidance</h2>
          <p className="lede">{product.admin}</p>
        </div>
      </div>
    </main>
  );
}
