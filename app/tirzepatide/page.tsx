import type { Metadata } from "next";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct } from "@/lib/data";

const product = getProduct("tirzepatide");
export const metadata: Metadata = { title: product.name };

export default function TirzepatidePage() {
  return <ProductDetail product={product} />;
}
