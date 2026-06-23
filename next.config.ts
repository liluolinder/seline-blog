import type { NextConfig } from "next";

// 只在 Pages 部署时通过环境变量注入，本地永远为空
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig: NextConfig = {
  basePath,
  ...(process.env.NODE_ENV === 'production' ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
