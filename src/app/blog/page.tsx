import { Suspense } from "react"
import type { Metadata } from "next"
import { BlogClient } from "./BlogClient"

// Metadata حصرية لصفحة المدونة الرئيسية (تمنع التكرار وتتوافق مع القالب)
export const metadata: Metadata = {
  title: "Latest News, COLA Estimates & Guides", // سيتولى Layout إضافة | Social Security Guide Calc تلقائياً
  description: "Stay updated with breaking news on Social Security COLA adjustments, Medicare policy changes, and benefit claiming strategies.",
  openGraph: {
    title: "Latest News, COLA Estimates & Guides",
    description: "Stay updated with breaking news on Social Security COLA adjustments, Medicare policy changes, and benefit claiming strategies.",
    url: "https://www.socialsecurityguidecalc.com/blog",
  },
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="bg-slate-50 min-h-screen text-center py-20 text-slate-600 font-medium">Loading Blog...</div>}>
      <BlogClient />
    </Suspense>
  )
}