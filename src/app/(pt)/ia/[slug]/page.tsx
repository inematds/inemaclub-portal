import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findIaPage, iaPages } from '@/content/ia'
import IaArticle, { iaPath } from '@/components/seo/IaArticle'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return iaPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = findIaPage((await params).slug)
  if (!page) return {}
  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: iaPath(page) },
    openGraph: {
      type: 'article',
      url: iaPath(page),
      title: page.title,
      description: page.description,
      publishedTime: page.published,
      modifiedTime: page.updated,
      images: ['/doc/inema-hero-aprenda-pratique-evolua.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['/doc/inema-hero-aprenda-pratique-evolua.webp'],
    },
  }
}

export default async function IaSlugPage({ params }: Props) {
  const page = findIaPage((await params).slug)
  if (!page) notFound()
  return <IaArticle page={page} />
}
