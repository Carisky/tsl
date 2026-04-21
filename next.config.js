import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const primaryUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const secondaryUrl = process.env.NEXT_PUBLIC_SECONDARY_URL || 'http://localhost:3000'
const thirdUrl = process.env.NEXT_PUBLIC_THIRD_URL || 'http://localhost:3000'

const serverUrls = [primaryUrl, secondaryUrl, thirdUrl]

const remotePatterns = serverUrls.map((item) => {
  const url = new URL(item)
  return {
    protocol: url.protocol.replace(':', ''),
    hostname: url.hostname,
    port: url.port || undefined,
  }
})

const parseOriginHost = (value) => {
  if (!value) return null

  const candidate = value.trim()
  if (!candidate) return null

  try {
    return new URL(candidate).host
  } catch {
    return candidate.replace(/^https?:\/\//i, '').split('/')[0] || null
  }
}

const allowedOriginsFromEnv = (process.env.NEXT_SERVER_ACTIONS_ALLOWED_ORIGINS || '')
  .split(',')
  .map((item) => parseOriginHost(item))
  .filter(Boolean)

const serverActionAllowedOrigins = [...new Set([
  ...serverUrls.map((url) => parseOriginHost(url)),
  ...allowedOriginsFromEnv,
])]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns,
    minimumCacheTTL: 86400,
  },
  reactStrictMode: false,
  redirects,
  experimental: {
    serverActions: {
      allowedOrigins: serverActionAllowedOrigins,
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=2400',
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
