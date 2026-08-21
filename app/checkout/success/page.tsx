import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Order received" };

export default function CheckoutSuccessPage() {
  return (
    <main className="checkout">
      <div className="wrap checkout-done">
        <p className="eyebrow">Payment received</p>
        <h1>A licensed provider will review your information.</h1>
        <p className="lede">
          If you completed payment, a clinician will review your intake. Typical review is
          within 24 hours.
        </p>
        <Link className="btn btn-primary" href="/shop">
          Back to Shop
        </Link>
      </div>
    </main>
  );
}
