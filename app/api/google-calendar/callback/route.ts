import { NextRequest, NextResponse } from "next/server";
import { exchangeCode } from "@/lib/googleCalendar";
import { createServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const code       = req.nextUrl.searchParams.get("code");
  const customerId = req.nextUrl.searchParams.get("state");
  const error      = req.nextUrl.searchParams.get("error");

  const base = `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  if (error || !code || !customerId) {
    return NextResponse.redirect(`${base}/dashboard/${customerId ?? ""}?gcal=error`);
  }

  try {
    const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
    const refreshToken = await exchangeCode(code, baseUrl);
    const db = createServiceClient();
    await db
      .from("bot_settings")
      .update({ google_calendar_refresh_token: refreshToken })
      .eq("customer_id", customerId);

    return NextResponse.redirect(`${base}/dashboard/${customerId}?gcal=connected`);
  } catch (err) {
    console.error("Google Calendar callback error:", err);
    return NextResponse.redirect(`${base}/dashboard/${customerId}?gcal=error`);
  }
}
