import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import type { Post } from '@/payload-types'
import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { cookies } from 'next/headers'
import PostLD from '../../components/SEO/MicroData/PostLD'
import ExtendedMetadata from '../../interfaces/ExtendedMetadata'
import { getServerSideURL } from '@/utilities/getURL'

export const revalidate = 604800

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  const params = posts.docs.map(({ slug }) => ({ slug }))
  return params
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug

  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PostLD slug={slug} />
      <PageClient />
      {/* Разрешаем редиректы даже для валидных постов */}
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <PostHero post={post} />
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {/* Используем кастомный рендер блоков */}
          <RenderBlocks blocks={post.content as any} />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  const baseMetadata = generateMeta({ doc: post }) as ExtendedMetadata

  if (!post?.microdata?.headline) {
    return baseMetadata
  }
  const image = post.microdata.image
  const imageUrl = typeof image === 'string' ? undefined : image?.url

  const articleJsonLD = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.microdata.headline,

    articleBody: post.microdata.articleBody,
    author: {
      '@type': 'Person',
      name: post.microdata.authorName || 'Unknown',
      url: getServerSideURL(),
    },
    datePublished: post.microdata.datePublished,
    dateModified: post.microdata.dateModified,
    image: imageUrl,
    keywords: post.microdata.keywords,
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
const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  // Получаем locale из cookies
  const localeCookie = (await cookies()).get('locale')
  const locale = (localeCookie?.value as 'pl' | 'en' | 'ua' | 'ru' | 'all' | undefined) || 'pl'

  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    depth:2,
    overrideAccess: draft,
    pagination: false,
    locale,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
