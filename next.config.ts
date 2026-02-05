import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // for avatar
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
