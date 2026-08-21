import "server-only";

/**
 * Server-only VirtualClinicOS (VCO) commerce client for the RSRV storefront.
 *
 * Enable with:
 *   NEXT_PUBLIC_VCO_API_URL=https://portal.virtualclinicos.com
 *   NEXT_PUBLIC_VCO_BRAND_ID=rsrv
 *   VCO_API_KEY=<server-only key>
 *
 * Brand id falls back to `rsrv` (never PeakCare). Calls still no-op until
 * VCO_API_KEY is set. Do not import this module from Client Components.
 */

const DEFAULT_API_URL = "https://portal.virtualclinicos.com";
const DEFAULT_BRAND_ID = "rsrv";

const US_STATES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL",
  "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
  "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC",
]);

export class VcoNotConfiguredError extends Error {
  constructor(message = "VCO commerce is not configured") {
    super(message);
    this.name = "VcoNotConfiguredError";
  }
}

export type VcoProduct = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number | string;
  treatment_protocol?: string;
  images?: string[];
  contraindications?: string;
  screening_questions?: string[];
  requires_intake?: boolean;
  category?: string;
  visibility?: string;
  status?: string;
};

export type VcoPatientInfo = {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  phone?: string;
  dob?: string;
};

export type VcoCheckoutInput = {
  productId: string;
  patientInfo: VcoPatientInfo;
  intakeAnswers: Record<string, unknown>;
  couponCode?: string;
  successUrl: string;
  cancelUrl: string;
};

export type VcoProxyResult = {
  status: number;
  body: unknown;
};

export type VcoConfig = {
  apiUrl: string;
  brandId: string;
  apiKey: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function getVcoConfig(): VcoConfig {
  const apiUrl = (process.env.NEXT_PUBLIC_VCO_API_URL?.trim() || DEFAULT_API_URL).replace(
    /\/+$/,
    "",
  );
  const brandId = process.env.NEXT_PUBLIC_VCO_BRAND_ID?.trim() || DEFAULT_BRAND_ID;
  const apiKey = process.env.VCO_API_KEY?.trim() ?? "";
  return { apiUrl, brandId, apiKey };
}

export function isVcoConfigured(): boolean {
  const { brandId, apiKey } = getVcoConfig();
  return Boolean(apiKey && brandId);
}

export function storefrontOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (configured) return configured;

  const headerOrigin = request.headers.get("origin")?.trim().replace(/\/+$/, "");
  if (headerOrigin) return headerOrigin;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (host) {
    const proto =
      request.headers.get("x-forwarded-proto") ??
      (host.includes("localhost") || host.startsWith("127.") ? "http" : "https");
    return `${proto}://${host}`.replace(/\/+$/, "");
  }

  return "http://localhost:3000";
}

export function storefrontUrl(request: Request, path: string): string {
  const origin = storefrontOrigin(request);
  const base = process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/\/+$/, "") ?? "";
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${base}${suffix}`;
}

async function vcoFetch(pathWithQuery: string, init: RequestInit = {}): Promise<Response> {
  const { apiUrl, brandId, apiKey } = getVcoConfig();
  if (!apiKey || !brandId) {
    throw new VcoNotConfiguredError("Set VCO_API_KEY to enable VCO commerce");
  }

  const method = (init.method ?? "GET").toUpperCase();
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${apiKey}`);
  headers.set("Content-Type", "application/json");
  headers.set("x-brand-id", brandId);

  return fetch(`${apiUrl}${pathWithQuery}`, {
    ...init,
    method,
    headers,
    cache: method === "GET" ? init.cache : "no-store",
    ...(method === "GET" ? { next: { revalidate: 60 } } : {}),
  });
}

async function readJsonBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { error: "VCO returned a non-JSON response" };
  }
}

async function vcoJson(
  pathWithQuery: string,
  init: RequestInit = {},
): Promise<VcoProxyResult> {
  const response = await vcoFetch(pathWithQuery, init);
  return { status: response.status, body: await readJsonBody(response) };
}

