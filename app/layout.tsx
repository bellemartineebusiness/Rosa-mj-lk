import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
});

const siteUrl = "https://bellemartinee.se";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Belle Martineé | AI-chattbottar för företag i Stockholm",
    template: "%s | Belle Martineé",
  },
  description:
    "Belle Martineé bygger AI-chattbottar för företag i alla branscher. Automatisera kundservice, bokning och leadinsamling dygnet runt. Från 699 kr/mån, gratis installation, igång samma dag.",
  keywords: [
    "AI chattbot",
    "chattbot företag",
    "AI kundservice",
    "chattbot till hemsida",
    "automatiserad bokning",
    "kundtjänst automatisering",
    "AI-bot Stockholm",
    "Belle Martineé",
  ],
  authors: [{ name: "Belle Martineé" }],
  creator: "Belle Martineé",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: siteUrl,
    siteName: "Belle Martineé",
    title: "Belle Martineé | AI-chattbottar för företag i Stockholm",
    description:
      "AI-chattbottar som automatiserar kundservice, bokning och försäljning dygnet runt. Från 699 kr/mån, gratis installation, igång samma dag.",
    images: [
      {
        url: "/hero-desktop.png",
        width: 1200,
        height: 630,
        alt: "Belle Martineé — AI-chattbottar för företag",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Belle Martineé | AI-chattbottar för företag i Stockholm",
    description:
      "AI-chattbottar som automatiserar kundservice, bokning och försäljning dygnet runt. Från 699 kr/mån, gratis installation, igång samma dag.",
    images: ["/hero-desktop.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
<script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Belle Martineé",
              description:
                "AI-chattbottar för företag — automatisera kundservice, bokning och försäljning.",
              url: siteUrl,
              email: "info@bellemartinee.se",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Stockholm",
                addressCountry: "SE",
              },
              areaServed: "SE",
              priceRange: "fr. 699 kr/mån",
              openingHours: "Mo-Fr 09:00-18:00",
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
