"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Calculator, ChevronDown, Menu, X, Search, FileText } from "lucide-react"
import { articles } from "@/lib/articles" // تأكد من صحة مسار ملف المقالات لديك

// تعريف أقسام المدونة المحدثة بروابط الاستعلام (Query Params) لمنع الـ 404
const blogCategories = [
  { label: "COLA Updates", href: "/blog?category=COLA Updates" },
  { label: "Retirement Planning", href: "/blog?category=Retirement Planning" },
  { label: "Medicare", href: "/blog?category=Medicare" },
  { label: "Disability", href: "/blog?category=Disability" },
  { label: "Spousal Benefits", href: "/blog?category=Spousal Benefits" },
  { label: "Tax & Income", href: "/blog?category=Tax & Income" },
  { label: "SSA News", href: "/blog?category=SSA News" },
]

const calculatorLinks = [
 { label: "Benefits Estimator", href: "/calculators/benefits-estimator" },
  { label: "Full Retirement Age", href: "/calculators/retirement-age" }, 
  { label: "Break-Even Analysis", href: "/calculators/break-even" },
  { label: "Medicare Cost", href: "/calculators/medicare-cost" },
  { label: "Social Security Tax", href: "/calculators/tax-calculator" }, // 🌟 أضف هذا السطر هنا
]

const guideLinks = [
  { label: "Getting Started", href: "/guides/getting-started" },
  { label: "Retirement Benefits", href: "/guides/retirement" },
  { label: "Avoid Benefit Taxes", href: "/guides/benefit-taxes" }, 
  { label: "Disability (SSDI)", href: "/guides/disability" },
  { label: "Medicare Complete Guide", href: "/guides/medicare" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  // حالات البحث الجديدة
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof articles>([])

  // إغلاق البحث عند الضغط على زر ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // منطق تصفية وفلترة المقالات فورياً أثناء الكتابة
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    )
    setSearchResults(filtered)
  }, [searchQuery])

  return (
    <>
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo / Branding */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-[#071530] font-playfair font-bold text-lg">S</span>
              </div>
              <div>
                <span className="font-playfair font-semibold text-[#071530] text-lg block leading-tight">SS Guide</span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase block">Social Security</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              
              {/* 1. Calculators Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("calculators")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#071530] transition-colors py-2 cursor-pointer">
                  Calculators <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "calculators" ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === "calculators" && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-slate-100 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                    {calculatorLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-amber-600 transition-colors font-medium"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Guides & Insights Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("guides")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#071530] transition-colors py-2 cursor-pointer">
                  Guides & Insights <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "guides" ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === "guides" && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                    {guideLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-amber-600 transition-colors font-medium"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Blog Dropdown List */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("blog")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#071530] transition-colors py-2 cursor-pointer">
                  Blog <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "blog" ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === "blog" && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-slate-100 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                    {blogCategories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-amber-600 transition-colors font-medium"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* About Link */}
              <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-[#071530] transition-colors">
                About
              </Link>
            </div>

            {/* الأزرار اليمنى: زر البحث + زر الحاسبة */}
            <div className="hidden md:flex items-center gap-4">
              {/* زر المكبرة للبحث على شاشات الكمبيوتر */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-500 hover:text-[#071530] hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                aria-label="Search articles"
              >
                <Search size={19} />
              </button>

              <Link href="/calculators/benefits-estimator" className="inline-flex items-center gap-1.5 bg-[#071530] hover:bg-[#0f2550] text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm">
                <Calculator size={16} /> Free Calculator
              </Link>
            </div>

            {/* أزرار الهاتف المتجاوبة */}
            <div className="flex items-center gap-2 md:hidden">
              {/* زر المكبرة يظهر أيضاً على الموبايل بجانب القائمة */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-500 hover:text-[#071530] rounded-xl"
                aria-label="Search articles"
              >
                <Search size={20} />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-6 space-y-1 shadow-inner max-h-[85vh] overflow-y-auto">
            
            {/* Calculators Group Mobile */}
            <div className="pt-2">
              <span className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Calculators</span>
              {calculatorLinks.map((item) => (
                <Link key={item.href} onClick={() => setIsOpen(false)} href={item.href} className="block px-6 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Guides Group Mobile */}
            <div className="pt-2 border-t border-slate-50">
              <span className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Guides & Insights</span>
              {guideLinks.map((item) => (
                <Link key={item.href} onClick={() => setIsOpen(false)} href={item.href} className="block px-6 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Blog Sections Group Mobile */}
            <div className="pt-2 border-t border-slate-50">
              <span className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Blog Sections</span>
              {blogCategories.map((cat) => (
                <Link
                  key={cat.href}
                  onClick={() => setIsOpen(false)}
                  href={cat.href}
                  className="block px-6 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-amber-600"
                >
                  • {cat.label}
                </Link>
              ))}
            </div>

            <Link href="/about" className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 pt-2 border-t border-slate-50">
              About
            </Link>
            
            <div className="pt-4 px-3">
              <Link href="/calculators/benefits-estimator" className="w-full justify-center inline-flex items-center gap-1.5 bg-[#071530] text-white text-base font-medium py-3 rounded-xl">
                <Calculator size={18} /> Free Calculator
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* نافذة البحث المنبثقة التفاعلية (Search Modal Overlay) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden transform transition-all duration-150">
            
            {/* حقل الإدخال للبحث */}
            <div className="flex items-center gap-3 px-4 border-b border-slate-100 h-14">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search updates, guides, benefits..."
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-full text-sm text-slate-800 placeholder-slate-400 outline-none"
              />
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* لوحة عرض نتائج فحص الكلمات */}
            <div className="max-h-80 overflow-y-auto p-2">
              {searchQuery.trim() === "" ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  Type something to search the Social Security library...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No articles matched your search.
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Articles Found ({searchResults.length})
                  </div>
                  {searchResults.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/blog/${article.slug}`}
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="p-2 bg-slate-100 rounded-lg text-[#071530] group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors">
                        <FileText size={16} />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <div className="text-xs font-bold text-[#071530] line-clamp-1 group-hover:text-amber-600 transition-colors">
                          {article.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          {article.category}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* تذييل النافذة */}
            <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-medium">
              <span>Search index is live and updated</span>
              <span>Press <kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-xs text-slate-500">ESC</kbd> to close</span>
            </div>

          </div>
        </div>
      )}
    </>
  )
}