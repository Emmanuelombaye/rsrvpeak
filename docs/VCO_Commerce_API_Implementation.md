# VCO Commerce API — Practical Implementation Guide

How to wire a Next.js brand storefront (PeakCare / RSRV / NauticHealth-style) to **VirtualClinicOS (VCO)** headless commerce.

**Backend:** `https://portal.virtualclinicos.com`  
**Companion docs:** [`VCO_ECommerce_Integration_Guide.md`](./VCO_ECommerce_Integration_Guide.md) (architecture + PeakCare walkthrough) and [`commerce-api.md`](./commerce-api.md) (request/response reference).

This file is an implementation playbook. It does not replace the API reference. **Do not put `VCO_API_KEY` in client components, `NEXT_PUBLIC_*` vars, or git.**

---

## This repository (RSRV / rsrvpeak)

This repo (`peakrsrv` / `rsrvpeak`) is the **RSRV** storefront.

| | Value |
|---|---|
| Brand slug (`NEXT_PUBLIC_VCO_BRAND_ID`) | `rsrv` |
| Storefront domain | `pending-rsrv.com` |
| Tenant UUID | `2423922a-c0a9-4c0e-9b91-06a9641700df` |
| Live API key | **Not stored in git.** Set `VCO_API_KEY` in `.env.local` / host secrets only. |

App Router lives at repo-root `app/` (not `src/app/`). Shared modules live in `lib/`.

Today the shop and checkout are **static**: `app/shop/page.tsx` + `components/ShopGrid.tsx` read `@/lib/data`, and `components/CheckoutForm.tsx` finishes locally (`setDone(true)`) without calling VCO or Stripe. When you implement these APIs, keep those routes and swap the data/checkout path — do not start from a blank shop.

Recommended file locations for this repo:

| Role | Path |
|---|---|
| Server-only commerce client | `lib/commerce.ts` |
| Checkout proxy (protects API key) | `app/api/checkout/session/route.ts` |
| Optional coupon proxy | `app/api/coupons/validate/route.ts` |
| Catalog (already exists) | `app/shop/page.tsx` — currently static; point at `fetchProducts()` |
| Product grid (already exists) | `components/ShopGrid.tsx` — currently `@/lib/data` |
| Checkout page (already exists) | `app/checkout/page.tsx` |
| Checkout UI (already exists) | `components/CheckoutForm.tsx` — analogous to PeakCare `CheckoutClient.tsx` |
| Post-payment page | `app/checkout/success/page.tsx` (add when wiring Stripe return) |
| Secrets | `.env.local` (gitignored via `.env*.local`) |

---

## 1. Goal

The storefront owns marketing UX. VCO owns catalog truth, PHI encryption, clinical routing, Stripe Checkout, and pharmacy fulfillment.

```
Browser  →  Next.js (RSC + API routes)  →  VCO  https://portal.virtualclinicos.com
                 │
                 └─ VCO_API_KEY stays on the server
```

Typical patient path:

1. Catalog loads active RSRV products (`GET /api/commerce/v1/products?brandId=rsrv`).
2. PDP loads one product (`GET /api/commerce/v1/products/{slug}`), including `screening_questions`.
3. Patient completes intake in `CheckoutForm` (local form; undocumented as its own VCO endpoint).
4. Optional coupon check (`POST /api/commerce/v1/coupons/validate`).
5. Browser `POST`s to **your** `/api/checkout/session`. That route calls VCO with the secret key and returns `checkoutUrl`.
6. Browser redirects: `window.location.href = data.checkoutUrl`.
7. After Stripe, patient lands on `successUrl`. Order status can be polled with `GET /api/v1/orders/patient?email=`.

---

## 2. Environment variables

Add to `.env.local` (never commit real keys):

```env
NEXT_PUBLIC_VCO_API_URL=https://portal.virtualclinicos.com
NEXT_PUBLIC_VCO_BRAND_ID=rsrv
VCO_API_KEY=phk_live_your_brand_api_key_here
```

`NEXT_PUBLIC_VCO_BRAND_ID` may be either `rsrv` or `2423922a-c0a9-4c0e-9b91-06a9641700df`. Prefer the slug.

