import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/PublicShell";
import { brand } from "@/config/branding";
import GA4Script from "@/components/analytics/GA4Script";
import MetaPixelScript from "@/components/analytics/MetaPixelScript";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "AI automation agency",
    "AI agent development",
    "n8n automation",
    "WhatsApp automation",
    "AI consulting",
    "n8n VPS",
    "workflow automation Bangladesh",
    "AI chatbot Bangladesh",
    "AI voice agent",
    "lead scoring automation",
    "self-hosted automation",
  ],
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    url: brand.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: brand.siteUrl,
  description: brand.description,
  email: brand.email,
  sameAs: Object.values(brand.social),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-brand-bg text-brand-text font-body antialiased flex flex-col min-h-screen">
        <PublicShell>{children}</PublicShell>
        <GA4Script />
        <MetaPixelScript />
      </body>
    </html>
  );
}
