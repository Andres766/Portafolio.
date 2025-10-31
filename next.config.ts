import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Do not fail production builds due to ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
