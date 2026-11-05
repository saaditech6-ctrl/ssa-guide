import { readFile, readdir } from "node:fs/promises"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const appDir = path.join(root, "src", "app")
const redirectsFile = path.join(root, "next.config.ts")
const articlesFile = path.join(root, "src", "lib", "articles.ts")
const siteIndexFile = path.join(root, "src", "lib", "site-index.ts")

const [redirectsSource, articlesSource, siteIndexSource] = await Promise.all([
  readFile(redirectsFile, "utf8"),
  readFile(articlesFile, "utf8"),
  readFile(siteIndexFile, "utf8"),
])

const baseUrl = siteIndexSource.match(/export const SITE_BASE_URL = "([^"]+)"/)?.[1]
if (!baseUrl) {
  throw new Error("Could not read the site index base URL.")
}

const staticPagesBlock = siteIndexSource.match(/export const staticPages[^=]*=\s*\[([\s\S]*?)\n\]/)?.[1]
if (!staticPagesBlock) {
  throw new Error("Could not read staticPages from src/lib/site-index.ts.")
}

const staticPages = [...staticPagesBlock.matchAll(
  /\{\s*path:\s*"([^"]+)"\s*,\s*lastModified:\s*"([^"]+)"/g,
)].map(([, route, lastModified]) => ({ route, lastModified }))

const redirects = new Set(
  [...redirectsSource.matchAll(/\{\s*source:\s*"([^"]+)"/g)].map(([, source]) => source),
)

const slugMatches = [...articlesSource.matchAll(/["']?slug["']?\s*:\s*"([^"]+)"/g)]
const articles = slugMatches.map((match, index) => {
  const end = slugMatches[index + 1]?.index ?? articlesSource.length
  const articleSource = articlesSource.slice(match.index, end)
  const dateField = (field) =>
    articleSource.match(new RegExp(`["']?${field}["']?\\s*:\\s*"([^"]+)"`))?.[1]
  return {
    slug: match[1],
    noindex: /\bnoindex:\s*true\b/.test(articleSource),
    lastModified: dateField("lastUpdated") || dateField("updatedDate") || dateField("date"),
  }
})
const articleFilter = /\.filter\(\s*\(article\)\s*=>\s*!article\.noindex\s*\)/.test(siteIndexSource)
const articleUrlMapping = /path:\s*`\/blog\/\$\{article\.slug\}`/.test(siteIndexSource)
if (!articleUrlMapping) {
  throw new Error("Could not verify article URL generation in src/lib/site-index.ts.")
}

const sitemapRoutes = [
  ...staticPages.map(({ route }) => route),
  ...articles
    .filter((article) => !articleFilter || !article.noindex)
    .map(({ slug }) => `/blog/${slug}`),
]
const sitemapRouteSet = new Set(sitemapRoutes)
const noindexArticleRoutes = new Set(
  articles.filter((article) => article.noindex).map(({ slug }) => `/blog/${slug}`),
)
const failures = []

for (const duplicate of sitemapRoutes.filter((route, index) => sitemapRoutes.indexOf(route) !== index)) {
  failures.push(`Duplicate sitemap route: ${duplicate}`)
}

for (const route of sitemapRoutes) {
  if (redirects.has(route)) {
    failures.push(`Sitemap route is a redirect source: ${route}`)
  }
  if (route !== "/" && route.endsWith("/")) {
    failures.push(`Sitemap route has a trailing slash: ${route}`)
  }
}

function routePattern(route) {
  return new RegExp(`^${route
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\\\[\.\.\.(\w+)\\\]/g, ".+")
    .replace(/\\\[(\w+)\\\]/g, "[^/]+")}/?$`)
}

const noindexPatterns = []
const pageFiles = []

async function findPages(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      await findPages(fullPath)
    } else if (/^page\.(tsx?|jsx?|mdx?)$/.test(entry.name)) {
      pageFiles.push(fullPath)
    }
  }
}

await findPages(appDir)

for (const pageFile of pageFiles) {
  const relative = path.relative(appDir, path.dirname(pageFile))
  const route = relative === "." ? "/" : `/${relative.split(path.sep).join("/")}`
  if (route === "/blog/[slug]") continue

  const routeParts = route.split("/").filter(Boolean)
  const metadataFiles = [
    path.join(appDir, "layout.tsx"),
    ...routeParts.map((_, index) =>
      path.join(appDir, ...routeParts.slice(0, index + 1), "layout.tsx"),
    ),
    pageFile,
  ]
  const metadataSources = await Promise.all(metadataFiles.map(async (file) => {
    try {
      return await readFile(file, "utf8")
    } catch (error) {
      if (error.code === "ENOENT") return ""
      throw error
    }
  }))

  if (metadataSources.some((source) => /robots\s*:\s*\{[^}]*\bindex\s*:\s*false\b/.test(source))) {
    noindexPatterns.push(routePattern(route))
    continue
  }

  if (routeParts.some((part) => part.startsWith("[") && part.endsWith("]"))) {
    throw new Error(`Unhandled dynamic page route in sitemap audit: ${route}`)
  }

  if (!redirects.has(route)) {
    const normalizedRoute = route === "/" ? "/" : route.replace(/\/+$/, "")
    if (!sitemapRouteSet.has(normalizedRoute)) {
      console.warn(`Warning: indexable page is missing from sitemap: ${normalizedRoute}`)
    }
  }
}

for (const route of sitemapRoutes) {
  if (noindexArticleRoutes.has(route) || noindexPatterns.some((pattern) => pattern.test(route))) {
    failures.push(`Sitemap route belongs to a noindexed page: ${route}`)
  }
}

for (const { route, lastModified } of staticPages) {
  if (Number.isNaN(Date.parse(lastModified))) {
    failures.push(`Invalid lastModified date for ${route}: ${lastModified}`)
  }
}

function hasDayPrecision(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) || /^[A-Za-z]+ \d{1,2}, \d{4}$/.test(value)
}

for (const { slug, lastModified } of articles.filter((article) => !article.noindex)) {
  if (!lastModified || Number.isNaN(Date.parse(lastModified)) || !hasDayPrecision(lastModified)) {
    failures.push(`Missing or invalid lastModified date for /blog/${slug}: ${lastModified ?? "(missing)"}`)
  }
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `Error: ${failure}`).join("\n"))
  process.exitCode = 1
} else {
  console.log(`Sitemap check passed (${sitemapRoutes.length} unique routes).`)
}
