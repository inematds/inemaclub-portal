import HomePage from '@/components/HomePage'
import { buildHomeMetadata } from '@/lib/root-metadata'

export const revalidate = 60

export const metadata = buildHomeMetadata('es')

export default function HomeEs() {
  return <HomePage locale="es" />
}
