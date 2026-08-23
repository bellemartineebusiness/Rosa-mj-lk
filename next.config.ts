import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.68.111"],
  async redirects() {
    return [
      {
        source: "/chattbottar",
        destination: "/chatt",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
