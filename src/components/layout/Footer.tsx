import Link from "next/link"
import { Shield, Mail, Rss } from "lucide-react"
import { SubscribeForm } from "@/components/ui/SubscribeForm"

const footerLinks = {
  Calculators: [
    { label: "Benefits Estimator", href: "/calculators/benefits-estimator" },
    { label: "Retirement Age", href: "/calculators/retirement-age" },
    { label: "Break-Even Calculator", href: "/calculators/break-even" },
    { label: "Medicare Cost", href: "/calculators/medicare-cost" },
  ],
  Guides: [
    { label: "Getting Started", href: "/guides/getting-started" },
    { label: "Retirement Benefits", href: "/guides/retirement" },
    { label: "Disability (SSDI)", href: "/guides/disability" },
    { label: "Medicare Guide", href: "/guides/medicare" },
  ],
  Legal: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#071530] text-white border-t border-white/10">
      
      {/* Top Section: Newsletter Subscription */}
      <div className="border-b border-white/10">
        <div className="container-site max-w-7xl mx-auto px-4 py-10 flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-md">
            <h2 className="font-playfair text-2xl font-semibold text-white mb-2">
              Stay informed about your benefits
            </h2>
            <p className="text-slate-400 text-sm">
              Get COLA updates, news, and planning tips delivered to your inbox.
            </p>
          </div>
          <div className="flex-1 min-w-[280px] max-w-lg">
            <SubscribeForm placeholder="Your email address" buttonText="Subscribe" dark={true} />
            <p className="text-slate-500 text-xs mt-2">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Middle Section: Links & Branding */}
      <div className="container-site max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-[#071530] font-playfair font-bold text-lg">S</span>
              </div>
              <div>
                <span className="font-playfair font-semibold text-white text-lg block leading-tight">SS Guide</span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase block">Social Security</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Trusted guides, free calculators, and expert news on Social Security, Medicare, and retirement.
            </p>
            {/* Social Icons - تمت إضافة relative z-10 لمنع تداخل أداة المراقبة */}
            <div className="flex gap-3 relative z-10">
              <a 
                href="mailto:saaditech6@gmail.com" 
                title="Email us" 
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-300 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-amber-400"
              >
                <Mail size={16} />
              </a>
              <Link 
                href="/blog" 
                title="Blog" 
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-300 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-amber-400"
              >
                <Rss size={16} />
              </Link>
            </div>
          </div>

          {/* Navigation Categories */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-white tracking-widest uppercase mb-4">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Legal & Disclaimers */}
      <div className="border-t border-white/5 bg-black/10">
        <div className="container-site max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Shield size={14} className="text-slate-500" />
            <span>© {new Date().getFullYear()} Social Security Guide by Amine Saadi. All rights reserved.</span>
          </div>
          <p className="text-slate-500 text-xs max-w-xl md:text-right">
            Not affiliated with the SSA. Verify official data at{" "}
            <a 
              href="https://ssa.gov" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 underline transition-colors hover:text-white"
            >
              SSA.gov
            </a>.
          </p>
        </div>
      </div>

    </footer>
  )
}