import RootShell from '@/components/RootShell'
import { buildRootMetadata } from '@/lib/root-metadata'
import { HTML_LANG } from '@/i18n/locales'

export const metadata = buildRootMetadata('en')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang={HTML_LANG.en}>{children}</RootShell>
}
