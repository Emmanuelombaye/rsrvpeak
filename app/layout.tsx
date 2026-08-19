import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Peakcare | Longevity Science, Optimized for You",
    template: "%s | Peakcare",
  },
  description:
    "Physician-prescribed metabolic, longevity, and performance protocols. HIPAA compliant, physician led, and pharmacy integrated.",
  icons: {
    icon: "/assets/peakcare/logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrument.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
