import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import { OG_LOCALE, localeHome, type Locale } from '@/i18n/locales'

const TITLES: Record<Locale, { title: string; og: string; alt: string; description: string }> = {
  pt: {
    title: 'Aprender Inteligência Artificial na prática | INEMA.club',
    og: 'INEMA.club — Aprenda, pratique e evolua com IA',
    alt: 'INEMA.club — Aprenda, pratique e evolua com inteligência artificial',
    description: 'Formação prática em inteligência artificial, agentes e automação.',
  },
  en: {
    title: 'Learn Artificial Intelligence in practice | INEMA.club',
    og: 'INEMA.club — Learn, practice and evolve with AI',
    alt: 'INEMA.club — Learn, practice and evolve with artificial intelligence',
    description: 'Hands-on training in artificial intelligence, agents and automation.',
  },
  es: {
    title: 'Aprende Inteligencia Artificial en la práctica | INEMA.club',
    og: 'INEMA.club — Aprende, practica y evoluciona con IA',
    alt: 'INEMA.club — Aprende, practica y evoluciona con inteligencia artificial',
    description: 'Formación práctica en inteligencia artificial, agentes y automatización.',
  },
}

export const HREFLANG_ALTERNATES = {
  'pt-BR': '/',
  en: '/en/',
  es: '/es/',
  'x-default': '/',
}

/**
 * Canonical + hreflang ficam SÓ nas homes de cada idioma.
 * No root layout eles vazariam para toda página PT sem `alternates` próprio
 * (ex.: /stats/ apontaria o alternate EN para a home EN).
 */
export function buildHomeMetadata(locale: Locale): Metadata {
  return {
    alternates: {
      canonical: localeHome(locale),
      languages: HREFLANG_ALTERNATES,
      // `alternates` da page substitui o do layout por inteiro — sem repetir
      // `types` aqui, as homes perderiam o <link rel="alternate"> do RSS.
      types: { 'application/rss+xml': '/feed.xml' },
    },
  }
}

export function buildRootMetadata(locale: Locale): Metadata {
  const t = TITLES[locale]
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.title, template: `%s | ${SITE_NAME}` },
    description: locale === 'pt' ? SITE_DESCRIPTION : t.description,
    alternates: {
      types: { 'application/rss+xml': '/feed.xml' },
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale],
      url: localeHome(locale),
      siteName: SITE_NAME,
      title: t.og,
      description: t.description,
      images: [
        {
          url: '/doc/inema-hero-aprenda-pratique-evolua.webp',
          width: 1200,
          height: 675,
          alt: t.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.og,
      description: t.description,
      images: ['/doc/inema-hero-aprenda-pratique-evolua.webp'],
    },
    category: 'education',
  }
}
