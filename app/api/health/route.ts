import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET() {
  const db = createServiceClient();
  await db.from("customers").select("id").limit(1);
  return NextResponse.json({ ok: true });
}
