import type { NextConfig } from "next";

const basePathEnv = process.env.NEXT_PUBLIC_BASE_PATH || '';
const basePath = basePathEnv ? basePathEnv.replace(/\/$/, '') : '';
const assetPrefix = basePath ? `${basePath}/` : '';

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  assetPrefix: assetPrefix || undefined,
  trailingSlash: !!basePath,
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-no-referrer',
        },
        {
          key: 'Permissions-Policy',
          value: 'geolocation=(), microphone=(), camera=()',
        },
      ],
    },
  ],
  redirects: async () => [
    {
      source: '/admin',
      destination: '/admin/page',
      permanent: false,
    },
  ],
};

export default nextConfig;
