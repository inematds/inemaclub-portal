import Script from 'next/script'
import AgenteChat from '@/components/AgenteChat/AgenteChat'
import InemaWebMCP from '@/components/InemaWebMCP'
import '@/app/globals.css'

export default function RootShell({ lang, children }: { lang: string; children: React.ReactNode }) {
  const originTrialToken = process.env.WEBMCP_ORIGIN_TRIAL_TOKEN?.trim()
  const originTrialMode = process.env.WEBMCP_ORIGIN_TRIAL_MODE?.trim()
  return (
    <html lang={lang}>
      <head>
        <link rel="describedby" href="/llms.txt" type="text/plain" />
        <link rel="alternate" href="/inema.json" type="application/json" title="INEMA discovery" />
        {originTrialToken && originTrialMode === 'third-party' ? (
          <Script src="/api/webmcp-origin-trial/" strategy="beforeInteractive" />
        ) : originTrialToken ? (
          <meta httpEquiv="origin-trial" content={originTrialToken} />
        ) : null}
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
