"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Calculator,
  ChevronDown,
  FileText,
  Menu,
  Search,
  X,
} from "lucide-react"

import { categories } from "@/lib/articles"

/* =========================================================
   TYPES
========================================================= */

type SearchResult = {
  slug: string
  title: string
  excerpt: string
  category: string
}

type NavItem = {
  label: string
  href: string
}

/* =========================================================
   CONSTANTS
========================================================= */

const BASE_URL = "https://www.socialsecurityguidecalc.com"

/* =========================================================
   BLOG CATEGORIES
========================================================= */

const blogCategories: NavItem[] = categories
  .filter((category) => category !== "All")
  .map((category) => ({
    label: category,
    href: `/blog?category=${encodeURIComponent(category)}`,
  }))

/* =========================================================
   CALCULATOR LINKS
========================================================= */

const calculatorLinks: NavItem[] = [
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
    label: "SSA Office Locator",
    href: "/calculators/office-locator",
  },
]

/* =========================================================
   GUIDE LINKS
========================================================= */

const guideLinks: NavItem[] = [
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
]

/* =========================================================
   LEGAL LINKS
========================================================= */

const legalLinks: NavItem[] = [
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
    href: "/terms",
  },
]

/* =========================================================
   SOCIAL LINKS
========================================================= */

const socialLinks: NavItem[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/SocialSecurityGuideCalc",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/SSAGuideCalc",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/amine-saadi1985/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@SocialSecurityGuideCalc",
  },
]

/* =========================================================
   COMPONENT
========================================================= */


