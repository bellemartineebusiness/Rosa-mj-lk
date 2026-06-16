import { google } from "googleapis";

function makeClient(redirectUri?: string) {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri ?? `${process.env.NEXT_PUBLIC_SITE_URL}/api/google-calendar/callback`,
  );
}

export function getAuthUrl(customerId: string, baseUrl: string): string {
  const redirectUri = `${baseUrl}/api/google-calendar/callback`;
  return makeClient(redirectUri).generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
    state: customerId,
    prompt: "consent",
  });
}

export async function exchangeCode(code: string, baseUrl: string): Promise<string> {
  const redirectUri = `${baseUrl}/api/google-calendar/callback`;
  const { tokens } = await makeClient(redirectUri).getToken(code);
  if (!tokens.refresh_token) throw new Error("Ingen refresh_token från Google.");
  return tokens.refresh_token;
}

function parseStockholmTime(dateStr: string, timeStr: string): Date {
  const probe = new Date(`${dateStr}T12:00:00Z`);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Stockholm",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  }).formatToParts(probe);
  const get = (type: string) => parseInt(parts.find(p => p.type === type)?.value ?? "0");
  const stockholmAsUtc = new Date(Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second")));
  const offsetMs = probe.getTime() - stockholmAsUtc.getTime();
  return new Date(new Date(`${dateStr}T${timeStr}:00Z`).getTime() + offsetMs);
}

export async function checkSlotAvailability(
  refreshToken: string,
  date: string,
  time: string,
  durationMinutes = 60,
): Promise<boolean> {
  const client = makeClient();
  client.setCredentials({ refresh_token: refreshToken });
  const calendar = google.calendar({ version: "v3", auth: client });

  const start = parseStockholmTime(date, time);
  if (isNaN(start.getTime())) throw new Error("Ogiltigt datum/tid.");
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = res.data.items ?? [];
  return events.length === 0;
}

export async function getFreeSlots(
  refreshToken: string,
  date: string,
  openHour = 9,
  closeHour = 17,
  durationMinutes = 60,
): Promise<string[]> {
  const client = makeClient();
  client.setCredentials({ refresh_token: refreshToken });
  const calendar = google.calendar({ version: "v3", auth: client });

  const dayStart = parseStockholmTime(date, `${String(openHour).padStart(2, "0")}:00`);
  const dayEnd   = parseStockholmTime(date, `${String(closeHour).padStart(2, "0")}:00`);

  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: dayStart.toISOString(),
    timeMax: dayEnd.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  const busy = (res.data.items ?? []).map((e) => ({
    start: new Date(e.start?.dateTime ?? e.start?.date ?? ""),
    end:   new Date(e.end?.dateTime   ?? e.end?.date   ?? ""),
  }));

  const free: string[] = [];
  let cursor = new Date(dayStart);

  while (cursor.getTime() + durationMinutes * 60 * 1000 <= dayEnd.getTime()) {
    const slotEnd = new Date(cursor.getTime() + durationMinutes * 60 * 1000);
    const overlaps = busy.some((b) => b.start < slotEnd && b.end > cursor);
    if (!overlaps) {
      free.push(`${String(cursor.getHours()).padStart(2, "0")}:${String(cursor.getMinutes()).padStart(2, "0")}`);
    }
    cursor = new Date(cursor.getTime() + durationMinutes * 60 * 1000);
  }

  return free;
}

export async function createCalendarEvent({
  refreshToken,
  name,
  date,
  time,
  notes,
}: {
  refreshToken: string;
  name: string;
  date: string;
  time: string;
  notes?: string;
}) {
  const client = makeClient();
  client.setCredentials({ refresh_token: refreshToken });

  const start = date && time ? new Date(`${date}T${time}:00`) : new Date();
  if (isNaN(start.getTime())) throw new Error("Ogiltigt datum/tid.");
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const calendar = google.calendar({ version: "v3", auth: client });
  await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: `Bokning – ${name}`,
      description: notes || "Bokad via chattbot",
      start: { dateTime: start.toISOString(), timeZone: "Europe/Stockholm" },
      end:   { dateTime: end.toISOString(),   timeZone: "Europe/Stockholm" },
    },
  });
}
