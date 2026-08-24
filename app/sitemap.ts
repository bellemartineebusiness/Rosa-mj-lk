import { MetadataRoute } from "next";

const base = "https://bellemartinee.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "",                   priority: 1.0, changeFrequency: "monthly" },
    { path: "/chattbottar",       priority: 0.8, changeFrequency: "monthly" },
    { path: "/integritetspolicy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/cookie-policy",     priority: 0.3, changeFrequency: "yearly" },
  ];

  return pages.map((p) => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
