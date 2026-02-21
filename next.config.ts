import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Logic: Enable compression for faster payload delivery
  compress: true,

  // Logic: Advanced Image Optimization for LCP
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 60,
  },

  // Performance Hack: Reduce JS bundle size by tree-shaking motion & icon libs
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'gsap'],
  },

  // Logic: Next.js 15 defaults handle minification automatically,
  // so 'swcMinify' is no longer needed here.
  reactStrictMode: true,
};

export default nextConfig;