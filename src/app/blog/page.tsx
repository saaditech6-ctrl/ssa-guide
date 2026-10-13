import type { Metadata } from "next"
import { articles } from "@/lib/articles"
import { buildMetadata } from "@/lib/seo"
import BlogClient from "./BlogClient"

export const metadata: Metadata = buildMetadata({
  title: "Social Security Blog: Guides, COLA and Medicare Updates",
  description:
    "Plain-language articles on Social Security benefits, COLA, Medicare, SSDI and SSI, with sources from SSA, CMS and the IRS.",
  path: "/blog",
  absoluteTitle: true,
})

export default function BlogPage() {
  // Only listing fields reach the browser; article bodies stay on the server.
  const visible = articles.filter((a) => !a.noindex)
  const summaries = visible.map((article) => {
    const summary: Partial<typeof article> = { ...article }
    delete summary.content
    return summary as Omit<typeof article, "content">
  })
  const categories = ["All", ...Array.from(new Set(visible.map((a) => a.category))).sort()]
  return <BlogClient articles={summaries} categories={categories} />
}
