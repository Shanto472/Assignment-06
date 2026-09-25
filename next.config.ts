import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Workout media is bundled in /public, so serve it directly. This avoids
    // optimizer failures on local Windows environments and static hosts.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "img.magnific.com" },
    ],
  },
};

export default nextConfig;
