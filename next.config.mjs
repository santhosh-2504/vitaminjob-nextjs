/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    COOKIE_EXPIRE: process.env.COOKIE_EXPIRE
  }
};

// Use ES module export syntax
export default nextConfig;
