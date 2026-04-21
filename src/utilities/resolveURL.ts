import { normalizeUrl } from './normalizeUrl'

const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//

export const resolveURL = (value: string, baseURL?: string) => {
  const cleaned = normalizeUrl(value)

  if (!cleaned) return cleaned
  if (ABSOLUTE_URL_REGEX.test(cleaned)) return cleaned
  if (!baseURL) return cleaned

  const normalizedBase = normalizeUrl(baseURL).replace(/\/$/, '')
  const normalizedPath = cleaned.startsWith('/') ? cleaned : `/${cleaned}`

  return `${normalizedBase}${normalizedPath}`
}

export const appendCacheTag = (url: string, cacheTag?: string | null) => {
  if (!cacheTag) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${encodeURIComponent(cacheTag)}`
}
