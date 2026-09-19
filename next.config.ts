import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
