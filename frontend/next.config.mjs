// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       // Use an environment variable for the backend API URL
  //       // Make sure to set NEXT_PUBLIC_BACKEND_URL in your Amplify Console!
  //       destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
  //     },
  //   ];
  // },

  // Environment variables that should be available on the client-side
  // Note: NEXT_PUBLIC_API_URL is already defined in your env,
  // but NEXT_PUBLIC_BACKEND_URL is the one used for the rewrite.
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Keep this if your app uses it
    // NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL, // Add this for the rewrite
  },
};

export default nextConfig;
