export type Product = {
  slug: "tirzepatide" | "semaglutide" | "nad" | "sermorelin";
  name: string;
  href: string;
  img: string;
  price: string;
  totalPrice: string;
  tag: string;
  pills: string[];
  category: string;
  copy: string;
  overview: string;
  available: string;
  admin: string;
};

export const products: Product[] = [
  {
    slug: "tirzepatide",
    name: "Tirzepatide (GLP-1) Therapy",
    href: "/tirzepatide",
    img: "/assets/peakcare/tirzepatide.png",
    price: "$499.00/mo",
    totalPrice: "$499.00 USD",
    tag: "Weight Loss · Best Seller · Personalized",
    pills: ["Weight Loss", "Best Seller"],
    category: "General",
    copy: "Compounded Tirzepatide with Vitamin B12. Designed for monthly weight management.",
    overview: "Compounded Tirzepatide with Vitamin B12. Designed for monthly weight management.",
    available: "Available in Personalized Tirzepatide.",
    admin:
      "Injectable protocol. Your clinician will provide administration instructions, titration guidance, and follow-up check-ins. Prescription required.",
  },
  {
    slug: "semaglutide",
    name: "Semaglutide (GLP-1) Therapy",
    href: "/semaglutide",
    img: "/assets/peakcare/semaglutide.png",
    price: "$399.00/mo",
    totalPrice: "$399.00 USD",
    tag: "Weight Loss · Best Seller · Personalized",
    pills: ["Weight Loss", "Best Seller"],
    category: "General",
    copy: "Physician-prescribed GLP-1 weight management program. Includes clinical review, medication, and cold-chain shipping.",
    overview:
      "Physician-prescribed GLP-1 weight management program. Includes clinical review, medication, and cold-chain shipping.",
    available: "Available in Personalized Semaglutide.",
    admin:
      "Injectable protocol. Your clinician will provide administration instructions, titration guidance, and follow-up check-ins. Prescription required.",
  },
  {
    slug: "nad",
    name: "NAD+ Therapy (Cellular Rejuvenation)",
    href: "/nad",
    img: "/assets/peakcare/nad.png",
    price: "$199.00/mo",
    totalPrice: "$199.00 USD",
    tag: "Longevity · Best Seller · Personalized",
    pills: ["Longevity", "Best Seller"],
    category: "Longevity",
    copy: "Rejuvenate your cellular health, boost mental clarity, and increase energy levels.",
    overview: "A physician-prescribed NAD+ protocol designed to support cellular energy, mental clarity, and recovery.",
    available: "Available in Personalized NAD+.",
    admin: "Your clinician will provide administration instructions and follow-up check-ins. Prescription required.",
  },
  {
    slug: "sermorelin",
    name: "Sermorelin",
    href: "/sermorelin",
    img: "/assets/peakcare/sermorelin-brand.png",
    price: "$199.00/mo",
    totalPrice: "$199.00 USD",
    tag: "Muscle Recovery · Personalized",
    pills: ["Muscle Recovery"],
    category: "Muscle Recovery",
    copy: "Support natural HGH production to improve muscle recovery, sleep quality, and lean body composition.",
    overview:
      "A physician-prescribed sermorelin protocol that gently stimulates your body's own growth hormone axis — restoring sleep depth, recovery, and metabolic tone.",
    available: "Available in Personalized Sermorelin.",
    admin: "Your clinician will provide administration instructions and follow-up check-ins. Prescription required.",
  },
];

export const shopProtocols = products.slice(0, 3);

export const faqs = [
  {
    q: "What is RSRV?",
    a: "RSRV is a telehealth platform connecting patients with licensed providers and pharmacies for personalized, compounded treatments. While we are best known for our GLP-1 weight management programs, we also support patients across other health needs with tailored, science-backed care.",
  },
  {
    q: "Who is eligible for treatment?",
    a: "Eligibility is determined during your medical intake. A licensed U.S. provider reviews your history, current medications, and goals within 24 hours.",
  },
  {
    q: "How does RSRV work?",
    a: "Choose a protocol, complete your intake, and receive a provider review within 24 hours. If approved, your medication ships overnight, cold-chain.",
  },
  {
    q: "Are these medications FDA-approved?",
    a: "Our compounded medications are formulated by state-licensed pharmacies using FDA-inspected active pharmaceutical ingredients. Compounded medications are not FDA-approved.",
  },
  {
    q: "How much does treatment cost?",
    a: "Programs start at $146/month. You are not charged until a provider has reviewed and approved your intake.",
  },
];

export const documents = [
  {
    n: "01",
    href: "/terms",
    title: "Terms of Service",
    copy: "Rules for using the RSRV platform, eligibility, billing, shipping, and dispute resolution.",
  },
  {
    n: "02",
    href: "/privacy",
    title: "Privacy Policy",
    copy: "How RSRV collects, uses, and shares account, health, payment, and technical information.",
  },
  {
    n: "03",
    href: "/disclaimer",
    title: "Medical Disclaimer",
    copy: "Educational content is not medical advice. Compounded medications are not FDA-approved.",
  },
  {
    n: "04",
    href: "/consent",
    title: "Telehealth Informed Consent",
    copy: "Consent to evaluation and treatment through telehealth, including limits, risks, and emergencies.",
  },
  {
    n: "05",
    href: "/hipaa",
    title: "HIPAA Notice of Privacy Practices",
    copy: "How protected health information may be used and disclosed, and your health-privacy rights.",
  },
] as const;

export const companyPhone = {
  href: "tel:+19787407778",
  display: "+1 (978) 740-7778",
} as const;

export type LegalSlug = "terms" | "privacy" | "disclaimer" | "consent" | "hipaa";

export function getProduct(slug: Product["slug"]): Product {
  const product = products.find((item) => item.slug === slug);
  if (!product) throw new Error(`Unknown product: ${slug}`);
  return product;
}