export async function fetchProducts(): Promise<VcoProduct[]> {
  if (!isVcoConfigured()) return [];

  try {
    const { brandId } = getVcoConfig();
    const query = new URLSearchParams({ brandId });
    const { status, body } = await vcoJson(`/api/commerce/v1/products?${query}`);
    if (status < 200 || status >= 300 || !isRecord(body) || !Array.isArray(body.products)) {
      console.error("[VCO Commerce] products list failed", status);
      return [];
    }
    return body.products as VcoProduct[];
  } catch (error) {
    console.error(
      "[VCO Commerce] products list failed",
      error instanceof Error ? error.message : "unknown error",
    );
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<VcoProduct | null> {
  const safeSlug = asNonEmptyString(slug);
  if (!safeSlug || !isVcoConfigured()) return null;

  try {
    const { brandId } = getVcoConfig();
    const query = new URLSearchParams({ brandId });
    const encoded = encodeURIComponent(safeSlug);
    const { status, body } = await vcoJson(`/api/commerce/v1/products/${encoded}?${query}`);
    if (status < 200 || status >= 300 || !isRecord(body)) {
      console.error("[VCO Commerce] product lookup failed", status);
      return null;
    }
    if (isRecord(body.product)) return body.product as VcoProduct;
    if (typeof body.id === "string") return body as VcoProduct;
    return null;
  } catch (error) {
    console.error(
      "[VCO Commerce] product lookup failed",
      error instanceof Error ? error.message : "unknown error",
    );
    return null;
  }
}

export function parseCheckoutRequest(
  input: unknown,
): { error: string } | { value: Omit<VcoCheckoutInput, "successUrl" | "cancelUrl"> } {
  if (!isRecord(input)) return { error: "Invalid checkout request format" };

  const productId = asNonEmptyString(input.productId);
  if (!productId) return { error: "productId is required" };

  if (!isRecord(input.patientInfo)) return { error: "Invalid checkout request format" };
  const firstName = asNonEmptyString(input.patientInfo.firstName);
  const lastName = asNonEmptyString(input.patientInfo.lastName);
  const email = asNonEmptyString(input.patientInfo.email);
  const stateRaw = asNonEmptyString(input.patientInfo.state);
  if (!firstName || !lastName || !email || !stateRaw) {
    return { error: "Invalid checkout request format" };
  }
  if (!email.includes("@") || email.includes(" ")) {
    return { error: "Invalid checkout request format" };
  }
  const state = stateRaw.toUpperCase();
  if (!US_STATES.has(state)) return { error: "Invalid checkout request format" };

  if (!isRecord(input.intakeAnswers)) return { error: "intakeAnswers is required" };

  const patientInfo: VcoPatientInfo = { firstName, lastName, email, state };
  const phone = asNonEmptyString(input.patientInfo.phone);
  const dob = asNonEmptyString(input.patientInfo.dob);
  if (phone) patientInfo.phone = phone;
  if (dob) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return { error: "Invalid checkout request format" };
    patientInfo.dob = dob;
  }

  const couponCode = asNonEmptyString(input.couponCode);
  return {
    value: {
      productId,
      patientInfo,
      intakeAnswers: input.intakeAnswers,
      ...(couponCode ? { couponCode } : {}),
    },
  };
}

export async function createCheckoutSession(input: VcoCheckoutInput): Promise<VcoProxyResult> {
  const { brandId } = getVcoConfig();
  return vcoJson("/api/commerce/v1/checkout/session", {
    method: "POST",
    body: JSON.stringify({
      brandId,
      productId: input.productId,
      patientInfo: input.patientInfo,
      intakeAnswers: input.intakeAnswers,
      ...(input.couponCode ? { couponCode: input.couponCode } : {}),
      successUrl: input.successUrl,
      cancelUrl: input.cancelUrl,
    }),
  });
}

export function parseCouponRequest(
  input: unknown,
): { error: string } | { value: { code: string; cartTotalCents: number } } {
  if (!isRecord(input)) return { error: "Invalid coupon request format" };
  const code = asNonEmptyString(input.code);
  if (!code) return { error: "code is required" };
  const cartTotalCents = input.cartTotalCents;
  if (typeof cartTotalCents !== "number" || !Number.isFinite(cartTotalCents) || cartTotalCents < 0) {
    return { error: "cartTotalCents must be a non-negative number" };
  }
  return { value: { code, cartTotalCents: Math.round(cartTotalCents) } };
}

export async function validateCoupon(input: {
  code: string;
  cartTotalCents: number;
}): Promise<VcoProxyResult> {
  const { brandId } = getVcoConfig();
  return vcoJson("/api/commerce/v1/coupons/validate", {
    method: "POST",
    body: JSON.stringify({
      brandId,
      code: input.code,
      cartTotalCents: input.cartTotalCents,
    }),
  });
}

/** Server-only helper. Do not expose behind an unauthenticated public route. */
export async function fetchPatientOrders(email: string): Promise<unknown[]> {
  const safeEmail = asNonEmptyString(email);
  if (!safeEmail || !isVcoConfigured()) return [];

  try {
    const query = new URLSearchParams({ email: safeEmail });
    const { status, body } = await vcoJson(`/api/v1/orders/patient?${query}`);
    if (status < 200 || status >= 300 || !isRecord(body) || !Array.isArray(body.orders)) {
      console.error("[VCO Commerce] patient orders failed", status);
      return [];
    }
    return body.orders;
  } catch (error) {
    console.error(
      "[VCO Commerce] patient orders failed",
      error instanceof Error ? error.message : "unknown error",
    );
    return [];
  }
}
