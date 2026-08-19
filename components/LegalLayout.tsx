import type { ReactNode } from "react";
import { LegalNav } from "@/components/LegalNav";
import type { LegalSlug } from "@/lib/data";

export function LegalLayout({
  current,
  kicker,
  title,
  updated,
  wide,
  children,
}: {
  current?: LegalSlug;
  kicker: string;
  title: string;
  updated?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <main className={`wrap legal${wide ? " legal-wide" : ""}`}>
      {current ? <LegalNav current={current} /> : null}
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      {updated ? <p className="updated">{updated}</p> : null}
      {children}
    </main>
  );
}
