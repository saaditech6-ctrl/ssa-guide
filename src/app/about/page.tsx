import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Social Security Guide Calc",
  description:
    "Learn about Social Security Guide Calc, an independent educational platform providing Social Security, Medicare, and retirement calculators and resources.",
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Social Security Guide Calc",
  url: "https://www.socialsecurityguidecalc.com/about",
  description:
    "Learn about Social Security Guide Calc, its founder, educational mission, data sources, privacy practices, and independent status.",
  mainEntity: {
    "@type": "Organization",
    name: "Social Security Guide Calc",
    url: "https://www.socialsecurityguidecalc.com",
    founder: {
      "@type": "Person",
      name: "Amine Saadi",
      jobTitle: "Software Developer and Author",
    },
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Page Title */}
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        About Social Security Guide Calc
      </h1>

      {/* Introduction */}
      <section className="mt-8">
        <p className="text-lg leading-8 text-gray-700">
          I&apos;m <strong>Amine Saadi</strong>, a software developer and
          author passionate about making complex financial information easier
          to understand.
        </p>

        <p className="mt-5 leading-8 text-gray-700">
          I created <strong>Social Security Guide Calc</strong> as an
          independent educational platform to help people better understand
          U.S. Social Security, Medicare, and retirement planning through
          transparent calculations, practical explanations, and reliable
          sources.
        </p>
      </section>

      {/* What We Offer */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          What We Offer
        </h2>

        <p className="mt-4 leading-7 text-gray-700">
          Our calculators and educational resources help users explore:
        </p>

        <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-gray-700">
          <li>Social Security retirement benefit estimates</li>
          <li>Retirement and claiming-age scenarios</li>
          <li>Social Security survivor benefits</li>
          <li>Medicare costs and related considerations</li>
          <li>Social Security taxation and retirement planning</li>
          <li>Other Social Security and retirement-related topics</li>
        </ul>

        <p className="mt-5 leading-7 text-gray-700">
          Our goal is not only to provide an estimated result, but also to
          help users understand the factors and assumptions behind the
          calculation.
        </p>
      </section>

      {/* Sources */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Our Sources
        </h2>

        <p className="mt-4 leading-7 text-gray-700">
          We rely primarily on authoritative U.S. government sources,
          including:
        </p>

        <ul className="mt-5 space-y-4">
          <li>
            <a
              href="https://www.ssa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 underline hover:text-blue-900"
            >
              Social Security Administration (SSA)
            </a>
          </li>

          <li>
            <a
              href="https://www.ecfr.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 underline hover:text-blue-900"
            >
              Code of Federal Regulations (CFR)
            </a>
          </li>

          <li>
            <a
              href="https://www.cms.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 underline hover:text-blue-900"
            >
              Centers for Medicare &amp; Medicaid Services (CMS)
            </a>
          </li>

          <li>
            <a
              href="https://www.medicare.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 underline hover:text-blue-900"
            >
              Medicare.gov
            </a>
          </li>

          <li>
            <a
              href="https://www.irs.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 underline hover:text-blue-900"
            >
              Internal Revenue Service (IRS)
            </a>
          </li>
        </ul>
      </section>

      {/* Privacy */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Privacy
        </h2>

        <p className="mt-4 leading-7 text-gray-700">
          Where our calculators are designed for client-side processing,
          calculations are performed locally in your browser. Features that
          require servers or third-party services may process technical or
          usage information.
        </p>

        <p className="mt-4 leading-7 text-gray-700">
          We aim to minimize the collection of personal information and
          provide transparent information about how website data is handled.
        </p>

        <p className="mt-5">
          <Link
            href="/privacy-policy"
            className="font-semibold text-blue-700 underline hover:text-blue-900"
          >
            Read our Privacy Policy →
          </Link>
        </p>
      </section>

      {/* Independence */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Independent Educational Platform
        </h2>

        <p className="mt-4 leading-7 text-gray-700">
          Social Security Guide Calc is an independent educational platform.
          It is not affiliated with, endorsed by, or operated by the U.S.
          Social Security Administration, Medicare, CMS, IRS, or any other
          U.S. government agency.
        </p>
      </section>

      {/* Disclaimer */}
      <section className="mt-12 border-t pt-10">
        <h2 className="text-2xl font-bold text-gray-900">
          Disclaimer
        </h2>

        <p className="mt-4 leading-7 text-gray-700">
          The information and calculator results provided by Social Security
          Guide Calc are for educational and informational purposes only.
          They should not be considered financial, tax, legal, investment, or
          retirement-planning advice.
        </p>

        <p className="mt-4 leading-7 text-gray-700">
          Social Security and Medicare rules, benefit amounts, thresholds,
          and other requirements may change. Users should verify important
          information with official government sources before making
          financial decisions.
        </p>
      </section>

      {/* Learn More */}
      <section className="mt-12 border-t pt-10">
        <h2 className="text-2xl font-bold text-gray-900">
          Learn More
        </h2>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          <Link
            href="/privacy-policy"
            className="font-medium text-blue-700 underline hover:text-blue-900"
          >
            Privacy Policy
          </Link>

          <Link
            href="/disclaimer"
            className="font-medium text-blue-700 underline hover:text-blue-900"
          >
            Disclaimer
          </Link>

          <Link
            href="/terms"
            className="font-medium text-blue-700 underline hover:text-blue-900"
          >
            Terms of Use
          </Link>
        </div>
      </section>
    </main>
  );
}