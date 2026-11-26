import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Enables the SWC styled-components transform (SSR class names, displayName, minification)
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;

