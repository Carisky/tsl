const INVISIBLE = /[\uFEFF\u200B\u200C\u200D\u2060]/g

export const normalizeUrl = (value: string) => {
  const cleaned = value.replace(INVISIBLE, '').trim()
  return encodeURI(cleaned)
}
