import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheMaxMemorySize: 0,
  eslint: {
    // This allows production builds to successfully complete
    // even if your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: [
      '@radix-ui',
      '@hookform',
      'lucide-react',
      '@/components/ui',
      'sonner',
      'zod'
    ]
  }
};

export default nextConfig;
