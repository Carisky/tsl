import canUseDOM from './canUseDOM'
import { normalizeUrl } from './normalizeUrl'

const normalizeConfiguredURL = (value?: string) => {
  if (!value) return ''

  const normalized = normalizeUrl(value)
  return normalized.endsWith('/') ? normalized.slice(0, -1) : normalized
}

export const getServerSideURL = () => {
  let url = normalizeConfiguredURL(process.env.NEXT_PUBLIC_SERVER_URL)

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return normalizeConfiguredURL(process.env.NEXT_PUBLIC_SERVER_URL)
}
