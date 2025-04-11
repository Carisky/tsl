// components/SEO/MicroData/OrganizationLD.tsx
import React from 'react'
import { getServerSideURL } from '@/utilities/getURL'
import Organization from '@/app/(frontend)/interfaces/Organization'

export async function OrganizationLD() {
  const res = await fetch(`${getServerSideURL()}/api/globals/organization?depth=1`, {
    cache: 'force-cache',
  })

  if (!res.ok) {
    console.error('Failed to fetch organization microdata')
    return null
  }

  const org: Organization = await res.json()

  const jsonLD = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo?.url,
    sameAs: org.sameAs?.map((item) => item.url),
    contactPoint: org.contactPoint?.map((point) => ({
      '@type': 'ContactPoint',
      telephone: point.telephone,
      contactType: point.contactType,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLD),
      }}
    />
  )
}
