import { createServiceClient } from "@/lib/supabase";
import WidgetClient from "./WidgetClient";

const DEFAULT_COLOR = "#E8440A";

export default async function WidgetPage({
  params,
  searchParams,
}: {
  params: Promise<{ customerId: string }>;
  searchParams: Promise<{ color?: string }>;
}) {
  const { customerId } = await params;
  const { color: urlColor } = await searchParams;

  const db = createServiceClient();
  const { data } = await db
    .from("bot_settings")
    .select("brand_color, company_name")
    .eq("customer_id", customerId)
    .single();

  const color = urlColor
    ? `#${urlColor}`
    : (data?.brand_color || DEFAULT_COLOR);

  const companyName = data?.company_name || "";

  return (
    <WidgetClient
      customerId={customerId}
      initialColor={color}
      initialCompanyName={companyName}
    />
  );
}