| Variable | Public? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_VCO_API_URL` | Yes | VCO origin. Production: `https://portal.virtualclinicos.com`. Local sandbox: `http://localhost:3000`. |
| `NEXT_PUBLIC_VCO_BRAND_ID` | Yes | `rsrv` (or tenant UUID). Safe in the browser. |
| `VCO_API_KEY` | **No** | RSRV private key (`phk_live_...` or `vco_live_...`). Server Components, Route Handlers, and server-only modules only. |

Default fallbacks in the PeakCare client example are base URL `https://portal.virtualclinicos.com` and brand `peakcare`. **Do not copy the PeakCare brand default into this repo** — RSRV must send `rsrv`.

---

## 3. Auth headers

Every **server-side** VCO call should send JSON plus a tenant identifier.

| Header | Required | Value |
|---|---|---|
| `Authorization` | Required for private/server APIs | `Bearer ${VCO_API_KEY}` |
| `Content-Type` | Required | `application/json` |
| `x-brand-id` | Optional | `rsrv` or `2423922a-c0a9-4c0e-9b91-06a9641700df`. Also accepted as `?brandId=`. |

Public catalog reads can use `?brandId=rsrv` or `x-brand-id` without a key, but the documented PeakCare client still sends Bearer. Prefer Bearer from the server so draft/portal-only products stay isolated.

Do **not** attach `Authorization` in browser `fetch` to VCO. The browser talks only to your Next.js routes.

---

## 4. Implementation order

Build in this sequence. Each step is independently testable.

### Step A — Server-only commerce client

Create `lib/commerce.ts`. Mark the module server-only:

- Read `NEXT_PUBLIC_VCO_API_URL`, `NEXT_PUBLIC_VCO_BRAND_ID`, `VCO_API_KEY`.
- Helper `vcoFetch(path, init)` that always sets `Authorization` + `Content-Type` and never runs in the browser (`import "server-only"` is recommended).
- Use `next: { revalidate: 60 }` on catalog GETs (PeakCare ISR pattern).
- On failure, log `[VCO Commerce] ...` and return `[]` / `null` for catalog, or throw for checkout.

Product shape the PeakCare client expects (subset of the API payload):

| Field | Type | Notes |
|---|---|---|
| `id` | string | Product UUID — send this as `productId` at checkout |
| `name` | string | Display name |
| `slug` | string | URL segment (RSRV already uses slugs like `tirzepatide` in `?product=`) |
| `description` | string | Marketing copy |
| `price` | number or string | API returns a number (e.g. `299`); PeakCare client typed it as formatted string — normalize in the client |
| `treatment_protocol` | string? | Protocol text |
| `images` | string[] | Absolute image URLs |
| `contraindications` | string? | Safety copy |
| `screening_questions` | string[]? | Drive the intake form (today `CheckoutForm` hardcodes conditions) |
| `requires_intake` | boolean | Whether questionnaire is required |
| `category` | string? | e.g. `weight_loss` (present on list response; categories endpoint itself is undocumented) |
| `visibility` / `status` | string? | Only `public` + `active` belong on the storefront |

`ShopGrid` currently imports a local `products` array. After the client exists, load products on the server in `app/shop/page.tsx` and pass them in, or fetch in a server wrapper — keep `VCO_API_KEY` off the `"use client"` boundary.

### Step B — `GET /api/commerce/v1/products`

**URL:** `{NEXT_PUBLIC_VCO_API_URL}/api/commerce/v1/products?brandId=rsrv`

Use from a Server Component (`app/shop/page.tsx`) with `export const revalidate = 60`. Render a grid of cards (image, name, description, price) linking to checkout with a **Start Consultation** / **See if I qualify** CTA.

**200 response (abridged):**

```json
{
  "success": true,
  "count": 3,
  "products": [
    {
      "id": "7878a21f-8182-411a-85d0-9999081a349c",
      "name": "Semaglutide Weekly Injections",
      "slug": "semaglutide-weekly-injections",
      "price": 299.00,
      "requires_intake": true,
      "visibility": "public",
      "status": "active"
    }
  ]
}
```

Empty catalog almost always means wrong `brandId` (PeakCare leftover), missing Bearer, or products still `draft` / `portal_only` in VCO Admin for the RSRV tenant.

