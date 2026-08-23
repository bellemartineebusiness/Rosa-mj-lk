import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { buildSystemPrompt } from "@/lib/buildSystemPrompt";
import { checkRateLimit, checkBookingRateLimit } from "@/lib/rateLimit";
import { sendBookingNotification } from "@/lib/sendBookingNotification";
import { sendLeadNotification, sendCustomerConfirmation, sendSlackNotification } from "@/lib/sendLeadNotification";
import { createCalendarEvent, checkSlotAvailability, getFreeSlots } from "@/lib/googleCalendar";
import { getSlotsForDate, formatDate } from "@/lib/availability";
import { logger } from "@/lib/logger";

function getClaude() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }); }

// Hela boten kör på Sonnet 4.6 — bättre svenska än Haiku.
function selectModel(_messages: { role: string; content: string }[]): string {
  return "claude-sonnet-4-6";
}

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY        = 10;
const MONTHLY_LIMIT      = 1000;

function getIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function currentMonth() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export async function POST(req: NextRequest) {
  // ── 1. IP rate limit ──────────────────────────────────────
  const ipLimit = await checkRateLimit(getIp(req));
  if (!ipLimit.allowed) {
    return NextResponse.json({ error: ipLimit.reason }, { status: 429 });
  }

  // ── 2. Validera body ──────────────────────────────────────
  const body = await req.json().catch(() => null);
  if (!body || typeof body.customerId !== "string" || !Array.isArray(body.messages)) {
    return NextResponse.json({ error: "customerId och messages krävs." }, { status: 400 });
  }

  const db = createServiceClient();

  // ── 3. Hämta kund + inställningar ────────────────────────
  const [{ data: customer, error: custErr }, { data: settings }] = await Promise.all([
    db.from("customers")
      .select("id, email, subscription_status, messages_used_this_month, last_reset_month")
      .eq("id", body.customerId)
      .single(),
    db.from("bot_settings")
      .select("notification_email, slack_webhook, company_name, google_calendar_refresh_token, opening_hours, closed_dates")
      .eq("customer_id", body.customerId)
      .single(),
  ]);

  if (custErr || !customer) {
    return NextResponse.json({ error: "Kunden hittades inte." }, { status: 404 });
  }

  // ── 4. Prenumerationsstatus ───────────────────────────────
  if (customer.subscription_status === "past_due") {
    return NextResponse.json({
      reply: "Din prenumeration har en obetald faktura. Uppdatera betalningen för att fortsätta.",
    });
  }
  if (customer.subscription_status !== "active" && customer.subscription_status !== "trialing") {
    return NextResponse.json({
      reply: "Denna tjänst är inte aktiv. Kontakta oss för mer information.",
    });
  }

  // ── 5. Månadsreset + usage limit ─────────────────────────
  let used = customer.messages_used_this_month ?? 0;
  const month = currentMonth();

  if (customer.last_reset_month !== month) {
    await db
      .from("customers")
      .update({ messages_used_this_month: 0, last_reset_month: month })
      .eq("id", customer.id);
    used = 0;
  }

  if (used >= MONTHLY_LIMIT) {
    return NextResponse.json({
      reply: "Vi kan tyvärr inte svara just nu. Kontakta oss gärna direkt så hjälper vi dig.",
    });
  }

  // Betalande kunder styrs av sin egen månadskvot (1000 medd = Starter-planen)
  // ovan — inte av det delade globala taket, så publik demo-trafik aldrig kan
  // blockera en betalande kund.

  // ── 6. Bygg system prompt ─────────────────────────────────
  let systemPrompt: string;
  try {
    systemPrompt = await buildSystemPrompt(customer.id);
  } catch {
    systemPrompt = "Du är en hjälpsam kundtjänstassistent. Svara på svenska.";
  }

  // Injicera lediga tider om ett datum nämns och Google Calendar inte är kopplat
  if (!settings?.google_calendar_refresh_token && settings?.opening_hours) {
    const allText = (body.messages as { role: string; content: string }[])
      .map((m) => m.content).join(" ");
    const dateMatch = allText.match(/\d{4}-\d{2}-\d{2}/);
    if (dateMatch) {
      const dateStr = dateMatch[0];
      const allSlots = getSlotsForDate(settings.opening_hours, dateStr, settings.closed_dates ?? undefined);
      if (allSlots.length > 0) {
        const { data: bookedLeads } = await db
          .from("leads")
          .select("time")
          .eq("customer_id", customer.id)
          .eq("date", dateStr)
          .eq("status", "active");
        const bookedTimes = new Set((bookedLeads ?? []).map((l) => l.time));
        const freeSlots = allSlots.filter((s) => !bookedTimes.has(s));
        const label = formatDate(dateStr);
        systemPrompt += freeSlots.length > 0
          ? `\n\nLEDIGA TIDER ${label.toUpperCase()}: ${freeSlots.join(", ")}. Använd BARA dessa tider när du föreslår eller bekräftar bokningar den dagen.`
          : `\n\nINGA LEDIGA TIDER ${label.toUpperCase()}: Alla tider är fullbokade. Föreslå ett annat datum.`;
      } else {
        const label = formatDate(dateStr);
        systemPrompt += `\n\nSTÄNGT ${label.toUpperCase()}: Vi är stängda den dagen. Informera kunden och föreslå ett annat datum.`;
      }
    }
  }

  // ── 7. Sanera meddelanden ─────────────────────────────────
  const messages = (body.messages as { role: string; content: string }[])
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: String(m.content ?? "").slice(0, MAX_MESSAGE_LENGTH),
    }));

  // ── 8. Anropa Claude ──────────────────────────────────────
  let raw = "";
  try {
    const model = selectModel(messages);
    const response = await getClaude().messages.create({
      model,
      max_tokens: 512,
      // Cacha systemprompten — identisk mellan meddelanden i samma konversation,
      // så upprepade turer kostar bara ~10% av full input-kostnad.
      system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
      messages,
    }, { timeout: 25000 });
    raw = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");
  } catch (err) {
    logger.error("claude_error", { error: String(err) });
    return NextResponse.json({ error: "Kunde inte nå AI:n. Försök igen." }, { status: 500 });
  }

  // ── 9. Parsa JSON-svar ────────────────────────────────────
  let parsed: { action: string; message: string; data?: Record<string, string> } | null = null;
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
  } catch { /* ignorera parsfel */ }

  const reply  = parsed?.message ?? raw;
  const action = parsed?.action  ?? "chat";
  const data   = parsed?.data    ?? {};

  const companyName = settings?.company_name || "Företaget";
  const notifyTo    = settings?.notification_email || customer.email;
  const slackUrl    = settings?.slack_webhook || "";

  // ── 10. Spara lead/bokning ────────────────────────────────
  let newLeadId: string | null = null;
  if ((action === "lead" || action === "booking") && Object.values(data).some(Boolean)) {

    // Blockera bokningsspam per IP
    if (action === "booking") {
      const bookingLimit = await checkBookingRateLimit(getIp(req));
      if (!bookingLimit.allowed) {
        return NextResponse.json({ reply: bookingLimit.reason, action: "chat", data: {} });
      }
    }

    // Blockera bokning om datumet är passerat, saknas eller ogiltigt
    if (action === "booking") {
      if (!data.date) {
        return NextResponse.json({
          reply: "Vilket datum vill du boka? Ange en dag som passar dig.",
          action: "chat",
          data: {},
        });
      }
      // Validate that the date didn't overflow (e.g. "2026-02-31" → March in JS)
      const [yr, mo, dy] = data.date.split("-").map(Number);
      const parsedDate = new Date(`${data.date}T12:00:00Z`);
      const dateOverflowed =
        isNaN(parsedDate.getTime()) ||
        parsedDate.getUTCFullYear() !== yr ||
        parsedDate.getUTCMonth() + 1 !== mo ||
        parsedDate.getUTCDate() !== dy;
      if (dateOverflowed) {
        return NextResponse.json({
          reply: "Det datumet verkar inte stämma. Kontrollera datumet och försök igen.",
          action: "chat",
          data: {},
        });
      }
      const bookingDateTime = data.time
        ? new Date(`${data.date}T${data.time}:00`)
        : (() => { const d = new Date(data.date); d.setHours(23, 59, 59); return d; })();
      if (!isNaN(bookingDateTime.getTime()) && bookingDateTime < new Date()) {
        return NextResponse.json({
          reply: "Det datumet eller klockslaget har redan passerat. Välj en kommande tid.",
          action: "chat",
          data: {},
        });
      }
    }

    // Blockera om emailen redan har en aktiv bokning hos den här kunden
    if (action === "booking" && data.email) {
      const { data: existing } = await db
        .from("leads")
        .select("id")
        .eq("customer_id", customer.id)
        .eq("email", data.email)
        .eq("action", "booking")
        .eq("status", "active")
        .limit(1)
        .single();

      if (existing) {
        return NextResponse.json({
          reply: "Du har redan en aktiv bokning. Avboka den först om du vill boka en ny tid.",
          action: "chat",
          data: {},
        });
      }
    }

    const { data: inserted, error: insertErr } = await db.from("leads").insert({
      customer_id: customer.id,
      action,
      name:   data.name  || null,
      email:  data.email || null,
      phone:  data.phone || null,
      notes:  data.notes || null,
      date:   data.date  || null,
      time:   data.time  || null,
      status: "active",
    }).select("id").single();

    // Unique constraint (23505) = databasen blockerar dubbelbokningar atomärt
    if (insertErr) {
      if (insertErr.code === "23505") {
        return NextResponse.json({
          reply: `Den tiden (${data.date} kl ${data.time}) är redan bokad. Välj en annan tid.`,
          action: "chat",
          data: {},
        });
      }
      logger.error("db_insert_error", { error: insertErr?.message });
    }

    newLeadId = inserted?.id ?? null;

    if (newLeadId) {
      logger.info(action === "booking" ? "booking_created" : "lead_created", {
        customerId: customer.id,
        leadId: newLeadId,
        date: data.date,
        time: data.time,
      });
    }
  }

  // ── 11. Avbokning / ändring ───────────────────────────────
  if (action === "cancel" && data.name) {
    // Hämta tjänsten från ursprungsbokningen så mailet visar VAD som avbokats
    let sel = db.from("leads").select("notes").eq("customer_id", customer.id).eq("status", "active").ilike("name", data.name);
    if (data.date) sel = sel.eq("date", data.date);
    const { data: original } = await sel.limit(1).maybeSingle();
    const cancelData = { ...data, notes: data.notes || original?.notes || "" };

    let q = db
      .from("leads")
      .update({ status: "cancelled" })
      .eq("customer_id", customer.id)
      .eq("status", "active")
      .ilike("name", data.name);
    if (data.date) q = q.eq("date", data.date);
    await q;
    if (notifyTo) sendLeadNotification({ to: notifyTo, companyName, action: "cancel", data: cancelData }).catch((e) => logger.error("notification_failed", { error: String(e) }));
    if (slackUrl) sendSlackNotification({ webhookUrl: slackUrl, companyName, action: "cancel", data: cancelData }).catch((e) => logger.error("notification_failed", { error: String(e) }));
  }

  if (action === "change" && data.name && data.new_date) {
    // Hämta tjänsten från ursprungsbokningen så mailet visar VAD som ändrats
    let sel = db.from("leads").select("notes").eq("customer_id", customer.id).eq("status", "active").ilike("name", data.name);
    if (data.date) sel = sel.eq("date", data.date);
    const { data: original } = await sel.limit(1).maybeSingle();
    const changeData = { ...data, notes: data.notes || original?.notes || "" };

    let q = db
      .from("leads")
      .update({ date: data.new_date, time: data.new_time || null })
      .eq("customer_id", customer.id)
      .eq("status", "active")
      .ilike("name", data.name);
    if (data.date) q = q.eq("date", data.date);
    await q;
    if (notifyTo) sendLeadNotification({ to: notifyTo, companyName, action: "change", data: changeData }).catch((e) => logger.error("notification_failed", { error: String(e) }));
    if (slackUrl) sendSlackNotification({ webhookUrl: slackUrl, companyName, action: "change", data: changeData }).catch((e) => logger.error("notification_failed", { error: String(e) }));
  }

  // ── 12. Notiser (fire-and-forget) ─────────────────────────
  if (newLeadId) {
    const isBooking = action === "booking";

    // Mail till företagaren
    if (notifyTo) {
      if (isBooking) {
        sendBookingNotification({
          to: notifyTo, companyName,
          name: data.name || "Okänd",
          date: data.date || "", time: data.time || "",
          notes: data.notes || "",
          bookingId: newLeadId,
        }).catch((e) => logger.error("notification_failed", { error: String(e) }));
      } else {
        sendLeadNotification({ to: notifyTo, companyName, action: "lead", data }).catch((e) => logger.error("notification_failed", { error: String(e) }));
      }
    }

    // Slack
    if (slackUrl) {
      sendSlackNotification({
        webhookUrl: slackUrl,
        companyName,
        action: isBooking ? "booking" : "lead",
        data,
      }).catch((e) => logger.error("notification_failed", { error: String(e) }));
    }

    // Schemasbaserad tillgänglighetskoll (om ingen Google Calendar)
    if (isBooking && !settings?.google_calendar_refresh_token && data.date && data.time && settings?.opening_hours) {
      const allSlots = getSlotsForDate(settings.opening_hours, data.date);
      if (allSlots.length > 0) {
        const { data: bookedLeads } = await db
          .from("leads")
          .select("time")
          .eq("customer_id", customer.id)
          .eq("date", data.date)
          .eq("status", "active")
          .neq("id", newLeadId);
        const bookedTimes = new Set((bookedLeads ?? []).map((l) => l.time));
        const freeSlots = allSlots.filter((s) => !bookedTimes.has(s));

        if (!allSlots.includes(data.time)) {
          if (newLeadId) await db.from("leads").update({ status: "cancelled" }).eq("id", newLeadId);
          const suggestion = freeSlots.length > 0 ? ` Lediga tider: ${freeSlots.slice(0, 5).join(", ")}.` : " Inga lediga tider kvar den dagen.";
          return NextResponse.json({ reply: `kl ${data.time} ligger utanför våra öppettider.${suggestion}`, action: "chat", data: {} });
        }
        if (bookedTimes.has(data.time)) {
          if (newLeadId) await db.from("leads").update({ status: "cancelled" }).eq("id", newLeadId);
          const suggestion = freeSlots.length > 0 ? ` Lediga tider: ${freeSlots.slice(0, 5).join(", ")}.` : " Inga lediga tider kvar den dagen.";
          return NextResponse.json({ reply: `kl ${data.time} är tyvärr redan bokad.${suggestion}`, action: "chat", data: {} });
        }
      }
    }

    // Google Calendar event — kontrollera tillgänglighet först
    if (isBooking && settings?.google_calendar_refresh_token && data.date && data.time) {
      try {
        const available = await checkSlotAvailability(
          settings.google_calendar_refresh_token,
          data.date,
          data.time,
        );

        if (!available) {
          // Hämta lediga tider och returnera fel till användaren
          let freeSlots: string[] = [];
          try {
            freeSlots = await getFreeSlots(settings.google_calendar_refresh_token, data.date);
          } catch { /* ignorera om vi inte kan hämta lediga tider */ }

          const suggestions = freeSlots.length > 0
            ? ` Lediga tider den ${data.date}: ${freeSlots.slice(0, 3).join(", ")}.`
            : "";

          // Markera lead som avbruten och returnera ett nytt svar
          if (newLeadId) {
            await db.from("leads").update({ status: "cancelled" }).eq("id", newLeadId);
          }

          return NextResponse.json({
            reply: `Tyvärr är kl ${data.time} den ${data.date} redan bokad.${suggestions} Vill du boka en av dessa tider istället?`,
            action: "chat",
            data: {},
          });
        }

        // Tid är ledig — skapa kalenderbokning
        createCalendarEvent({
          refreshToken: settings.google_calendar_refresh_token,
          name:  data.name  || "Bokning",
          date:  data.date  || "",
          time:  data.time  || "",
          notes: data.notes,
        }).catch((err) => logger.error("gcal_event_failed", { error: String(err) }));

      } catch (err) {
        logger.error("gcal_availability_failed", { error: String(err) });
        if (newLeadId) {
          await db.from("leads").update({ status: "cancelled" }).eq("id", newLeadId);
        }
        return NextResponse.json({
          reply: "Jag kan tyvärr inte kontrollera tillgängligheten just nu. Försök igen om en stund eller kontakta oss direkt.",
          action: "chat",
          data: {},
        });
      }
    }

    // Bekräftelsemail till kunden (om vi har deras email)
    if (data.email) {
      sendCustomerConfirmation({
        to:           data.email,
        customerName: data.name || "där",
        companyName,
        action:       isBooking ? "booking" : "lead",
        notes:        data.notes,
        date:         data.date,
        time:         data.time,
        bookingId:    newLeadId ?? undefined,
      }).catch((e) => logger.error("notification_failed", { error: String(e) }));
    }
  }

  // ── 13. Logga usage ───────────────────────────────────────
  const { error: rpcErr } = await db.rpc("increment_usage", { customer_id: customer.id });
  if (rpcErr) {
    await db.from("customers").update({ messages_used_this_month: used + 1 }).eq("id", customer.id);
  }

  return NextResponse.json({ reply, action, data });
}
