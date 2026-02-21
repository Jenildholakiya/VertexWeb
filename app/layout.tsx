import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/ui/CustomCursor";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Performance Logic: Added 'display: swap' to ensure text is visible immediately
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
  title: "VertexWeb | Premium Digital Agency",
  description: "High-performance Next.js websites for forward-thinking brands. We build digital masterpieces with precision and motion.",
  keywords: ["Web Design", "Next.js Developer", "UI/UX Design", "VertexWeb", "Digital Agency", "Rajkot Web Development"],
  authors: [{ name: "Hardik | VertexWeb" }],
  openGraph: {
    title: "VertexWeb | Premium Digital Agency",
    description: "Building the future of the web with Next.js and Framer Motion.",
    url: "https://vertexweb.agency",
    siteName: "VertexWeb",
    type: "website",
  },
  alternates: {
    canonical: "https://vertexweb.agency",
  },
};

// SEO: Updated with Rajkot localization to establish local authority
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "VertexWeb",
  "image": "https://vertexweb.agency/og-image.jpg",
  "description": "Premium digital agency building high-performance Next.js websites.",
  "url": "https://vertexweb.agency",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-foreground selection:bg-primary/30 selection:text-white`}
      >
        <SmoothScroll>
          <CustomCursor />
          <Navbar />

          <main className="relative min-h-screen">
            {children}
          </main>

          {/* Note: Ensure this is replaced by your new Fully Animated Footer */}
        </SmoothScroll>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}