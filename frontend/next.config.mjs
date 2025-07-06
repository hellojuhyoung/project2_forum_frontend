// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add other Next.js configurations here as needed

  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match any request starting with /api/
        destination: "/api/proxy/:path*", // <<<--- CORRECTED DESTINATION to your specified proxy path
      },
    ];
  },

  // Environment variables that should be available on the client-side
  // Remember to also set these in your Amplify Console build settings for production!
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
};

export default nextConfig;
