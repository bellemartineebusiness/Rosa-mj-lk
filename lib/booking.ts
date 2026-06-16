import { prisma } from "./prisma";

export interface Slot {
  date: string;
  time: string;
}

export interface BookingResult {
  success: boolean;
  confirmationId?: string;
  message: string;
}

export async function getAvailableSlots(prismaCustomerId: string, date: string): Promise<Slot[]> {
  const config = await prisma.bookingConfig.findUnique({ where: { customerId: prismaCustomerId } });
  if (!config?.enabled) return [];

  if (config.provider === "custom_api" && config.webhookUrl) {
    const res = await fetch(`${config.webhookUrl}/slots?date=${date}`, {
      headers: config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {},
    });
    if (res.ok) return res.json();
  }

  return [
    { date, time: "09:00" },
    { date, time: "10:00" },
    { date, time: "13:00" },
    { date, time: "14:00" },
    { date, time: "15:00" },
  ];
}

export async function bookAppointment(
  prismaCustomerId: string,
  date: string,
  time: string,
  name: string,
): Promise<BookingResult> {
  const config = await prisma.bookingConfig.findUnique({ where: { customerId: prismaCustomerId } });
  if (!config?.enabled) {
    return { success: false, message: "Bokning är inte aktiverat." };
  }

  if (config.provider === "custom_api" && config.webhookUrl) {
    const res = await fetch(`${config.webhookUrl}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
      },
      body: JSON.stringify({ date, time, name }),
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, confirmationId: data.id, message: `Bokad: ${date} kl ${time}` };
    }
    return { success: false, message: "Bokning misslyckades." };
  }

  return {
    success: true,
    confirmationId: `MOCK-${Date.now()}`,
    message: `Bokad: ${date} kl ${time} för ${name}`,
  };
}
