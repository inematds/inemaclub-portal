'use client'

import { useEffect } from 'react'
import { mountAgenteChat } from './widget'

// Monta o widget uma única vez no client, isolado em shadow DOM — não usa
// nada do React além do useEffect pra disparar a montagem.
export default function AgenteChat() {
  useEffect(() => {
    mountAgenteChat()
  }, [])
  return null
}
