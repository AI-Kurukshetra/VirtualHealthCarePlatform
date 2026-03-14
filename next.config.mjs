import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: false,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: []
  }
};

export default nextConfig;
