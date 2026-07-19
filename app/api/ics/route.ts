import { NextRequest, NextResponse } from "next/server";

const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:Europe/Stockholm",
  "BEGIN:DAYLIGHT",
  "DTSTART:19700329T020000",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0200",
  "TZNAME:CEST",
  "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "DTSTART:19701025T030000",
  "TZOFFSETFROM:+0200",
  "TZOFFSETTO:+0100",
  "TZNAME:CET",
  "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10",
  "END:STANDARD",
  "END:VTIMEZONE",
].join("\r\n");

function formatIcsDate(date: Date) {
  return date.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name    = searchParams.get("name")    || "Bokning";
  const company = searchParams.get("company") || "";
  const date    = searchParams.get("date")    || "";
  const time    = searchParams.get("time")    || "";
  const uid     = searchParams.get("uid")     || Date.now().toString();

  const summary = company ? `Bokning hos ${company}` : `Bokning`;

  let dtstart: string;
  let dtend: string;

  if (date && time) {
    // Use local Stockholm time with TZID — avoids DST conversion errors
    const localDt = `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
    const localEnd = (() => {
      const [h, m] = time.split(":").map(Number);
      const endH   = String(h + 1).padStart(2, "0");
      return `${date.replace(/-/g, "")}T${endH}${String(m).padStart(2, "0")}00`;
    })();
    dtstart = `DTSTART;TZID=Europe/Stockholm:${localDt}`;
    dtend   = `DTEND;TZID=Europe/Stockholm:${localEnd}`;
  } else if (date) {
    const d = date.replace(/-/g, "");
    dtstart = `DTSTART;VALUE=DATE:${d}`;
    dtend   = `DTEND;VALUE=DATE:${d}`;
  } else {
    const d = new Date().toISOString().split("T")[0].replace(/-/g, "");
    dtstart = `DTSTART;VALUE=DATE:${d}`;
    dtend   = `DTEND;VALUE=DATE:${d}`;
  }

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "PRODID:-//Belle Martineé//Chattbot//EN",
    VTIMEZONE,
    "BEGIN:VEVENT",
    `UID:booking-${uid}@bellemartinee.se`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    dtstart,
    dtend,
    `SUMMARY:${summary}`,
    `DESCRIPTION:Bokad av ${name} via chattbot`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const filename = `bokning-${name.toLowerCase().replace(/\s+/g, "-")}.ics`;

  return new NextResponse(ics, {
    headers: {
      "Content-Type":        "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control":       "no-store",
    },
  });
}
