import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="wrap legal">
      <h1>Page not found</h1>
      <p>That page does not exist. Return home or browse clinical protocols.</p>
      <p>
        <Link className="btn btn-primary" href="/">
          Home
        </Link>
      </p>
    </main>
  );
}
