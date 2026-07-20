import { NextRequest, NextResponse } from "next/server";

// Gammal preview flyttad till den samlade routen /api/test-email/preview
export async function GET(req: NextRequest) {
  return NextResponse.redirect(new URL("/api/test-email/preview?type=welcome", req.nextUrl.origin));
}
