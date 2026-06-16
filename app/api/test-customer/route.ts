import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";

// Endast tillgänglig i development — skapar en testkund utan Stripe
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Ej tillgänglig i produktion." }, { status: 403 });
  }

  const testEmail = "test@bellemartinee.se";
  const db = createServiceClient();

  // Supabase-kund
  let { data: existing } = await db
    .from("customers")
    .select("id")
    .eq("email", testEmail)
    .single();

  if (!existing) {
    const { data: created } = await db
      .from("customers")
      .insert({ email: testEmail, subscription_status: "active" })
      .select("id")
      .single();

    if (created) {
      await db.from("bot_config").insert({ customer_id: created.id });
    }

    existing = created;
  } else {
    await db
      .from("customers")
      .update({ subscription_status: "active" })
      .eq("id", existing.id);
  }

  // Prisma-kund
  const prismaExisting = await prisma.customer.findUnique({ where: { email: testEmail } });

  if (!prismaExisting) {
    await prisma.customer.create({
      data: {
        email: testEmail,
        name: "Testföretag",
        slug: "testforetag",
        settings: {
          create: {
            systemPrompt: "Du är en testbot. Svara vänligt på svenska.",
            tone: "friendly",
            primaryColor: "#E8440A",
          },
        },
        knowledgeBases: {
          create: [
            { title: "Öppettider", content: "Mån–Fre 09–17" },
            { title: "Priser", content: "Grundpaket 499 kr/mån" },
          ],
        },
      },
    });
  }

  if (!existing) {
    return NextResponse.json({ error: "Kunde inte skapa testkund." }, { status: 500 });
  }

  return NextResponse.redirect(new URL(`/dashboard/${existing.id}`, "http://localhost:3000"));
}
