import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Ensure old entry points always land on home
      {
        source: "/feed",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
