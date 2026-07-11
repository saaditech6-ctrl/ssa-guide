import { BookOpen, ShieldAlert, Heart, Activity, Landmark, Percent } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Social Security Guides 2026 — Complete Resource Library",
  description: "In-depth guides on Social Security retirement, disability, Medicare, spousal benefits, and more.",
}

const guides = [
  {
    icon: Landmark,
    title: "Social Security Basics",
    href: "/guides/getting-started",
    desc: "Everything you need to know to get started with Social Security — how it works, who qualifies, and how to apply.",
    time: "10 min read",
    level: "Beginner"
  },
  {
    icon: BookOpen,
  title: "Retirement Benefits",
  href: "/guides/retirement", // تأكد أنه هكذا وليس /retirement-benefits
  desc: "How to maximize your retirement income with smart claiming strategies...",
  time: "12 min read",
  level: "Intermediate"
  },
  {
    icon: Percent,
    title: "Social Security Benefit Taxation",
    href: "/guides/benefit-taxes",
    desc: "Are your Social Security benefits taxable? Learn the income thresholds, how combined income works, and legal strategies to reduce your tax bill.",
    time: "9 min read",
    level: "Advanced"
  },
  {
    icon: Activity,
    title: "Disability Benefits (SSDI)",
    href: "/guides/disability",
    desc: "A complete guide to Social Security Disability Insurance — eligibility, the application process, and what to expect.",
    time: "15 min read",
    level: "Intermediate"
  },
  {
    icon: Heart,
    title: "Medicare Complete Guide",
    href: "/guides/medicare",
    desc: "Medicare Parts A, B, C, and D explained in plain English — enrollment windows, costs, and coverage options.",
    time: "20 min read",
    level: "Intermediate"
  },
  {
    icon: ShieldAlert,
    title: "Spousal Benefits",
    href: "/guides/spousal-benefits",
    desc: "How married, divorced, and widowed individuals can maximize their Social Security benefits as a couple.",
    time: "8 min read",
    level: "Beginner"
  },
]

export default function GuidesPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* هيدر قسم الأدلة الفاخر المستوحى من هوية موقعك البصرية */}
      <div className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] py-16 text-white">
        <div className="container-site max-w-4xl mx-auto">
          <span className="eyebrow !text-amber-400 !mb-3">Expert resources</span>
          <h1 className="heading-xl text-white font-bold mb-4">Social Security Guides</h1>
          <p className="body-lg text-slate-300 max-w-2xl leading-relaxed">
            Plain-English guides written by Amine Saadi and reviewed against official SSA publications.
          </p>
        </div>
      </div>

      {/* قائمة الأدلة والبطاقات بالتجاوب الكامل */}
      <div className="container-site max-w-4xl mx-auto py-12">
        <div className="flex flex-col gap-5">
          {guides.map((guide) => {
            const IconComponent = guide.icon
            return (
              <Link 
                key={guide.href} 
                href={guide.href} 
                className="card-hover bg-white border border-slate-200/60 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-all group"
              >
                {/* حاوية الأيقونة الموحدة */}
                <div className="w-12 h-12 bg-slate-50 text-[#1e4f9c] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                  <IconComponent size={24} strokeWidth={1.75} />
                </div>

                {/* تفاصيل الدليل */}
                <div className="flex-1 space-y-1.5 w-full">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-playfair text-lg font-bold text-[#071530] group-hover:text-amber-600 transition-colors m-0">
                      {guide.title}
                    </h2>
                    <span className={`badge text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                      guide.level === "Beginner" ? "badge-green" : 
                      guide.level === "Advanced" ? "badge-red" : "badge-navy"
                    }`}>
                      {guide.level}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-3xl m-0">
                    {guide.desc}
                  </p>
                  <p className="text-xs text-slate-400 font-medium flex items-center gap-1 m-0 pt-1">
                    ⏱ {guide.time}
                  </p>
                </div>

                {/* سهم الانتقال التفاعلي */}
                <div className="hidden sm:flex text-slate-300 group-hover:text-amber-600 font-bold text-lg transition-all transform group-hover:translate-x-1 pl-2">
                  &rarr;
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}