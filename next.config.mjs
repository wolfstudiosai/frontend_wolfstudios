/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  trailingSlash: false,
  experimental: {
    esmExternals: 'loose',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all hostnames
      },
    ],
  },
};

export default config;
