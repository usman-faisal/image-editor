import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // configure picsum.photos as an allowed image domain
  images: {
    domains: ["picsum.photos", "oaidalleapiprodscus.blob.core.windows.net"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '1000mb'
    }
  }
};

export default nextConfig;
