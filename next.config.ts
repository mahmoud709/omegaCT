import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import fs from "fs";
import path from "path";

// Automatically delete conflicting proxy.ts on startup
try {
  const proxyPath = path.join(process.cwd(), "proxy.ts");
  if (fs.existsSync(proxyPath)) {
    fs.unlinkSync(proxyPath);
    console.log("Successfully removed proxy.ts to fix Next.js server startup");
  }
} catch (e) {
  // ignore
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
