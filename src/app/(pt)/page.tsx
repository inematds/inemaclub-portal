import HomePage from '@/components/HomePage'
import { buildHomeMetadata } from '@/lib/root-metadata'

export const revalidate = 60 // revalida a cada 60 segundos

export const metadata = buildHomeMetadata('pt')

export default function Home() {
  return <HomePage locale="pt" />
}
