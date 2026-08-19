import type { Metadata } from "next";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct } from "@/lib/data";

const product = getProduct("nad");
export const metadata: Metadata = { title: product.name };

export default function NadPage() {
  return <ProductDetail product={product} />;
}
