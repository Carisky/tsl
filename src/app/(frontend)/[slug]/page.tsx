import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { cookies } from 'next/headers'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import ExtendedMetadata from '../interfaces/ExtendedMetadata'
import ArticleLD from '../components/SEO/MicroData/ArticleLD'
import { getServerSideURL } from '@/utilities/getURL'
import { Box } from '@mui/material'

export const revalidate = 604800

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug
  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({ slug })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const isHome = slug === 'home'

  return (
    <>
      <ArticleLD slug={slug} />
      <article className="pb-24">
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}

        {/* Условная магия начинается здесь */}
        {isHome ? (
          
          <Box sx={{
            mt:4
          }}>
            <RenderHero {...hero} />
            <RenderBlocks blocks={layout} />
          </Box>
        ) : (
          <>
            <RenderBlocks blocks={layout} />
            <RenderHero {...hero} />
          </>
        )}
      </article>
    </>
  )
}


export async function generateMetadata({ params: paramsPromise }: Args): Promise<ExtendedMetadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({ slug })

  const baseMetadata = generateMeta({ doc: page }) as ExtendedMetadata

  if (!page?.microdata?.headline) {
    return baseMetadata
  }
  const image = page.microdata.image
  const imageUrl = typeof image === 'string' ? undefined : image?.url
  
  const articleJsonLD = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.microdata.headline,

    articleBody: page.microdata.articleBody,
    author: {
      '@type': 'Person',
      name: page.microdata.authorName || 'Unknown',
      url:getServerSideURL(),
    },
    datePublished: page.microdata.datePublished,
    dateModified: page.microdata.dateModified,
    image: imageUrl,
    keywords: page.microdata.keywords,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${getServerSideURL()}/${slug}`,
    },
  }
  

  return {
    ...baseMetadata,
    other: {
      ...(baseMetadata.other || {}),
      'ld+json-article': JSON.stringify(articleJsonLD),
    },
  }
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const localeCookie = (await cookies()).get('locale')
  const locale = (localeCookie?.value as 'pl' | 'en' | 'ua' | 'ru' | 'all' | undefined) || 'pl'
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    locale,
    depth: 2,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
