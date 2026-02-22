import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // 🚀 Crucial for Speed Index
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "VertexWeb | Premium Digital Agency in Rajkot",
  description: "VertexWeb engineers high-performance digital masterpieces.",
  keywords: ["Web Design Rajkot", "Next.js Developer India", "VertexWeb Agency", "UI/UX Design Gujarat"],
  authors: [{ name: "Hardik | VertexWeb" }],
  metadataBase: new URL("https://vertexweb.agency"),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "VertexWeb | Premium Digital Agency",
    description: "Building the future of the web with Next.js and precision motion.",
    url: "https://vertexweb.agency",
    siteName: "VertexWeb",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  alternates: { canonical: "https://vertexweb.agency" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "VertexWeb",
  "image": "https://vertexweb.agency/og-image.jpg",
  "description": "Premium digital agency building high-performance Next.js websites.",
  "url": "https://vertexweb.agency",
  "telephone": "+917041126244",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rajkot",
    "addressLocality": "Rajkot",
    "addressRegion": "Gujarat",
    "addressCountry": "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* 🚀 Priority Fetching for Speed Index */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="worker" // 🚀 Fix: Offload to worker thread
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-foreground`}>
        <ClientProviders>
          <Navbar />
          <main className="relative min-h-screen">
            {children}
          </main>
        </ClientProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}