### Step C — `GET /api/commerce/v1/products/{slug}`

**URL:** `{base}/api/commerce/v1/products/{slug}?brandId=rsrv`

`slug` may also be a SKU. The HTML has no dedicated response body; the PeakCare client expects `{ "product": { ... } }` with the same fields as the list item.

Use this on product pages (`app/semaglutide/page.tsx`, `app/tirzepatide/page.tsx`, etc.) and as the source of `screening_questions` for `CheckoutForm`.

### Step D — `POST /api/commerce/v1/coupons/validate`

Call from a **server** route (`app/api/coupons/validate/route.ts`) so the key never ships to the browser. The checkout UI can `fetch("/api/coupons/validate")` with `{ brandId: "rsrv", code, cartTotalCents }`.

**Request:**

```json
{
  "brandId": "rsrv",
  "code": "SUMMER20",
  "cartTotalCents": 29900
}
```

**200:**

```json
{
  "valid": true,
  "code": "SUMMER20",
  "discountType": "percentage",
  "discountValue": 20,
  "discountAmountCents": 5980,
  "finalAmountCents": 23920
}
```

If `valid` is false, keep the cart total unchanged and surface the error. Pass the same `couponCode` through to checkout only when validation succeeded.

### Step E — `POST /api/commerce/v1/checkout/session` (Next.js proxy)

**Never call this from the browser against VCO.** Implement `app/api/checkout/session/route.ts`:

1. Parse JSON from `CheckoutForm`: `productId`, `patientInfo`, `intakeAnswers`, optional `couponCode`.
2. `POST` to `{vcoBaseUrl}/api/commerce/v1/checkout/session` with Bearer + JSON.
3. Set:
   - `brandId` = `rsrv` (from env, not from the client)
   - `successUrl` = `{origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
   - `cancelUrl` = `{origin}/shop`
4. Return VCO JSON (`checkoutUrl`, `sessionId`, `orderId`, `amountCents`) on success.
5. On failure, return `{ error }` with the upstream status, or `500`.

`CheckoutForm` currently calls `setDone(true)` on the last step. Replace that with `fetch("/api/checkout/session")` and:

```js
window.location.href = data.checkoutUrl;
```

`origin` should come from the incoming request (`request.headers.get("origin")` or the public site URL for `pending-rsrv.com`), not from the client body.

The existing form already collects a 50-state (+ DC) dropdown — keep sending **codes** (`TX`), not full names.

### Step F — `GET /api/v1/orders/patient?email=`

**URL:** `{base}/api/v1/orders/patient?email={encodeURIComponent(email)}`

Use on the success page or a patient portal, **server-side**, after you know the email (query param from success URL, or the logged-in patient). Do not expose a public unauthenticated lookup that lets anyone enumerate emails without additional checks (session cookie, signed Stripe `session_id` verification, or similar).

**200:**

```json
{
  "success": true,
  "orders": [
    {
      "id": "ord_8f9e1234-abcd-5678",
      "status": "shipped",
      "clinical_status": "approved",
      "product_name": "Semaglutide Weekly Injections",
      "tracking_number": "9400111899562537829100",
      "carrier": "USPS",
      "created_at": "2026-08-10T14:32:00Z"
    }
  ]
}
```

---

## 5. Checkout payload

`POST /api/commerce/v1/checkout/session` body:

| Field | Type | Required | Notes |
|---|---|---|---|
| `brandId` | string | Yes | `rsrv` or tenant UUID. Set from env on the server. |
| `productId` | string | Yes | Product UUID, SKU, or slug. Prefer UUID from the catalog `id`. |
| `patientInfo` | object | Yes | See below. |
| `intakeAnswers` | object | Yes | Key-value map. Encrypted at rest by VCO (AES-256-GCM). |
| `couponCode` | string | No | Only if the customer applied a valid code. |
| `successUrl` | string | Yes | Must include `{CHECKOUT_SESSION_ID}` if you need Stripe’s session id back. Example: `https://pending-rsrv.com/checkout/success?session_id={CHECKOUT_SESSION_ID}`. |
| `cancelUrl` | string | Yes | `https://pending-rsrv.com/shop` |

