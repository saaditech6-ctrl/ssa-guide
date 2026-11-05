import type { MetadataRoute } from "next"
import { getIndexablePages, SITE_BASE_URL } from "@/lib/site-index"

const baseUrl = SITE_BASE_URL

/** Accepts article dates without substituting a made-up fallback. */
function toDate(value: string | undefined): Date {
  if (!value) {
    throw new Error("Every indexable article needs a publication or update date for the sitemap.")
  }

  const hasDayPrecision =
    /^\d{4}-\d{2}-\d{2}$/.test(value) || /^[A-Za-z]+ \d{1,2}, \d{4}$/.test(value)
  if (!hasDayPrecision) {
    throw new Error(`Sitemap date must include a calendar day: ${value}`)
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid sitemap date: ${value}`)
  }

  return parsed
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexablePages().map((page) => ({
    url: `${baseUrl}${page.path === "/" ? "" : page.path}`,
    lastModified: toDate(page.lastModified),
  }))
}
