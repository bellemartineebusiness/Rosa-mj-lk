import { NextRequest, NextResponse } from "next/server";
import { sendBookingNotification } from "@/lib/sendBookingNotification";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const to = body.to || "simonlind06@icloud.com";

  await sendBookingNotification({
    to,
    companyName: "Testföretaget",
    name: "Anna Svensson",
    date: "2026-07-05",
    time: "10:00",
    bookingId: "test-" + Date.now(),
    baseUrl: req.nextUrl.origin,
  });

  return NextResponse.json({ ok: true });
}
