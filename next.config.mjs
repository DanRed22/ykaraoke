/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ['www.googleapis.com', 'i.ytimg.com'],
  },
};

export default nextConfig;
