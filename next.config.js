import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

// Первый адрес определяется через VERCEL_PROJECT_PRODUCTION_URL или NEXT_PUBLIC_SERVER_URL, либо localhost
const primaryUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Второй адрес берётся из переменной окружения NEXT_PUBLIC_SECONDARY_URL, если она не задана, используется дефолт
const secondaryUrl = process.env.NEXT_PUBLIC_SECONDARY_URL || 'http://localhost:3000'

// Собираем массив URL-адресов
const serverUrls = [primaryUrl, secondaryUrl]

// Преобразуем каждый URL в объект для remotePatterns
const remotePatterns = serverUrls.map((item) => {
  const url = new URL(item)
  return {
    hostname: url.hostname,
    protocol: url.protocol.replace(':', ''),
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns,
    minimumCacheTTL: 86400,
  },
  reactStrictMode: false,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
