import { User, Calculator, Newspaper, BookOpen, Lock, MessageCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "About Us | Social Security Guide",
  description: "Meet Amine Saadi, the creator of Social Security Guide — your trusted resource for Social Security benefits, calculators, and retirement news.",
}

export default function AboutPage() {
  // كود الـ Schema المنظم لتعزيز الثقة برمجياً لدى روبوتات جوجل والـ AI
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Person",
      "name": "Amine Saadi",
      "jobTitle": "Financial Content Creator & Digital Media Specialist",
      "description": "Founder and content creator focused on US Social Security, retirement planning, and financial literacy.",
      "knowsAbout": [
        "Social Security Benefits",
        "Retirement Planning",
        "Medicare",
        "Disability Benefits"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Social Security Guide",
      "url": "https://socialsecurityguide.com",
      "logo": "https://socialsecurityguide.com/logo.png"
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* حقن الـ Schema برمجياً للمحركات الذكية */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* هيدر الصفحة بتصميم تدرج الألوان الفاخر الموحد للموقع */}
      <div className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] py-16 text-white">
        <div className="container-site max-w-4xl mx-auto px-4">
          <span className="eyebrow !text-amber-400 !mb-3">Who We Are</span>
          <h1 className="heading-xl text-white font-bold mb-4">About Social Security Guide</h1>
          <p className="body-lg text-slate-300 max-w-2xl leading-relaxed">
            Built by a financial content creator who believes everyone deserves clear, free information about their benefits.
          </p>
        </div>
      </div>

      {/* محتوى الصفحة الأساسي */}
      <div className="container-site max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-10 shadow-sm space-y-10">
          
          {/* صندوق السيرة الذاتية لـ Amine Saadi */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-8 border-b border-slate-100">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#071530] to-[#163d7d] flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-amber-400 font-playfair font-bold text-2xl">A</span>
            </div>
            <div className="space-y-0.5">
              <h2 className="font-playfair text-2xl font-bold text-[#071530]">Amine Saadi</h2>
              <p className="text-amber-600 text-sm font-semibold tracking-wide uppercase">Founder & Content Creator</p>
              <p className="text-slate-400 text-xs font-medium">Financial Content Creator & Digital Media Specialist</p>
            </div>
          </div>

          {/* قسم قصتي قراءة مريحة للعين */}
          <div className="space-y-4">
            <h2 className="font-playfair text-xl font-bold text-[#071530]">My Story</h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              My name is Amine Saadi. I am a digital content creator with a strong focus on
              financial literacy and personal finance. Over the years, I have followed financial
              markets, retirement systems, and Social Security closely — and I noticed one major
              problem: most Americans find Social Security confusing, overwhelming, and hard to
              navigate on their own.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              That is exactly why I built Social Security Guide. My goal is simple: to give every
              American — regardless of their financial background — access to clear, accurate,
              and free information about their Social Security benefits, Medicare options, and
              retirement planning strategies.
            </p>
          </div>

          {/* شبكة مميزات الموقع والأدوات المتوفرة مع استبدال الإيموجيز بأيقونات عصرية */}
          <div className="space-y-5">
            <h2 className="font-playfair text-xl font-bold text-[#071530]">What You Will Find Here</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Calculator, title: "Free Calculators", desc: "SSA-formula tools for benefits, retirement age, and break-even analysis" },
                { icon: Newspaper, title: "Latest News", desc: "COLA updates, Medicare changes, and SSA rule announcements" },
                { icon: BookOpen, title: "In-Depth Guides", desc: "Plain-English explanations of complex Social Security topics" },
                { icon: Lock, title: "No Registration", desc: "Everything is free — no account, no paywall, ever" },
              ].map((item, i) => {
                const IconComponent = item.icon
                return (
                  <div key={i} className="bg-slate-50/80 border border-slate-200/40 rounded-xl p-5 flex gap-4 items-start">
                    <div className="text-amber-600 bg-amber-50 p-2 rounded-lg flex-shrink-0">
                      <IconComponent size={20} strokeWidth={2} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-[#071530] text-sm">{item.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* المعايير التحريرية */}
          <div className="space-y-4">
            <h2 className="font-playfair text-xl font-bold text-[#071530]">Editorial Standards</h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Every article, guide, and calculator on this site is based on official SSA publications,
              the Code of Federal Regulations, and verified government data. I update content within
              days of any SSA announcement to ensure you always have the most current information.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              This site is funded by display advertising and, where disclosed, affiliate partnerships.
              Advertisers have no editorial influence over any content published here. Social Security
              Guide is fully independent and is not affiliated with the U.S. Social Security
              Administration or any government agency.
            </p>
          </div>

          {/* صندوق تواصل معنا التفاعلي الملون والداكن المتناسق مع الهيدر */}
          <div className="bg-[#071530] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <MessageCircle size={18} className="text-amber-400" /> Have a question or correction?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                I read every message personally and respond within 48 hours.
              </p>
            </div>
            <Link 
              href="/contact" 
              className="bg-amber-500 hover:bg-amber-600 text-[#071530] font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-98 whitespace-nowrap inline-flex w-full md:w-auto justify-center"
            >
              Contact Amine
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}