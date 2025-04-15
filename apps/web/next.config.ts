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
}

export default nextConfig
