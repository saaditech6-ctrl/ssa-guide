import { Article } from "@/lib/articles";
import { getArticleLastModified } from "@/lib/article-date";

const BASE_URL = "https://www.socialsecurityguidecalc.com";

/**
 * يستخرج تلقائياً الأسئلة والأجوبة المحصورة داخل قسم الـ FAQ فقط
 */
export function generateFAQSchema(content: string) {
  // 1. نبحث فقط عن النص بعد عنوان الأسئلة الشائعة لعدم التقاط عناوِين المقال الأخرى
  const faqSectionMatch = content.match(/<h2[^>]*>.*?(Frequently Asked Questions|FAQ).*?<\/h2>([\s\S]*)/i);
  if (!faqSectionMatch) return null;

  const faqContent = faqSectionMatch[2];

  // 2. استخراج الـ h3 والـ p التالي له مباشرة
  const faqRegex = /<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g;
  const matches = [...faqContent.matchAll(faqRegex)];

  if (matches.length === 0) return null;

  const mainEntity = matches.map((match) => {
    const question = stripHtml(match[1]);
    const answer = stripHtml(match[2]);
    return {
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

/**
 * يبني Article schema كامل ومطابق لشروط Google Rich Results
 */
export function generateArticleSchema(article: Article, url: string) {
  const imageUrl = article.image
    ? article.image.startsWith("http")
      ? article.image
      : `${BASE_URL}${article.image}`
    : `${BASE_URL}/og-image.png`

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    inLanguage: "en-US",
    articleSection: article.category,
    isAccessibleForFree: true,
    image: [imageUrl],
    author: {
      "@type": "Person",
      name: article.author || "Amine Saadi",
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Social Security Guide",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    datePublished: article.date,
    dateModified: getArticleLastModified(article),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}