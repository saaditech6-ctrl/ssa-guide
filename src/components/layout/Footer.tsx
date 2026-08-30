import Link from "next/link"
import { Rss, Shield } from "lucide-react"
import { SubscribeForm } from "@/components/ui/SubscribeForm"

interface FooterLink {
  label: string
  href: string
}

const footerLinks: Record<string, FooterLink[]> = {
  Calculators: [
    {
      label: "Benefits Estimator",
      href: "/calculators/benefits-estimator",
    },
    {
      label: "Full Retirement Age",
      href: "/calculators/retirement-age",
    },
    {
      label: "Break-Even Analysis",
      href: "/calculators/break-even",
    },
    {
      label: "Medicare Cost",
      href: "/calculators/medicare-cost",
    },
    {
      label: "Social Security Tax",
      href: "/calculators/tax-calculator",
    },
    {
      label: "Earnings Test",
      href: "/calculators/earnings-test",
    },
    {
      label: "SSDI Eligibility",
      href: "/calculators/ssdi-eligibility",
    },
    {
      label: "SSA Office Locator",
      href: "/calculators/office-locator",
    },
    {
      label: "Medicare Plan Finder",
      href: "/calculators/medicare-plan-finder",
    },
    {
      label: "Survivor Benefits",
      href: "/calculators/survivor-benefits",
    },
    {
      label: "WEP & GPO Calculator",
      href: "/calculators/wep-gpo-calculator",
    },
    {
      label: "Couples & Divorced Strategy Optimizer",
      href: "/calculators/couples-divorced-strategy-optimizer",
    },
  ],

  Guides: [
    {
      label: "Getting Started",
      href: "/guides/getting-started",
    },
    {
      label: "Retirement Benefits",
      href: "/guides/retirement",
    },
    {
      label: "Avoid Benefit Taxes",
      href: "/guides/benefit-taxes",
    },
    {
      label: "Disability (SSDI)",
      href: "/guides/disability",
    },
    {
      label: "Medicare Complete Guide",
      href: "/guides/medicare",
    },
    {
      label: "Spousal Benefits",
      href: "/guides/spousal-benefits",
    },
  ],

  Company: [
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],

  Legal: [
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Disclaimer",
      href: "/disclaimer",
    },
    {
      label: "Terms of Use",
      href: "/terms-of-use",
    },
  ],
}

const socialLinks = [
  {
    label: "Facebook",
    shortLabel: "f",
    href: "https://www.facebook.com/SocialSecurityGuideCalc",
  },
  {
    label: "LinkedIn",
    shortLabel: "in",
    href: "https://www.linkedin.com/in/amine-saadi1985/",
  },
  {
    label: "YouTube",
    shortLabel: "▶",
    href: "https://www.youtube.com/@SocialSecurityGuideCalc",
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#071530] text-white border-t border-white/10">

      {/* =========================================================
          NEWSLETTER
      ========================================================= */}
      <section className="border-b border-white/10">
        <div className="container-site max-w-7xl mx-auto px-4 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div className="max-w-xl">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
                Stay informed
              </p>

              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-3">
                Get Social Security updates in your inbox
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Receive Social Security updates, COLA information,
                retirement planning insights, and new calculator releases.
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              <SubscribeForm
                placeholder="Your email address"
                buttonText="Subscribe"
                dark={true}
              />

              <p className="text-slate-400 text-xs mt-2.5">
                No spam. Unsubscribe at any time.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN FOOTER
      ========================================================= */}
      <div className="container-site max-w-7xl mx-auto px-4 py-12 sm:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* =====================================================
              BRAND
          ===================================================== */}
          <div className="lg:col-span-2">

            <Link
              href="/"
              className="inline-flex items-center gap-3 group"
              aria-label="Social Security Guide Calc Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                <span className="text-[#071530] font-playfair font-black text-xl">
                  S
                </span>
              </div>

              <div>
                <span className="font-playfair font-bold text-white text-lg block leading-tight">
                  SSA Guide Calc
                </span>

                <span className="text-[10px] text-amber-300 font-semibold tracking-[0.2em] uppercase block">
                  Social Security
                </span>
              </div>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mt-5">
              Independent educational resources, free calculators, and
              practical guides for Social Security, Medicare, and retirement
              planning.
            </p>

            {/* =================================================
                SOCIAL MEDIA
            ================================================= */}
            <div className="mt-6">

              <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
                Follow us
              </p>

              <div className="flex items-center gap-2">

                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    title={social.label}
                    className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 hover:border-amber-400/40 transition-all"
                  >
                    <span
                      className={
                        social.label === "LinkedIn"
                          ? "text-[11px] font-bold"
                          : "text-sm font-bold"
                      }
                    >
                      {social.shortLabel}
                    </span>
                  </a>
                ))}


                {/* Blog */}
                <Link
                  href="/blog"
                  aria-label="Visit our blog"
                  title="Blog"
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 hover:border-amber-400/40 transition-all"
                >
                  <Rss size={16} />
                </Link>

              </div>
            </div>

          </div>

          {/* =====================================================
              FOOTER LINK COLUMNS
          ===================================================== */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div
              key={section}
              className="space-y-4"
            >
              <h3 className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                {section}
              </h3>

              <ul className="space-y-2.5">

                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-white transition-colors"
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

      {/* =========================================================
          DISCLAIMER / TRUST SECTION
      ========================================================= */}
      <div className="border-t border-white/10 bg-black/20">

        <div className="container-site max-w-7xl mx-auto px-4 py-8">

          <div className="max-w-5xl text-xs text-slate-400 leading-relaxed space-y-3">

            <p>
              <strong className="text-slate-300">
                Important Disclaimer:
              </strong>{" "}
              Social Security Guide Calc is an independent educational
              website and is not affiliated with, endorsed by, authorized by,
              or sponsored by the U.S. Social Security Administration (SSA),
              the Centers for Medicare & Medicaid Services (CMS), or any other
              U.S. government agency.
            </p>

            <p>
              The information, calculators, estimates, and tools provided on
              this website are for educational and informational purposes only.
              They do not constitute legal, tax, financial, investment, or
              other professional advice. Information and calculations may
              change as laws, regulations, and government policies are updated.
            </p>

            <p>
              Always verify important benefit amounts, eligibility rules,
              deadlines, and policy information with official government
              sources before making financial or retirement decisions.
            </p>

            <p>
              Official Social Security information is available at{" "}
              <a
                href="https://www.ssa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 underline underline-offset-2 hover:text-amber-200 transition-colors"
              >
                SSA.gov
              </a>
              .
            </p>

          </div>

          {/* =====================================================
              COPYRIGHT + LEGAL LINKS
          ===================================================== */}
          <div className="mt-7 pt-6 border-t border-white/5">

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

              <div className="flex items-center gap-2 text-xs text-slate-400 text-center sm:text-left">
                <Shield
                  size={14}
                  className="text-amber-400 shrink-0"
                />

                <span>
                  © {currentYear} Social Security Guide Calc.
                  All rights reserved.
                </span>
              </div>

              <nav
                aria-label="Legal navigation"
                className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs"
              >
                <Link
                  href="/privacy-policy"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy
                </Link>

                <Link
                  href="/disclaimer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Disclaimer
                </Link>

                <Link
                  href="/terms-of-use"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Terms
                </Link>

                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </nav>

            </div>

          </div>

        </div>
      </div>

    </footer>
  )
}