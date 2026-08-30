import type { Metadata } from 'next'
import Script from 'next/script'
import AgenteChat from '@/components/AgenteChat/AgenteChat'
import InemaWebMCP from '@/components/InemaWebMCP'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'INEMA.club — Cursos, projetos e formação prática em IA',
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: SITE_NAME,
    title: 'INEMA.club — Aprenda, pratique e evolua com IA',
    description: 'Formação prática em inteligência artificial, agentes e automação.',
    images: [
      {
        url: '/doc/inema-hero-aprenda-pratique-evolua.webp',
        width: 1200,
        height: 675,
        alt: 'INEMA.club — Aprenda, pratique e evolua com inteligência artificial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INEMA.club — Aprenda, pratique e evolua com IA',
    description: 'Formação prática em inteligência artificial, agentes e automação.',
    images: ['/doc/inema-hero-aprenda-pratique-evolua.webp'],
  },
  category: 'education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          src="https://plausible.io/js/pa-kTjsz6v4nJLgQy3_zomx8.js"
          strategy="afterInteractive"
          async
        />
        <Script id="plausible-init" strategy="afterInteractive">{`
          window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)};
          window.plausible.init=window.plausible.init||function(i){window.plausible.o=i||{}};
          window.plausible.init();
        `}</Script>
      </head>
      <body>
        {children}
        <InemaWebMCP />
        <AgenteChat />
      </body>
    </html>
  )
}
