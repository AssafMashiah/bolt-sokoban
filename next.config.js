/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: {
    // This will allow Next.js to handle the data-headlessui-focus-visible attribute
    optimizeCss: true,
    // This might help with some hydration issues
    scrollRestoration: true,
  },
};

module.exports = nextConfig;