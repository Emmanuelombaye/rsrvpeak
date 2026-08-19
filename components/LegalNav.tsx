import Link from "next/link";
import type { LegalSlug } from "@/lib/data";

const links = [
  { href: "/documents", label: "All documents", slug: null },
  { href: "/terms", label: "Terms", slug: "terms" },
  { href: "/privacy", label: "Privacy", slug: "privacy" },
  { href: "/disclaimer", label: "Disclaimer", slug: "disclaimer" },
  { href: "/consent", label: "Consent", slug: "consent" },
  { href: "/hipaa", label: "HIPAA", slug: "hipaa" },
] as const;

export function LegalNav({ current }: { current?: LegalSlug }) {
  return (
    <nav className="legal-nav" aria-label="RSRV documents">
      {links.map((link) => (
        <Link key={link.href} href={link.href} aria-current={link.slug === current ? "page" : undefined}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
