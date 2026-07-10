import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Necessário pro rewrite de /conhecimento/* (F2, AIV): sem isso, o Next
  // remove a barra final antes do rewrite rodar, e o GitHub Pages de destino
  // devolve um redirect pra re-adicionar a barra — vazando o domínio real
  // (neimaldaner.github.io) no Location em vez de ficar transparente em
  // inema.club. Efeito colateral aceitável: rotas nativas como /stats
  // passam a redirecionar /stats -> /stats/ (301), igual já fazia ao
  // contrário antes.
  trailingSlash: true,
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
  // O rewrite de /conhecimento/* (F2, AIV) vive em src/proxy.ts, não aqui —
  // a reconstrução de :path* no rewrite do next.config perde a barra final
  // em paths de diretório, e o GitHub Pages de destino devolve um redirect
  // vazando neimaldaner.github.io no Location. O proxy usa o pathname
  // original, sem esse problema.
}

export default nextConfig
