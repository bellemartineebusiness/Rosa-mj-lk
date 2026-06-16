import { createClient } from "@supabase/supabase-js";

export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export type Customer = {
  id: string;
  email: string;
  stripe_customer_id: string | null;
  subscription_status: "active" | "past_due" | "inactive";
  messages_used_this_month: number;
  last_reset_month: string;
  created_at: string;
};

export type BotSettings = {
  id: string;
  customer_id: string;
  company_name: string;
  opening_hours: string;
  prices: string;
  phone: string;
  address: string;
  system_prompt: string;
  tone: string;
  updated_at: string;
};

export type KnowledgeEntry = {
  id: string;
  customer_id: string;
  title: string;
  content: string;
  created_at: string;
};
