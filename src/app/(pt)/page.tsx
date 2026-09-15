import HomePage from '@/components/HomePage'

export const revalidate = 60 // revalida a cada 60 segundos

export default function Home() {
  return <HomePage locale="pt" />
}
