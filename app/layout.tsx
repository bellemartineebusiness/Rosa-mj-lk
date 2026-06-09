import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
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
    default: "Belle Martineé | AI-drivet kreativ byrå i Stockholm",
    template: "%s | Belle Martineé",
  },
  description:
    "Belle Martineé skapar logotyper, hemsidor och marknadsföring med AI. Snabbt, smart och vackert. Baserade i Stockholm — leverans på 5 dagar.",
  keywords: [
    "webbyrå Stockholm",
    "logotyp AI",
    "hemsida AI",
    "digital marknadsföring",
    "varumärke",
    "Belle Martineé",
  ],
  authors: [{ name: "Belle Martineé" }],
  creator: "Belle Martineé",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: siteUrl,
    siteName: "Belle Martineé",
    title: "Belle Martineé | AI-drivet kreativ byrå i Stockholm",
    description:
      "Vi skapar logotyper, hemsidor och marknadsföring med AI. Snabbt, smart och vackert. Leverans på 5 dagar från 4 000 kr.",
    images: [
      {
        url: "/hero-desktop.png",
        width: 1200,
        height: 630,
        alt: "Belle Martineé — AI-drivet kreativ byrå",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Belle Martineé | AI-drivet kreativ byrå i Stockholm",
    description:
      "Vi skapar logotyper, hemsidor och marknadsföring med AI. Leverans på 5 dagar från 4 000 kr.",
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
                "AI-drivet kreativ byrå som skapar logotyper, hemsidor och marknadsföring.",
              url: siteUrl,
              telephone: "+46708670050",
              email: "Bellemartinee.busines@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Stockholm",
                addressCountry: "SE",
              },
              areaServed: "SE",
              priceRange: "fr. 4 000 kr",
              openingHours: "Mo-Fr 09:00-18:00",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
