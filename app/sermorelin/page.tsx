import type { Metadata } from "next";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct } from "@/lib/data";

const product = getProduct("sermorelin");
export const metadata: Metadata = { title: product.name };

export default function SermorelinPage() {
  return <ProductDetail product={product} />;
}
