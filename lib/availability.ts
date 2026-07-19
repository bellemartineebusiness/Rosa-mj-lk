const SWEDISH_DAYS: Record<string, number> = {
  söndag: 0, måndag: 1, tisdag: 2, onsdag: 3,
  torsdag: 4, fredag: 5, lördag: 6,
};

function timeToMinutes(t: string): number {
  const [h, m = "0"] = t.split(":");
  return parseInt(h) * 60 + parseInt(m);
}

function minutesToTime(m: number): string {
  return `${Math.floor(m / 60).toString().padStart(2, "0")}:00`;
}

function parseHourRange(str: string): string[] {
  const m = str.match(/(\d{1,2}(?::\d{2})?)\s*[-–]\s*(\d{1,2}(?::\d{2})?)/);
  if (!m) return [];
  const start = timeToMinutes(m[1]);
  const end = timeToMinutes(m[2]);
  const slots: string[] = [];
  for (let t = start; t < end; t += 60) slots.push(minutesToTime(t));
  return slots;
}

function segmentCoversDow(segment: string, dow: number): boolean {
  const lower = segment.toLowerCase();
  const rangeMatch = lower.match(/([a-zåäö]+)\s*[-–]\s*([a-zåäö]+)/);
  if (rangeMatch) {
    const s = SWEDISH_DAYS[rangeMatch[1]];
    const e = SWEDISH_DAYS[rangeMatch[2]];
    if (s === undefined || e === undefined) return false;
    if (s <= e) return dow >= s && dow <= e;
    return dow >= s || dow <= e;
  }
  for (const [name, d] of Object.entries(SWEDISH_DAYS)) {
    if (lower.includes(name) && d === dow) return true;
  }
  return false;
}

export function getSlotsForDate(openingHours: string, dateStr: string, closedDates?: string): string[] {
  if (!openingHours?.trim()) return [];
  if (closedDates?.trim()) {
    const closed = closedDates.split(/[\n,]/).map((d) => d.trim().slice(0, 10)).filter(Boolean);
    if (closed.includes(dateStr)) return [];
  }
  const date = new Date(dateStr + "T12:00:00Z");
  const dow = date.getUTCDay();
  for (const seg of openingHours.split(/[,\n]/)) {
    if (!segmentCoversDow(seg, dow)) continue;
    const lower = seg.toLowerCase();
    if (lower.includes("stängt") || lower.includes("closed")) return [];
    return parseHourRange(seg);
  }
  return [];
}

export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr + "T12:00:00Z").toLocaleDateString("sv-SE", {
      weekday: "long", day: "numeric", month: "long", timeZone: "UTC",
    });
  } catch {
    return dateStr;
  }
}
