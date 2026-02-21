"use client";

import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

export const SEO = ({
  title = "VertexWeb | Premium Digital Agency",
  description = "High-performance Next.js websites for forward-thinking brands. We build digital masterpieces.",
  image = "/og-image.jpg",
  url = "https://vertexweb.agency",
  type = "website",
}: SEOProps) => {

  const siteName = "VertexWeb";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": siteName,
    "image": `https://vertexweb.agency${image}`,
    "description": description,
    "url": url,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Global",
      "addressCountry": "US"
    },
    "priceRange": "$$$",
    "openingHours": "Mo-Fr 09:00-18:00"
  };

  return (
    <>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};