### `patientInfo`

| Field | Required | Format |
|---|---|---|
| `firstName` | Yes | string |
| `lastName` | Yes | string |
| `email` | Yes | Valid email |
| `state` | Yes | **2-letter uppercase US code** (`CA`, `TX`, `FL`). Not full names. |
| `phone` | No | string |
| `dob` | No | `YYYY-MM-DD` |

`CheckoutForm` already has name, email, phone, DOB parts, and a state `<select>` of 2-letter codes — map those fields 1:1.

### `intakeAnswers`

Free-form object. PeakCare example:

```json
{
  "current_weight_lbs": 175,
  "target_weight_lbs": 140,
  "has_high_blood_pressure": false,
  "current_medications": "Multivitamin daily",
  "allergies": "None"
}
```

Also map `screening_questions` from the product (and/or the form’s `screeningConditions`) into this object. There is **no documented VCO “intake step” endpoint** — collection is storefront-side; persistence happens inside checkout/session.

### Success response

```json
{
  "success": true,
  "orderId": "ord_8f9e1234-abcd-5678",
  "sessionId": "cs_live_a1b2c3d4e5f6g7h8",
  "checkoutUrl": "https://checkout.stripe.com/c/pay/cs_live_a1b2c3d4e5f6g7h8",
  "amountCents": 23920,
  "currency": "usd"
}
```

Redirect immediately to `checkoutUrl`. Do not collect card data on the brand site.

---

## 6. Security

- **`VCO_API_KEY` is server-only.** No `NEXT_PUBLIC_VCO_API_KEY`. No key in client bundles, source maps, or markdown committed to git.
- **Proxy checkout (and coupons) through Next.js Route Handlers.** The browser never talks to `portal.virtualclinicos.com` with a Bearer token. `CheckoutForm` is `"use client"` — it may only `fetch("/api/checkout/session")`.
- **PHI:** intake answers are encrypted **on the VCO server** with AES-256-GCM. The storefront still transmits them over HTTPS to your proxy, then to VCO — use HTTPS in production, do not log `intakeAnswers` or full `patientInfo` in application logs.
- **`state` must be a 2-letter US code.** The existing dropdown already uses codes; keep it that way. Validate again on the proxy; `400 Invalid checkout request format` is almost always state or email.
- **Do not trust client `brandId`.** Force `rsrv` from env so this storefront cannot check out against PeakCare or another tenant.
- **Stripe Connect** must already be onboarded for RSRV at `/admin/rsrv/commerce` on VCO, or checkout returns `500`.

---

## 7. Error handling

Map these status codes from VCO (and from your proxy) to storefront UX:

| Status | Message | What to do |
|---|---|---|
| `401 Unauthorized` | `"brandId query param or valid Authorization Bearer API key required"` | Check `VCO_API_KEY` is set on the **server**, `Authorization: Bearer ...` is present, and `brandId`/`x-brand-id` is `rsrv`. |
| `400 Bad Request` | `"Invalid checkout request format"` | `patientInfo.state` must be 2-letter uppercase US; `email` must be valid. Confirm JSON `Content-Type`. |
| `404 Not Found` | `"Product not found for this brand"` | `productId`/`slug` is another tenant’s product (e.g. PeakCare UUID), or visibility is `draft` / `portal_only` on the RSRV tenant. Fix in VCO Admin. |
| `500 Server Error` | `"Stripe Connect account not configured"` | Complete Stripe Connect onboarding at `/admin/rsrv/commerce`. |

Proxy behavior (PeakCare pattern): forward upstream status when VCO returns a body; use `500` + `{ error }` for network/parse failures. Catalog helpers may swallow errors and return `[]`/`null` so the shop still renders.

---

## 8. PeakCare reference pattern (describe only)

The `peakcare` repo (`sandbox` branch) is the canonical implementation. Copy the **pattern**, not the files. RSRV already has close equivalents — wire those instead of adding a second shop.

