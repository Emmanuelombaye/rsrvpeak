import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { FaqList } from "@/components/FaqList";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <>
      <Suspense>
        <CheckoutForm />
      </Suspense>
      <section className="section" id="faq">
        <FaqList />
      </section>
    </>
  );
}
