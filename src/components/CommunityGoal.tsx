'use client'

import { useEffect } from 'react'

// Meta "Entrar na comunidade" no Plausible: clique em link pra porta de entrada da comunidade ou da
// assinatura, em qualquer página. Props: destino (host) e pagina (path de origem). A meta precisa
// existir no painel do Plausible (Goals → Custom event → "Entrar na comunidade").
// Lista fechada de propósito: news., eventos. e webmcp.inema.pro são conteúdo, não entrada, e ficam
// de fora. pay.inema.pro conta (é a assinatura, o fim do funil), mesmo sem link direto hoje.
const HOSTS = new Set(['inema.vip', 'www.inema.vip', 'inema.pro', 'www.inema.pro', 'pay.inema.pro'])

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
  }
}

export default function CommunityGoal() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link) return
      let host: string
      try {
        host = new URL(link.href).hostname
      } catch {
        return
      }
      if (!HOSTS.has(host)) return
      window.plausible?.('Entrar na comunidade', { props: { destino: host, pagina: window.location.pathname } })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
  return null
}
