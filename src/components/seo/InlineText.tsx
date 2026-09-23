import { Fragment } from 'react'

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g

/** Renderiza **negrito** e [texto](url) dentro de um texto simples. */
export default function InlineText({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link) {
          const external = /^https?:\/\//.test(link[2])
          return (
            <a key={i} href={link[2]} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {link[1]}
            </a>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

export function plainText(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}
