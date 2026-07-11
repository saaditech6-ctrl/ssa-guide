import { Calendar, Clock, ArrowLeft, BookOpen, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { articles } from "@/lib/articles"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) return { title: "Article Not Found" }

  return {
    title: `${article.title} | Social Security Guide`,
    description: article.excerpt,
  }
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const recommendations = articles.filter((a) => a.slug !== slug).slice(0, 2)

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] py-14 text-white">
        <div className="container-site max-w-3xl mx-auto px-4">
          <Link 
            href="/guides" 
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" /> All Guides
          </Link>
          
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-amber-400 block w-fit mb-4">
            {article.category}
          </span>
          
          <h1 className="text-2xl sm:text-4xl font-bold font-playfair mb-6 leading-tight text-white">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-300 pt-4 border-t border-white/10">
            <span className="flex items-center gap-1.5 font-medium">
              <User size={14} className="text-slate-400" /> Amine Saadi
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar size={14} className="text-slate-400" /> {article.date}
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock size={14} className="text-slate-400" /> {article.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="container-site max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-9 shadow-sm">
          
          <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base">
            {article.content ? (
              <p className="whitespace-pre-line">{article.content}</p>
            ) : (
              <p>{article.excerpt}</p>
            )}
          </article>

          {recommendations.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="font-playfair text-lg font-bold text-[#071530] mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-amber-500" /> Related Guides
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.map((rec) => (
                  <Link 
                    key={rec.slug} 
                    href={`/guides/${rec.slug}`}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all block group"
                  >
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                      {rec.category}
                    </span>
                    <h4 className="font-bold text-sm text-[#071530] group-hover:text-amber-600 transition-colors line-clamp-2">
                      {rec.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}