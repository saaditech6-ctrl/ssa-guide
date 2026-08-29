import { ShieldCheck, Mail, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use — Social Security Guide",
  description: "Terms and conditions for using Social Security Guide calculators, guides, and educational resources.",
  openGraph: {
    title: "Terms of Use — Social Security Guide",
    description: "Terms and conditions for using Social Security Guide calculators, guides, and educational resources.",
    url: "https://www.socialsecurityguidecalc.com/terms",
  }
}

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using Social Security Guide (www.socialsecurityguidecalc.com), you agree to be bound by these Terms of Use. If you do not agree, please do not use this site. These terms apply to all visitors and users of the website."
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
    title: "10. Contact Information",
    content: "For questions about these Terms of Use, contact Amine Saadi at contact@socialsecurityguidecalc.com."
  }
]

export default function TermsPage() {
  // كود Structured Data لصفحات الشروط والبيانات القانونية
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Use",
    "url": "https://www.socialsecurityguidecalc.com/terms",
    "description": "Terms and conditions governing the use of Social Security Guide.",
    "publisher": {
      "@type": "Organization",
      "name": "Social Security Guide",
      "url": "https://www.socialsecurityguidecalc.com"
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header Section */}
      <section className="bg-[#071530] py-14 text-white border-b border-white/10">
        <div className="container-site max-w-3xl mx-auto px-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-[#e4b325] transition-colors mb-4 group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold font-playfair tracking-tight mb-2 text-white">
            Terms of Use
          </h1>
          <p className="text-slate-300 text-xs font-medium">
            Last updated: June 28, 2026
          </p>
        </div>
      </section>

      {/* Main Legal Content */}
      <main className="container-site max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-xs">
          
          {/* Top Legal Notice Banner */}
          <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 mb-8 flex gap-3 items-start">
            <Info size={18} className="text-blue-700 mt-0.5 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium m-0">
              Please read these terms carefully before utilizing our calculators and educational guides. Accessing or using this website confirms your explicit agreement to these terms.
            </p>
          </div>

          {/* Terms Sections List */}
          <div className="space-y-6">
            {termsSections.map((section, i) => (
              <section 
                key={i} 
                className={`pb-6 space-y-2.5 ${
                  i < termsSections.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <h2 className="font-playfair text-base sm:text-lg font-bold text-[#071530] flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#a6760d] flex-shrink-0" />
                  {section.title}
                </h2>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed pl-6 m-0">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          {/* Contact Box Footer */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Mail size={18} className="text-slate-500 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-slate-800 font-medium m-0">
                Have questions regarding our terms or legal policies?
              </p>
            </div>
            <a 
              href="mailto:contact@socialsecurityguidecalc.com" 
              className="text-xs sm:text-sm font-bold text-[#a6760d] hover:text-[#83590f] transition-colors bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-xs self-start sm:self-auto"
            >
              Contact Support
            </a>
          </div>

        </div>
      </main>
    </div>
  )
}