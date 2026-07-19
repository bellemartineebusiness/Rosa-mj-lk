import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get("customerId");
  if (!customerId) {
    return NextResponse.json({ active: false });
  }

  const db = createServiceClient();
  const { data } = await db
    .from("customers")
    .select("subscription_status")
    .eq("id", customerId)
    .single();

  const active =
    data?.subscription_status === "active" ||
    data?.subscription_status === "trialing";

  return NextResponse.json({ active }, {
    headers: { "Cache-Control": "no-store" },
  });
}
