import type { NextConfig } from "next";

const basePath = '/seline-blog'

const nextConfig: NextConfig = {
  basePath,
  ...(process.env.NODE_ENV === 'production' ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
