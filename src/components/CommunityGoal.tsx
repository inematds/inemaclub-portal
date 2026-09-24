'use client'

import { useEffect } from 'react'

// Meta "Entrar na comunidade" no Plausible: qualquer clique em link pra inema.vip ou inema.pro,
// em qualquer página. Props: destino (host) e pagina (path de origem). A meta precisa existir no
// painel do Plausible (Goals → Custom event → "Entrar na comunidade") pra aparecer como conversão.
const HOSTS = /(^|\.)inema\.(vip|pro)$/

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
      if (!HOSTS.test(host)) return
      window.plausible?.('Entrar na comunidade', { props: { destino: host, pagina: window.location.pathname } })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
  return null
}
