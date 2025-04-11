// components/SEO/ArticleLD.tsx
import { generateMetadata } from "@/app/(frontend)/page"

export default async function ArticleLD({ slug }: { slug: string }) {
  const metadata = await generateMetadata({ params: Promise.resolve({ slug }) })

  if (!metadata.other?.['ld+json-article']) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: metadata.other['ld+json-article'],
      }}
    />
  )
}
