import { 
  Building2, 
  FileText, 
  Calculator, 
  AlertTriangle, 
  Briefcase, 
  Link2, 
  BadgeDollarSign, 
  Megaphone, 
  Mail,
  Scale
} from "lucide-react"

export const metadata = {
  title: "Disclaimer | Social Security Guide",
  description: "Important disclaimers about the information provided on Social Security Guide by Amine Saadi.",
}

const sections = [
  {
    title: "Not Affiliated with the Government",
    icon: Building2,
    content: "Social Security Guide (socialsecurityguide.com) is an independent website operated by Amine Saadi, a financial content creator. We are NOT affiliated with, endorsed by, sponsored by, or operated by the United States Social Security Administration (SSA), Medicare, the Department of Health and Human Services, or any other government agency."
  },
  {
    title: "General Information Only",
    icon: FileText,
    content: "All content on this website — including articles, guides, calculators, and news — is provided for general informational and educational purposes only. Nothing on this site constitutes legal, financial, tax, investment, or professional advice of any kind. Do not make financial decisions based solely on information found on this site."
  },
  {
    title: "Calculator Results Are Estimates",
    icon: Calculator,
    content: "The calculators and tools on this site produce estimates only. They use simplified versions of SSA formulas and may not account for all factors that determine your actual benefit. Your real benefit amount is determined exclusively by the Social Security Administration based on your complete earnings record. Always verify your benefit estimate at ssa.gov/myaccount or by calling the SSA at 1-800-772-1213."
  },
  {
    title: "No Guarantee of Accuracy",
    icon: AlertTriangle,
    content: "While Amine Saadi makes every effort to keep information current and accurate, Social Security rules, benefit amounts, Medicare premiums, and program details change frequently. We cannot guarantee that all information is complete, accurate, or up to date at the time you read it. We are not responsible for any decisions made based on information found on this site."
  },
  {
    title: "Consult a Professional",
    icon: Scale,
    content: "For advice tailored to your personal situation, please consult a qualified financial advisor, Social Security attorney, certified financial planner (CFP), or licensed benefits counselor. The SSA also offers free assistance at local SSA offices and by phone."
  },
  {
    title: "External Links",
    icon: Link2,
    content: "This site may link to external websites including SSA.gov, Medicare.gov, and other third-party sources. We are not responsible for the content, accuracy, or privacy practices of those external sites. Links are provided for reference only."
  },
  {
    title: "Affiliate Disclosure",
    icon: BadgeDollarSign,
    content: "Some links on this site may be affiliate links. If you click through and make a purchase or sign up for a service, Amine Saadi may receive a small commission at no additional cost to you. We only link to products and services we believe may be genuinely useful to our readers. Affiliate relationships do not influence our editorial content."
  },
  {
    title: "Advertising Disclosure",
    icon: Megaphone,
    content: "This website displays advertisements served by Google AdSense and potentially other advertising networks. The presence of an advertisement does not constitute an endorsement of the advertised product, service, or company. Advertisers have no influence over editorial content on this site."
  },
  {
    title: "Contact",
    icon: Mail,
    content: "If you have questions about this disclaimer or find an error in our content, please contact Amine Saadi at saaditech6@gmail.com. We take accuracy seriously and will correct verified errors promptly."
  },
]

export default function DisclaimerPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* هيدر الصفحة الفاخر الموحد */}
      <div className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] py-16 text-white">
        <div className="container-site max-w-4xl mx-auto px-4">
          <span className="eyebrow !text-amber-400 !mb-3">Legal Policy</span>
          <h1 className="heading-xl text-white font-bold mb-4">Disclaimer</h1>
          <p className="body-lg text-slate-300 max-w-2xl leading-relaxed">
            Please read this disclaimer carefully before using Social Security Guide.
          </p>
        </div>
      </div>

      {/* المحتوى الأساسي والبطاقات القانونية */}
      <div className="container-site max-w-4xl mx-auto px-4 py-12">
        
        {/* صندوق التنبيه العلوي الملون للتحذير العاجل */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-4 items-start shadow-xs">
          <div className="text-amber-600 mt-0.5 flex-shrink-0">
            <AlertTriangle size={20} />
          </div>
          <p className="text-amber-900 text-sm leading-relaxed font-medium m-0">
            <strong className="text-amber-950">Important:</strong> Social Security Guide is operated by Amine Saadi as an independent educational resource. We are not affiliated with any government agency. All information is for educational purposes only. Always verify at{" "}
            <a href="https://ssa.gov" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-800 underline font-bold transition-colors">SSA.gov</a>{" "}
            or call <span className="font-bold text-amber-950">1-800-772-1213</span>.
          </p>
        </div>

        {/* شبكة عرض بنود إخلاء المسؤولية */}
        <div className="flex flex-col gap-4">
          {sections.map((section, i) => {
            const IconComponent = section.icon
            return (
              <div key={i} className="bg-white border border-slate-200/60 rounded-2xl p-6 transition-all hover:border-slate-300/80 shadow-xs">
                <div className="flex gap-4 items-start">
                  {/* حاوية الأيقونات الجانبية الموحدة */}
                  <div className="w-10 h-10 bg-slate-50 text-[#1e4f9c] rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent size={20} strokeWidth={1.75} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h2 className="font-playfair text-base sm:text-lg font-bold text-[#071530] m-0">
                      {section.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-sm m-0">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* تذييل الصفحة القانوني الداكن */}
        <div className="bg-[#071530] border border-white/5 rounded-2xl p-6 mt-8 text-center space-y-2 shadow-sm">
          <p className="text-xs text-slate-300 font-medium m-0">
            Last updated: June 28, 2026
          </p>
          <p className="text-xs text-slate-400 m-0">
            Questions? Contact Amine Saadi at{" "}
            <a href="mailto:saaditech6@gmail.com" className="text-amber-400 hover:text-amber-500 font-semibold transition-colors underline decoration-amber-400/30">
              saaditech6@gmail.com
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}