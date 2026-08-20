import type { Metadata } from "next";
import { ShopGrid } from "@/components/ShopGrid";

export const metadata: Metadata = {
  title: "Medical Protocols & Treatments",
};

export default function ShopPage() {
  return (
    <main className="wrap">
      <section className="page-hero shop-hero">
        <p className="lede">Shop Clinical Protocols</p>
        <h1>Treatments tailored to your biology.</h1>
        <p className="lede">
          Pharmaceutical-grade therapies delivered cold-chain to your door, prescribed by licensed clinicians.
        </p>
      </section>
      <ShopGrid />
    </main>
  );
}
