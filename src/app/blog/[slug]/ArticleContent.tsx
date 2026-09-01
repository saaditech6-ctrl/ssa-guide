"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, User, Calendar, Headphones, PlayCircle, Share2 } from "lucide-react"
import { Article } from "@/lib/articles"
import Image from "next/image"

function formatArticleDate(dateString?: string) {
  const dateObj = dateString ? new Date(dateString) : new Date()
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}

function calculateReadTime(content: string) {
  const plainText = content.replace(/<[^>]*>/g, '').trim()
  const words = plainText.split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

// 📌 مكون أزرار المشاركة المخصص (Social Share Bar)
function ShareBar({ title, slug, image }: { title: string; slug: string; image?: string }) {
  const baseUrl = "https://www.socialsecurityguidecalc.com"
  const articleUrl = encodeURIComponent(`${baseUrl}/blog/${slug}`)
  const articleTitle = encodeURIComponent(title)
  const imageUrl = encodeURIComponent(image ? (image.startsWith("http") ? image : `${baseUrl}${image}`) : "")

  const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${articleUrl}&media=${imageUrl}&description=${articleTitle}`
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`
  const xUrl = `https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 my-6 border-y border-slate-200/80">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
        <Share2 size={14} />
        <span>Share & Save:</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Pinterest Save Button */}
        <a
          href={pinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e60023] hover:bg-[#ad001a] text-white text-xs font-bold rounded-full shadow-xs transition-all duration-200"
          title="Save to Pinterest"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
          </svg>
          <span>Save</span>
        </a>

        {/* Facebook Button */}
        <a
          href={fbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1877f2] hover:bg-[#0d65d9] text-white text-xs font-bold rounded-full shadow-xs transition-all duration-200"
        >
          <span>Facebook</span>
        </a>

        {/* X / Twitter Button */}
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-xs transition-all duration-200"
        >
          <span>X</span>
        </a>
      </div>
    </div>
  )
}

export default function ArticleContent({ article }: { article: Article }) {
  const router = useRouter()

  // تحميل سكريبت Pinterest التفاعلي
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "//assets.pinterest.com/js/pinit.js"
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // 🎯 دالة معالجة الـ HTML لحقن الأوديو والفيديو في أماكنهما المحددة تلقائياً
  const renderStructuredContent = () => {
    const content = article.content

    // 1. تحديد موقع أول عنوان <h2> لحقن الصوت قبله
    const firstH2Index = content.indexOf("<h2")

    // مكون الأوديو
    const AudioComponent = article.audioUrl ? (
      <section className="my-8 bg-[#0f172a] text-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-slate-800 rounded-lg text-slate-200">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base leading-none text-slate-100">
              Listen to the Article Overview
            </h3>
            <p className="text-xs text-slate-400 mt-1">{article.title}</p>
          </div>
        </div>
        <audio controls className="w-full h-10 accent-[#e4b325]">
          <source src={article.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </section>
    ) : null

    // مكون الفيديو
    const VideoComponent = article.videoUrl ? (
      <section className="my-8 bg-[#0f172a] text-white p-4 sm:p-6 rounded-2xl shadow-md border border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-800 rounded-lg text-red-500">
            <PlayCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base leading-none text-slate-100">
              Watch the Video Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {article.videoTitle || article.title}
            </p>
          </div>
        </div>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700/60 bg-black">
          <iframe
            src={article.videoUrl}
            title={article.videoTitle || article.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        </div>
      </section>
    ) : null

    const proseClasses = `prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed
      [&_p]:mb-5 [&_p]:leading-relaxed
      [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-playfair [&_h2]:text-[#071530] [&_h2]:mt-8 [&_h2]:mb-4
      [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#071530] [&_h3]:mt-6 [&_h3]:mb-3
      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-5 [&_ul]:space-y-1.5
      [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-5 [&_ol]:space-y-1.5
      [&_blockquote]:border-l-4 [&_blockquote]:border-[#e4b325] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:bg-slate-50 [&_blockquote]:py-2 [&_blockquote]:rounded-r-lg
      [&_table]:min-w-full [&_table]:my-6 [&_table]:border-collapse
      [&_th]:bg-slate-50 [&_th]:p-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-bold [&_th]:text-slate-700 [&_th]:uppercase [&_th]:border [&_th]:border-slate-200
      [&_td]:p-3 [&_td]:border [&_td]:border-slate-200 [&_td]:text-slate-700
      [&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto
      [&_a]:text-[#1e4f9c] [&_a]:font-semibold [&_a]:underline hover:[&_a]:text-[#071530]`

    // تقسيم الـ HTML بناءً على موقع <h2> وموقع إغلاق الجدول </table>
    let topSection = content
    let middleSection = ""
    let bottomSection = ""

    if (firstH2Index !== -1) {
      topSection = content.slice(0, firstH2Index)
      const restContent = content.slice(firstH2Index)

      const tableEndIndex = restContent.indexOf("</table>")
      if (tableEndIndex !== -1) {
        const tableEndPos = tableEndIndex + "</table>".length
        middleSection = restContent.slice(0, tableEndPos)
        bottomSection = restContent.slice(tableEndPos)
      } else {
        middleSection = restContent
      }
    }

    return (
      <>
        {/* 1. المقدمة و Quick Answer */}
        <div className={proseClasses} dangerouslySetInnerHTML={{ __html: topSection }} />

        {/* 🎧 2. مشغل الصوت (تحت Quick Answer وقبل H2) */}
        {AudioComponent}

        {/* 3. الجزء المتوسط الذي يحتوي على الفقرات والجدول */}
        {middleSection && (
          <div className={proseClasses} dangerouslySetInnerHTML={{ __html: middleSection }} />
        )}

        {/* 🎬 4. مشغل الفيديو (مباشرة تحت الجدول) */}
        {VideoComponent}

        {/* 5. باقي المقال بعد الجدول والفيديو */}
        {bottomSection && (
          <div className={proseClasses} dangerouslySetInnerHTML={{ __html: bottomSection }} />
        )}
      </>
    )
  }

  const localGuideLinks = [
    { label: "Social Security by State", href: "/states" },
    { label: "California Social Security", href: "/states/california" },
    { label: "Texas Social Security", href: "/states/texas" },
    { label: "Florida Social Security", href: "/states/florida" },
    { label: "Los Angeles", href: "/states/california/cities/los-angeles" },
    { label: "New York City", href: "/states/new-york/cities/new-york" },
    { label: "Chicago", href: "/states/illinois/cities/chicago" },
  ]

  return (
    <article className="max-w-3xl mx-auto px-4 py-6">
      {/* Navigation Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#071530] mb-6 transition-colors cursor-pointer group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to feed
      </button>

      {/* Article Header */}
      <header className="space-y-4 mb-6">
        <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-200/80 text-[#163d7d]">
          {article.category}
        </span>
        <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071530] leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600 pt-4 border-t border-slate-200/80">
          <span className="flex items-center gap-1.5 font-semibold text-slate-800">
            <User size={14} className="text-[#a6760d]" /> {article.author}
          </span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-slate-500" /> {formatArticleDate(article.date)}
          </span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-slate-500" /> {calculateReadTime(article.content)}
          </span>
        </div>
      </header>

      {/* Featured Cover Image مع زر Pinterest العائم */}
      {article.image && (
        <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-2xl border border-slate-200/80 shadow-xs bg-slate-100 group">
          <Image
            src={article.image}
            alt={article.imageAlt || article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />

          {/* زر Pinterest يظهر أعلى يسار الصورة المباشرة */}
          <div className="absolute top-3 left-3 z-20">
            <a
              href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://www.socialsecurityguidecalc.com/blog/${article.slug}`)}&media=${encodeURIComponent(`https://www.socialsecurityguidecalc.com${article.image}`)}&description=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e60023] hover:bg-[#ad001a] text-white text-xs font-bold rounded-full shadow-md transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
              <span>Save</span>
            </a>
          </div>
        </div>
      )}

      {/* شريط المشاركة والحفظ (Share Bar) أعلى المقال */}
      <ShareBar title={article.title} slug={article.slug} image={article.image} />

      {/* Main Body Content Block */}
      <main className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-xs">
        {renderStructuredContent()}
      </main>

      {/* شريط المشاركة والحفظ أسفل المقال للختام */}
      <div className="mt-8">
        <ShareBar title={article.title} slug={article.slug} image={article.image} />
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-playfair text-2xl font-bold text-[#071530] mb-4">Local guides related to this topic</h2>
        <div className="flex flex-wrap gap-2">
          {localGuideLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}