import type { Metadata } from 'next'
import Script from 'next/script'
import AgenteChat from '@/components/AgenteChat/AgenteChat'
import './globals.css'

export const metadata: Metadata = {
  title: 'INEMA.CLUB - Portal INEMA',
  description:
    'INEMA.CLUB - Portal INEMA - Acesso centralizado a cursos e plataformas educacionais',
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
        <AgenteChat />
      </body>
    </html>
  )
}
