import { Metadata } from "next"
import { notFound } from "next/navigation"
import { articles, getArticleBySlug } from "@/lib/articles"
import { generateFAQSchema, generateArticleSchema } from "@/lib/schema"
import ArticleContent from "./ArticleContent"

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return { title: "Article Not Found | Social Security Guide Calc" }
  }

  const url = `https://www.socialsecurityguidecalc.com/blog/${article.slug}`
  const imageUrl = article.image 
    ? (article.image.startsWith('http') ? article.image : `https://www.socialsecurityguidecalc.com${article.image}`)
    : undefined

  return {
    title: `${article.title} | Social Security Guide Calc`,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: "article",
      publishedTime: article.date,
      authors: [article.author || "Social Security Guide"],
      images: imageUrl ? [{ url: imageUrl, alt: article.title, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: article.title,
      description: article.excerpt,
      images: imageUrl ? [imageUrl] : undefined,
    },
    // Meta tags إضافية تحسّن أداء Pinterest Rich Pins وتدعم الزر التفاعلي
    other: {
      "pinterest-rich-pin": "true",
      "og:image:secure_url": imageUrl || "",
    },
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const url = `https://www.socialsecurityguidecalc.com/blog/${article.slug}`
  const faqSchema = generateFAQSchema(article.content)
  const articleSchema = generateArticleSchema(article, url)

  return (
    <main className="bg-slate-50 min-h-screen py-10">
      {/* Article Structural Schema Injection (Server Side) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      {/* Dynamic FAQ Schema (Calculated if FAQs exist in the post) */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Main Interactive Client Component */}
      <ArticleContent article={article} />
    </main>
  )
}