import { ArrowLeft, ShieldCheck } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — Social Security Guide",
  description: "How Social Security Guide collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy — Social Security Guide",
    description: "How Social Security Guide collects, uses, and protects your personal information.",
    url: "https://www.socialsecurityguidecalc.com/privacy-policy",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  url: "https://www.socialsecurityguidecalc.com/privacy-policy",
  description: "Privacy policy for Social Security Guide.",
  publisher: { "@type": "Organization", name: "Social Security Guide", url: "https://www.socialsecurityguidecalc.com" },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="bg-[#071530] py-14 text-white border-b border-white/10">
        <div className="container-site max-w-4xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-[#e4b325] transition-colors mb-4 group">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to Home
          </Link>
          <span className="block text-xs font-bold text-[#e4b325] uppercase tracking-wider mb-2">Legal &amp; Security</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-playfair text-white mb-3">Privacy Policy</h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">Last updated: August 25, 2026</p>
        </div>
      </header>

      <main className="container-site max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="bg-slate-50 border-l-4 border-[#a6760d] rounded-r-xl p-5 mb-10 flex gap-4 items-start">
            <ShieldCheck size={22} className="text-[#1e4f9c] mt-0.5 flex-shrink-0" />
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed m-0 font-medium">This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
          </div>

          <div className="prose-article max-w-none">
            <p>We use Your Personal Data to provide and improve the Service. We collect, use, and disclose Your information as described in this Privacy Policy and, where required by applicable law, only where We have a valid legal basis to do so, including Your consent (where consent is required).</p>

            <h2>Interpretation and Definitions</h2>
            <h3>Interpretation</h3>
            <p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <h3>Definitions</h3>
            <p>For the purposes of this Privacy Policy:</p>
            <ul>
              <li><strong>Account</strong> means a unique account created for You to access Our Service or parts of Our Service.</li>
              <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
              <li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Privacy Policy) refers to socialsecurityguidecalc.</li>
              <li><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website, among its many uses.</li>
              <li><strong>Country/State</strong> refers to: Morocco.</li>
              <li><strong>Device</strong> means any device that can access the Service, such as a computer, a cell phone or a digital tablet.</li>
              <li><strong>Personal Data</strong> (or &quot;Personal Information&quot;) is any information that relates to an identified or identifiable individual. We use &quot;Personal Data&quot; and &quot;Personal Information&quot; interchangeably unless a law uses a specific term.</li>
              <li><strong>Service</strong> refers to the Website.</li>
              <li><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company, including third-party companies or individuals employed to facilitate, provide, analyze or support the Service.</li>
              <li><strong>Usage Data</strong> refers to data collected automatically, either generated by use of the Service or from the Service infrastructure itself.</li>
              <li><strong>User</strong> means any individual who accesses or uses the Service.</li>
              <li><strong>Website</strong> refers to socialsecurityguidecalc, accessible from <a href="https://www.socialsecurityguidecalc.com/" rel="external nofollow noopener" target="_blank">https://www.socialsecurityguidecalc.com/</a>.</li>
              <li><strong>You</strong> means the individual accessing or using the Service, or the company or legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
            </ul>

            <h2>Collecting and Using Your Personal Information</h2>
            <h3>Types of Data Collected</h3>
            <h4>Personal Data</h4>
            <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You, such as your email address when submitting inquiries.</p>
            
            <h4>Interactive Calculator Input Data</h4>
            <p>Any financial figures, earnings history, dates of birth, or estimated parameters entered into our interactive calculators are processed locally in your web browser. We do not store, record, transmit, or retain your personal financial inputs on our servers or databases.</p>

            <h4>Usage Data</h4>
            <p>Usage Data is collected automatically when using the Service.</p>
            <p>Usage Data may include Your Device&apos;s Internet Protocol address, browser type and version, the pages of Our Service that You visit, the time and date of Your visit, time spent on those pages, unique device identifiers and other diagnostic data.</p>
            <p>When You access the Service through a mobile device, We may collect the type and unique ID of the device, its IP address and operating system, the type of mobile Internet browser used, unique device identifiers and other diagnostic data. We may also collect information that Your browser sends whenever You visit Our Service.</p>
            
            <h4>Tracking Technologies, Advertising, and Cookies</h4>
            <p>We use tracking technologies such as cookies to track activity and improve Our Service. Cookies are small files placed on Your Device. You can instruct Your browser to refuse all Cookies or indicate when a Cookie is being sent, but some parts of Our Service may then be unavailable.</p>
            <p>Third-party vendors, including advertising networks and analytics services (such as Google Analytics and Google AdSense), may use cookies or web beacons to serve ads or analyze traffic based on your visits to this and other websites on the Internet.</p>
            <ul>
              <li><strong>Necessary / Essential Cookies</strong>: Session Cookies administered by Us. These are essential to provide services available through the Website, enable features, authenticate users and prevent fraudulent use.</li>
              <li><strong>Cookies Policy / Notice Acceptance Cookies</strong>: Persistent Cookies administered by Us to identify whether users accepted cookies and record their consent choices.</li>
              <li><strong>Functionality &amp; Analytics Cookies</strong>: Persistent Cookies administered by Us or third-party providers to analyze visitor usage, remember choices, and provide a seamless interactive experience.</li>
            </ul>

            <h3>Use of Your Personal Data</h3>
            <p>The Company may use Personal Data to provide and maintain Our Service; manage Your Account; perform contracts; contact You about updates, products, contracted services or security updates; provide permitted news and special offers; manage Your requests; evaluate or conduct business transfers; and analyze usage trends and improve Our Service, products, services, marketing and Your experience.</p>
            <p>We may share Your Personal Data with Service Providers; in connection with business transfers; with Affiliates who honor this Privacy Policy; with other users where You share information in public areas; or for any other purpose with Your consent.</p>

            <h3>Retention of Your Personal Data</h3>
            <p>The Company will retain Your Personal Data only for as long as necessary for the purposes in this Privacy Policy, legal obligations, dispute resolution and enforcement of legal agreements. Where possible, We apply shorter retention periods and reduce identifiability by deleting, aggregating or anonymizing data.</p>
            <ul>
              <li><strong>Account Information</strong>: retained for the duration of Your Account relationship plus up to 24 months after closure.</li>
              <li><strong>Website analytics data</strong>: up to 24 months from collection.</li>
              <li><strong>Server logs</strong>: up to 24 months for security monitoring and troubleshooting.</li>
            </ul>
            <p>Data may be retained longer where necessary for security, fraud prevention, legal compliance, legal claims, Your explicit request, or technical limitations in encrypted backups. When retention periods expire, We delete or anonymize Personal Data.</p>

            <h3>Transfer of Your Personal Data</h3>
            <p>Your information may be processed at the Company&apos;s operating offices and other locations where processing parties are located, including outside Your jurisdiction where data protection laws may differ. Where required by law, We will use appropriate safeguards and supplementary measures for international transfers and take reasonable steps to ensure Your data is treated securely and in accordance with this Privacy Policy.</p>
            
            <h3>Delete Your Personal Data</h3>
            <p>You have the right to delete or request assistance deleting Personal Data We have collected about You. You may update, amend or delete information through Your Account, if You have one, or by contacting Us to request access to, correction of or deletion of Personal Data. We may retain information where We have a legal obligation or lawful basis to do so.</p>

            <h3>Disclosure of Your Personal Data</h3>
            <h4>Business Transactions</h4>
            <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before it is transferred and becomes subject to a different Privacy Policy.</p>
            <h4>Law Enforcement</h4>
            <p>Under certain circumstances, the Company may disclose Your Personal Data if required by law or in response to valid requests by public authorities.</p>
            <h4>Other Legal Requirements</h4>
            <p>The Company may disclose Your Personal Data in the good-faith belief that doing so is necessary to comply with a legal obligation; protect and defend the rights or property of the Company; prevent or investigate possible wrongdoing; protect the personal safety of Users or the public; or protect against legal liability.</p>
            
            <h3>Security of Your Personal Data</h3>
            <p>The security of Your Personal Data is important to Us, but no method of transmission over the Internet or electronic storage is 100% secure. While We strive to use commercially reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>

            <h2>Children&apos;s and Minors&apos; Privacy</h2>
            <p>The Service is not directed to, and We do not knowingly collect Personal Information from, anyone under the age of 16. If You are a parent or guardian and believe Your child has provided Personal Information, please contact Us. If We become aware of such collection, We will take steps to remove it from Our servers as soon as reasonably possible.</p>
            
            <h2>Links to Other Websites</h2>
            <p>Our Service may contain links to websites not operated by Us. We strongly advise You to review every third party&apos;s Privacy Policy. We have no control over and assume no responsibility for third-party content, privacy policies or practices.</p>
            
            <h2>Changes to this Privacy Policy</h2>
            <p>We may update Our Privacy Policy from time to time by posting the new Privacy Policy on this page. We will let You know via email and/or a prominent notice before changes become effective and update the &quot;Last updated&quot; date. Changes are effective when posted.</p>
            
            <h2>Contact Us</h2>
            <p>If You have questions about this Privacy Policy, contact Us by email at <a href="mailto:contact@socialsecurityguidecalc.com">contact@socialsecurityguidecalc.com</a>.</p>
          </div>
        </article>
      </main>
    </div>
  )
}