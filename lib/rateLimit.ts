import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Fallback to in-memory if Upstash env vars are missing (local dev without Redis)
const useRedis =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

let cooldownLimiter: Ratelimit | null = null;
let minuteLimiter: Ratelimit | null = null;
let dayLimiter: Ratelimit | null = null;
let bookingLimiter: Ratelimit | null = null;
let budgetRedis: Redis | null = null;

if (useRedis) {
  const redis = Redis.fromEnv();
  budgetRedis = redis;
  cooldownLimiter = new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(1, "2 s"),   prefix: "rl:cd" });
  minuteLimiter  = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "1 m"),  prefix: "rl:min" });
  dayLimiter     = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(100, "24 h"), prefix: "rl:day" });
  bookingLimiter = new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(3, "24 h"),    prefix: "rl:book" });
}

// ── Global månads-budget (kill switch för PUBLIKA AI-endpoints) ──────────
// Skyddar bara gratisdelarna mot missbruk: demo-boten (1 enhet/meddelande) och
// webbanalysen (10 enheter). Betalande kunder styrs INTE av detta — de har sin
// egen kvot (1000 medd/mån = Starter-planen). Överskrids taket slutar de
// publika endpointsen anropa Claude tills månaden nollställs.
// ~2000 enheter på Sonnet ≈ ~200 kr demo-tak. Justera med env-varen AI_MONTHLY_LIMIT.
const AI_MONTHLY_LIMIT = Number(process.env.AI_MONTHLY_LIMIT ?? 2000);
let memBudget = { month: "", count: 0 };

function currentMonthKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

// ── In-memory fallback (local dev) ───────────────────────
const COOLDOWN_MS  = 1500;
const PER_MINUTE   = 10;
const PER_DAY      = 100;
const BOOKINGS_DAY = 3;

type Entry = { minuteCount: number; minuteReset: number; dayCount: number; dayReset: number; bookingCount: number; lastRequest: number };
const store = new Map<string, Entry>();

function inMemoryCheck(ip: string): RateLimitResult {
  const now = Date.now();
  const entry: Entry = store.get(ip) ?? {
    minuteCount: 0, minuteReset: now + 60_000,
    dayCount: 0,    dayReset: now + 86_400_000,
    bookingCount: 0, lastRequest: 0,
  };
  if (now - entry.lastRequest < COOLDOWN_MS) return { allowed: false, reason: "Skriv lite långsammare." };
  if (now > entry.minuteReset) { entry.minuteCount = 0; entry.minuteReset = now + 60_000; }
  if (now > entry.dayReset)    { entry.dayCount = 0; entry.bookingCount = 0; entry.dayReset = now + 86_400_000; }
  if (entry.minuteCount >= PER_MINUTE) return { allowed: false, reason: "För många meddelanden. Vänta en minut." };
  if (entry.dayCount    >= PER_DAY)    return { allowed: false, reason: "Daggränsen nådd. Försök igen imorgon." };
  entry.minuteCount++;
  entry.dayCount++;
  entry.lastRequest = now;
  store.set(ip, entry);
  return { allowed: true };
}

function inMemoryBookingCheck(ip: string): RateLimitResult {
  const now = Date.now();
  const entry: Entry = store.get(ip) ?? {
    minuteCount: 0, minuteReset: now + 60_000,
    dayCount: 0,    dayReset: now + 86_400_000,
    bookingCount: 0, lastRequest: 0,
  };
  if (now > entry.dayReset) { entry.bookingCount = 0; entry.dayReset = now + 86_400_000; }
  if (entry.bookingCount >= BOOKINGS_DAY) return { allowed: false, reason: "För många bokningar idag. Försök igen imorgon." };
  entry.bookingCount++;
  store.set(ip, entry);
  return { allowed: true };
}

// ── Public API ────────────────────────────────────────────
export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; reason: string };

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  if (!useRedis) return inMemoryCheck(ip);

  const cooldown = await cooldownLimiter!.limit(ip);
  if (!cooldown.success) return { allowed: false, reason: "Skriv lite långsammare." };

  const minute = await minuteLimiter!.limit(ip);
  if (!minute.success) return { allowed: false, reason: "För många meddelanden. Vänta en minut." };

  const day = await dayLimiter!.limit(ip);
  if (!day.success) return { allowed: false, reason: "Daggränsen nådd. Försök igen imorgon." };

  return { allowed: true };
}

/**
 * Global månads-tak för publika AI-endpoints. Anropa FÖRE varje Claude-anrop.
 * `cost` = hur tungt anropet är (chatt = 1, webbanalys = 10).
 * Returnerar { allowed: false } när månadstaket är slut → hoppa över AI-anropet.
 */
export async function checkGlobalBudget(cost = 1): Promise<RateLimitResult> {
  const denied = { allowed: false as const, reason: "Tjänsten är tillfälligt otillgänglig. Försök igen senare." };
  const month = currentMonthKey();

  if (!useRedis) {
    if (memBudget.month !== month) memBudget = { month, count: 0 };
    if (memBudget.count >= AI_MONTHLY_LIMIT) return denied;
    memBudget.count += cost;
    return { allowed: true };
  }

  try {
    const key = `budget:public:${month}`;
    const count = await budgetRedis!.incrby(key, cost);
    if (count === cost) await budgetRedis!.expire(key, 60 * 60 * 24 * 40); // ~40 dagar
    if (count > AI_MONTHLY_LIMIT) return denied;
    return { allowed: true };
  } catch {
    // Redis nere → blockera hellre än att riskera okontrollerad kostnad
    return denied;
  }
}

export async function checkBookingRateLimit(ip: string): Promise<RateLimitResult> {
  if (!useRedis) return inMemoryBookingCheck(ip);

  const result = await bookingLimiter!.limit(ip);
  if (!result.success) return { allowed: false, reason: "För många bokningar idag. Försök igen imorgon." };

  return { allowed: true };
}
