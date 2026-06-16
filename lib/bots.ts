export type Bot = {
  id: string;
  name: string;
  systemPrompt: string;
  model: string;
};

export const bots: Record<string, Bot> = {
  support: {
    id: "support",
    name: "SupportBot",
    systemPrompt:
      "Du är en hjälpsam kundservice-assistent. Svara kort, vänligt och på svenska. Håll svaren under 3 meningar. Om du inte vet svaret, be kunden kontakta oss direkt.",
    model: "gpt-4o-mini",
  },
  sales: {
    id: "sales",
    name: "SäljBot",
    systemPrompt:
      "Du är en säljassistent som hjälper kunder hitta rätt produkt eller tjänst. Var hjälpsam, positiv och fokuserad på kundens behov. Svara på svenska och håll det kortfattat.",
    model: "gpt-4o-mini",
  },
};

export function getBot(id: string): Bot | null {
  return bots[id] ?? null;
}
