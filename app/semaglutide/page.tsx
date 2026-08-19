import type { Metadata } from "next";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct } from "@/lib/data";

const product = getProduct("semaglutide");
export const metadata: Metadata = { title: product.name };

export default function SemaglutidePage() {
  return <ProductDetail product={product} />;
}
