# VCO Commerce API Reference

**VirtualClinicOS (VCO)** — E-Commerce & Telehealth REST API  
**Base URL:** `https://portal.virtualclinicos.com`  
**Local sandbox:** `http://localhost:3000`

> Source: converted from `commerce-api.html`.  
> That HTML file is a duplicate of `VCO_ECommerce_Integration_Guide.html`. This Markdown file is the **API-only** extract (auth, endpoints, payloads). The full storefront wire-up lives in [`VCO_ECommerce_Integration_Guide.md`](./VCO_ECommerce_Integration_Guide.md).  
> Live API keys from the original HTML are **redacted**.

---

## Contents

- [Auth](#auth)
- [Brand tenants](#brand-tenants)
- [GET /api/commerce/v1/products](#get-apicommercev1products)
- [GET /api/commerce/v1/products/{slug}](#get-apicommercev1productsslug)
- [POST /api/commerce/v1/coupons/validate](#post-apicommercev1couponsvalidate)
- [POST /api/commerce/v1/checkout/session](#post-apicommercev1checkoutsession)
- [GET /api/v1/orders/patient](#get-apiv1orderspatient)
- [Error catalog](#error-catalog)
- [Undocumented endpoints (nav only)](#undocumented-endpoints-nav-only)

---

## Auth

Every server-side call should send JSON plus a tenant identifier.

| Header / Parameter | Type | Required | Description |
|---|---|---|---|
| `Authorization` | string | Required for Server APIs | `Bearer vco_live_...` (or `phk_live_...`). Brand tenant private API key. |
| `x-brand-id` | string | Optional | Brand slug or tenant UUID. Also accepted as `?brandId=`. |
| `Content-Type` | string | Required | `application/json` |

Storefront env vars:

| Variable | Example | Notes |
|---|---|---|
| `NEXT_PUBLIC_VCO_API_URL` | `https://portal.virtualclinicos.com` | Public base URL |
| `NEXT_PUBLIC_VCO_BRAND_ID` | `peakcare` | Brand slug |
| `VCO_API_KEY` | `phk_live_your_brand_api_key_here` | Server-only; never expose to the browser |

---

## Brand tenants

| Brand | Slug | Domain | Tenant UUID | API key |
|---|---|---|---|---|
| VitalWell Rx | `vitalwellrx` | `vitalwellrx.com` | `41521b9b-9237-4a8b-a42f-ac64dc0d782b` | `[REDACTED]` |
| Northstar | `northstar` | `joinnorthstar.com` | `c68fcd62-30a3-4e41-b083-51b059106853` | `[REDACTED]` |
| Efexia | `efexia` | `efexia.com` | `7b81ffe6-6349-4bc1-af65-959609e0cb0f` | `[REDACTED]` |
| Pax | `pax` | `paxlongevity.com` | `4065c369-9a3c-47af-8d6f-07cc7238d329` | `[REDACTED]` |
| NexaRx | `nexarx` | `nexarx.com` | `ea0316e8-f3e4-4356-8e33-ea6a93302b85` | `[REDACTED]` |
| RSRV | `rsrv` | `pending-rsrv.com` | `2423922a-c0a9-4c0e-9b91-06a9641700df` | `[REDACTED]` |
| PeakCare | `peakcare` | `peakcare.health` | `58f6187c-0c0b-4a54-b4c8-741f9aa60469` | Configured in PeakCare `.env` |

---

## GET `/api/commerce/v1/products`

Fetch active products for your storefront catalog.

Retrieves all active, public products for the specified brand. Automatically formats prices, images, contraindications, and treatment protocols.

### Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `brandId` | string | Required* | Brand slug (e.g. `peakcare`) or tenant UUID. *If omitted, Bearer API key or `x-brand-id` is used. |

### Example

```bash
curl -X GET "https://portal.virtualclinicos.com/api/commerce/v1/products?brandId=peakcare" \
  -H "Authorization: Bearer phk_live_your_api_key" \
  -H "Content-Type: application/json"
```

### Response `200 OK`

```json
{
  "success": true,
  "count": 3,
  "products": [
    {
      "id": "7878a21f-8182-411a-85d0-9999081a349c",
      "tenant_id": "77f7fa08-e218-4720-a616-0a670355447a",
      "name": "Semaglutide Weekly Injections",
      "slug": "semaglutide-weekly-injections",
      "description": "GLP-1 receptor agonist for medical weight management.",
      "price": 299.00,
      "category": "weight_loss",
      "treatment_protocol": "Semaglutide 2.5mg/mL subcutaneous vial",
      "requires_prescription": true,
      "requires_intake": true,
      "images": ["https://portal.virtualclinicos.com/images/semaglutide.png"],
      "contraindications": "Do not take if personal or family history of medullary thyroid carcinoma.",
      "screening_questions": [
        "Are you currently pregnant or breastfeeding?",
        "Do you have a personal history of pancreatitis?"
      ],
      "visibility": "public",
      "status": "active"
    }
  ]
}
```

---

## GET `/api/commerce/v1/products/{slug}`

Fetch a single product by slug or SKU.

### Example

```bash
curl -X GET "https://portal.virtualclinicos.com/api/commerce/v1/products/semaglutide-weekly-injections?brandId=peakcare" \
  -H "Authorization: Bearer phk_live_your_api_key"
```

The HTML does not include a dedicated response body for this endpoint. The storefront client example expects `{ "product": { ... } }`.

---

## POST `/api/commerce/v1/coupons/validate`

Validate a discount code during checkout.

### Request body

```json
{
  "brandId": "peakcare",
  "code": "SUMMER20",
  "cartTotalCents": 29900
}
```

### Response `200 OK`

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

---

## POST `/api/commerce/v1/checkout/session`

Create a Stripe Checkout Session and patient order.

This is the central checkout endpoint. It creates or matches the patient profile in VCO, stores encrypted medical intake questionnaire answers, calculates doctor and platform fees, and returns a **Stripe Checkout URL**.

Intake answers are encrypted at rest with **AES-256-GCM**.

### Request fields

| Field | Type | Required | Description |
|---|---|---|---|
| `brandId` | string | Required | Brand slug (e.g. `peakcare`) or tenant UUID. |
| `productId` | string | Required | Product UUID, SKU, or slug. |
| `patientInfo` | object | Required | `firstName`, `lastName`, `email`, `state` (2-letter US code, e.g. `TX`). Optional `phone` and `dob` (`YYYY-MM-DD`). |
| `intakeAnswers` | object | Required | Key-value map of questionnaire answers. Encrypted at rest via AES-256-GCM. |
| `couponCode` | string | Optional | Discount code if applied. |
| `successUrl` | string | Required | Redirect after payment, e.g. `https://peakcare.com/checkout/success?session_id={CHECKOUT_SESSION_ID}`. |
| `cancelUrl` | string | Required | Redirect if the patient cancels checkout. |

### Request body

```json
{
  "brandId": "peakcare",
  "productId": "7878a21f-8182-411a-85d0-9999081a349c",
  "patientInfo": {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "5125551234",
    "dob": "1992-05-14",
    "state": "TX"
  },
  "intakeAnswers": {
    "current_weight_lbs": 175,
    "target_weight_lbs": 140,
    "has_high_blood_pressure": false,
    "current_medications": "Multivitamin daily",
    "allergies": "None"
  },
  "couponCode": "SUMMER20",
  "successUrl": "https://peakcare.com/checkout/success?session_id={CHECKOUT_SESSION_ID}",
  "cancelUrl": "https://peakcare.com/shop"
}
```

### Response `200 OK`

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

**Frontend action:** when you receive `checkoutUrl`, redirect the patient:

```js
window.location.href = data.checkoutUrl;
```

Do **not** send `VCO_API_KEY` from the browser. Proxy this call through a storefront API route.

---

## GET `/api/v1/orders/patient`

Look up patient orders, doctor review status, and shipping tracking.

Query: `?email={email}`

### Response `200 OK`

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

## Error catalog

| Status | Message | Cause / fix |
|---|---|---|
| `401 Unauthorized` | `"brandId query param or valid Authorization Bearer API key required"` | Send `Authorization: Bearer ...` or `?brandId=your_brand`. |
| `400 Bad Request` | `"Invalid checkout request format"` | `patientInfo.state` must be a 2-letter uppercase US code; `email` must be valid. |
| `404 Not Found` | `"Product not found for this brand"` | Product belongs to another tenant, or visibility is `draft` / `portal_only`. |
| `500 Server Error` | `"Stripe Connect account not configured"` | Complete Stripe Connect at `/admin/{brandId}/commerce`. |

---

## Undocumented endpoints (nav only)

Listed in the HTML sidebar, but **no request/response docs** exist in the source:

| Method | Topic | Anchor |
|---|---|---|
| `GET` | Categories | `#ep-categories` |
| `POST` | Media / ID Upload | `#ep-upload` |
