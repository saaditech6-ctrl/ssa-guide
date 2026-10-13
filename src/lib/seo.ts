import type { Metadata } from "next"

export const SITE_URL = "https://www.socialsecurityguidecalc.com"
export const SITE_NAME = "Social Security Guide"

type BuildMetadataInput = {
  title: string
  description: string
  /** Path starting with "/", e.g. "/calculators". Used for the canonical and og:url. */
  path: string
  /** Absolute title (skips the root "| Social Security Guide" template). */
  absoluteTitle?: boolean
  image?: string
  noindex?: boolean
}

/** One place that builds title, description, canonical, Open Graph and Twitter metadata. */
export function buildMetadata({ title, description, path, absoluteTitle, image, noindex }: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`
  const images = [{ url: image ?? "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }]
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_NAME, locale: "en_US", type: "website", images },
    twitter: { card: "summary_large_image", title, description, images: [images[0].url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
