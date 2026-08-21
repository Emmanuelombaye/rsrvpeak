import {
  VcoNotConfiguredError,
  createCheckoutSession,
  isVcoConfigured,
  parseCheckoutRequest,
  storefrontUrl,
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

  const parsed = parseCheckoutRequest(json);
  if ("error" in parsed) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const result = await createCheckoutSession({
      ...parsed.value,
      successUrl: `${storefrontUrl(request, "/checkout/success")}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: storefrontUrl(request, "/shop"),
    });
    return Response.json(result.body, { status: result.status });
  } catch (error) {
    if (error instanceof VcoNotConfiguredError) {
      return Response.json({ error: error.message }, { status: 503 });
    }
    console.error(
      "[VCO Commerce] checkout session failed",
      error instanceof Error ? error.message : "unknown error",
    );
    return Response.json({ error: "VCO commerce request failed" }, { status: 500 });
  }
}
