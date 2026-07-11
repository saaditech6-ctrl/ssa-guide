"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Flame, Clock, User, Calendar, Newspaper, ArrowRight } from "lucide-react"
import { articles, categories } from "@/lib/articles"
import { SubscribeForm } from "@/components/ui/SubscribeForm"

// دالة برمجية مساعدة لتنسيق التاريخ تلقائياً (مثل: Jul 10, 2026)
function formatArticleDate(dateString?: string) {
  // إذا لم يتم تحديد تاريخ في الملف، يتم استخدام تاريخ النشر الفعلي (تاريخ اليوم) تلقائياً
  const dateObj = dateString ? new Date(dateString) : new Date();
  
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function BlogContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [activeCategory, setActiveCategory] = useState("All")

  // تزامن حالة الفلترة مع الرابط القادم من الهيدر
  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam)
    } else {
      setActiveCategory("All")
    }
  }, [categoryParam])

  const filtered = activeCategory === "All" ? articles : articles.filter(a => a.category === activeCategory)
  const featured = articles.find(a => a.featured)
  const rest = filtered.filter(a => !a.featured || activeCategory !== "All")

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* هيدر الصفحة الرئيسي بالتدرج اللوني الموحد لموقعك */}
      <div className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] py-16 text-white">
        <div className="container-site max-w-5xl mx-auto px-4">
          <span className="eyebrow !text-amber-400 !mb-3">Expert Insights</span>
          <h1 className="heading-xl text-white font-bold mb-4">Social Security Blog</h1>
          <p className="body-lg text-slate-300 max-w-2xl leading-relaxed">
            In-depth articles on Social Security benefits, Medicare, retirement planning, and the latest SSA updates — written by Amine Saadi.
          </p>
        </div>
      </div>

      {/* محتوى المقالات والفلترة */}
      <div className="container-site max-w-5xl mx-auto px-4 py-10">
        
        {/* شريط اختيار التصنيفات التفاعلي */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#071530] border-transparent text-white shadow-sm"
                  : "bg-white border-slate-200 text-[#163d7d] hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* عرض المقال المميز (Featured Post) فقط عند اختيار "All" */}
        {activeCategory === "All" && featured && (
          <Link 
            href={`/blog/${featured.slug}`} 
            className="block bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 mb-8 transition-all hover:border-slate-300 hover:shadow-md group"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 flex items-center gap-1">
                  <Flame size={12} className="fill-rose-700/10" /> Featured
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-[#163d7d]">
                  {featured.category}
                </span>
              </div>
              
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#071530] leading-tight group-hover:text-blue-900 transition-colors">
                {featured.title}
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                {featured.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1.5 font-medium text-slate-600">
                  <User size={14} className="text-slate-400" /> {featured.author}
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {formatArticleDate(featured.date)}
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {featured.readTime}
                </span>
                <span className="sm:ml-auto text-amber-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read article <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* حالة عدم وجود مقالات في التصنيف المختار */}
        {rest.length === 0 && (
          <div className="text-center py-16 bg-white border border-slate-200/60 rounded-2xl shadow-xs space-y-3">
            <div className="text-slate-300 flex justify-center">
              <Newspaper size={48} strokeWidth={1.5} />
            </div>
            <p className="text-slate-500 font-medium text-sm sm:text-base">No articles in this category yet. Check back soon!</p>
          </div>
        )}

        {/* شبكة عرض بقية المقالات (Grid Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(article => (
            <Link 
              key={article.slug} 
              href={`/blog/${article.slug}`} 
              className="bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between transition-all hover:border-slate-300 hover:shadow-md group"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-[#163d7d]">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                    <Clock size={12} /> {article.readTime}
                  </span>
                </div>
                
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#071530] leading-snug group-hover:text-blue-900 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* بيانات الكاتب والتاريخ أسفل البطاقة المعالجة برمجياً */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#071530] flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-400 text-[10px] font-bold">A</span>
                  </div>
                  <span className="text-[11px] text-slate-600 font-medium">{article.author}</span>
                </div>
                <time className="text-[11px] text-slate-400 font-medium">
                  {formatArticleDate(article.date)}
                </time>
              </div>
            </Link>
          ))}
        </div>

        {/* صندوق الاشتراك في النشرة البريدية */}
        <div className="mt-12 bg-[#071530] border border-white/5 rounded-2xl p-6 sm:p-10 text-center space-y-4 shadow-sm">
          <h2 className="font-playfair text-xl sm:text-2xl font-bold text-white">Never miss an update</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Get new articles and COLA updates delivered to your inbox — free.
          </p>
          <div className="max-w-md mx-auto pt-2">
            <SubscribeForm placeholder="your@email.com" buttonText="Subscribe" dark={true} />
          </div>
        </div>

      </div>
    </div>
  )
}

// التغليف بـ Suspense لضمان استقرار عملية الـ Build التلقائي والإنتاجية
export default function BlogPage() {
  return (
    <Suspense fallback={<div className="bg-slate-50 min-h-screen text-center py-20 text-slate-500">Loading Blog...</div>}>
      <BlogContent />
    </Suspense>
  )
}