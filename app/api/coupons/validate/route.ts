import {
  VcoNotConfiguredError,
  isVcoConfigured,
  parseCouponRequest,
  validateCoupon,
} from "@/lib/commerce";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isVcoConfigured()) {
    return Response.json(
      { error: "VCO commerce is not configured" },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parseCouponRequest(json);
  if ("error" in parsed) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const result = await validateCoupon(parsed.value);
    return Response.json(result.body, { status: result.status });
  } catch (error) {
    if (error instanceof VcoNotConfiguredError) {
      return Response.json({ error: error.message }, { status: 503 });
    }
    console.error(
      "[VCO Commerce] coupon validate failed",
      error instanceof Error ? error.message : "unknown error",
    );
    return Response.json({ error: "VCO commerce request failed" }, { status: 500 });
  }
}
