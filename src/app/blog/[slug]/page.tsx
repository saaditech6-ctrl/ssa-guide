"use client"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, User, Calendar, AlertTriangle } from "lucide-react"
import { articles } from "@/lib/articles"

// دالة تنسيق التاريخ تلقائياً
function formatArticleDate(dateString?: string) {
  const dateObj = dateString ? new Date(dateString) : new Date();
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

// دالة حساب وقت القراءة تلقائياً بناءً على طول المحتوى
function calculateReadTime(content: string) {
  // إزالة وسوم الـ HTML لحساب الكلمات الفعلية فقط
  const plainText = content.replace(/<[^>]*>/g, '').trim();
  const words = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200); // 200 كلمة في الدقيقة كمعدل قراءة طبيعي
  return `${minutes} min read`;
}

export default function ArticleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertTriangle size={24} />
          </div>
          <h1 className="font-playfair text-xl font-bold text-[#071530]">Article Not Found</h1>
          <p className="text-sm text-slate-500">This article is not available.</p>
          <Link href="/blog" className="inline-flex items-center justify-center bg-[#071530] text-white text-sm font-medium px-5 py-2.5 rounded-xl w-full">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#071530] mb-8 transition-colors cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to feed
        </button>

        <header className="space-y-4 mb-8">
          <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-200/60 text-[#163d7d]">
            {article.category}
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071530] leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-400 pt-4 border-t border-slate-200/60">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <User size={14} className="text-slate-400" /> {article.author}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {formatArticleDate(article.date)}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {calculateReadTime(article.content)}
            </span>
          </div>
        </header>

        {/* رندمة كود HTML القادم من بلوجر مع كلاسات مخصصة */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div 
            className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed
                       [&_p]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#071530] [&_h2]:mt-6 [&_h2]:mb-3
                       [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
                       [&_table]:min-w-full [&_table]:my-6 [&_table]:border-collapse
                       [&_th]:bg-slate-50 [&_th]:p-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-bold [&_th]:text-slate-500 [&_th]:uppercase [&_th]:border [&_th]:border-slate-200
                       [&_td]:p-3 [&_td]:border [&_td]:border-slate-100 [&_td]:text-slate-600
                       [&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />
        </div>

      </div>
    </article>
  )
}