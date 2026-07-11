import { ShieldCheck, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | Social Security Guide",
  description: "How Social Security Guide collects, uses, and protects your personal information.",
}

// قمنا بتحديث الواجهة وإضافة نوع صريح مخصص لـ TypeScript لضمان سلامة البيانات
interface Section {
  title: string;
  content?: string;
  items?: string[];
}

const sections: Section[] = [
  {
    title: "1. Who We Are",
    content: "Social Security Guide (socialsecurityguide.com) is an independent website owned and operated by Amine Saadi, a financial content creator. We are not affiliated with the U.S. Social Security Administration or any government agency. For any privacy-related questions, contact us at saaditech6@gmail.com."
  },
  {
    title: "2. Information We Collect",
    items: [
      "Usage data: Pages visited, time on site, browser type, and referring URLs — collected automatically via Google Analytics.",
      "Calculator inputs: All numbers you enter into our calculators are processed entirely in your browser. We never store or transmit your financial data.",
      "Email address: If you subscribe to our newsletter, your email is stored with our email service provider.",
      "Contact form data: Your name, email, and message when you use our contact form.",
    ]
  },
  {
    title: "3. How We Use Your Information",
    items: [
      "To operate, maintain, and improve the website",
      "To send our newsletter (only if you subscribed)",
      "To respond to your contact form messages",
      "To analyze traffic and user behavior via Google Analytics",
      "To comply with legal obligations",
    ]
  },
  {
    title: "4. Google AdSense & Advertising",
    content: "We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this and other websites. You may opt out of personalized advertising by visiting Google Ads Settings at adssettings.google.com. For more information, review Google's Privacy Policy at policies.google.com/privacy."
  },
  {
    title: "5. Cookies",
    items: [
      "Analytics cookies: Google Analytics uses cookies to measure site traffic and usage.",
      "Advertising cookies: Google AdSense uses cookies to show relevant advertisements.",
      "Preference cookies: To remember your settings across visits.",
    ]
  },
  {
    title: "6. Third-Party Services",
    items: [
      "Google Analytics — policies.google.com/privacy",
      "Google AdSense — policies.google.com/privacy",
      "Formspree (contact form) — formspree.io/legal/privacy-policy",
    ]
  },
  {
    title: "7. Data Retention",
    content: "Newsletter email addresses are retained until you unsubscribe. Analytics data is retained per Google's default settings (26 months). Contact form submissions are retained for 90 days."
  },
  {
    title: "8. Your Rights",
    content: "You have the right to access, correct, or delete your personal data. To exercise these rights, email Amine Saadi directly at saaditech6@gmail.com. We will respond within 30 days."
  },
  {
    title: "9. Children's Privacy",
    content: "This website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, contact us immediately at saaditech6@gmail.com."
  },
  {
    title: "10. Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. The updated date will always appear at the top of this page. Continued use of the site after any changes constitutes your acceptance of the updated policy."
  },
  {
    title: "11. Contact",
    content: "For any questions about this Privacy Policy, contact: Amine Saadi — saaditech6@gmail.com"
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* هيدر الصفحة بتصميم التدرج الفاخر الموحد */}
      <div className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] py-16 text-white">
        <div className="container-site max-w-4xl mx-auto px-4">
          <span className="eyebrow !text-amber-400 !mb-3">Legal & Security</span>
          <h1 className="heading-xl text-white font-bold mb-4">Privacy Policy</h1>
          <p className="body-lg text-slate-300 max-w-2xl leading-relaxed">
            Last updated: June 28, 2026 — Amine Saadi, saaditech6@gmail.com
          </p>
        </div>
      </div>

      {/* المحتوى القانوني الأساسي داخل بطاقة موحدة */}
      <div className="container-site max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* ملخص تمهيدي جذاب لسياسة الخصوصية */}
          <div className="bg-slate-50 border-l-4 border-amber-500 rounded-r-xl p-5 flex gap-4 items-start">
            <div className="text-[#1e4f9c] mt-0.5 flex-shrink-0">
              <ShieldCheck size={20} />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed m-0">
              This Privacy Policy explains how <span className="font-semibold text-[#071530]">Social Security Guide</span>, operated by Amine Saadi,
              collects, uses, and protects information from visitors to this website.
              By using this site, you agree to the terms described below.
            </p>
          </div>

          {/* تكرار البنود القانونية بشكل منسق ونظيف */}
          {sections.map((section, i) => (
            <div 
              key={i} 
              className={`space-y-3 pb-8 ${i < sections.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              <h2 className="font-playfair text-lg sm:text-xl font-bold text-[#071530] mt-4">
                {section.title}
              </h2>
              
              {section.content && (
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base m-0">
                  {section.content}
                </p>
              )}
              
              {section.items && (
                <ul className="space-y-3 pl-1">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm sm:text-base text-slate-600 items-start leading-relaxed">
                      <ArrowRight size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}