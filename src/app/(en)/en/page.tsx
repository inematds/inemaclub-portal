import HomePage from '@/components/HomePage'
import { buildHomeMetadata } from '@/lib/root-metadata'

export const revalidate = 60

export const metadata = buildHomeMetadata('en')

export default function HomeEn() {
  return <HomePage locale="en" />
}
