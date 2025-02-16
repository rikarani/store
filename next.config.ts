import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tokowendigg.com",
      },
      {
        protocol: "https",
        hostname: "cfsju5bff3.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
