import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
// 🚀 CHANGE: Import 'dynamic' to defer heavy scripts
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";

// 🚀 CHANGE: Lazy load heavy components to reduce Total Blocking Time
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll").then(mod => mod.SmoothScroll), {
  ssr: false
});
const CustomCursor = dynamic(() => import("@/ui/CustomCursor").then(mod => mod.CustomCursor), {
  ssr: false
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VertexWeb | Premium Digital Agency in Rajkot",
  description: "VertexWeb engineers high-performance digital masterpieces. Premium Next.js websites for forward-thinking brands in Rajkot.",
  keywords: ["Web Design Rajkot", "Next.js Developer India", "VertexWeb Agency", "UI/UX Design Gujarat"],
  authors: [{ name: "Hardik | VertexWeb" }],
  metadataBase: new URL("https://vertexweb.agency"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "22.3039",
    "longitude": "70.8022"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-foreground selection:bg-primary/30 selection:text-white`}>
        {/* 🚀 Performance Note: Components now only load when the browser is ready */}
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="relative min-h-screen">
            {children}
          </main>
        </SmoothScroll>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}