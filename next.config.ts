import type { NextConfig } from "next";

const variantRedirects = Array.from({ length: 10 }, (_, index) => {
  const number = index + 1;
  return {
    source: `/variant-${number}`,
    destination: `/v${number}`,
    permanent: true,
  };
});

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.103"],
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  async redirects() {
    return variantRedirects;
  },
};

export default nextConfig;
