/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',


  serverExternalPackages: ['@better-auth/kysely-adapter', 'kysely'],

  images: {
   
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;