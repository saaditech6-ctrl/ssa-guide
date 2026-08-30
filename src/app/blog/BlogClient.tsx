"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Flame, Clock, User, Calendar, Newspaper, ArrowRight } from "lucide-react"
import { articles, categories } from "@/lib/articles"

function formatArticleDate(dateString?: string) {
  const dateObj = dateString ? new Date(dateString) : new Date()
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}

function PinterestSaveButton({ slug, image, title }: { slug: string; image?: string; title: string }) {
  const baseUrl = "https://www.socialsecurityguidecalc.com"
  const fullArticleUrl = encodeURIComponent(`${baseUrl}/blog/${slug}`)
  const fullImageUrl = encodeURIComponent(image ? (image.startsWith("http") ? image : `${baseUrl}${image}`) : "")
  const fullTitle = encodeURIComponent(title)

  const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${fullArticleUrl}&media=${fullImageUrl}&description=${fullTitle}`

  return (
    <a
      href={pinUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e60023] hover:bg-[#ad001a] text-white text-xs font-bold rounded-full shadow-md transition-all duration-200 z-10"
      title="Save to Pinterest"
    >
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
      <span>Save</span>
    </a>
  )
}

export function BlogClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get("category")
  const activeCategory = categoryParam && categories.includes(categoryParam) ? categoryParam : "All"

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (cat === "All") {
      params.delete("category")
    } else {
      params.set("category", cat)
    }

    const query = params.toString()
    router.replace(query ? `?${query}` : "/blog", { scroll: false })
  }

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

  const filtered = activeCategory === "All" ? articles : articles.filter(a => a.category === activeCategory)
  const featured = articles.find(a => a.featured)
  const rest = filtered.filter(a => activeCategory !== "All" || !featured || a.slug !== featured.slug)

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.socialsecurityguidecalc.com/blog/#webpage",
    "name": "Social Security Guide Blog — Expert Insights",
    "url": "https://www.socialsecurityguidecalc.com/blog",
    "description": "In-depth articles on Social Security benefits, Medicare, retirement planning, and the latest SSA updates by Amine Saadi.",
    "author": {
      "@type": "Person",
      "@id": "https://www.socialsecurityguidecalc.com/#amine-saadi",
      "name": "Amine Saadi",
      "url": "https://www.socialsecurityguidecalc.com/about",
      "jobTitle": "Financial Content Creator"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Social Security Guide",
      "url": "https://www.socialsecurityguidecalc.com/"
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <header className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] py-16 text-white border-b border-white/10">
        <div className="container-site max-w-5xl mx-auto px-4">
          <span className="block text-xs font-bold text-[#e4b325] uppercase tracking-wider mb-2">Expert Insights</span>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Social Security Blog</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            In-depth articles on Social Security benefits, Medicare, retirement planning, and the latest SSA updates — written by{" "}
            <Link href="/about" className="underline font-semibold hover:text-[#e4b325] transition-colors">
              Amine Saadi
            </Link>.
          </p>
        </div>
      </header>

      <main className="container-site max-w-5xl mx-auto px-4 py-10">
        <nav aria-label="Blog categories" className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#071530] border-transparent text-white shadow-xs"
                  : "bg-white border-slate-300 text-[#163d7d] hover:bg-slate-100 hover:border-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {activeCategory === "All" && featured && (
          <article className="mb-8">
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all hover:border-slate-300 hover:shadow-md group relative">
              <div className="flex flex-col md:flex-row">
                {featured.image && (
                  <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto min-h-[240px] bg-slate-100 overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt || featured.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 z-20">
                      <PinterestSaveButton slug={featured.slug} image={featured.image} title={featured.title} />
                    </div>
                  </div>
                )}
                
                <div className="p-6 sm:p-8 flex-1 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 flex items-center gap-1 border border-rose-200/60">
                        <Flame size={12} className="fill-rose-700/10" /> Featured
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-[#163d7d]">
                        {featured.category}
                      </span>
                    </div>
                    
                    <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#071530] leading-tight group-hover:text-[#1e4f9c] transition-colors">
                      <Link href={`/blog/${featured.slug}`}>
                        {featured.title}
                      </Link>
                    </h2>
                    
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                      {featured.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 pt-4 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <User size={14} className="text-[#a6760d]" /> {featured.author}
                    </span>
                    <span className="hidden sm:inline text-slate-300">·</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-slate-400" /> {formatArticleDate(featured.date)}
                    </span>
                    <span className="hidden sm:inline text-slate-300">·</span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-slate-400" /> {featured.readTime}
                    </span>
                    <Link href={`/blog/${featured.slug}`} className="sm:ml-auto text-[#1e4f9c] font-bold flex items-center gap-1 hover:underline">
                      Read article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {rest.length === 0 && activeCategory !== "All" && (
          <div className="text-center py-16 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-3">
            <div className="text-slate-400 flex justify-center">
              <Newspaper size={48} strokeWidth={1.5} />
            </div>
            <p className="text-slate-600 font-medium text-sm sm:text-base m-0">No articles in this category yet. Check back soon!</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(article => (
            <article key={article.slug} className="flex">
              <div className="w-full bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-slate-300 hover:shadow-md group relative">
                <div className="flex flex-col flex-1">
                  {article.image && (
                    <div className="relative w-full aspect-video bg-slate-100 overflow-hidden border-b border-slate-100">
                      <Image
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 left-2.5 z-20">
                        <PinterestSaveButton slug={article.slug} image={article.image} title={article.title} />
                      </div>
                    </div>
                  )}

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-[#163d7d]">
                          {article.category}
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                          <Clock size={12} className="text-slate-400" /> {article.readTime}
                        </span>
                      </div>
                      
                      <h3 className="font-playfair text-base sm:text-lg font-bold text-[#071530] leading-snug group-hover:text-[#1e4f9c] transition-colors line-clamp-2">
                        <Link href={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#071530] flex items-center justify-center flex-shrink-0">
                          <span className="text-[#e4b325] text-[10px] font-bold">A</span>
                        </div>
                        <span className="text-slate-700 font-semibold">{article.author}</span>
                      </div>
                      <time className="text-slate-500 font-medium">
                        {formatArticleDate(article.date)}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}