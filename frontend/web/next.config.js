/** @type {import('next').NextConfig} */
export default {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  async headers() {
    return [];
  },
};
