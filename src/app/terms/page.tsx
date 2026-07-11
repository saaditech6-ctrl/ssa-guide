import { ShieldCheck, Mail, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Terms of Use | Social Security Guide",
  description: "Terms and conditions for using Social Security Guide.",
}

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using Social Security Guide (socialsecurityguide.com), you agree to be bound by these Terms of Use. If you do not agree, please do not use this site. These terms apply to all visitors and users of the website."
  },
  {
    title: "2. Use of Content",
    content: "All content on this site is for personal, non-commercial, informational use only. You may not reproduce, distribute, modify, or republish any content without written permission from Amine Saadi. Brief quotations with proper attribution and a link back to the original page are permitted."
  },
  {
    title: "3. No Professional Advice",
    content: "Nothing on this website constitutes legal, financial, tax, or professional advice. Social Security Guide provides general educational information only. Always consult a qualified professional before making decisions about your Social Security benefits, Medicare, or retirement planning."
  },
  {
    title: "4. Calculator Disclaimer",
    content: "Our calculators provide estimates based on simplified SSA formulas. Results are not guaranteed to match your actual SSA-determined benefit. Your real benefit is determined solely by the Social Security Administration based on your official earnings record."
  },
  {
    title: "5. Intellectual Property",
    content: "All original content, design, logos, and materials on this site are the intellectual property of Amine Saadi and Social Security Guide. Unauthorized use is prohibited. Third-party content is used under applicable licenses or fair use."
  },
  {
    title: "6. Third-Party Links",
    content: "This site may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of any external sites. Links are provided for convenience and reference only."
  },
  {
    title: "7. Limitation of Liability",
    content: "Amine Saadi and Social Security Guide shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on its content. Use this site at your own risk."
  },
  {
    title: "8. Changes to Terms",
    content: "We reserve the right to update these Terms of Use at any time. The updated date will be reflected at the top of this page. Continued use of the site after changes constitutes acceptance of the new terms."
  },
  {
    title: "9. Governing Law",
    content: "These Terms of Use shall be governed by and construed in accordance with applicable law. Any disputes shall be resolved in the appropriate jurisdiction."
  },
  {
    title: "10. Contact",
    content: "For questions about these Terms of Use, contact Amine Saadi at saaditech6@gmail.com."
  }
]

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* هيدر الصفحة */}
      <div className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] py-14 text-white">
        <div className="container-site max-w-3xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors mb-4 group">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> Back to Home
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold font-playfair tracking-tight mb-2">
            Terms of Use
          </h1>
          <p className="text-slate-400 text-xs font-medium">
            Last updated: June 28, 2026
          </p>
        </div>
      </div>

      {/* محتوى الشروط والبنود */}
      <div className="container-site max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-xs">
          
          {/* تنويه سريع علوي */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 mb-8 flex gap-3 items-start">
            <div className="text-blue-600 mt-0.5 flex-shrink-0">
              <Info size={16} />
            </div>
            <p className="text-xs text-blue-900 leading-relaxed font-medium m-0">
              Please read these terms carefully before exploring our legal and financial content. Using this website validates your compliance with our standard guidelines.
            </p>
          </div>

          {/* معالجة الأقسام التعليمية لشروط الاستخدام */}
          <div className="space-y-6">
            {termsSections.map((section, i) => (
              <div 
                key={i} 
                className={`pb-6 space-y-2.5 ${
                  i < termsSections.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <h2 className="font-playfair text-base font-bold text-[#071530] flex items-center gap-2">
                  <ShieldCheck size={16} className="text-amber-500 flex-shrink-0" />
                  {section.title}
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-6 m-0">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* صندوق الاتصال السفلي المبسط */}
          <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-4 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-slate-400" />
              <p className="text-xs text-slate-600 font-medium m-0">
                Have questions regarding our policies?
              </p>
            </div>
            <a 
              href="mailto:saaditech6@gmail.com" 
              className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs self-start sm:self-auto"
            >
              saaditech6@gmail.com
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}