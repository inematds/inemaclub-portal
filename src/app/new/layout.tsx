import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'INEMA.CLUB — Portal v2',
  description: 'Nova versão do Portal INEMA',
}

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${spaceGrotesk.variable} ${inter.variable}`}>
      {children}
    </div>
  )
}
