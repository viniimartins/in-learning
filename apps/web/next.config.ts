import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/panel',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
    ],
  },
}

export default nextConfig
