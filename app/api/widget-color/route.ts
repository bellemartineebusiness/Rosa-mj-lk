import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get("customerId");
  if (!customerId) return NextResponse.json({ color: null });

  const db = createServiceClient();
  const { data } = await db
    .from("bot_settings")
    .select("brand_color, company_name")
    .eq("customer_id", customerId)
    .single();

  return NextResponse.json({ color: data?.brand_color ?? null, companyName: (data as any)?.company_name ?? null });
}
