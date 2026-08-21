# VirtualClinicOS (VCO) — E-Commerce & Telehealth API Integration Guide

**VCO Telehealth Commerce Engine v1.0**  
Storefront Developer Integration Guide

Learn how to wire any custom brand storefront (such as **PeakCare**, or any future white-label brand tenant) to the **VirtualClinicOS (VCO) Headless E-Commerce & Telehealth Backend**.

> Source: converted from `VCO_ECommerce_Integration_Guide.html`.  
> Live API keys from the original HTML are **redacted** below. Use your brand’s private key from a secure store, not from this file.

---

## Contents

- [Overview & Architecture](#overview--architecture)
- [Authentication & Environment](#authentication--environment)
- [Active Brand Directory](#active-brand-directory)
- [API Endpoints](#api-endpoints) — see also [`commerce-api.md`](./commerce-api.md)
- [Step-by-Step Storefront Wire-up](#step-by-step-storefront-wire-up)
- [PeakCare Production Reference](#peakcare-production-reference)
- [Errors & Troubleshooting](#errors--troubleshooting)
- [Nav items not documented in the HTML](#nav-items-not-documented-in-the-html)

---

## Overview & Architecture

VirtualClinicOS functions as a **Headless Telehealth & Fulfillment Engine**. Your brand website (built with Next.js, React, or any framework) handles the marketing design, product displays, and customer UX, while delegating catalog syncing, medical questionnaires, clinical chart routing, Stripe payouts, and pharmacy fulfillment to VCO.

### Flow

1. **Brand Storefront** — Next.js frontend fetches active products and displays treatment protocols.
2. **Medical Intake** — Collects patient symptoms, DOB, health history, and shipping state.
3. **VCO Checkout API** — Creates patient record, encrypts PHI (AES-256), and generates Stripe session.
4. **Doctor & Pharmacy** — Licensed clinician reviews order in Doctor Portal and pushes Rx to pharmacy.

> **Multi-Tenant Isolation:** Each brand is a dedicated tenant in VCO. Every API request identifies your tenant using your `brandId` (e.g. `peakcare`) or your hashed API Key (`phk_live_...` / `vco_live_...`). VCO automatically isolates products, orders, doctors, and payouts per brand.

---

## Authentication & Environment

Add the following variables to your brand storefront’s `.env.local` file:

```env
# VirtualClinicOS API Base URL
NEXT_PUBLIC_VCO_API_URL=https://portal.virtualclinicos.com
# For local sandbox development, you can use:
# NEXT_PUBLIC_VCO_API_URL=http://localhost:3000

# Your Brand Tenant Identifier (e.g. peakcare, trimrx, etc.)
NEXT_PUBLIC_VCO_BRAND_ID=peakcare

# Your Private API Key (Used in server-side API routes & Next.js Server Components)
VCO_API_KEY=phk_live_your_brand_api_key_here
```

### Headers

| Header / Parameter | Type | Required | Description |
|---|---|---|---|
| `Authorization` | string | Required for Server APIs | `Bearer vco_live_...`. Your brand tenant's private API key. |
| `x-brand-id` | string | Optional | Your brand slug or tenant UUID (e.g. `vitalwellrx`). Can also be passed as query parameter `?brandId=vitalwellrx`. |
| `Content-Type` | string | Required | `application/json` |

---

## Active Brand Directory

Configure your brand storefront’s `.env.local` using the matching `NEXT_PUBLIC_VCO_BRAND_ID` and `VCO_API_KEY`.

| Brand Name | Brand Slug (`NEXT_PUBLIC_VCO_BRAND_ID`) | Live API Key (`VCO_API_KEY`) | Storefront Apex Domain | Tenant UUID |
|---|---|---|---|---|
| VitalWell Rx | `vitalwellrx` | `[REDACTED]` | `vitalwellrx.com` | `41521b9b-9237-4a8b-a42f-ac64dc0d782b` |
| Northstar | `northstar` | `[REDACTED]` | `joinnorthstar.com` | `c68fcd62-30a3-4e41-b083-51b059106853` |
| Efexia | `efexia` | `[REDACTED]` | `efexia.com` | `7b81ffe6-6349-4bc1-af65-959609e0cb0f` |
| Pax | `pax` | `[REDACTED]` | `paxlongevity.com` | `4065c369-9a3c-47af-8d6f-07cc7238d329` |
| NexaRx | `nexarx` | `[REDACTED]` | `nexarx.com` | `ea0316e8-f3e4-4356-8e33-ea6a93302b85` |
| RSRV | `rsrv` | `[REDACTED]` | `pending-rsrv.com` | `2423922a-c0a9-4c0e-9b91-06a9641700df` |
| PeakCare | `peakcare` | Configured in PeakCare `.env` | `peakcare.health` | `58f6187c-0c0b-4a54-b4c8-741f9aa60469` |

---

## API Endpoints

Full request/response reference lives in [`commerce-api.md`](./commerce-api.md). Summary:

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/commerce/v1/products` | List active public products for a brand |
| `GET` | `/api/commerce/v1/products/{slug}` | Fetch one product by slug or SKU |
| `POST` | `/api/commerce/v1/coupons/validate` | Validate a discount code |
| `POST` | `/api/commerce/v1/checkout/session` | Create Stripe Checkout + patient order |
| `GET` | `/api/v1/orders/patient?email={email}` | Order status, clinical review, tracking |

**Checkout frontend action:** when the storefront receives `checkoutUrl`, redirect with `window.location.href = data.checkoutUrl`.

---

## Step-by-Step Storefront Wire-up

The HTML documents three of the five nav steps (client, catalog, checkout). Medical intake and order confirmation are listed in the sidebar but have no dedicated sections in the source.

### Step 1 — Create the reusable commerce client (`src/lib/commerce.ts`)

In your Next.js project, create a single client module to communicate with VCO.

The documented client:

- Reads `NEXT_PUBLIC_VCO_API_URL`, `NEXT_PUBLIC_VCO_BRAND_ID`, and `VCO_API_KEY`
- Defaults base URL to `https://portal.virtualclinicos.com` and brand to `peakcare`
- Exposes `fetchProducts()` → `GET /api/commerce/v1/products?brandId=...`
- Exposes `fetchProductBySlug(slug)` → `GET /api/commerce/v1/products/{slug}?brandId=...`
- Sends `Authorization: Bearer {apiKey}` and `Content-Type: application/json`
- Uses ISR revalidate of 60 seconds
- On error, logs `[VCO Commerce] ...` and returns `[]` or `null`

Product shape used by the client:

| Field | Type | Notes |
|---|---|---|
| `id` | string | Product UUID |
| `name` | string | Display name |
| `slug` | string | URL slug |
| `description` | string | Marketing copy |
| `price` | string | Formatted price |
| `treatment_protocol` | string (optional) | Protocol text |
| `images` | string[] | Image URLs |
| `contraindications` | string (optional) | Safety copy |
| `screening_questions` | string[] (optional) | Intake prompts |
| `requires_intake` | boolean | Whether questionnaire is required |

### Step 2 — Build the shop catalog page (`src/app/shop/page.tsx`)

Use React Server Components to load the dynamic catalog directly from VCO:

- `revalidate = 60`
- Call `fetchProducts()`
- Render a 3-column grid of product cards (image, name, description, price)
- Link each card to `/shop/{slug}` with a **Start Consultation** CTA

### Step 3 — Wire checkout execution (`src/app/api/checkout/session/route.ts`)

Proxy the checkout request securely through your Next.js route handler to protect `VCO_API_KEY`.

The documented handler:

1. Reads JSON body from the storefront (`productId`, `patientInfo`, `intakeAnswers`, `couponCode`)
2. `POST`s to `{vcoBaseUrl}/api/commerce/v1/checkout/session` with Bearer auth
3. Sets `successUrl` to `{origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
4. Sets `cancelUrl` to `{origin}/shop`
5. Returns VCO JSON on success, or `{ error }` with the upstream status / 500

---

## PeakCare Production Reference

The `peakcare` repository (branch: `sandbox`) is the canonical reference implementation.

| File | Role |
|---|---|
| `src/lib/commerce.ts` | Reusable VCO product fetcher with 60-second ISR caching |
| `src/app/shop/page.tsx` and `src/components/ShopGrid.tsx` | Responsive product grid with category filtering |
| `src/app/checkout/CheckoutClient.tsx` | 50 US states dropdown, medical questionnaire parsing, and Stripe redirect trigger |
| `src/app/checkout/success/page.tsx` | Post-checkout confirmation and clinical intake summary |

---

## Errors & Troubleshooting

| Status Code | Error Message | Root Cause & Solution |
|---|---|---|
| `401 Unauthorized` | `"brandId query param or valid Authorization Bearer API key required"` | Send `Authorization: Bearer phk_live_...` or pass `?brandId=your_brand` in the URL. |
| `400 Bad Request` | `"Invalid checkout request format"` | Check `patientInfo`. `state` must be a 2-letter uppercase US code (`CA`, `TX`, `FL`), and `email` must be valid. |
| `404 Not Found` | `"Product not found for this brand"` | The `productId` or `slug` belongs to another tenant or is marked `draft` / `portal_only`. Check visibility in Admin Portal. |
| `500 Server Error` | `"Stripe Connect account not configured"` | Brand has not connected Stripe. Complete Stripe Connect onboarding at `/admin/{brandId}/commerce` in VCO. |

---

## Nav items not documented in the HTML

The source HTML sidebar lists these anchors, but the page body does **not** include matching sections:

| Nav label | Anchor | Status |
|---|---|---|
| 5-Minute Quickstart | `#quickstart` | Missing |
| GET Categories | `#ep-categories` | Missing |
| POST Media / ID Upload | `#ep-upload` | Missing |
| 3. Medical Intake Flow | `#step-intake` | Missing |
| 5. Order Confirmation | `#step-success` | Missing |
