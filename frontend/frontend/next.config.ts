import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "192.168.0.128",
  ],

  webpack: (config) => {
    config.watchOptions = {
      poll: 300,
      aggregateTimeout: 300,
    };

    return config;
  },
};

export default nextConfig;