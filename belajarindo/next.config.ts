import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheMaxMemorySize: 0,
  eslint: {
    // This allows production builds to successfully complete
    // even if your project has ESLint errors.
    ignoreDuringBuilds: true,
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
