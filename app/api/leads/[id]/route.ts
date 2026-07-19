import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token      = req.nextUrl.searchParams.get("token");
  const customerId = req.nextUrl.searchParams.get("customerId");

  if (!id || !customerId || !token) {
    return NextResponse.json({ error: "Parametrar saknas." }, { status: 400 });
  }

  const db = createServiceClient();

  const { data: customer } = await db
    .from("customers")
    .select("id, login_token")
    .eq("id", customerId)
    .single();

  if (!customer || (customer.login_token && token !== customer.login_token)) {
    return NextResponse.json({ error: "Ej behörig." }, { status: 401 });
  }

  const { error } = await db
    .from("leads")
    .delete()
    .eq("id", id)
    .eq("customer_id", customerId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