function Dropdown({
  id,
  label,
  items,
  width = "w-56",
  activeDropdown,
  setActiveDropdown,
  closeDropdown,
}: {
  id: string
  label: string
  items: NavItem[]
  width?: string
  activeDropdown: string | null
  setActiveDropdown: (id: string | null) => void
  closeDropdown: () => void
}) {
  const isActive = activeDropdown === id
  return (
    <div className="relative" onMouseEnter={() => setActiveDropdown(id)} onMouseLeave={() => setActiveDropdown(null)}>
      <button type="button" onClick={() => setActiveDropdown(isActive ? null : id)} className="flex items-center gap-1 py-2 text-sm font-medium text-[#3c4043] transition-colors hover:text-[#1a73e8]" aria-expanded={isActive} aria-haspopup="true">
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${isActive ? "rotate-180" : ""}`} />
      </button>
      {isActive && (
        <div className={`absolute left-0 top-full ${width} z-50 rounded-xl border border-[#dadce0] bg-white py-2 shadow-lg`}>
          {items.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeDropdown} className="block px-4 py-2.5 text-sm font-medium text-[#3c4043] transition-colors hover:bg-[#f8f9fa] hover:text-[#1a73e8]">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)

  /* =======================================================
     NAVIGATION HELPERS
  ======================================================= */

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery("")
    setSearchResults([])
  }

  const openSearch = () => {
    setIsSearchOpen(true)
  }

  /* =======================================================
     SEARCH BODY LOCK
  ======================================================= */

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden"

      const timer = setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)

      return () => clearTimeout(timer)
    }

    document.body.style.overflow = ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [isSearchOpen])

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSearch()
        closeDropdown()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  /* =======================================================
     LIVE SEARCH
  ======================================================= */

  useEffect(() => {
    const query = searchQuery.trim()

    if (!query) return

    const controller = new AbortController()

    const timeout = setTimeout(async () => {
      setIsSearching(true)
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
          {
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error("Search request failed")
        }

        const data = await response.json()

        setSearchResults(data as SearchResult[])
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setSearchResults([])
        }
      } finally {
        setIsSearching(false)
      }
    }, 200)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [searchQuery])

  /* =======================================================
     JSON-LD NAVIGATION SCHEMA
  ======================================================= */

  const navigationItems = [
    ...calculatorLinks,
    ...guideLinks,
    {
      label: "By State",
      href: "/states",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
    ...legalLinks,
  ]

  const navSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Social Security Guide Navigation",
    itemListElement: navigationItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      url: `${BASE_URL}${item.href}`,
    })),
  }

  /* =======================================================
     DROPDOWN COMPONENT
  ======================================================= */



  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <>
      {/* =====================================================
          JSON-LD
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(navSchema),
        }}
      />

      {/* =====================================================
          HEADER / NAVIGATION
      ===================================================== */}

      <nav
        className="sticky top-0 z-40 border-b border-[#dadce0] bg-white"
        aria-label="Main navigation"
      >
        <div className="container-site mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            href="/"
            className="group flex items-center gap-3"
            onClick={() => {
              closeMobileMenu()
              closeDropdown()
            }}
          >
            <span className="whitespace-nowrap text-base font-semibold tracking-tight text-[#202124] sm:text-lg">
              Social Security Guide
            </span>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="hidden items-center gap-5 lg:flex">
            <Dropdown
              id="calculators"
              label="Calculators"
              items={calculatorLinks}
              width="w-64"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              closeDropdown={closeDropdown}
            />

            <Dropdown
              id="guides"
              label="Guides & Insights"
              items={guideLinks}
              width="w-64"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              closeDropdown={closeDropdown}
            />

            <Link
              href="/states"
              className="text-sm font-medium text-[#3c4043] transition-colors hover:text-[#1a73e8]"
              onClick={closeDropdown}
            >
              By State
            </Link>

            <Dropdown
              id="blog"
              label="Blog"
              items={[
                {
                  label: "All Posts",
                  href: "/blog",
                },
                ...blogCategories,
              ]}
              width="w-64"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              closeDropdown={closeDropdown}
            />

            {/* About */}

            <Link
              href="/about"
              className="text-sm font-medium text-[#3c4043] transition-colors hover:text-[#1a73e8]"
              onClick={closeDropdown}
            >
              About
            </Link>

          </div>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================= */}

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={openSearch}
              className="rounded-full p-2 text-[#5f6368] transition-colors hover:bg-[#f1f3f4] hover:text-[#202124]"
              aria-label="Search articles"
            >
              <Search size={19} />
            </button>

            <Link
              href="/calculators/benefits-estimator"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1a73e8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1558b0]"
            >
              <Calculator size={16} />
              Free Calculator
            </Link>
          </div>

          {/* =================================================
              MOBILE ACTIONS
          ================================================= */}

          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={openSearch}
              className="rounded-full p-2 text-[#5f6368] transition-colors hover:bg-[#f1f3f4] hover:text-[#202124]"
              aria-label="Search articles"
            >
              <Search size={20} />
            </button>

            <button
              type="button"
              onClick={() =>
                setIsMobileMenuOpen((current) => !current)
              }
              className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100"
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        {isMobileMenuOpen && (
          <div className="max-h-[85vh] overflow-y-auto border-t border-slate-100 bg-white px-4 pb-6 pt-2 shadow-inner md:hidden">
            {/* Calculators */}

            <MobileSection title="Calculators">
              {calculatorLinks.map((item) => (
                <MobileLink
                  key={item.href}
                  item={item}
                  onClick={closeMobileMenu}
                />
              ))}
            </MobileSection>

            {/* Guides */}

            <MobileSection title="Guides & Insights">
              {guideLinks.map((item) => (
                <MobileLink
                  key={item.href}
                  item={item}
                  onClick={closeMobileMenu}
                />
              ))}
            </MobileSection>

            {/* State Guides */}

            <MobileSection title="By State">
              <MobileLink
                item={{
                  label: "All States",
                  href: "/states",
                }}
                onClick={closeMobileMenu}
                bold
              />
            </MobileSection>

            {/* Blog */}

            <MobileSection title="Blog">
              <MobileLink
                item={{
                  label: "All Posts",
                  href: "/blog",
                }}
                onClick={closeMobileMenu}
                bold
              />

              {blogCategories.map((item) => (
                <MobileLink
                  key={item.href}
                  item={item}
                  onClick={closeMobileMenu}
                />
              ))}
            </MobileSection>

            {/* About */}

            <div className="border-t border-slate-100 pt-2">
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="block rounded-xl px-3 py-3 text-base font-medium text-slate-800 transition-colors hover:bg-slate-50"
              >
                About
              </Link>
            </div>

            {/* Legal */}

            <MobileSection title="Legal">
              {legalLinks.map((item) => (
                <MobileLink
                  key={item.href}
                  item={item}
                  onClick={closeMobileMenu}
                />
              ))}
            </MobileSection>

            {/* Social */}

            <MobileSection title="Social">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-amber-700"
                >
                  {item.label}
                </a>
              ))}
            </MobileSection>

            {/* Free Calculator */}

            <div className="px-1 pt-4">
              <Link
                href="/calculators/benefits-estimator"
                onClick={closeMobileMenu}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#071530] py-3 text-base font-semibold text-white shadow-xs transition-colors hover:bg-[#0f2550]"
              >
                <Calculator size={18} />
                Free Calculator
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* =====================================================
          SEARCH MODAL
      ===================================================== */}

      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 px-4 pt-16 backdrop-blur-xs sm:pt-20"
          role="dialog"
          aria-modal="true"
          aria-label="Search Social Security Guide"
          onClick={closeSearch}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Search Header */}

            <div className="flex h-14 items-center gap-3 border-b border-slate-100 px-4">
              <Search
                size={18}
                className="shrink-0 text-slate-400"
              />

              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(event) => {
  const value = event.target.value
  setSearchQuery(value)

  if (!value.trim()) {
    setSearchResults([])
    setIsSearching(false)
  }
}}
                placeholder="Search updates, guides, benefits..."
                className="h-full flex-1 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                aria-label="Search articles"
              />

              <button
                type="button"
                onClick={closeSearch}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </div>

            {/* Search Results */}

            <div className="max-h-80 overflow-y-auto p-2">
              {isSearching ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  Searching live database...
                </div>
              ) : !searchQuery.trim() ? (
                <div className="py-8 text-center text-xs font-medium text-slate-700">
                  Type something to search the Social Security library...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  No articles matched your search.
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Articles Found ({searchResults.length})
                  </div>

                  {searchResults.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/blog/${article.slug}`}
                      onClick={closeSearch}
                      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                    >
                      <div className="shrink-0 rounded-lg bg-slate-100 p-2 text-[#071530] transition-colors group-hover:bg-amber-50 group-hover:text-amber-700">
                        <FileText size={16} />
                      </div>

                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="line-clamp-1 text-xs font-bold text-[#071530] transition-colors group-hover:text-amber-700">
                          {article.title}
                        </div>

                        <div className="text-[11px] font-medium text-slate-500">
                          {article.category}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search Footer */}

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-[10px] font-medium text-slate-500">
              <span>
                Search index is live and updated
              </span>

              <span>
                Press{" "}
                <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-slate-600 shadow-xs">
                  ESC
                </kbd>{" "}
                to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* =========================================================
   MOBILE SECTION
========================================================= */

function MobileSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-slate-100 pt-2">
      <span className="mb-1 block px-3 pt-2 text-xs font-bold uppercase tracking-wider text-amber-600">
        {title}
      </span>

      {children}
    </div>
  )
}

/* =========================================================
   MOBILE LINK
========================================================= */

function MobileLink({
  item,
  onClick,
  bold = false,
}: {
  item: NavItem
  onClick: () => void
  bold?: boolean
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`block rounded-xl px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 hover:text-amber-700 ${
        bold
          ? "font-bold text-[#071530]"
          : "font-medium text-slate-700"
      }`}
    >
      {item.label}
    </Link>
  )
}