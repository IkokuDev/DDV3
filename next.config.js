
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      // If your Payload CMS is running locally for development and serving images,
      // you might need to add its hostname and port.
      // Example for local Payload on port 3000:
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9002', // Assuming your Payload CMS runs on port 8000
        pathname: '/media/**', // Or whatever path your media is served from
      },
      // Add any other domains from which you source images for Payload Media
    ],
  },
  // If you are using `payload.config.ts` for Payload v3 with Next.js App Router,
  // this experimental flag might be necessary for proper server component handling with Payload.
  // experimental: {
  //   serverComponentsExternalPackages: ['payload'],
  // },
};

export default nextConfig;
