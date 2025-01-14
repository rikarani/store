import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tokowendigg.com",
      },
    ],
  },
};

export default nextConfig;