| PeakCare file | Role | RSRV analogue |
|---|---|---|
| `src/lib/commerce.ts` | Reusable VCO product fetcher; Bearer auth; 60s ISR; `fetchProducts()` / `fetchProductBySlug()`. | Add `lib/commerce.ts` (does not exist yet). |
| `src/app/shop/page.tsx` | Server Component catalog; `revalidate = 60`. | `app/shop/page.tsx` (exists; static). |
| `src/components/ShopGrid.tsx` | Responsive grid + category filtering. | `components/ShopGrid.tsx` (exists; reads `lib/data.ts`). |
| `src/app/checkout/CheckoutClient.tsx` | 50 US states dropdown, questionnaire parsing, Stripe redirect. | `components/CheckoutForm.tsx` (exists; local “done” state, no VCO/Stripe). |
| `src/app/api/checkout/session/route.ts` | Server proxy: injects `brandId`, `successUrl`, `cancelUrl`, Bearer key. | Add `app/api/checkout/session/route.ts`. |
| `src/app/checkout/success/page.tsx` | Post-checkout confirmation and clinical intake summary. | Add `app/checkout/success/page.tsx` (today success is inline in `CheckoutForm`). |

Do not edit those PeakCare files from this playbook; use them as a checklist when implementing RSRV.

---

## 9. Gaps in the original HTML

The source HTML sidebar lists these items, but the page body has **no request/response docs**. Do not invent payloads for them. Track them as follow-ups with the VCO team:

| Nav label | Anchor | Implication for RSRV |
|---|---|---|
| 5-Minute Quickstart | `#quickstart` | Missing. Use this playbook + PeakCare files instead. |
| GET Categories | `#ep-categories` | Missing. `ShopGrid` already filters locally (`All` / `Weight Loss`). Keep filtering on `product.category` from the products list until an endpoint exists. |
| POST Media / ID upload | `#ep-upload` | Missing. Do not POST identity images to VCO until documented. Keep ID capture out of `CheckoutForm` or store it only after VCO provides an upload API. |
| 3. Medical Intake Flow | `#step-intake` | Missing. Keep the existing multi-step form; persist via `intakeAnswers` on checkout/session. |
| 5. Order Confirmation | `#step-success` | Missing. Replace the inline “Intake received” view with Stripe `successUrl` + optional `GET /api/v1/orders/patient`. |

---

## 10. Brand directory (keys redacted)

This storefront is **RSRV**. Other rows are for multi-tenant context only.

| Brand | Slug | Domain | Tenant UUID | API key |
|---|---|---|---|---|
| VitalWell Rx | `vitalwellrx` | `vitalwellrx.com` | `41521b9b-9237-4a8b-a42f-ac64dc0d782b` | `[REDACTED]` |
| Northstar | `northstar` | `joinnorthstar.com` | `c68fcd62-30a3-4e41-b083-51b059106853` | `[REDACTED]` |
| Efexia | `efexia` | `efexia.com` | `7b81ffe6-6349-4bc1-af65-959609e0cb0f` | `[REDACTED]` |
| Pax | `pax` | `paxlongevity.com` | `4065c369-9a3c-47af-8d6f-07cc7238d329` | `[REDACTED]` |
| NexaRx | `nexarx` | `nexarx.com` | `ea0316e8-f3e4-4356-8e33-ea6a93302b85` | `[REDACTED]` |
| **RSRV (this repo)** | **`rsrv`** | **`pending-rsrv.com`** | **`2423922a-c0a9-4c0e-9b91-06a9641700df`** | **`[REDACTED]`** |
| PeakCare | `peakcare` | `peakcare.health` | `58f6187c-0c0b-4a54-b4c8-741f9aa60469` | Configured in PeakCare `.env` |

---

## Endpoint cheat sheet

| Method | VCO path | Call from |
|---|---|---|
| `GET` | `/api/commerce/v1/products` | Server Component / `lib/commerce.ts` |
| `GET` | `/api/commerce/v1/products/{slug}` | Server Component / `lib/commerce.ts` |
| `POST` | `/api/commerce/v1/coupons/validate` | Next.js route → VCO |
| `POST` | `/api/commerce/v1/checkout/session` | Next.js route → VCO; browser → **your** `/api/checkout/session` only |
| `GET` | `/api/v1/orders/patient?email=` | Server Component or authenticated route |

Full JSON examples: [`commerce-api.md`](./commerce-api.md).
