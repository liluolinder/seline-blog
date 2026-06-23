import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 生产构建时使用静态导出，开发模式保留 SSR
  ...(process.env.NODE_ENV === 'production' ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
