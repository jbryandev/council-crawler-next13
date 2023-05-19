/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      // https://randomuser.me/api/portraits/men/36.jpg
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/api/portraits/men/**',
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
