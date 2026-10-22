import type { NextConfig } from "next";
import path from "path";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  outputFileTracingRoot: path.resolve("."),
  experimental: {
    useTypeScriptCli: false,
    webpackBuildWorker: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/lx5v2ghk/**",
      },
    ],
  },
} satisfies NextConfig;

export default nextConfig;
