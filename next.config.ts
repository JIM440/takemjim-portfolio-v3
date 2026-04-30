import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /** Quieter dev toolbar; unrelated to Turbopack vs webpack. */
  devIndicators: false,

  /** Browsers still request `/favicon.ico`; serve the static portrait from `public/jim.png`. */
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/jim.png" }];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
    ],
  },

  /**
   * Default dev uses webpack (`npm run dev`). Turbopack is optional (`npm run dev:turbo`).
   * Disable webpack memory cache in dev on Windows — avoids ENOENT chunk errors after HMR/clean.
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
