import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Pós-pagamento Asaas: o successUrl do checkout precisa estar no domínio
      // cadastrado na conta Asaas (inema.club) — daqui manda pro app do pay.
      {
        source: '/bemvindo',
        destination: 'https://pay.inema.pro/bemvindo',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
